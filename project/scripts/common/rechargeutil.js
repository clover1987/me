/**
 * 公共方法
 */
define(function(require,exports,module){
    var appUtils = require("appUtils"),
        layerUtils = require("layerUtils"),
        service = require("serviceImp").getInstance(),
        gconfig = require("gconfig"),
        user_ = require("project/scripts/common/user"),
        global = gconfig.global;
    var common = require("project/scripts/common/common");
    var recharge_failtimes = appUtils.getLStorageInfo("recharge_failtimes") == null ? 0 : appUtils.getLStorageInfo("recharge_failtimes");

    var flag = true;
    var branch_no = "33";
    var recharge_totalTime = (appUtils.getLStorageInfo("recharge_totalTime") == null || appUtils.getLStorageInfo("recharge_totalTime") == 0) ? 600000 : appUtils.getLStorageInfo("recharge_totalTime"); // 毫秒
    //alert("recharge_totalTime:"+recharge_totalTime);
    function currentPagePwdChecked(_pageId,submitbtn_id,windowId,recharge_input){

        appUtils.bindEvent(_pageId+" #expiredWindow #password",function(){
            $(_pageId+" #"+ windowId + " #errorTips").html("");
            $(_pageId+" #"+ windowId + " #password").val("");
        },"focus");

        $(_pageId +" #" + windowId).show();
        if(windowId == "expiredPwdWindow") //交易密码  query_mode = 1
        {
            $(_pageId +" #" + windowId + " #errorTips").html("");
            $(_pageId +" #" + windowId + " #password").val("");
            setTimeout( function() {
                $(_pageId +" #" + windowId + " #password").focus();
            },500);

            appUtils.bindEvent(_pageId +" #" + windowId+ " #nextBtn",function(){
                if(appUtils.getLStorageInfo("recharge_totalTime") == null || appUtils.getLStorageInfo("recharge_totalTime") == "" || appUtils.getLStorageInfo("recharge_totalTime") == 0 || appUtils.getLStorageInfo("recharge_totalTime") == "0")
                {
                    recharge_totalTime = 600000;
                }
                //判断密码错误3次拦截
                if(recharge_failtimes >=3)
                {
                    $("#expiredWindow #nextBtn").attr("style","background-color:#D5D5D5;");
                    failtodo(windowId);
                }
                var fund_account = user_.fund_account;
                var fund_pwd = $(_pageId + " #" + windowId + " #password").val();
                var money_type = "0";
                // 密码校验 长度和错误次数
                if(fund_pwd == null || fund_pwd == "")
                {
                    $(_pageId +" #" + windowId + " #errorTips").html("密码不能为空");
                    return false;
                }
                if(fund_account != null && fund_pwd != null && fund_pwd != "")
                {
                    var jsonParam={"branch_no":branch_no,"fund_account":fund_account,"password":user_.password,"bank_password":"" ,"money_type":money_type};
                    var balanceQueryComplate=function(resultVo){
                        if(resultVo.error_no == 0)
                        {
                            $(_pageId + " #" + windowId).hide();
                            var resultDataJson = resultVo["results"][0];
                            if(resultDataJson != null)
                            {
                                var resultProcess = JSON.parse(resultDataJson["result"]);
                                balance = resultProcess["balance"];
                                $(_pageId + " #queryBalanceDiv #inputbalance").val(balance);
                                $(_pageId + " #queryBalanceDiv #showbalance").show();
                                $(_pageId + " #queryBalanceDiv #showbalance").html("<strong>" + common.fmoney(balance,2) + "</strong>元");

                            }
                        }
                        else if(resultVo.error_no == 2040022)
                        {
                            if(recharge_failtimes >=3)
                            {
                                $("#expiredWindow #nextBtn").attr("style","background-color:#D5D5D5;");
                                failtodo(windowId);
                            }
                            recharge_failtimes++;
                            appUtils.setLStorageInfo("recharge_failtimes",recharge_failtimes);
                            $(_pageId +" #" + windowId + " #errorTips").html("交易密码错误");
                            return false;
                        }
                        else
                        {
                            $(_pageId +" #" + windowId + " #errorTips").html(resultVo.error_info);
                            return false;
                        }
                    };
                    service.balanceQuery(jsonParam,balanceQueryComplate);
                }
            });

            appUtils.bindEvent(_pageId + " #" + windowId + " #password",function(){
                $(_pageId + " #" + windowId + " #errorTips").html("");
                $(_pageId + " #" + windowId + " #password").val("");
            },"focus");

        }
        else if(windowId =="expiredBankWindow") //银行密码  query_mode = 2
        {
            $(_pageId + " #" + windowId +" #errorTips").html("");
            $(_pageId + " #" + windowId +" #bank_password").val("");
            setTimeout( function() {
                $(_pageId + " #" + windowId + " #bank_password").focus();
            },500);
            appUtils.bindEvent(_pageId + " #" + windowId + " #nextBtn",function(){
                if(recharge_failtimes >=3)
                {
                    $("#expiredWindow #nextBtn").attr("style","background-color:#D5D5D5;");
                    failtodo(windowId);
                }

                //	$(_pageId + " #expiredWindow #failtext").html("");
                var fund_account = user_.fund_account;
                var bank_password = $(_pageId + " #" + windowId + " #bank_password").val();
                var branch_no = "33";
                var money_type = "0";
                var password = user_.password;
                if(bank_password == null || bank_password == "")
                {
                    $(_pageId +" #" + windowId + " #errorTips").html("密码不能为空");
                    return false;
                }
                if(fund_account != null && bank_password != null && bank_password != "")
                {
                    var jsonParam={"branch_no":branch_no,"fund_account":fund_account,"password":password,"bank_password":bank_password,"money_type":money_type};
                    var balanceQueryComplate=function(resultVo){
                        $(_pageId + " #" + windowId +" #bank_password").val("");
                        if(resultVo.error_no == 0)
                        {
                            $(_pageId + " #" + windowId).hide();
                            var resultDataJson = resultVo["results"][0];
                            if(resultDataJson != null)
                            {
                                var resultProcess = JSON.parse(resultDataJson["result"]);
                                var balance = resultProcess["balance"];
                                $(_pageId + " #queryBalanceDiv #inputbalance").val(balance);
                                $(_pageId + " #queryBalanceDiv #showbalance").show();
                                $(_pageId + " #queryBalanceDiv #showbalance").html("<strong>" + common.fmoney(balance,2) + "</strong>元");
                            }
                        }
                        else if(resultVo.error_no == 2040007)
                        {
                            if(recharge_failtimes >=3)
                            {
                                $("#expiredWindow #nextBtn").attr("style","background-color:#D5D5D5;");
                                failtodo(windowId);
                            }
                            recharge_failtimes++;
                            appUtils.setLStorageInfo("recharge_failtimes",recharge_failtimes);
                            $(_pageId +" #" + windowId + " #errorTips").html("银行密码输入错误");

                            return false;
                        }
                        else
                        {
                            $(_pageId +" #" + windowId + " #errorTips").html(resultVo.error_info);
                            return false;
                        }
                    };
                    service.balanceQuery(jsonParam,balanceQueryComplate);
                }
            });

            appUtils.bindEvent(_pageId + " #" + windowId + " #bank_password",function(){
                $(_pageId + " #" + windowId + " #errorTips").html("");
                $(_pageId + " #" + windowId + " #bank_password").val("");
            },"focus");
        }
    };

    function rechargePagePwdChecked(_pageId,submitbtn_id,windowId,recharge_input){      //充值提交
        if(windowId == "expiredPwdWindow") //交易密码
        {
            $(_pageId +" #" + windowId).show();
            $(_pageId +" #" + windowId + " #errorTips").html("");
            $(_pageId +" #" + windowId + " #password").val("");
            setTimeout( function() {
                $(_pageId +" #" + windowId + " #password").focus();
            },500);
            appUtils.bindEvent(_pageId +" #" + windowId+ " #nextBtn",function(){
                if(appUtils.getLStorageInfo("recharge_totalTime") == null || appUtils.getLStorageInfo("recharge_totalTime") == "" || appUtils.getLStorageInfo("recharge_totalTime") == 0 || appUtils.getLStorageInfo("recharge_totalTime") == "0")
                {
                    recharge_totalTime = 600000;
                }
                if(recharge_failtimes >=3)
                {
                    $("#expiredWindow #nextBtn").attr("style","background-color:#D5D5D5;");
                    failtodo(windowId);
                }
                //	$(_pageId + " #expiredWindow #failtext").html("");
                var fund_account = user_.fund_account;
                /*
                if (fund_account == null) {
                    fund_account = "39946448"; //测试，写死
                }
                */
                var fund_pwd = $(_pageId + " #" + windowId + " #password").val();
                if(fund_pwd == null || fund_pwd == "")
                {
                    $(_pageId +" #" + windowId + " #errorTips").html("密码不能为空");
                    return false;
                }

                var branch_no = "33";
                var money_type = "0";
                var occur_balance =recharge_input;
                if(fund_account != null && fund_pwd != null && fund_pwd != "")
                {
                    var jsonParam={"branch_no":branch_no,"fund_account":fund_account,"password":fund_pwd,"bank_password":"","money_type":money_type,"occur_balance":occur_balance};
                    var transferMoneyComplate=function(resultVo){
                        $(_pageId + " #" + windowId +" #password").val("");
                        if(resultVo.error_no == 0)
                        {
                            $(_pageId + " #" + windowId).hide();
                            var resultDataJson = resultVo["results"][0];
                            if(resultDataJson != null)
                            {
                                var resultProcess = JSON.parse(resultDataJson["result"]);
                                var serialNO = resultProcess["serialNO"];
                                if(serialNO != null && serialNO != "")
                                {
                                    var param = appUtils.setSStorageInfo("serialNO",serialNO);
                                    appUtils.pageInit("cash/recharge","cash/rechargeresult",param);
                                }
                                else
                                {
                                    $(_pageId +" #" + windowId + " #errorTips").html("系统繁忙，请稍后再试");
                                }

                            }
                        }
                        else if(resultVo.error_no == 2040022)
                        {
                            if(recharge_failtimes >=3)
                            {
                                $("#expiredWindow #nextBtn").attr("style","background-color:#D5D5D5;");
                                failtodo(windowId);
                            }
                            recharge_failtimes++;
                            appUtils.setLStorageInfo("recharge_failtimes",recharge_failtimes);
                               $(_pageId +" #" + windowId + " #errorTips").html("交易密码错误");
                        }
                        //存管卡未激活
                        else if(resultVo.error_no == 2040028)
                        {

                        }
                        //不在交易时间
                        else if(resultVo.error_no == 2010002)
                        {
                            $(_pageId +" #" + windowId + " #errorTips").html("存管卡未激活");
                            return false;
                        }
                        else
                        {
                            $(_pageId +" #" + windowId + " #errorTips").html(resultVo.error_info);
                            return false;
                        }
                    };
                    service.transferMoney(jsonParam,transferMoneyComplate);
                }
            });

            appUtils.bindEvent(_pageId + " #" + windowId + " #password",function(){
                $(_pageId + " #" + windowId + " #errorTips").html("");
                $(_pageId + " #" + windowId + " #password").val("");
            },"focus");

        }
        else if(windowId =="expiredBankWindow") //银行密码
        {
            $(_pageId +" #" + windowId).show();
            $(_pageId + " #" + windowId +" #errorTips").html("");
            $(_pageId + " #" + windowId +" #bank_password").val("");
            setTimeout( function() {
                $(_pageId + " #" + windowId + " #bank_password").focus();
            },500);
            appUtils.bindEvent(_pageId + " #" + windowId+ " #nextBtn",function(){

                if(recharge_failtimes >=3)
                {
                    $("#expiredWindow #nextBtn").attr("style","background-color:#D5D5D5;");
                    failtodo(windowId);
                }

                //	$(_pageId + " #expiredWindow #failtext").html("");
                var fund_account = user_.fund_account;
                var bank_password = $(_pageId + " #" + windowId + " #bank_password").val();
                var branch_no = "33";
                var money_type = "0";
                var password = user_.password;
                var occur_balance =recharge_input;
                if(bank_password == null || bank_password == "")
                {
                    $(_pageId +" #" + windowId + " #errorTips").html("密码不能为空");
                    return false;
                }
                if(fund_account != null && bank_password != null && bank_password != "")
                {
                    var jsonParam={"branch_no":branch_no,"fund_account":fund_account,"password":password,"bank_password":bank_password,"money_type":money_type,"occur_balance":occur_balance};
                    var transferMoneyComplate=function(resultVo){
                        $(_pageId + " #" + windowId +" #bank_password").val("");
                        if(resultVo.error_no == 0)
                        {
                            $(_pageId + " #" + windowId).hide();
                            var resultDataJson = resultVo["results"][0];

                            if(resultDataJson != null)
                            {
                                var resultProcess = JSON.parse(resultDataJson["result"]);
                                var serialNO = resultProcess["serialNO"];
                                var param = appUtils.setSStorageInfo("serialNO",serialNO);
                                appUtils.pageInit("cash/recharge","cash/rechargeresult",param);
                            }
                            else
                            {
                                $(_pageId +" #" + windowId + " #errorTips").html("系统繁忙，请稍后再试");
                            }
                        }
                        else if(resultVo.error_no == 2040007)
                        {
                            if(recharge_failtimes >=3)
                            {
                                $("#expiredWindow #nextBtn").attr("style","background-color:#D5D5D5;");
                                failtodo(windowId);
                            }
                            recharge_failtimes++;
                            appUtils.setLStorageInfo("recharge_failtimes",recharge_failtimes);
                            $(_pageId +" #" + windowId + " #errorTips").html("银行密码错误");
                            return false;
                        }
                        //存管卡未激活
                        else if(resultVo.error_no == 2040028)
                        {

                        }
                        else
                        {
                            $(_pageId +" #" + windowId + " #errorTips").html(resultVo.error_info);
                            return false;
                        }
                    };
                    service.transferMoney(jsonParam,transferMoneyComplate);
                }
            });

            appUtils.bindEvent(_pageId + " #" + windowId + " #bank_password",function(){
                $(_pageId + " #" + windowId + " #errorTips").html("");
                $(_pageId + " #" + windowId + " #bank_password").val("");
            },"focus");

//			if((_pageId + " #" + windowId).ha)
//			{
//				appUtils.bindEvent(" #" + windowId+ " #nextBtn",function(){
//					$(" #" + windowId).hide();
//				});
//			}
        }
    };

    /**
     * 密码提交3次失败处理
     */
    function failtodo(windowId){
        if(flag)
        {
            flag = false;
            //处理获取验证码时发生的动作
            var handleCount = function(){
                var countMinute = Math.ceil(recharge_totalTime / 60000);
                $("#" + windowId + " #failtext").show();
                $("#" + windowId + " #textbtn").hide();
                $("#failtext p").html("亲，为确保您的账户安全，请休息" + countMinute + "分钟后重试");
                $("#" + windowId + " #nextBtn").attr("style","background-color:#D5D5D5;");
                $(" #" + windowId + " #errorTips").hide();
                countMinute--;
                /*
                 appUtils.bindEvent(" #" + windowId+ " #nextBtn",function(){
                 $(" #" + windowId).hide();
                 });
                 */

            };
            handleCount();
            startCountDown = window.setInterval(function(){
                recharge_totalTime -= 60000;
                handleCount();
                if(recharge_totalTime <= 0)
                {
                    recharge_totalTime = 0;
                }
                appUtils.setLStorageInfo("recharge_totalTime",recharge_totalTime);
            }, 60000);
            // 120 秒之后清除计时器
            var clearCountDown = setTimeout(function(){
                $("#" + windowId + " #textbtn").show();
                $("#" + windowId + " #password").val('');
                $("#" + windowId + " #nextBtn").attr("style","background-color:#2C8EE3;");
                $("#" + windowId + " #failtext").hide();
                $(" #" + windowId + " #errorTips").html('');
                $(" #" + windowId + " #errorTips").show();
                recharge_failtimes = 0;
                appUtils.setLStorageInfo("recharge_failtimes",recharge_failtimes);
                recharge_totalTime = 0;
                appUtils.setLStorageInfo("recharge_totalTime",recharge_totalTime);
                flag = true;
                window.clearInterval(startCountDown);
            },recharge_totalTime);
        }
    }


    var rechargeutil = {
        "currentPagePwdChecked":currentPagePwdChecked,
        "rechargePagePwdChecked":rechargePagePwdChecked,
        "failtodo":failtodo
    };

    module.exports = rechargeutil;
});