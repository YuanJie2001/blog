(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{372:function(t,a,s){t.exports=s.p+"assets/img/0957d141c3864b8e8b8e862ac739968c.bb6914e3.png"},373:function(t,a,s){t.exports=s.p+"assets/img/ca27738cca9d4397a4fa5856fe036293.a001e0dc.png"},374:function(t,a,s){t.exports=s.p+"assets/img/fdc0d1806b434b108d30f03d676fd929.2c70d3e5.png"},375:function(t,a,s){t.exports=s.p+"assets/img/f439bb5a64504ddb88e3c10786005633.9bed13cf.png"},376:function(t,a,s){t.exports=s.p+"assets/img/7834ad375856411bb744133a6d0c1a7b.3d420ace.png"},377:function(t,a,s){t.exports=s.p+"assets/img/05b5376ae70248e1943b27164c3bbdc3.b6a7055e.png"},378:function(t,a,s){t.exports=s.p+"assets/img/9c86d6f847474c09a64def15000d9cf2.fb6a8f1d.png"},379:function(t,a,s){t.exports=s.p+"assets/img/484d32851f834f02855c22b34ada8ea8.0c54b08a.png"},380:function(t,a,s){t.exports=s.p+"assets/img/acbb8ca522f741b28954973f625e7e10.3120f4b4.png"},381:function(t,a,s){t.exports=s.p+"assets/img/71b39f135692406b856cdba972a45b52.18997cee.png"},608:function(t,a,s){"use strict";s.r(a);var c=s(18),e=Object(c.a)({},(function(){var t=this,a=t.$createElement,c=t._self._c||a;return c("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[c("h1",{attrs:{id:"分布式事务"}},[c("a",{staticClass:"header-anchor",attrs:{href:"#分布式事务"}},[t._v("#")]),t._v(" 分布式事务")]),t._v(" "),c("p"),c("div",{staticClass:"table-of-contents"},[c("ul",[c("li",[c("a",{attrs:{href:"#一-两阶段提交协议-2pc"}},[t._v("一.两阶段提交协议(2PC)")])]),c("li",[c("a",{attrs:{href:"#二-三阶段提交协议-3pc"}},[t._v("二.三阶段提交协议(3PC)")])]),c("li",[c("a",{attrs:{href:"#三-tcc事务"}},[t._v("三.TCC事务")]),c("ul",[c("li",[c("a",{attrs:{href:"#_3-2-tcc注意事项"}},[t._v("3.2 TCC注意事项")])])])]),c("li",[c("a",{attrs:{href:"#四-消息可靠性保证"}},[t._v("四.消息可靠性保证")])])])]),c("p"),t._v(" "),c("hr"),t._v(" "),c("p",[t._v("分布式事务: 与常规单机事务不同.\n"),c("strong",[t._v("事务:")]),t._v(" 是一组操作，这些操作要么全部被执行，要么全部被回滚，以确保数据的一致性和完整性。\n"),c("strong",[t._v("分布式事务:")]),t._v(" 是多个数据库或应用程序之间的网络通信事务，它们协调彼此的提交和回滚，以确保整个事务的完成性。这意味着，分布式事务是由多个本地事务结合的。事务只在单个节点中操作数据，并执行提交或回滚操作。而分布式事务涉及多个节点的事务协调，因此增加了复杂性和开销。")]),t._v(" "),c("p",[t._v("简单讲,事务指的一般是ACID特性.而分布式事务指的是CAP理论.再细化为BASE理论."),c("code",[t._v("本期着重讨论分布式事务")]),t._v(" "),c("img",{attrs:{src:s(372),alt:"在这里插入图片描述"}})]),t._v(" "),c("p",[c("code",[t._v("常见的解决方案")]),t._v(" "),c("code",[t._v("本期讨论2PC,3PC,TCC,消息可靠性保证方案")]),c("img",{attrs:{src:s(373),alt:"在这里插入图片描述"}})]),t._v(" "),c("h2",{attrs:{id:"一-两阶段提交协议-2pc"}},[c("a",{staticClass:"header-anchor",attrs:{href:"#一-两阶段提交协议-2pc"}},[t._v("#")]),t._v(" 一.两阶段提交协议(2PC)")]),t._v(" "),c("p",[c("strong",[t._v("第一阶段: 准备阶段(参与者vote)")]),t._v("\n1）协调者节点向所有参与者节点询问是否可以执行提交操作(vote)，并开始等待各参与者节点的响应。\n2)参与者节点执行询问发起为止的所有事务操作，并将Undo信息和Redo信息写入日志。("),c("code",[t._v("执行但不提交事务")]),t._v(')\n3)各参与者节点响应协调者节点发起的询问。如果参与者节点的事务操作实际执行成功，则它返回一个同意"消息;如果参与者节点的事务操作实际执行失败，则它返回一个"中止"消息。\n'),c("strong",[t._v("第二阶段: 提交/回滚阶段(执行阶段)")]),t._v("\n如果协调者收到了参与者的失败消息或者超时直接给每个参与者发送回滚(Rollback)消息;\n参与者根据协调者的指令执行提交或者回滚操作，释放所有事务处理过程中便用的锁资源。(注意:必须在最后阶段释放锁资源)\n"),c("img",{attrs:{src:s(374),alt:"在这里插入图片描述"}}),t._v(" "),c("img",{attrs:{src:s(375),alt:"在这里插入图片描述"}}),t._v(" "),c("code",[t._v("2PC存在的问题:")]),t._v(" "),c("strong",[t._v("1.同步阻塞问题:")]),t._v(" 执行过程中，所有参与节点都是事务阻塞型的。当参与者占有公共资源时，其他第三方节点访问公共资源不得不处于阻塞状态。\n"),c("strong",[t._v("2.单点故障:")]),t._v(" 由于协调者的重要性，一旦协调者发生故障。参与者会一直阻塞下去。尤其在第二阶段，协调者发生故障，那么所有的参与者还都处于锁定事务资源的状态中，而无法继续完成事务操作。(如果是协调者挂掉，可以重新选举一个协调者，但是无法解决因为协调者宕机导致的参与者处于阻塞状态的问题)\n"),c("strong",[t._v("3.数据不一致:")]),t._v(" 在二阶段提交的阶段二中，当协调者向参与者发送commit请求之后，发生了局部网络异常或者在发送commit请求过程中协调者发生了故障，这会导致只有一部分参与者接受到了commit请求。而在这部分参与者接到commit请求之后就会执行commit操作。但是其他部分未接到commit请求的机器则无法执行事务提交。于是整个分布式系统便出现了数据不一致性的现象。\n"),c("strong",[t._v("4.二阶段无法解决的问题:")]),t._v(" 协调者再发出commit消息之后宕机，而唯一接收到这条消息的参与者同时也宕机了。那么即使协调者通过选举协议产生了新的协调者，这条事务的状态也是不确定的，没人知道事务是否被已经提交。")]),t._v(" "),c("hr"),t._v(" "),c("h2",{attrs:{id:"二-三阶段提交协议-3pc"}},[c("a",{staticClass:"header-anchor",attrs:{href:"#二-三阶段提交协议-3pc"}},[t._v("#")]),t._v(" 二.三阶段提交协议(3PC)")]),t._v(" "),c("p",[t._v("3PC（Three-Phase Commit）是一种改进的分布式事务协议，与2PC相比，它引入了第三个阶段，以解决2PC可能发生长时间阻塞或挂起的问题。在3PC中，事务分为三个阶段：CanCommit、PreCommit和DoCommit。")]),t._v(" "),c("ul",[c("li",[c("ol",[c("li",[t._v("3PC比2PC多了一个can commit阶段，减少了不必要的资源浪费。因为2pc在第一阶段会占用资源，而3PC在这个阶段不占用资源，只是校验一下sql如果不能执行，就直接返回，减少了资源占用。")])])]),t._v(" "),c("li",[c("p",[t._v("2.引入超时机制。同时在协调者和参与者中都引入超时机制。")]),t._v(" "),c("ul",[c("li",[t._v("2PC:只有协调者有超时机制,超时后，发送回滚指令。")]),t._v(" "),c("li",[t._v("3PC:协调者和参与者都有超时机制。\n协调者超时:发送中断指令。\n参与者超时:pre commit阶段进行中断,do commit阶段进行提交")])])])]),t._v(" "),c("p",[t._v("具体如下图:\n"),c("code",[t._v("3PC事务执行的正常流程")]),t._v(" "),c("img",{attrs:{src:s(376),alt:"在这里插入图片描述"}}),t._v(" "),c("code",[t._v("3PC事务canCommit阶段异常流程")]),t._v(" "),c("img",{attrs:{src:s(377),alt:"在这里插入图片描述"}}),t._v(" "),c("code",[t._v("3PC事务doCommit阶段异常流程")]),t._v(" "),c("img",{attrs:{src:s(378),alt:"在这里插入图片描述"}})]),t._v(" "),c("hr"),t._v(" "),c("h2",{attrs:{id:"三-tcc事务"}},[c("a",{staticClass:"header-anchor",attrs:{href:"#三-tcc事务"}},[t._v("#")]),t._v(" 三.TCC事务")]),t._v(" "),c("p",[t._v("TCC分布式事务是一种基于两阶段提交协议(Two-Phase Commit)的分布式事务解决方案。TCC是由Try-Confirm-Cancel三个阶段("),c("code",[t._v("Confirm与Cancel阶段互斥")]),t._v(")组成，具体如下：")]),t._v(" "),c("ul",[c("li",[c("p",[t._v("Try: 试图执行，预留必要资源。如果资源不足，则回滚并中止事务。")])]),t._v(" "),c("li",[c("p",[t._v("Confirm: 对所有参与者进行确认，提交所预留的资源。如果任何一个参与者确认失败，则回滚并中止事务。")])]),t._v(" "),c("li",[c("p",[t._v("Cancel: 撤销所有参与者的执行，释放之前预留的资源。即使在Confirm阶段某个参与者出现了网络故障，也会执行Cancel阶段以保证数据一致性。")])])]),t._v(" "),c("p",[t._v("TCC分布式事务要求所有参与者都要实现Try、Confirm和Cancel三个操作，同时也需要引入补偿机制以处理到达不确定状态的异常。与传统的两阶段提交协议相比，TCC分布式事务具有更好的可扩展性和容错性，但是需要额外的逻辑和代码实现。")]),t._v(" "),c("h3",{attrs:{id:"_3-2-tcc注意事项"}},[c("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-tcc注意事项"}},[t._v("#")]),t._v(" 3.2 TCC注意事项")]),t._v(" "),c("p",[c("img",{attrs:{src:s(379),alt:"在这里插入图片描述"}})]),t._v(" "),c("h2",{attrs:{id:"四-消息可靠性保证"}},[c("a",{staticClass:"header-anchor",attrs:{href:"#四-消息可靠性保证"}},[t._v("#")]),t._v(" 四.消息可靠性保证")]),t._v(" "),c("p",[t._v("基于消息的最终一致性（Message-based eventual consistency）\n"),c("img",{attrs:{src:s(380),alt:"在这里插入图片描述"}}),t._v(" "),c("img",{attrs:{src:s(381),alt:"在这里插入图片描述"}})])])}),[],!1,null,null,null);a.default=e.exports}}]);