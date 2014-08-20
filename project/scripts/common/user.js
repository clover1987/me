/**
 * Created by user on 2014/8/6.
 */
define(function(require, exports, module){

    var appUtils = require("appUtils");
    var global = require("gconfig").global;

    var user = {
//
//        "fund_account":"39946448",
//        "password":"222222",

           //39000052 未开通有基金账户    //39009202 未开通
//        "fund_account":"39000112",
//        "password":"111111",

//        "fund_account":"39009202",
//        "password":"111111",

//        "fund_account":"40049673",
//        "password":"111111",

//        "MobileCode":"",
//        "Token":appUtils.getLStorageInfo("token"),
//        "Reqno":"",

//        "fund_account":'($fund_account)',
        "fund_account":'($fund_account)',
        "password": '($password)',

//        "account":'($account)',
//        "Account":'($Account)',
//        "Password":'($Password)',
//        "FundAccount":'($FundAccount)',
//        "Fund_Account":'($Fund_Account)',

        "MobileCode":'($MobileCode)',
        "Token":'($Token)',
        "Reqno":"",
        "account_type":appUtils.getLStorageInfo("account_type"),
        "account_id":appUtils.getLStorageInfo("account_id"),
        "account_info":appUtils.getLStorageInfo("account_info"),
        "token":appUtils.getLStorageInfo("token"),
        "fund_company":global.fund_company_code,
        "fund_company_code":global.fund_company_code,
        "fund_code":global.fund_code
    };

    /**
     * 初始化
     * */
    function init(){


//        if(!appUtils.isPC()) {
//            user.fund_account = '($fund_account)';
//            user.password = '($password)';
//            user.MobileCode='($MobileCode)';
//            user.Token='($Token)';
//            user.Reqno='';
//        }

    }
    /**
     * 事件绑定
     * */
    function bindPageEvent(){
        // 往上拉 展示更多，默认显示10条，按照时间倒序排列
    }
    /**
     * 销毁
     * */
    function destroy(){

    }

    module.exports = user;
});
