/**
 * Created by jhl on 14-07-25.
 * 弹出框
 */
define(function (require, exports, module) {

    var popId = "";
    var fund_account = "";
    var bank_password = "";
    var ERROR_TIPS_LENGTH = "密码长度不正确！";
    var ERROR_TIPS_UNMATCHED = "密码不正确！";
    var TYPE_CHECK_BALANCE = "checkBalance";
    //var callback = null;
    var serviceFunc = null;
    var service = require("serviceImp").getInstance();
    var fund_account = "";

    //交易密码输入框
    /**
     * @param pageId       页面ID
     * @param windowId     弹出窗口ID
     * @param fd_account   基金账号
     * @param cb_func      回调函数
     */
    var pwdCheck = function(pageId, windowId, fd_account, service_func) {
        fund_account = fd_account;
        serviceFunc = service_func;
        popId = pageId + " #" + windowId;
        //点击确定按钮
        $(popId + " #nextBtn").click(pwdClickTrigger);
    };

    //处理交易密码弹出框确定按钮点击事件
    var pwdClickTrigger = function(e){
        var inputVal = $(popId + " #password").val();
        clearError();
        if (inputVal.length !== 6) {
            drawError(ERROR_TIPS_LENGTH);
        } else {
            //var result = service.checkPassword();
            //$(popId).hide();
            //drawError(ERROR_TIPS_UNMATCHED);
            /*
            var param = {
                accountId: fund_account,
                password: inputVal
            };
            */
            serviceFunc(inputVal);
        }
    };

    //弹出框显示错误提示
    var drawError = function(tips){
        console.log("to draw error");
        $(popId + " #errorTips").text(tips);
        alert(tips);
    };
    //去除错误提示
    var clearError = function() {
        $(popId + " #errorTips").text("");
    }



    //处理银行密码弹出框确定按钮点击事件
    var bankClickTrigger = function(e){
        var inputVal = $(popId + " #password").val();
        clearError();
        if (inputVal.length !== 6) {
            drawError(ERROR_TIPS_LENGTH);
        } else {
            serviceFunc(inputVal);
        }
    };

    //银行密码输入框
    /**
     * @param pageId       页面ID
     * @param windowId     弹出窗口ID
     * @param serviceFunc  业务函数
     */
    var bankPwdCheck = function(pageId, windowId, service_func) {
        serviceFunc = service_func;
        popId = pageId + " #" + windowId;
        //点击确定按钮
        $(popId + " #nextBtn").click(bankClickTrigger);
    };





    var Pop = {
        "pwdCheck": pwdCheck,
        "bankPwdCheck": bankPwdCheck,
        "drawError": drawError
    };

    //暴露对外的接口
    module.exports = Pop;
});