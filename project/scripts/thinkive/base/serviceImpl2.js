define(function(require, exports, module) {
    function a() {
        this.serviceMap = {}
    }
    function b() {
        return new a
    }
    var c = (require("appUtils"), "project/scripts/thinkive/service/mobileService");
    a.prototype.accountApply = function(a, b, d, e, f) {
        var g = this.serviceMap[c];
        if (g) g.accountApply(a, b, d, e, f);
        else {
            var h = this;
            require.async(c,
                function(module) {
                    module ? (g = module.getInstance(), h.serviceMap[c] = g, g.accountApply(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                })
        }
    },
        a.prototype.dailyinfo = function(a, b, c, d, e) {
            var f = require("project/scripts/thinkive/service/mobileService").getInstance();
            f.dailyinfo(a, b, c, d, e)
        },
        a.prototype.tradeinfo = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.tradeinfo(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.tradeinfo(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.currentinfo = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.currentinfo(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.currentinfo(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.redeem = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.redeem(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.redeem(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.autoapply = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.autoapply(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.autoapply(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.accountCancel = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.accountCancel(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.accountCancel(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.econtractSign = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.econtractSign(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.econtractSign(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.econtractStatus = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.econtractStatus(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.econtractStatus(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.econtractInfo = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.econtractInfo(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.econtractInfo(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.fundAuth = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.fundAuth(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.fundAuth(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.assetSummaryInfo = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.assetSummaryInfo(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.assetSummaryInfo(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.assetStockHolderInfo = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.assetStockHolderInfo(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.assetStockHolderInfo(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.userAcctBind = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.userAcctBind(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.userAcctBind(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.userAcctBindQuery = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.userAcctBindQuery(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.userAcctBindQuery(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.userInfoQuery = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.userInfoQuery(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.userInfoQuery(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.userInfoUpdate = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.userInfoUpdate(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.userInfoUpdate(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.userMessageDescribeQuery = function(a, b, c, d, e) {
            var f = require("project/scripts/thinkive/service/mobileService").getInstance();
            f.userMessageDescribeQuery(a, b, c, d, e)
        },
        a.prototype.userMessageDescribeUpdate = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.userMessageDescribeUpdate(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.userMessageDescribeUpdate(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.econtractContent = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.econtractContent(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.econtractContent(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.depositoryBankInfo = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.depositoryBankInfo(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.depositoryBankInfo(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },

        a.prototype.fundPerformanceInfo = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.fundPerformanceInfo(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.fundPerformanceInfo(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.fundReturnInfo = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.fundReturnInfo(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.fundReturnInfo(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.calcTradeDay = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.calcTradeDay(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.calcTradeDay(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.redeemHistory = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.redeemHistory(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.redeemHistory(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.TimeInfo = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.TimeInfo(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.TimeInfo(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.redeemUndo = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.redeemUndo(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.redeemUndo(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.redeemTotalAmount = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.redeemTotalAmount(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.redeemTotalAmount(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.nextTradeDate = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.nextTradeDate(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.nextTradeDate(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.checkFundTradeTime = function(a, b, c, d, e) {
            var f = require("project/scripts/thinkive/service/mobileService").getInstance();
            f.checkFundTradeTime(a, b, c, d, e)
        },
        a.prototype.savePWDstr = function(a, b, c, d, e) {
            var f = require("project/scripts/thinkive/service/mobileService").getInstance();
            f.savePWDstr(a, b, c, d, e)
        },
        a.prototype.getPWD = function(a, b, c, d, e) {
            var f = require("project/scripts/thinkive/service/mobileService").getInstance();
            f.getPWD(a, b, c, d, e)
        },
        a.prototype.getExpiredTime = function(a, b, c, d, e) {
            var f = require("project/scripts/thinkive/service/mobileService").getInstance();
            f.getExpiredTime(a, b, c, d, e)
        },
        a.prototype.setPassword = function(a) {
            var b = require("project/scripts/thinkive/service/mobileService").getInstance();
            b.setPassword(a)
        },
        a.prototype.saveLocalPassword = function(a, b, c, d, e) {
            var f = require("project/scripts/thinkive/service/mobileService").getInstance();
            f.saveLocalPassword(a, b, c, d, e)
        },
        a.prototype.getLocalPassword = function(a, b, c, d, e) {
            var f = require("project/scripts/thinkive/service/mobileService").getInstance();
            f.getLocalPassword(a, b, c, d, e)
        },
        a.prototype.checkMessageCode = function(a, b, c, d, e) {
            var f = require("project/scripts/thinkive/service/mobileService").getInstance();
            f.checkMessageCode(a, b, c, d, e)
        },
        a.prototype.sendMessageCode = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.sendMessageCode(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.sendMessageCode(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.applyCode = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.applyCode(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.applyCode(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.getCaptchaImageBase64 = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.getCaptchaImageBase64(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.getCaptchaImageBase64(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.messageSubscribeQuery = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.messageSubscribeQuery(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.messageSubscribeQuery(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.registerOnlineUsersSession = function(a, b, c, d, e) {
            var f = require("project/scripts/thinkive/service/mobileService").getInstance();
            f.registerOnlineUsersSession(a, b, c, d, e)
        },
        a.prototype.getCipherTokenByDurableToken = function(a, b, c, d, e) {
            var f = require("project/scripts/thinkive/service/mobileService").getInstance();
            f.getCipherTokenByDurableToken(a, b, c, d, e)
        },
        a.prototype.getPassport = function(a, b, c, d, e) {
            var f = require("project/scripts/thinkive/service/mobileService").getInstance();
            f.getPassport(a, b, c, d, e)
        },
        a.prototype.messageSubscribeTxtQuery = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.messageSubscribeTxtQuery(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.messageSubscribeTxtQuery(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.firstIncomeDate = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.firstIncomeDate(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.firstIncomeDate(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.queryHoliday = function(a, b, c, d, e) {
            var f = require("project/scripts/thinkive/service/mobileService").getInstance();
            f.queryHoliday(a, b, c, d, e)
        },
        a.prototype.bankAccountInfo = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.bankAccountInfo(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.bankAccountInfo(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.balanceQuery = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.balanceQuery(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.balanceQuery(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.transferMoney = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.transferMoney(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.transferMoney(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.queryBalanceFromFundLog = function(a, b, c, d, e) {
            var f = require("project/scripts/thinkive/service/mobileService").getInstance();
            f.queryBalanceFromFundLog(a, b, c, d, e)
        },
        a.prototype.history = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.history(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.history(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.checkTransactionTime = function(a, b, d, e, f) {
            var g = this.serviceMap[c];
            if (g) g.checkTransactionTime(a, b, d, e, f);
            else {
                var h = this;
                require.async(c,
                    function(module) {
                        module ? (g = module.getInstance(), h.serviceMap[c] = g, g.checkTransactionTime(a, b, d, e, f)) : alert("服务层，js模块类[" + c + "]不存在!")
                    })
            }
        },
        a.prototype.destroy = function() {
            for (var a in this.serviceMap) {
                var b = this.serviceMap[a];
                b.destroy(),
                    delete this.serviceMap[a]
            }
            this.serviceMap = {}
        };
    var d = {
        getInstance: b
    };
    module.exports = d
});