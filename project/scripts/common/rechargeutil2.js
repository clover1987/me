define(function(require, exports, module) {
    function currentPagePwdChecked(pageId, btnId, popupId) {
        appUtils.bindEvent(pageId + " #expiredWindow #password",
            function() {
                $(pageId + " #" + popupId + " #errorTips").html(""),
                    $(pageId + " #" + popupId + " #password").val("")
            },
            "focus"),
            $(pageId + " #" + popupId).show(),
            "expiredPwdWindow" == popupId ? ($(pageId + " #" + popupId + " #errorTips").html(""), $(pageId + " #" + popupId + " #password").val(""), setTimeout(function() {
                    $(pageId + " #" + popupId + " #password").focus()
                },
                500), appUtils.bindEvent(pageId + " #" + popupId + " #nextBtn",
                //交易密码输入框的确定按钮点击事件
                function() {
                    //console.log("#nextBtn was clicked!!!!");
                    if ((null == appUtils.getSStorageInfo("recharge_totalTime") || "" == appUtils.getSStorageInfo("recharge_totalTime") || 0 == appUtils.getSStorageInfo("recharge_totalTime") || "0" == appUtils.getSStorageInfo("recharge_totalTime")) && (money_type = 6e5), h >= 3) return $("#expiredWindow #nextBtn").attr("style", "background-color:#D5D5D5;"),
                        failtodo(popupId),
                        !1;
                    var fund_account = appUtils.getLStorageInfo("fund_account");
                    if (fund_account == null) {
                        fund_account = "39946448"; //测试，写死
                    }
                    var inputPassword = $(pageId + " #" + popupId + " #password").val(),
                        bank_password = "",
                        money_type = "0";
                    if (null == inputPassword || "" == inputPassword) return $(pageId + " #" + popupId + " #errorTips").html("密码不能为空"),
                        !1;
                    if (null != fund_account && null != inputPassword && "" != inputPassword) {
                        var n = {
                                branch_no: branch_no,
                                fund_account: fund_account,
                                password: inputPassword,
                                bank_password: bank_password,
                                money_type: money_type
                            },
                            o = function(b) {
                                if (0 != b.error_no) return 2040022 == b.error_no ? (h >= 3 && ($("#expiredWindow #nextBtn").attr("style", "background-color:#D5D5D5;"), failtodo(popupId)), h++, appUtils.setSStorageInfo("recharge_failtimes", h), $(pageId + " #" + popupId + " #errorTips").html("交易密码错误"), !1) : ($(pageId + " #" + popupId + " #errorTips").html(b.error_info), !1);
                                $(pageId + " #" + popupId).hide();
                                var e = b.results[0];
                                if (null != e) {
                                    var i = JSON.parse(e.result);
                                    balance = i.balance,
                                        $(pageId + " #queryBalanceDiv #inputbalance").val(balance),
                                        $(pageId + " #queryBalanceDiv #showbalance").show(),
                                        $(pageId + " #queryBalanceDiv #showbalance").html("<strong>" + g.fmoney(balance, 2) + "</strong>元")
                                }
                            };
                        layerUtils.balanceQuery(n, o)
                    }
                }), appUtils.bindEvent(pageId + " #" + popupId + " #password",
                function() {
                    $(pageId + " #" + popupId + " #errorTips").html(""),
                        $(pageId + " #" + popupId + " #password").val("")
                },
                "focus")) : "expiredBankWindow" == popupId && ($(pageId + " #" + popupId + " #errorTips").html(""), $(pageId + " #" + popupId + " #bank_password").val(""), setTimeout(function() {
                    $(pageId + " #" + popupId + " #bank_password").focus()
                },
                500), appUtils.bindEvent(pageId + " #" + popupId + " #nextBtn",
                function() {
                    if (h >= 3) return $("#expiredWindow #nextBtn").attr("style", "background-color:#D5D5D5;"),
                        failtodo(popupId),
                        !1;
                    var b = appUtils.getLStorageInfo("fund_account"),
                        i = $(pageId + " #" + popupId + " #bank_password").val(),
                        j = "33",
                        k = "0",
                        l = "";
                    if (null == i || "" == i) return $(pageId + " #" + popupId + " #errorTips").html("密码不能为空"),
                        !1;
                    if (null != b && null != i && "" != i) {
                        var m = {
                                branch_no: j,
                                fund_account: b,
                                password: l,
                                bank_password: i,
                                money_type: k
                            },
                            n = function(b) {
                                if ($(pageId + " #" + popupId + " #bank_password").val(""), 0 != b.error_no) return 2040007 == b.error_no ? (h >= 3 && ($("#expiredWindow #nextBtn").attr("style", "background-color:#D5D5D5;"), failtodo(popupId)), h++, appUtils.setSStorageInfo("recharge_failtimes", h), $(pageId + " #" + popupId + " #errorTips").html("银行密码输入错误"), !1) : ($(pageId + " #" + popupId + " #errorTips").html(b.error_info), !1);
                                $(pageId + " #" + popupId).hide();
                                var e = b.results[0];
                                if (null != e) {
                                    var i = JSON.parse(e.result),
                                        j = i.balance;
                                    $(pageId + " #queryBalanceDiv #inputbalance").val(j),
                                        $(pageId + " #queryBalanceDiv #showbalance").show(),
                                        $(pageId + " #queryBalanceDiv #showbalance").html("<strong>" + g.fmoney(j, 2) + "</strong>元")
                                }
                            };
                        layerUtils.balanceQuery(m, n)
                    }
                }), appUtils.bindEvent(pageId + " #" + popupId + " #bank_password",
                function() {
                    $(pageId + " #" + popupId + " #errorTips").html(""),
                        $(pageId + " #" + popupId + " #bank_password").val("")
                },
                "focus"))
    }
    function rechargePagePwdChecked(_pageId, b, windowId, g) {
        "expiredPwdWindow" == windowId ? ($(_pageId + " #" + windowId).show(), $(_pageId + " #" + windowId + " #errorTips").html(""), $(_pageId + " #" + windowId + " #password").val(""), setTimeout(function() {
                $(_pageId + " #" + windowId + " #password").focus()
            },
            500), appUtils.bindEvent(_pageId + " #" + windowId + " #nextBtn",
            //充值时，交易密码输入框或银行卡密码输入框的确定按钮回调
            function() {
console.log("充值密码框的确定按钮回调");
                if ((null == appUtils.getSStorageInfo("recharge_totalTime") || "" == appUtils.getSStorageInfo("recharge_totalTime") || 0 == appUtils.getSStorageInfo("recharge_totalTime") || "0" == appUtils.getSStorageInfo("recharge_totalTime")) && (money_type = 6e5), h >= 3) return $("#expiredWindow #nextBtn").attr("style", "background-color:#D5D5D5;"),
                    failtodo(windowId),
                    !1;
                var fund_account = appUtils.getLStorageInfo("fund_account");
                if (fund_account == null) {
                    fund_account = "39946448"; //测试，写死
                }
                var i = $(_pageId + " #" + windowId + " #password").val();
                    j = "",
                    l = "33",
                    m = "0",
                    n = g;
                if (null != fund_account && null != i && "" != i) {
                    var o = {
                            branch_no: l,
                            fund_account: fund_account,
                            password: i,
                            bank_password: j,
                            money_type: m,
                            occur_balance: n
                        },
                        //密码输入框点击后的回调
                        p = function(e) {
console.log("充值框里点击确定后充值完成的回调")
console.log(e);
                            if ($(_pageId + " #" + windowId + " #password").val(""), 0 == e.error_no) {
                                $(_pageId + " #" + windowId).hide();
                                var data = e.results[0];
                                if (null != e) {
                                    var g = JSON.parse(e.result),
                                        i = g.serialNO;
                                    if (null != i && "" != i) {
                                        var j = appUtils.setSStorageInfo("serialNO", i);
                                        appUtils.pageInit("cash/recharge", "cash/rechargeresult", j)
                                    } else $(_pageId + " #" + windowId + " #errorTips").html("系统繁忙，请稍后再试")
                                }
                            } else {
                                if (2040022 != e.error_no) return $(_pageId + " #" + windowId + " #errorTips").html(e.error_info),
                                    !1;
                                h >= 3 && ($("#expiredWindow #nextBtn").attr("style", "background-color:#D5D5D5;"), failtodo(windowId)),
                                    h++,
                                    appUtils.setSStorageInfo("recharge_failtimes", h),
                                    $(_pageId + " #" + windowId + " #errorTips").html("交易密码错误")
                            }
                        };
                    layerUtils.transferMoney(o, p)
                }
            }), appUtils.bindEvent(_pageId + " #" + windowId + " #password",
            function() {
                $(_pageId + " #" + windowId + " #errorTips").html(""),
                    $(_pageId + " #" + windowId + " #password").val("")
            },
            "focus")) : "expiredBankWindow" == windowId && ($(_pageId + " #" + windowId).show(), $(_pageId + " #" + windowId + " #errorTips").html(""), $(_pageId + " #" + windowId + " #bank_password").val(""), setTimeout(function() {
                $(_pageId + " #" + windowId + " #bank_password").focus()
            },
            500), appUtils.bindEvent(_pageId + " #" + windowId + " #nextBtn",
            function() {
                if (h >= 3) return $("#expiredWindow #nextBtn").attr("style", "background-color:#D5D5D5;"),
                    failtodo(windowId),
                    !1;
                var fund_account = appUtils.getLStorageInfo("fund_account");
                if (fund_account == null) {
                    fund_account = "39946448"; //测试，写死
                }
                var bank_password = $(_pageId + " #" + windowId + " #bank_password").val();
                    j = "33",
                    money_type = "0",
                    password = "",
                    m = g;
                if (null != fund_account && null != bank_password && "" != bank_password) {
                    var n = {
                            branch_no: j,
                            fund_account: fund_account,
                            password: password,
                            bank_password: bank_password,
                            money_type: money_type,
                            occur_balance: m
                        },
                        o = function(b) {
                            if ($(_pageId + " #" + windowId + " #bank_password").val(""), 0 != b.error_no) return 2040007 == b.error_no ? (h >= 3 && ($("#expiredWindow #nextBtn").attr("style", "background-color:#D5D5D5;"), failtodo(windowId)), h++, appUtils.setSStorageInfo("recharge_failtimes", h), $(_pageId + " #" + windowId + " #errorTips").html("银行密码错误"), !1) : ($(_pageId + " #" + windowId + " #errorTips").html(b.error_info), !1);
                            $(_pageId + " #" + windowId).hide();
                            var e = b.results[0];
                            if (null != e) {
                                var g = JSON.parse(e.result),
                                    i = g.serialNO,
                                    j = appUtils.setSStorageInfo("serialNO", i);
                                appUtils.pageInit("cash/recharge", "cash/rechargeresult", j)
                            } else $(_pageId + " #" + windowId + " #errorTips").html("系统繁忙，请稍后再试")
                        };
                    layerUtils.transferMoney(n, o)
                }
            }), appUtils.bindEvent(_pageId + " #" + windowId + " #bank_password",
            function() {
                $(_pageId + " #" + windowId + " #errorTips").html(""),
                    $(_pageId + " #" + windowId + " #bank_password").val("")
            },
            "focus"))
    }
    function failtodo(a) {
        if (i) {
            i = !1;
            var b = function() {
                var b = Math.ceil(money_type / 6e4);
                $("#" + a + " #failtext").show(),
                    $("#" + a + " #textbtn").hide(),
                    $("#failtext p").html("亲，为确保您的账户安全，请休息" + b + "分钟后重试"),
                    $("#" + a + " #nextBtn").attr("style", "background-color:#D5D5D5;"),
                    $(" #" + a + " #errorTips").hide(),
                    b--
            };
            b(),
                startCountDown = window.setInterval(function() {
                        money_type -= 6e4,
                            b(),
                            0 >= money_type && (money_type = 0),
                            appUtils.setSStorageInfo("recharge_totalTime", money_type)
                    },
                    6e4); {
                setTimeout(function() {
                        $("#" + a + " #textbtn").show(),
                            $("#" + a + " #password").val(""),
                            $("#" + a + " #nextBtn").attr("style", "background-color:#2C8EE3;"),
                            $("#" + a + " #failtext").hide(),
                            $("#" + a + " #errorTips").html(""),
                            $("#" + a + " #errorTips").show(),
                            h = 0,
                            appUtils.setSStorageInfo("recharge_failtimes", h),
                            money_type = 0,
                            appUtils.setSStorageInfo("recharge_totalTime", money_type),
                            i = !0,
                            window.clearInterval(startCountDown)
                    },
                    money_type)
            }
        }
    }
    var appUtils = require("appUtils"),
        //继承，糅合了两个插件
        layerUtils = (require("layerUtils"), require("serviceImp").getInstance()),
        gconfig = require("gconfig"),
        g = (gconfig.global, require("project/scripts/common/common")),
        h = null == appUtils.getSStorageInfo("recharge_failtimes") ? 0 : appUtils.getSStorageInfo("recharge_failtimes"),
        i = !0,
        branch_no = "33",
        money_type = null == appUtils.getSStorageInfo("recharge_totalTime") || 0 == appUtils.getSStorageInfo("recharge_totalTime") ? 6e5: appUtils.getSStorageInfo("recharge_totalTime"),
        password = {
            currentPagePwdChecked: currentPagePwdChecked,
            rechargePagePwdChecked: rechargePagePwdChecked,
            failtodo: failtodo
        };
    module.exports = password
});