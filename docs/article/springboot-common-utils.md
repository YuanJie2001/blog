# SpringBoot过滤器获取Bean-请求重复可读-获取请求体数据-用户IP归属地获取

[[toc]]

---

## 一.获取Bean
网上一些论调说Filter无法注入Bean的原因是加载顺序: listener—>filter—>servlet导致的.我不赞同.
原因:`默认机制下，在SpringBoot应用启动时，IOC容器就开始实例化对象并把对象注入到代码片段里.`和加载顺序无关. 无法通过自动注入获取的原因是因为自动注入的前提是两个都加入容器中的对象,才能引用.那由于某些原因不能直接把当前类注入容器中.我们可以通过一个application上下文引用工具类,维护Bean内容.这也能有力证明,和加载顺序无关,否则凭啥我application能注入,自动注入不行?

`需要注意.我的这个SpringContextUtils没被Spring代理,因此不要在其他容器中成员变量赋值.因为他需要先等待spring初始化完所有Bean,才能获取上下文.那容器中成员调用SpringContextUtils肯定是空的!`

`你可以在局部变量中调用或将下面方法改写成受spring代理的Bean`

SpringContextUtils

```java
public class SpringContextUtil {

    private static ApplicationContext applicationContext;

    //获取上下文
    public static ApplicationContext getApplicationContext() {
        return applicationContext;
    }

    //设置上下文
    public static void setApplicationContext(ApplicationContext applicationContext) {
        SpringContextUtil.applicationContext = applicationContext;
    }

    //通过名字获取上下文中的bean
    public static Object getBean(String name) {
        return applicationContext.getBean(name);
    }

    //通过类型获取上下文中的bean
    public static Object getBean(Class<?> requiredType) {
        return applicationContext.getBean(requiredType);
    }

}
```
`接着在启动类设置Bean`

```java
@SpringBootApplication(scanBasePackages = {"com.vector"}) // SpringBoot应用的标识
@MapperScan("com.vector.**.mapper") // 扫描mapper接口
public class VectorMemberApplication {
        public static void main(String[] args) {
            ConfigurableApplicationContext context = SpringApplication.run(VectorMemberApplication.class, args);
            SpringContextUtil.setApplicationContext(context);
        }
}
```

`使用方式`

```java
SpringContextUtil.getBean(AuthStrategyContent.class);
SpringContextUtil.getBean(类名/类型名);
```

---
## 二. Request重复可读
一个InputStream对象在被读取完成后，将无法被再次读取，始终返回-1；
InputStream并没有实现reset方法（可以重置首次读取的位置），无法实现重置操作；

Servlet中提供了一个HttpServletRequestWrapper请求包装类.这个自定义的requestWrapper继承了HttpServletRequestWrapper ，HttpServletRequestWrapper 是一个ServletRequest的包装类同时也是ServletRequest的实现类。在这个自定义的requestWrapper里，用一个String做缓存，在构造方法里先把request的body中的数据缓存起来，然后重写了getInputStream，返回这个缓存的body，而不是从流中读取。这样，在需要多次读取body的地方，只需要在过滤器中把原来的request换成这个自定义的request，然后把这个自定义的带缓存功能的request传到后续的过滤器链中。

重复可读工具类

```java
/**
 * 构建可重复读取inputStream的request
 *
 * @author vector
 */
public class RepeatedlyRequestWrapper extends HttpServletRequestWrapper {
    private final byte[] body;

    public RepeatedlyRequestWrapper(HttpServletRequest request, ServletResponse response) throws IOException {
        super(request);
        request.setCharacterEncoding(SystemConstants.UTF8);
        response.setCharacterEncoding(SystemConstants.UTF8);

        body = HttpHelper.getBodyString(request).getBytes(SystemConstants.UTF8);
    }

    @Override
    public BufferedReader getReader() throws IOException {
        return new BufferedReader(new InputStreamReader(getInputStream()));
    }

    @Override
    public ServletInputStream getInputStream() throws IOException {
        final ByteArrayInputStream bais = new ByteArrayInputStream(body);
        return new ServletInputStream() {
            @Override
            public int read() throws IOException {
                return bais.read();
            }

            @Override
            public int available() throws IOException {
                return body.length;
            }

            @Override
            public boolean isFinished() {
                return false;
            }

            @Override
            public boolean isReady() {
                return false;
            }

            @Override
            public void setReadListener(ReadListener readListener) {

            }
        };
    }
}
```

`使用方式`

```java
 protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // 重复可读request
        RepeatedlyRequestWrapper repeatedlyRequestWrapper =
                new RepeatedlyRequestWrapper(request,response);
        //获取token
        String token = repeatedlyRequestWrapper.getHeader(JwtUtil.JWT_HEADER);
        if (StringUtils.isBlank(token)) {
            //放行
            filterChain.doFilter(repeatedlyRequestWrapper, response);
            return;
        }
        //解析token
        //放行
        filterChain.doFilter(repeatedlyRequestWrapper, response);
    }
```

---
## 三. 过滤器获取Body请求体数据
在业务层中我们常用@RequestBody 他帮我们读取了.但是在过滤器中是原生的request请求.我们知道可以通过getParamter()获取参数.但是请求体是二进制流,我们无法直接使用.需要流转对象序列化.
如下.

```java
    /**
     * 获取request中的json用户信息
     *
     * @param request
     * @return
     * @throws IOException
     */
    private UserLogin getUserByRequest(HttpServletRequest request) throws IOException {
        StringBuffer sb = new StringBuffer();
        InputStream is = request.getInputStream();
        InputStreamReader isr = new InputStreamReader(is);
        BufferedReader br = new BufferedReader(isr);
        String s = "";
        while ((s = br.readLine()) != null) {
            sb.append(s);
        }
        String userInfo = sb.toString();
        JsonMapper jsonMapper = new JsonMapper();
        UserLogin userLogin = null;
        try {
            userLogin = jsonMapper.readValue(userInfo, UserLogin.class);
        } catch (JsonProcessingException e) {
            throw new AuthenticationServiceException(HttpCodeEnum.BAD_REQUEST.getMsg() + "json转换异常");
        }
        return userLogin;
    }
```

## 四.用户ip获取

```java
public class IpUtil {
    /**
     * 获取登录用户的IP地址
     * 路由追踪,避免代理影响准确性
     * @param request
     * @return
     */
    public static String getIpAddr(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        if ("0:0:0:0:0:0:0:1".equals(ip)) {
            ip = "127.0.0.1";
        }
        if (ip.split(",").length > 1) {
            ip = ip.split(",")[0];
        }
        return ip;
    }

    /**
     * 通过IP获取地址(需要联网)
     *
     * @param ip
     * @return
     */
    public static String getIpInfo(String ip) {
        if ("127.0.0.1".equals(ip)) {
            ip = "127.0.0.1";
        }
        String info = "";
        try {
            URL url = new URL("备案查询网太平洋/淘宝/其他" + ip);
            HttpURLConnection htpcon = (HttpURLConnection) url.openConnection();
            htpcon.setRequestMethod("GET");
            htpcon.setDoOutput(true);
            htpcon.setDoInput(true);
            htpcon.setUseCaches(false);

            InputStream in = htpcon.getInputStream();
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(in));
            StringBuffer temp = new StringBuffer();
            String line = bufferedReader.readLine();
            while (line != null) {
                temp.append(line).append("\r\n");
                line = bufferedReader.readLine();
            }
            bufferedReader.close();
            JSONObject obj = null;
            try {
                obj = (JSONObject) JSON.parse(temp.toString());
            } catch (JSONException e) {
                throw new JSONException("JSON解析错误：" + temp.toString(), e);
            }
            // @TODO 按照ip给的地址格式进行解析
            if (obj.getIntValue("code") == 200) {
                JSONObject data = obj.getJSONObject("ipdata");
                info += data.getString("info1") + " ";
                info += data.getString("info2") + " ";
                info += data.getString("info3") + " ";
                info += data.getString("isp");
            }
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (ProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return info;
    }
}

```
