define("project/scripts/yjb/yjb_i_jtt_unbind",function(require,exports,module){
    require("jquery");
    var general=require("project/scripts/common/yjb/General");
    var select=require("project/scripts/common/yjb/Select");
    var service = require("serviceImp").getInstance(); //业务层接口，请求数据
    var appUtils=require("appUtils");
    var layerUtils = require("layerUtils");

    var _pageId="#yjb_yjb_i_jtt_unbind";
    var user=require("project/scripts/common/user");

    var utils=require("project/scripts/common/utils");


    var deal_jsonParam={
        "econtract_id":"",
        "returnContent":true,
        "und_account":"",
        "fund_account":user.fund_account,
        "econtract_id":1103,
        "cert_type":9,
        "cert_sign":null,
        "cert_plain_text":"",
        "cert_attachInfo":null
    };

    /**
     * 初始化
     * */
//    $(".click_back").click(function(){
//        appUtils.pageInit("yjb/yjb_i_jtt_unbind", "cash/cashhasopened", {});
//    });

     function init(){

//        utils.clickBack(_pageId);
        $("#header_message").html("绑定金腾通");
        var jsonParam_ss={
            "econtract_id":deal_jsonParam.econtract_id,
            "returnContent":false
        };
        service.econtractInfo(jsonParam_ss,function(data){

            if(data.error_no==0){
                console.log("协议信息接口调用成功（初始化里直接拿到MD5，不拿内容） "+data);
                var results = JSON.parse(data["results"][0]["result"]);
                //这次不再调用显示其内容了。
                deal_jsonParam.cert_plain_text=results.econtract_md5;
            }else{
                //显示异常提示界面 （MD5调取失败）
            }
        });
    }
    /**
     * 事件绑定
     * */
    function bindPageEvent(){
        // 往上拉 展示更多，默认显示10条，按照时间倒序排列
        general.initialize();
        select.bindProtocolClick();

        //点击 金腾通货币基金相关协议
        $("#dealManagement").click(function(){
            layerUtils.iLoading(true,"请等待...",true);
            var jsonParam={
                "econtract_id":deal_jsonParam.econtract_id,
                "returnContent":true
            };
            var htmlArea="";
            service.econtractInfo(jsonParam,function(data){
                //错误信息
                var error_info=data.error_info;
                if(data.error_no==0){
                    console.log("协议信息接口调用成功 "+data);
                    var results = JSON.parse(data["results"][0]["result"]);
                    htmlArea=results.econtract_content;
                    deal_jsonParam.cert_plain_text=results.econtract_md5;

                }else{
                    layerUtils.iMsg(-1,error_info);
                    return false;
                }
            },true,true,function(){
                layerUtils.iMsg(-1,"获取协议信息失败");
            });
            //弹出隐藏层
            $("#deal_text").html(htmlArea);
            var bgdiv = document.getElementById("fade");
            bgdiv.style.width = document.body.scrollWidth;
            $("#fade").height($(document).height());
            document.getElementById("MyDiv").style.display='block';
            document.getElementById("fade").style.display='block' ;

            //动态调用文本内容（调用电子协议内容查询接口）
            //显示到网页上
        });
        $("#close").click(function(){
            //关闭弹出层
            document.getElementById("MyDiv").style.display='none';
            document.getElementById("fade").style.display='none';
        });

        $("#is_agree").click(function(){
            //修改按钮颜色，并变为可更改状态
            if($(".oran-next-btn").css("background-color")=="rgb(213, 213, 213)"){
                $(".oran-next-btn").css("background-color","#ffb415");
            }else{
                $(".oran-next-btn").css("background-color","#d5d5d5");
            }
        });

        $("#jinteng_account").click(function() {
            //点击 马上开通金腾通
            if ($(".oran-next-btn").css("background-color") != "rgb(213, 213, 213)") {

//                fund_account	String	资金账户	Y	　
//                econtract_id	String	电子合同编号	Y

                var jsonParam_s = {
                    "fund_account": deal_jsonParam.fund_account,
                    "econtract_id": deal_jsonParam.econtract_id
                };
                service.econtractSign(jsonParam_s, function (data) {
                    var error_info=data.error_info;
                    if (data.error_no == 0) {
                        console.log("签名接口调用成功 " + data);
                        //alert("签名接口调用成功");
                        //调用FND_0001 现金产品登记 开始
                        /** 现金产品登记 ()
                         * @param fund_account                资金账户
                         * @param fund_company_code       基金公司代码
                         * @param fund_code                基金代码
                         * @param password                    用户密码
                         **/
                        var jsonParam_r = {
                            fund_account: user.fund_account,  //目前写死，应在登录成功后返回
                            fund_company_code: user.fund_company_code,
                            fund_code: user.fund_code,
                            password: user.password
                            //fund_account: "39911111" //测试错误基金账号
                        };


                        service.accountApply(jsonParam_r, function (data) {
                            var error_info2=data.error_info;
                            if (data.error_no == 0) {
                                //如果正确则进入签订接口
                                console.log("现金产品登记接口调用成功 " + data);

                                appUtils.pageInit("yjb/yjb_i_jtt_unbind", "yjb/yjb_i_jtt_unbind_success", {});
                            } else {

                                appUtils.pageInit("yjb/yjb_i_jtt_unbind", "yjb/yjb_i_jtt_unbind_fail", {});
//                                layerUtils.iMsg(-1,error_info2);
//                                return false;

                            }
                        },true,true,function(){
                            layerUtils.iMsg(-1,"现金产品登记失败");
                        });
                    } else {
                        layerUtils.iMsg(-1,error_info);
                        return false;
                    }
                },true,true,function(){
                    layerUtils.iMsg(-1,"获取签名信息失败");
                });
            }
        });
    }
    /**
     * 销毁
     * */
    function destroy(){

    }

    var yjb_i_jtt_unbind = {
        "init" : init,
        "bindPageEvent" : bindPageEvent,
        "destroy" : destroy
    };

    module.exports = yjb_i_jtt_unbind;

});