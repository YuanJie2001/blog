# 基于推特雪花算法的改进-处理时间回拨和工作中心自动切换
[[toc]]

---

## 一. 直接上代码,注释很详细

`利用ip生成机器id,主机名unicode编码生成数据中心.`
`getNextId() 提供外部使用`

`对时间回拨做了容忍处理.先睡3ms.如果还是时间抖动,那重新计算工作id和数据id.最后抛出异常兜底`

```java
/**
 * Twitter的SnowFlake算法,使用SnowFlake算法生成一个整数，然后转化为62进制变成一个短地址URL
 * <p>
 * https://github.com/beyondfengyu/SnowFlake
 * <p>
 * Snowflake生成的是Long类型的ID，一个Long类型占8个字节，每个字节占8比特，也就是说一个Long类型占64个比特。
 * Snowflake ID组成结构：正数位（占1比特）+ 时间戳（占41比特）+ 数据中心（占5比特）+ 机器ID（占5比特）+ 自增值（占12比特），总共64比特组成的一个Long类型。
 * ● 第一个bit位（1bit）：Java中long的最高位是符号位代表正负，正数是0，负数是1，一般生成ID都为正数，所以默认为0。
 * ● 时间戳部分（41bit）：毫秒级的时间，不建议存当前时间戳，而是用（当前时间戳 - 固定开始时间戳）的差值，可以使产生的ID从更小的值开始；41位的时间戳可以使用69年，(1L << 41) / (1000L * 60 * 60 * 24 * 365) = 69年
 * ● 工作机器id（10bit）：也被叫做workId，这个可以灵活配置，机房或者机器号组合都可以。
 * ● 序列号部分（12bit），自增值支持同一毫秒内同一个节点可以生成4096个ID
 * 根据这个算法的逻辑，只需要将这个算法用Java语言实现出来，封装为一个工具方法，那么各个业务应用可以直接使用该工具方法来获取分布式ID，只需保证每个业务应用有自己的工作机器id即可，而不需要单独去搭建一个获取分布式ID的应用。
 */
public class SnowFlakeUtil {
    /**
     * 起始的时间戳
     */
    private final static long START_TIMESTAMP = 1679815564110L;

    /**
     * 每一部分占用的位数
     */
    private final static long SEQUENCE_BIT = 12;   //序列号占用的位数
    private final static long MACHINE_BIT = 5;     //机器标识占用的位数
    private final static long DATA_CENTER_BIT = 5; //数据中心占用的位数

    /**
     * 每一部分的最大值
     */
    private final static long MAX_SEQUENCE = -1L ^ (-1L << SEQUENCE_BIT);  // 4095
    private final static long MAX_MACHINE_NUM = -1L ^ (-1L << MACHINE_BIT); //
    private final static long MAX_DATA_CENTER_NUM = -1L ^ (-1L << DATA_CENTER_BIT);

    /**
     * 每一部分向左的位移
     */
    private final static long MACHINE_LEFT = SEQUENCE_BIT;
    private final static long DATA_CENTER_LEFT = SEQUENCE_BIT + MACHINE_BIT;
    private final static long TIMESTAMP_LEFT = DATA_CENTER_LEFT + DATA_CENTER_BIT;

    private long dataCenterId = 1L;  //数据中心
    private long machineId = 1L;     //机器标识
    private long sequence = 0L; //序列号
    private long lastTimeStamp = -1L;  //上一次时间戳

    /**
     * 最大容忍回拨时间 3ms
     */
    private static final long MAX_BACKWARD_MS = 3;

    private long getNextMill() {
        long mill = getNewTimeStamp();
        while (mill <= lastTimeStamp) {
            mill = getNewTimeStamp();
        }
        return mill;
    }

    private long getNewTimeStamp() {
        return System.currentTimeMillis();
    }

    /**
     * 根据指定的数据中心ID和机器标志ID生成指定的序列号
     * 机器id总共占5位,低12位序号id12位.因此要左移12位
     * 数据中心id(机房id)占5位,低17位为机器id5位和序号id12位,因此要左移17位
     */
    public SnowFlakeUtil(long dataCenterId, long machineId) {
        if (dataCenterId > MAX_DATA_CENTER_NUM || dataCenterId < 0) {
            throw new IllegalArgumentException("DtaCenterId can't be greater than MAX_DATA_CENTER_NUM or less than 0！");
        }
        if (machineId > MAX_MACHINE_NUM || machineId < 0) {
            throw new IllegalArgumentException("MachineId can't be greater than MAX_MACHINE_NUM or less than 0！");
        }
        this.dataCenterId = dataCenterId;
        this.machineId = machineId;
    }

    /**
     * 产生下一个ID
     * id号只有12位.同一毫秒内最多生产4096个.
     * 超过时,申请下一个毫秒值
     *
     * @return
     */
    private synchronized long nextId() {
        long currTimeStamp = getNewTimeStamp();
        long offset = lastTimeStamp - currTimeStamp; // 时钟回拨
        // 如果时钟回拨且回拨时间小于最大容忍范围
        if (offset > 0 && offset <= MAX_BACKWARD_MS) {
            try {
                // 时钟回拨,等待时钟回拨完成
                LockSupport.parkNanos(TimeUnit.MILLISECONDS.toNanos(offset << 1));
                // 重新获取时间戳
                currTimeStamp = getNewTimeStamp();
                // 如果还是小于上次时间戳,则抛出异常
                if (currTimeStamp < lastTimeStamp) {
                    clockCallback(); // 备用机制
                }
            } catch (Exception e) {
                throw new RuntimeException("Clock moved backwards.  Refusing to generate id");
            }
        } else if (offset > MAX_BACKWARD_MS) { // 时钟回拨超过最大容忍范围,抛出异常
            clockCallback(); // 备用机制
        }

        // 在同一毫秒内
        if (currTimeStamp == lastTimeStamp) {
            //相同毫秒内，序列号自增   MAX_SEQUENCE=4095(12位,序列号最大值)  sequence + 1 =4096时sequence为0
            sequence = (sequence + 1) & MAX_SEQUENCE;
            //同一毫秒的序列数已经达到最大
            if (sequence == 0L) {
                currTimeStamp = getNextMill();
            }
        } else {
            //不同毫秒内，序列号置为0
            sequence = 0L;
        }
        // 上次生成ID的时间截
        lastTimeStamp = currTimeStamp;

        return (currTimeStamp - START_TIMESTAMP) << TIMESTAMP_LEFT //时间戳部分 低22位 数据中心id5位,机器标识id5位,序号id12位,因此左移22位
                | dataCenterId << DATA_CENTER_LEFT       //数据中心部分
                | machineId << MACHINE_LEFT             //机器标识部分
                | sequence;                             //序列号部分
    }

    // 提供获取下一个ID
    public synchronized static long getNextId() {
        SnowFlakeUtil snowFlakeUtil = new SnowFlakeUtil(getDataCenterId(), getWorkId());
        return snowFlakeUtil.nextId();
    }


    // 备用机制
    private synchronized void clockCallback() {
        if (this.dataCenterId == MAX_DATA_CENTER_NUM && this.machineId == MAX_MACHINE_NUM) {
            throw new RuntimeException("Clock moved backwards.  Refusing to generate id");
        }
//        if (this.machineId == MAX_MACHINE_NUM) {
//            dataCenterId = (dataCenterId + 1) & MAX_DATA_CENTER_NUM;

//        }
//        this.machineId = (this.machineId + 1) & MAX_MACHINE_NUM;
        dataCenterId = getDataCenterId();
        this.machineId = getWorkId();
    }

    /**
     * workId使用IP生成
     *
     * @return workId
     */
    private static Long getWorkId() {
        try {
            String hostAddress = Inet4Address.getLocalHost().getHostAddress();
            int[] ints = StringUtils.toCodePoints(hostAddress);
            int sums = 0;
            for (int b : ints) {
                sums = sums + b;
            }
            return (long) (sums % 32);
        } catch (UnknownHostException e) {
            // 失败就随机
            return RandomUtils.nextLong(0, 31);
        }
    }

    /**
     * dataCenterId使用hostName生成
     *
     * @return dataCenterId
     */
    private static Long getDataCenterId() {
        try {
            String hostName = SystemUtils.getHostName();
            int[] ints = StringUtils.toCodePoints(hostName);
            int sums = 0;
            for (int i : ints) {
                sums = sums + i;
            }
            return (long) (sums % 32);
        } catch (Exception e) {
            // 失败就随机
            return RandomUtils.nextLong(0, 31);
        }
    }
}
```