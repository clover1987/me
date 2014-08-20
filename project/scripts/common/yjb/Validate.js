/**
 * Created by jyc on 14-7-21.
 *  验证
 */
define(function (require, exports, module) {

    // //移动号码验证
    function checkMobile(str) {
        var regPattern = /1[3-8]+\d{9}/;
        if(!str || str==null){
            return {
                code: 0,
                tip: "手机号码不能为空！"
            };
        }else if(!regPattern.test(str)){
            return {
                code: 0,
                tip: "手机号码格式不正确!"
            };
        }else{
            return {
                code: 1
            };
        }
    }

    //固定电话验证
    function checkTel(str){
        var regPattern = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
        if(!str || str==null){
            return {
                code: 0,
                tip: "固定电话号码不能为空！"
            };
        }else if(!regPattern.test(str)){
            return {
                code: 0,
                tip: "固定电话号码格式不正确!"
            };
        }else{
            return {
                code: 1
            };
        }
    }

    //地址验证
    function checkAddress(str) {
        str = $.trim(str);
        if (!str || str==null){
            return {
                code: 0,
                tip: "地址不能为空！"
            };
        } else if (str.length > 120) {
            return {
                code: 0,
                tip: "地址长度不可超过120个字符！"
            };
        } else {
            return {
                code: 1
            };
        }
    }


    /**
     * 在上海证券交易所上市的证券，根据上交所“证券编码实施方案”，采用6位数编制方法，前3位数为区别证券品种，具体见下表所列：
     * 001×××国债现货；110×××120×××企业债券；129×××100×××可转换债券；201×××国债回购；310×××国债期货；
     * 500×××550×××基金；600×××A股；700×××配股；710×××转配股；701×××转配股再配股；711×××转配股再转配股；
     * 720×××红利；730×××新股申购；735×××新基金申购；737×××新股配售；900×××B股。
     */
        //股票代码验证
    function checkStockCode(str) {
        str = $.trim(str);
        var regPattern = /^(110|120|129|100|201|310|500|550|600|700|710|701|711|720|730|735|737|900)\d{3}$/;
        if (!str || str==null){
            return {
                code: 0,
                tip: "股票代码不能为空！"
            };
        } else if (!regPattern.test(str)) {
            return {
                code: 0,
                tip: "股票代码格式不正确!"
            };
        } else {
            return {
                code: 1
            };
        }
    }



    //提现金额验证
    function checkAmount(amount, balance){
        amount = $.trim(amount);
        //var exp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
        var exp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,})?$/;
        if ((!amount || amount==null) || (!exp.test(amount))){
            return {
                code: 0,
                tip: "请输入有效的取款金额（最少0.01元）!"
            };
        } else if (parseFloat(amount) > balance) {
            return {
                code: 0,
                tip: "您的余额不足，请重新输入!"
            };
        } else {
            return {
                code: 1
            };
        }

    };

    //保留金额验证
    function checkReserved(amount){
        amount = $.trim(amount);
        console.log(amount);
        //var exp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
        var exp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,})?$/;
        if ((!amount || amount==null) || (!exp.test(amount))){
            return {
                code: 0,
                tip: "保留金额必须为数字!"
            };
        } else if (parseFloat(amount) < 200) {
            return {
                code: 0,
                tip: "保留金额最低200元!"
            };
        } else {
            return {
                code: 1,
                tip: "修改成功!"
            };
        }

    };
    var Validate={
        "checkMobile" :checkMobile,
        "checkTel" : checkTel,
        "checkAddress" : checkAddress,
        "checkStockCode" : checkStockCode,
        "checkAmount" : checkAmount,
        "checkReserved" : checkReserved


    };

    //暴露对外的接口
    module.exports = Validate;
});


/**
 * Created by jhl on 14-6-26.
 * 验证
 */
//this.YJB = this.YJB || {};
//(function(){
//    var Validate = function(){};
//    var p = Validate.prototype;
//
//    //移动号码验证
//    Validate.checkMobile = function(str){
//        var regPattern = /1[3-8]+\d{9}/;
//        if(!str || str==null){
//            return {
//                code: 0,
//                tip: "手机号码不能为空！"
//            };
//        }else if(!regPattern.test(str)){
//            return {
//                code: 0,
//                tip: "手机号码格式不正确!"
//            };
//        }else{
//            return {
//                code: 1
//            };
//        }
//    };
//
//    //固定电话验证
//    Validate.checkTel = function(str){
//        var regPattern = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
//        if(!str || str==null){
//            return {
//                code: 0,
//                tip: "固定电话号码不能为空！"
//            };
//        }else if(!regPattern.test(str)){
//            return {
//                code: 0,
//                tip: "固定电话号码格式不正确!"
//            };
//        }else{
//            return {
//                code: 1
//            };
//        }
//    };
//
//
//    //地址验证
//    Validate.checkAddress = function(str) {
//        str = $.trim(str);
//        if (!str || str==null){
//            return {
//                code: 0,
//                tip: "地址不能为空！"
//            };
//        } else if (str.length > 120) {
//            return {
//                code: 0,
//                tip: "地址长度不可超过120个字符！"
//            };
//        } else {
//            return {
//                code: 1
//            };
//        }
//    }
//
//
//    /**
//     * 在上海证券交易所上市的证券，根据上交所“证券编码实施方案”，采用6位数编制方法，前3位数为区别证券品种，具体见下表所列：
//     * 001×××国债现货；110×××120×××企业债券；129×××100×××可转换债券；201×××国债回购；310×××国债期货；
//     * 500×××550×××基金；600×××A股；700×××配股；710×××转配股；701×××转配股再配股；711×××转配股再转配股；
//     * 720×××红利；730×××新股申购；735×××新基金申购；737×××新股配售；900×××B股。
//     */
//    //股票代码验证
//    Validate.checkStockCode = function(str) {
//        str = $.trim(str);
//        var regPattern = /^(110|120|129|100|201|310|500|550|600|700|710|701|711|720|730|735|737|900)\d{3}$/;
//        if (!str || str==null){
//            return {
//                code: 0,
//                tip: "股票代码不能为空！"
//            };
//        } else if (!regPattern.test(str)) {
//            return {
//                code: 0,
//                tip: "股票代码格式不正确!"
//            };
//        } else {
//            return {
//                code: 1
//            };
//        }
//    }
//
//
//
//    //提现金额验证
//    Validate.checkAmount = function(amount, balance){
//        amount = $.trim(amount);
//        //var exp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
//        var exp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,})?$/;
//        if ((!amount || amount==null) || (!exp.test(amount))){
//            return {
//                code: 0,
//                tip: "请输入有效的取款金额（最少0.01元）!"
//            };
//        } else if (parseFloat(amount) > balance) {
//            return {
//                code: 0,
//                tip: "您的余额不足，请重新输入!"
//            };
//        } else {
//            return {
//                code: 1
//            };
//        }
//
//    };
//
//    //保留金额验证
//    Validate.checkReserved = function(amount){
//        amount = $.trim(amount);
//        console.log(amount);
//        //var exp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
//        var exp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,})?$/;
//        if ((!amount || amount==null) || (!exp.test(amount))){
//            return {
//                code: 0,
//                tip: "保留金额必须为数字!"
//            };
//        } else if (parseFloat(amount) < 200) {
//            return {
//                code: 0,
//                tip: "保留金额最低200元!"
//            };
//        } else {
//            return {
//                code: 1,
//                tip: "修改成功!"
//            };
//        }
//
//    };
//
//
//
//
//    YJB.Validate = Validate;
//})();
//
