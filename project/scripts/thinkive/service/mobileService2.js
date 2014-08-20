define(function(require, exports, module) {
    function a() {
        this.service = new $.domain.Service
    }
    function b() {
        var a = "",
            b = "",
            e = d.getLStorageInfo("weixinpk"),
            f = d.getLStorageInfo("openid"),
            g = {
                weixinpk: e,
                openid: f
            },
            h = function(a) {
                return 0 != a.error_no ? !1 : (b = null != a.results ? a.results[0].cipher_token: null, void 0)
            };
        c().getLocalPassword(g, h);
        var i = {
                cipher_token: b
            },
            j = function(c) {
                if (0 != c.error_no) return ! 1;
                if (null != c.results) {
                    var d = JSON.parse(c.results[0].result);
                    a = d.cipherContent
                } else b = null
            };
        return c().getPWD(i, j),
            a
    }
    function c() {
        return new a
    }
    var d = require("appUtils"),
        e = require("gconfig"),
        f = (require("service"), e.global),
        g = (f.serverPath, require("layerUtils"));
    a.prototype.accountApply = function(a, b, c, d, e) {
        var g = {};
        g.funcNo = 1000301,
            g.fund_account = a.fund_account,
            g.fund_company_code = a.fund_company_code,
            g.fund_code = a.fund_code,
            g.password = a.password;
        var h = $.getReqParamVo();
        h.setUrl(f.serverPath),
            h.setReqParam(g),
            h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
            h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
            h.setTimeOutFunc(e),
            this.service.invoke(h, b)
    },
        a.prototype.dailyinfo = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1000302,
                g.fund_account = a.fund_account,
                g.fund_code = a.fund_code,
                g.trade_date_from = a.trade_date_from,
                g.trade_date_to = a.trade_date_to,
                g.page_size = a.page_size,
                g.page_no = a.page_no;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                h.setIsAsync(!1),
                this.service.invoke(h, b)
        },
        a.prototype.tradeinfo = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1000303,
                g.fund_account = a.fund_account,
                g.fund_code = a.fund_code,
                g.trade_date_from = a.trade_date_from,
                g.trade_date_to = a.trade_date_to,
                g.page_size = a.page_size,
                g.page_no = a.page_no;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                this.service.invoke(h, b)
        },
        a.prototype.currentinfo = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1000304,
                g.fund_account = a.fund_account,
                g.fund_code = a.fund_code;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                this.service.invoke(h, b)
        },
        a.prototype.redeem = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1000305,
                g.fund_account = a.fund_account,
                g.fund_code = a.fund_code,
                g.redeem_amount = a.redeem_amount,
                g.fund_company = a.fund_company,
                g.password = a.password;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                this.service.invoke(h, b)
        },
        a.prototype.autoapply = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1000306,
                g.fund_account = a.fund_account,
                g.fund_code = a.fund_code,
                g.auto_apply_threshold = a.auto_apply_threshold,
                g.password = a.password;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                this.service.invoke(h, b)
        },
        a.prototype.accountCancel = function(a, c, d, e, g) {
            var h = {};
            h.funcNo = 1000307,
                h.fund_account = a.fund_account,
                h.fund_company_code = a.fund_company_code,
                h.fund_code = a.fund_code;
            var i = b();
            if (null == i || "" == i) {
                if ($("#expiredWindow").length > 0) return $("#expiredWindow").show(),
                    null
            } else h.password = i;
            var j = $.getReqParamVo();
            j.setUrl(f.serverPath),
                j.setReqParam(h),
                j.setIsLastReq("undefined" == typeof d || "" === d ? !0 : d),
                j.setIsShowWait("undefined" == typeof e || "" === e ? !0 : e),
                j.setTimeOutFunc(g),
                this.service.invoke(j, c)
        },
        a.prototype.econtractSign = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1000308,
                g.fund_account = a.fund_account,
                g.econtract_id = a.econtract_id,
                g.cert_type = a.cert_type,
                g.cert_sign = a.cert_sign,
                g.cert_plain_text = a.cert_plain_text,
                g.cert_attachInfo = a.cert_attachInfo;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                this.service.invoke(h, b)
        },
        a.prototype.econtractStatus = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1000309,
                g.fund_account = a.fund_account,
                g.econtract_id = a.econtract_id;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                this.service.invoke(h, b)
        },
        a.prototype.econtractInfo = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1000310,
                g.econtract_id = a.econtract_id,
                g.fund_account = a.fund_account;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                this.service.invoke(h, b)
        },
        a.prototype.fundAuth = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1001120,
                g.accountType = "1",
                g.accountId = a.fund_account,
                g.password = a.fund_pwd;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                this.service.invoke(h, b)
        },
        a.prototype.assetSummaryInfo = function(a, c, d, e, g) {
            var h = {};
            h.funcNo = 1000312,
                h.fund_account = a.fund_account,
                h.money_type = a.money_type;
            var i = b();
            if (null == i || "" == i) {
                if ($("#expiredWindow").length > 0) return $("#expiredWindow").show(),
                    null
            } else h.password = i;
            var j = $.getReqParamVo();
            j.setUrl(f.serverPath),
                j.setReqParam(h),
                j.setIsLastReq("undefined" == typeof d || "" === d ? !0 : d),
                j.setIsShowWait("undefined" == typeof e || "" === e ? !0 : e),
                j.setTimeOutFunc(g),
                this.service.invoke(j, c)
        },
        a.prototype.assetStockHolderInfo = function(a, c, d, e, g) {
            var h = {};
            h.funcNo = 1000313,
                h.fund_account = a.fund_account,
                h.money_type = a.money_type,
                h.stock_type = a.stock_type,
                h.password = a.password,
                h.page_size = a.page_size,
                h.page_no = a.page_no;
            var i = b();
            if (null == i || "" == i) {
                if ($("#expiredWindow").length > 0) return $("#expiredWindow").show(),
                    null
            } else h.password = i;
            var j = $.getReqParamVo();
            j.setUrl(f.serverPath),
                j.setReqParam(h),
                j.setIsLastReq("undefined" == typeof d || "" === d ? !0 : d),
                j.setIsShowWait("undefined" == typeof e || "" === e ? !0 : e),
                j.setTimeOutFunc(g),
                this.service.invoke(j, c)
        },
        a.prototype.userAcctBind = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1000314,
                g.fund_account = a.fund_account,
                g.account_type = a.account_type,
                g.account_id = a.account_id,
                g.account_info = a.account_info,
                g.token = a.token;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                this.service.invoke(h, b)
        },
        a.prototype.userAcctBindQuery = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1000315,
                g.account_type = a.account_type,
                g.account_id = a.account_id;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                this.service.invoke(h, b)
        },
        a.prototype.userInfoQuery = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1000316,
                g.fund_account = a.fund_account;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                this.service.invoke(h, b)
        },
        a.prototype.userInfoUpdate = function(a, c, d, e, g) {
            var h = {};
            h.funcNo = 1000317,
                h.fund_account = a.fund_account,
                h.mobile = a.mobile,
                h.tel = a.tel,
                h.address = a.address;
            var i = b();
            if (null == i || "" == i) {
                if ($("#expiredWindow").length > 0) return $("#expiredWindow").show(),
                    null
            } else h.password = i;
            var j = $.getReqParamVo();
            j.setUrl(f.serverPath),
                j.setReqParam(h),
                j.setIsLastReq("undefined" == typeof d || "" === d ? !0 : d),
                j.setIsShowWait("undefined" == typeof e || "" === e ? !0 : e),
                j.setTimeOutFunc(g),
                this.service.invoke(j, c)
        },
        a.prototype.userMessageDescribeQuery = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1000318,
                g.fund_account = a.fund_account,
                g.subscribe_source = a.subscribe_source;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                h.setIsAsync(!1),
                this.service.invoke(h, b)
        },
        a.prototype.messageSubscribeQuery = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1000326,
                g.subscribe_source = a.subscribe_source;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                this.service.invoke(h, b)
        },
        a.prototype.messageSubscribeTxtQuery = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1000331,
                g.subscribe_source = a.subscribe_source,
                g.message_no = a.message_no;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                this.service.invoke(h, b)
        },
        a.prototype.userMessageDescribeUpdate = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1000319,
                g.fund_account = a.fund_account,
                g.message_no = a.message_no,
                g.subscribe_source = a.subscribe_source,
                g.subscribe_channel = a.subscribe_channel,
                g.op_type = a.op_type;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                this.service.invoke(h, b)
        },
        a.prototype.econtractContent = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1000320,
                g.econtract_id = a.econtract_id;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                this.service.invoke(h, b)
        },
        a.prototype.depositoryBankInfo = function(a, c, d, e, g) {
            var h = {};
            h.funcNo = 1000321,
                h.fund_account = a.fund_account;
            var i = b();
            if (null == i || "" == i) {
                if ($("#expiredWindow").length > 0) return $("#expiredWindow").show(),
                    null
            } else h.password = i;
            var j = $.getReqParamVo();
            j.setUrl(f.serverPath),
                j.setReqParam(h),
                j.setIsLastReq("undefined" == typeof d || "" === d ? !0 : d),
                j.setIsShowWait("undefined" == typeof e || "" === e ? !0 : e),
                j.setTimeOutFunc(g),
                this.service.invoke(j, c)
        },
        a.prototype.fundPerformanceInfo = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1000322,
                g.fund_code = a.fund_code,
                g.trade_date_from = a.trade_date_from,
                g.trade_date_to = a.trade_date_to,
                g.page_size = a.page_size,
                g.page_no = a.page_no;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                this.service.invoke(h, b)
        },
        a.prototype.fundReturnInfo = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1000323,
                g.fund_account = a.fund_account,
                g.fund_code = a.fund_code,
                g.trade_date_from = a.trade_date_from,
                g.trade_date_to = a.trade_date_to,
                g.page_size = a.page_size,
                g.page_no = a.page_no,
                g.dailyflag = a.dailyflag;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                this.service.invoke(h, b)
        },
        a.prototype.calcTradeDay = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1000325,
                g.exchange_type = a.exchange_type,
                g.date = a.date,
                g.time = a.time,
                g.ifSkip = a.ifSkip,
                g.nextN = a.nextN;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                this.service.invoke(h, b)
        },
        a.prototype.redeemHistory = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1000327,
                g.fund_account = a.fund_account,
                g.page_size = a.page_size,
                g.page_no = a.page_no;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                this.service.invoke(h, b)
        },
        a.prototype.redeemUndo = function(a, c, d, e, g) {
            var h = {};
            h.funcNo = 1000328,
                h.withdraw_id = a.withdraw_id,
                h.fund_account = a.fund_account;
            var i = b();
            if (null == i || "" == i) {
                if ($("#expiredWindow").length > 0) return $("#expiredWindow").show(),
                    null
            } else h.password = i;
            var j = $.getReqParamVo();
            j.setUrl(f.serverPath),
                j.setReqParam(h),
                j.setIsLastReq("undefined" == typeof d || "" === d ? !0 : d),
                j.setIsShowWait("undefined" == typeof e || "" === e ? !0 : e),
                j.setTimeOutFunc(g),
                this.service.invoke(j, c)
        },
        a.prototype.redeemTotalAmount = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1000329,
                g.fund_account = a.fund_account;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                this.service.invoke(h, b)
        },
        a.prototype.checkFundTradeTime = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1000330,
                g.fund_company = a.fund_company;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                h.setIsAsync(!1),
                this.service.invoke(h, b)
        },
        a.prototype.nextTradeDate = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1000332,
                g.plus_days = a.plus_days,
                g.fund_company = a.fund_company;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                h.setIsAsync(!1),
                this.service.invoke(h, b)
        },
        a.prototype.savePWDstr = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = "1001001",
                g.app_id = a.app_id,
                g.app_uuid = a.app_uuid,
                g.cipher_content = a.cipher_content,
                g.cipher_type = a.cipher_type,
                g.duration_hours = a.duration_hours;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                h.setIsAsync(!1),
                this.service.invoke(h, b)
        },
        a.prototype.getPWD = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = "1001002",
                g.cipher_token = a.cipher_token;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                h.setIsAsync(!1),
                this.service.invoke(h, b)
        },
        a.prototype.getExpiredTime = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = "1001005",
                g.cipher_token = a.cipher_token;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                h.setIsAsync(!1),
                this.service.invoke(h, b)
        },
        a.prototype.setPassword = function(a) {
            var b = new Date,
                c = "weixin",
                e = b.getTime() + Math.random(),
                f = a,
                h = "1",
                i = "24",
                j = {
                    app_id: c,
                    app_uuid: e,
                    cipher_content: f,
                    cipher_type: h,
                    duration_hours: i
                },
                k = function(a) {
                    if (0 != a.error_no) return g.iMsg( - 1, a.error_info),
                        !1;
                    var b = a.results[0];
                    resultProcess = JSON.parse(b.result),
                        null != b && (cipherToken = resultProcess.cipherToken, d.setLStorageInfo("cipherToken", cipherToken))
                };
            this.service.savePWDstr(j, k)
        },
        a.prototype.saveLocalPassword = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1000902,
                g.weixinpk = a.weixinpk,
                g.openid = a.openid,
                g.fund_account = a.fund_account,
                g.cipher_token = a.cipher_token,
                g.expires_longtime = a.expires_longtime,
                g.durable_token = a.durable_token,
                g.expires_longtime_sso = a.expires_longtime_sso;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                h.setIsAsync(!1),
                this.service.invoke(h, b)
        },
        a.prototype.getLocalPassword = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1000903,
                g.weixinpk = a.weixinpk,
                g.openid = a.openid;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                h.setIsAsync(!1),
                this.service.invoke(h, b)
        },
        a.prototype.sendMessageCode = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1001305,
                g.mobile = a.mobile,
                g.template_no = a.template_no;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                this.service.invoke(h, b)
        },
        a.prototype.checkMessageCode = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1001302,
                g.captcha_id = a.captcha_id,
                g.captcha_code = a.captcha_code,
                g.expire_now = a.expire_now;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                h.setIsAsync(!1),
                this.service.invoke(h, b)
        },
        a.prototype.applyCode = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1001301,
                g.len = a.len,
                g.complex_random = a.complex_random,
                g.char_len = a.char_len,
                g.int_len = a.int_len;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                this.service.invoke(h, b)
        },
        a.prototype.getCaptchaImageBase64 = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1001306,
                g.captcha_id = a.captcha_id,
                g.width = a.width,
                g.height = a.height,
                g.font_size = a.font_size;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                h.setIsAsync(!1),
                this.service.invoke(h, b)
        },
        a.prototype.registerOnlineUsersSession = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1001201,
                g.app_id = a.app_id,
                g.passport_id = a.passport_id,
                g.account = a.account,
                g.cipher_content = a.cipher_content,
                g.cipher_type = a.cipher_type,
                g.key_info = a.key_info;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                h.setIsAsync(!1),
                this.service.invoke(h, b)
        },
        a.prototype.getCipherTokenByDurableToken = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1001205,
                g.durable_token = a.durable_token;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                h.setIsAsync(!1),
                this.service.invoke(h, b)
        },
        a.prototype.getPassport = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1001122,
                g.passportId = a.passportId,
                g.accountType = a.accountType,
                g.accountId = a.accountId;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                h.setIsAsync(!1),
                this.service.invoke(h, b)
        },
        a.prototype.firstIncomeDate = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1000333,
                g.fund_account = a.fund_account,
                g.fund_code = a.fund_code;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                this.service.invoke(h, b)
        },
        a.prototype.queryHoliday = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1000334,
                g.date = a.date,
                g.time = a.time;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                h.setIsAsync(!1),
                this.service.invoke(h, b)
        },
        a.prototype.bankAccountInfo = function(a, c, d, e, g) {
            var h = {};
            if (h.funcNo = 1001601, h.fund_account = a.fund_account, h.password = a.password, null == a.password || "" == a.password) {
                var i = b();
                h.password = i
            }
            var j = $.getReqParamVo();
            j.setUrl(f.serverPath),
                j.setReqParam(h),
                j.setIsLastReq("undefined" == typeof d || "" === d ? !0 : d),
                j.setIsShowWait("undefined" == typeof e || "" === e ? !0 : e),
                j.setTimeOutFunc(g),
                this.service.invoke(j, c)
        },
        a.prototype.balanceQuery = function(a, c, d, e, g) {
        var h = {};
        if (h.funcNo = 1001602, h.branch_no = a.branch_no, h.fund_account = a.fund_account, h.password = a.password, null == a.password || "" == a.password) {
            var i = b();
            h.password = i
        }
        h.bank_password = a.bank_password,
            h.money_type = a.money_type;
        var j = $.getReqParamVo();
        j.setUrl(f.serverPath),
            j.setReqParam(h),
            j.setIsLastReq("undefined" == typeof d || "" === d ? !0 : d),
            j.setIsShowWait("undefined" == typeof e || "" === e ? !0 : e),
            j.setTimeOutFunc(g),
            this.service.invoke(j, c)
    },
        a.prototype.transferMoney = function(a, c, d, e, g) {
            var h = {};
            if (h.funcNo = 1001603, h.branch_no = a.branch_no, h.fund_account = a.fund_account, h.password = a.password, null == a.password || "" == a.password) {
                var i = b();
                h.password = i
            }
            h.bank_password = a.bank_password,
                h.money_type = a.money_type,
                h.occur_balance = a.occur_balance;
            var j = $.getReqParamVo();
            j.setUrl(f.serverPath),
                j.setReqParam(h),
                j.setIsLastReq("undefined" == typeof d || "" === d ? !0 : d),
                j.setIsShowWait("undefined" == typeof e || "" === e ? !0 : e),
                j.setTimeOutFunc(g),
                this.service.invoke(j, c)
        },
        a.prototype.queryBalanceFromFundLog = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1001604,
                g.serialNO = a.serialNO;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                h.setIsAsync(!1),
                this.service.invoke(h, b)
        },
        a.prototype.history = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1001605,
                g.fund_account = a.fund_account;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                this.service.invoke(h, b)
        },
        a.prototype.TimeInfo = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1001606,
                g.serialNO = a.serialNO;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                this.service.invoke(h, b)
        },
        a.prototype.checkTransactionTime = function(a, b, c, d, e) {
            var g = {};
            g.funcNo = 1000324,
                g.type = a.type,
                g.exchange_type = a.exchange_type,
                g.time_kind = a.time_kind,
                g.date = a.date,
                g.time = a.time;
            var h = $.getReqParamVo();
            h.setUrl(f.serverPath),
                h.setReqParam(g),
                h.setIsLastReq("undefined" == typeof c || "" === c ? !0 : c),
                h.setIsShowWait("undefined" == typeof d || "" === d ? !0 : d),
                h.setTimeOutFunc(e),
                this.service.invoke(h, b)
        },
        a.prototype.destroy = function() {
            this.service.destroy()
        };
    var h = {
        getInstance: c
    };
    module.exports = h
});