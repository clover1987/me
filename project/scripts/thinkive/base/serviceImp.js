/**
 * 非现场手机开户前端service层调用接口
 * */
define(function(require,exports,module){

	var appUtils = require("appUtils"),
		mobileService = "project/scripts/thinkive/service/mobileService";
	
	function MobileService(){
		this.serviceMap = {};
	}
	
	MobileService.prototype.accountApply = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
		var service = this.serviceMap[mobileService];
		if(service){
			service.accountApply(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.accountApply(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
    };
 
	MobileService.prototype.dailyinfo = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
    	var service = require("project/scripts/thinkive/service/mobileService").getInstance();
    	service.dailyinfo(param,callback,isLastReq,isShowWait,timeOutFunc);
    	/*
		var service = this.serviceMap[mobileService];
		if(service){
			service.dailyinfo(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.dailyinfo(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
		*/
    };

	MobileService.prototype.tradeinfo = function(param,callback,isLastReq,isShowWait,timeOutFunc)
     {
		var service = this.serviceMap[mobileService];
		if(service){
			service.tradeinfo(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.tradeinfo(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
     };
	
     
    //现金产品登记查询
	MobileService.prototype.currentinfo = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
        var service = this.serviceMap[mobileService];
        if(service){
            service.currentinfo(param,callback,isLastReq,isShowWait,timeOutFunc);
        }else{
            var This = this;
            require.async(mobileService,function(module){
                if(module){
                    service = module.getInstance();
                    This.serviceMap[mobileService] = service;
                    service.currentinfo(param,callback,isLastReq,isShowWait,timeOutFunc);
                }else{
                    alert("服务层，js模块类["+mobileService+"]不存在!");
                }
            });
        }
    };
     
     

	MobileService.prototype.redeem = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
		var service = this.serviceMap[mobileService];
		if(service){
			service.redeem(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.redeem(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
    };     
      

	MobileService.prototype.autoapply = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
		var service = this.serviceMap[mobileService];
		if(service){
			service.autoapply(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.autoapply(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
    }; 
    
	MobileService.prototype.accountCancel = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
		var service = this.serviceMap[mobileService];
		if(service){
			service.accountCancel(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.accountCancel(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
    }; 
    
	MobileService.prototype.econtractSign = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
		var service = this.serviceMap[mobileService];
		if(service){
			service.econtractSign(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.econtractSign(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
    };

    //added by jhl 2014-07-22
    //查看是否开通金腾通
    MobileService.prototype.checkJttBinded = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
        var service = this.serviceMap[mobileService];
        if(service){
            service.checkJttBinded(param,callback,isLastReq,isShowWait,timeOutFunc);
        }else{
            var This = this;
            require.async(mobileService,function(module){
                if(module){
                    service = module.getInstance();
                    This.serviceMap[mobileService] = service;
                    service.checkJttBinded(param,callback,isLastReq,isShowWait,timeOutFunc);
                }else{
                    alert("服务层，js模块类["+mobileService+"]不存在!");
                }
            });
        }
    };


	MobileService.prototype.econtractStatus = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
		var service = this.serviceMap[mobileService];
		if(service){
			service.econtractStatus(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.econtractStatus(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
    }; 
    
    MobileService.prototype.getDealFile=function(param,callback,isLastReq,isShowWait,timeOutFunc){

        var service=this.serviceMap[mobileService];
        if(service){
            service.getDealFile(param,callback,isLastReq,isShowWait,timeOutFunc);
        }else{
            var This=this;
            require.async(mobileService,function(module){
                if(module){
                    service=module.getInstance();
                    This.serviceMap[mobileService]=service;
                    service.getDealFile(param,callback,isLastReq,isShowWait,timeOutFunc);
                }else{
                    alert("服务层，js模块类["+mobileService+"]不存在！");
                }
            });
        }
    }

	MobileService.prototype.econtractInfo = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
		var service = this.serviceMap[mobileService];
		if(service){
			service.econtractInfo(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.econtractInfo(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
    }; 
    

	MobileService.prototype.fundAuth = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
		var service = this.serviceMap[mobileService];
		if(service){
			service.fundAuth(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.fundAuth(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
    };

    

    //copied by jhl 2014-07-24
    //获取充值记录
    MobileService.prototype.history = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
        var service = this.serviceMap[mobileService];
        if(service){
            service.history(param,callback,isLastReq,isShowWait,timeOutFunc);
        }else{
            var This = this;
            require.async(mobileService,function(module){
                if(module){
                    service = module.getInstance();
                    This.serviceMap[mobileService] = service;
                    service.history(param,callback,isLastReq,isShowWait,timeOutFunc);
                }else{
                    alert("服务层，js模块类["+mobileService+"]不存在!");
                }
            });
        }
    };

//    //copied by jYC 2014-07-28
//    //现金产品登记
//    MobileService.prototype.cashProductRegistration = function(param,callback,isLastReq,isShowWait,timeOutFunc)
//    {
//        var service = this.serviceMap[mobileService];
//        if(service){
//            service.cashProductRegistration(param,callback,isLastReq,isShowWait,timeOutFunc);
//        }else{
//            var This = this;
//            require.async(mobileService,function(module){
//                if(module){
//                    service = module.getInstance();
//                    This.serviceMap[mobileService] = service;
//                    service.cashProductRegistration(param,callback,isLastReq,isShowWait,timeOutFunc);
//                }else{
//                    alert("服务层，js模块类["+mobileService+"]不存在!");
//                }
//            });
//        }
//    };



    MobileService.prototype.assetSummaryInfo = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
		var service = this.serviceMap[mobileService];
		if(service){
			service.assetSummaryInfo(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.assetSummaryInfo(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
    }; 
    
	MobileService.prototype.assetStockHolderInfo = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
		var service = this.serviceMap[mobileService];
		if(service){
			service.assetStockHolderInfo(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.assetStockHolderInfo(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
    }; 
    
	MobileService.prototype.userAcctBind = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
		var service = this.serviceMap[mobileService];
		if(service){
			service.userAcctBind(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.userAcctBind(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
    }; 
    
 
	MobileService.prototype.userAcctBindQuery = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
		var service = this.serviceMap[mobileService];
		if(service){
			service.userAcctBindQuery(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.userAcctBindQuery(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
    }; 
   
	MobileService.prototype.userInfoQuery = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
		var service = this.serviceMap[mobileService];
		if(service){
			service.userInfoQuery(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.userInfoQuery(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
    }; 
    
  
	MobileService.prototype.userInfoUpdate = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {

			var service = this.serviceMap[mobileService];
			if(service){
				service.userInfoUpdate(param,callback,isLastReq,isShowWait,timeOutFunc);
			}else{
				var This = this;
				require.async(mobileService,function(module){
					if(module){
						service = module.getInstance();
						This.serviceMap[mobileService] = service;
						service.userInfoUpdate(param,callback,isLastReq,isShowWait,timeOutFunc);
					}else{
						alert("服务层，js模块类["+mobileService+"]不存在!");
					}
				});
			}
    }; 
    
	MobileService.prototype.userMessageDescribeQuery = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
		var service = this.serviceMap[mobileService];
		if(service){
			service.userMessageDescribeQuery(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.userMessageDescribeQuery(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
    }; 
    
	MobileService.prototype.userMessageDescribeUpdate = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
		var service = this.serviceMap[mobileService];
		if(service){
			service.userMessageDescribeUpdate(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.userMessageDescribeUpdate(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
    }; 
    
	MobileService.prototype.econtractContent = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
		var service = this.serviceMap[mobileService];
		if(service){
			service.econtractContent(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.econtractContent(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
    };
    
    MobileService.prototype.depositoryBankInfo = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
		var service = this.serviceMap[mobileService];
		if(service){
			service.depositoryBankInfo(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.depositoryBankInfo(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
    };
    
    MobileService.prototype.fundPerformanceInfo = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
		var service = this.serviceMap[mobileService];
		if(service){
			service.fundPerformanceInfo(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.fundPerformanceInfo(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
    };
    
    MobileService.prototype.fundReturnInfo = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
		var service = this.serviceMap[mobileService];
		if(service){
			service.fundReturnInfo(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.fundReturnInfo(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
    };

    //added by jhl 2014-07-26
    //验证资金账号和密码是否正确 PASPT_0011  认证服务
    MobileService.prototype.checkAccount = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
        var service = this.serviceMap[mobileService];
        if(service){
            service.checkAccount(param,callback,isLastReq,isShowWait,timeOutFunc);
        }else{
            var This = this;
            require.async(mobileService,function(module){
                if(module){
                    service = module.getInstance();
                    This.serviceMap[mobileService] = service;
                    service.checkAccount(param,callback,isLastReq,isShowWait,timeOutFunc);
                }else{
                    alert("服务层，js模块类["+mobileService+"]不存在!");
                }
            });
        }
    };

    //added by jhl 2014-07-26
    //获取银行卡余额 BANK_TRADE_0002
    MobileService.prototype.getBankBalance = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
        var service = this.serviceMap[mobileService];
        if(service){
            service.getBankBalance(param,callback,isLastReq,isShowWait,timeOutFunc);
        }else{
            var This = this;
            require.getBankBalance(mobileService,function(module){
                if(module){
                    service = module.getInstance();
                    This.serviceMap[mobileService] = service;
                    service.getBankBalance(param,callback,isLastReq,isShowWait,timeOutFunc);
                }else{
                    alert("服务层，js模块类["+mobileService+"]不存在!");
                }
            });
        }
    };


	MobileService.prototype.redeemHistory = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
		var service = this.serviceMap[mobileService];
		if(service){
			service.redeemHistory(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.redeemHistory(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
    };

    //added by jhl 2014-07-25
    //调用银行绑定账号属性查询
    MobileService.prototype.bankAccountInfo = function(param, callback, isLastReq, isShowWait, timeOutFunc) {
        var service = this.serviceMap[mobileService];
        if(service){
            service.bankAccountInfo(param,callback,isLastReq,isShowWait,timeOutFunc);
        }else{
            var This = this;
            require.async(mobileService,function(module){
                if(module){
                    service = module.getInstance();
                    This.serviceMap[mobileService] = service;
                    service.bankAccountInfo(param,callback,isLastReq,isShowWait,timeOutFunc);
                }else{
                    alert("服务层，js模块类["+mobileService+"]不存在!");
                }
            });
        }
    };

    //addey by jhl 2014-07-28
    //查询银行卡余额
    MobileService.prototype.balanceQuery = function(param, callback, isLastReq, isShowWait, timeOutFunc) {
        var service = this.serviceMap[mobileService];
        if(service){
            service.balanceQuery(param,callback,isLastReq,isShowWait,timeOutFunc);
        }else{
            var This = this;
            require.async(mobileService,function(module){
                if(module){
                    service = module.getInstance();
                    This.serviceMap[mobileService] = service;
                    service.balanceQuery(param,callback,isLastReq,isShowWait,timeOutFunc);
                }else{
                    alert("服务层，js模块类["+mobileService+"]不存在!");
                }
            });
        }
    };


    //addey by jhl 2014-07-29
    //BANK_TRADE_0003 充值转账  佣金宝充值
    MobileService.prototype.transferMoney = function(param, callback, isLastReq, isShowWait, timeOutFunc) {
        var service = this.serviceMap[mobileService];
        if(service){
            service.transferMoney(param,callback,isLastReq,isShowWait,timeOutFunc);
        }else{
            var This = this;
            require.async(mobileService,function(module){
                if(module){
                    service = module.getInstance();
                    This.serviceMap[mobileService] = service;
                    service.transferMoney(param,callback,isLastReq,isShowWait,timeOutFunc);
                }else{
                    alert("服务层，js模块类["+mobileService+"]不存在!");
                }
            });
        }
    };

    //addey by jhl 2014-07-29
    //从基金日志中获取余额
    MobileService.prototype.queryBalanceFromFundLog = function(param, callback, isLastReq, isShowWait, timeOutFunc) {
        var service = this.serviceMap[mobileService];
        if(service){
            service.queryBalanceFromFundLog(param,callback,isLastReq,isShowWait,timeOutFunc);
        }else{
            var This = this;
            require.async(mobileService,function(module){
                if(module){
                    service = module.getInstance();
                    This.serviceMap[mobileService] = service;
                    service.queryBalanceFromFundLog(param,callback,isLastReq,isShowWait,timeOutFunc);
                }else{
                    alert("服务层，js模块类["+mobileService+"]不存在!");
                }
            });
        }
    };

    //addey by jhl 2014-07-30
    //计算交易日 rechargesuccess.html
    MobileService.prototype.calculateTradeDay = function(param, callback, isLastReq, isShowWait, timeOutFunc) {
        var service = this.serviceMap[mobileService];
        if(service){
            service.calculateTradeDay(param,callback,isLastReq,isShowWait,timeOutFunc);
        }else{
            var This = this;
            require.async(mobileService,function(module){
                if(module){
                    service = module.getInstance();
                    This.serviceMap[mobileService] = service;
                    service.calculateTradeDay(param,callback,isLastReq,isShowWait,timeOutFunc);
                }else{
                    alert("服务层，js模块类["+mobileService+"]不存在!");
                }
            });
        }
    };


    //addey by jhl 2014-07-30
    //计算交易日 rechargesuccess.html
    MobileService.prototype.calcTradeDay = function(param, callback, isLastReq, isShowWait, timeOutFunc) {
        var service = this.serviceMap[mobileService];
        if(service){
            service.calcTradeDay(param,callback,isLastReq,isShowWait,timeOutFunc);
        }else{
            var This = this;
            require.async(mobileService,function(module){
                if(module){
                    service = module.getInstance();
                    This.serviceMap[mobileService] = service;
                    service.calcTradeDay(param,callback,isLastReq,isShowWait,timeOutFunc);
                }else{
                    alert("服务层，js模块类["+mobileService+"]不存在!");
                }
            });
        }
    };


    //addey by jhl 2014-08-07
    //修改资金密码、修改交易密码
    MobileService.prototype.modifyPassword = function(param, callback, isLastReq, isShowWait, timeOutFunc) {
        var service = this.serviceMap[mobileService];
        if(service){
            service.modifyPassword(param,callback,isLastReq,isShowWait,timeOutFunc);
        }else{
            var This = this;
            require.async(mobileService,function(module){
                if(module){
                    service = module.getInstance();
                    This.serviceMap[mobileService] = service;
                    service.modifyPassword(param,callback,isLastReq,isShowWait,timeOutFunc);
                }else{
                    alert("服务层，js模块类["+mobileService+"]不存在!");
                }
            });
        }
    };


    MobileService.prototype.redeemUndo = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
		var service = this.serviceMap[mobileService];
		if(service){
			service.redeemUndo(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.redeemUndo(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
    };

    MobileService.prototype.redeemTotalAmount = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
		var service = this.serviceMap[mobileService];
		if(service){
			service.redeemTotalAmount(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.redeemTotalAmount(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
    };
    
    MobileService.prototype.nextTradeDate = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
		var service = this.serviceMap[mobileService];
		if(service){
			service.nextTradeDate(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.nextTradeDate(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
    };
    

    MobileService.prototype.checkFundTradeTime = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
		var service = require("project/scripts/thinkive/service/mobileService").getInstance();
    	service.checkFundTradeTime(param,callback,isLastReq,isShowWait,timeOutFunc);
    };
    
    MobileService.prototype.savePWDstr = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
		var service = require("project/scripts/thinkive/service/mobileService").getInstance();
    	service.savePWDstr(param,callback,isLastReq,isShowWait,timeOutFunc);
    };
    
    MobileService.prototype.getPWD = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
    	var service = require("project/scripts/thinkive/service/mobileService").getInstance();
    	service.getPWD(param,callback,isLastReq,isShowWait,timeOutFunc);
    };
    
    MobileService.prototype.getExpiredTime = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
    	var service = require("project/scripts/thinkive/service/mobileService").getInstance();
    	service.getExpiredTime(param,callback,isLastReq,isShowWait,timeOutFunc);
    };
    
    MobileService.prototype.setPassword = function(fund_pwd)
    {
    	var service = require("project/scripts/thinkive/service/mobileService").getInstance();
    	service.setPassword(fund_pwd);
    };
    
	MobileService.prototype.saveLocalPassword = function(param,callback,isLastReq,isShowWait,timeOutFunc)
	{
		var service = require("project/scripts/thinkive/service/mobileService").getInstance();
    	service.saveLocalPassword(param,callback,isLastReq,isShowWait,timeOutFunc);
	};
    
    MobileService.prototype.getLocalPassword = function(param,callback,isLastReq,isShowWait,timeOutFunc)
	{
		var service = require("project/scripts/thinkive/service/mobileService").getInstance();
    	service.getLocalPassword(param,callback,isLastReq,isShowWait,timeOutFunc);
	};
	
	MobileService.prototype.sendMessageCode = function(param,callback,isLastReq,isShowWait,timeOutFunc)
	{
		var service = this.serviceMap[mobileService];
		if(service){
			service.sendMessageCode(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.sendMessageCode(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
	};
	
	
	MobileService.prototype.checkMessageCode = function(param,callback,isLastReq,isShowWait,timeOutFunc)
	{
		var service = this.serviceMap[mobileService];
		if(service){
			service.checkMessageCode(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.checkMessageCode(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
	};
	
	MobileService.prototype.applyCode = function(param,callback,isLastReq,isShowWait,timeOutFunc)
	{
		var service = this.serviceMap[mobileService];
		if(service){
			service.applyCode(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.applyCode(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
	};
	
	MobileService.prototype.getCaptchaImageBase64 = function(param,callback,isLastReq,isShowWait,timeOutFunc)
	{
		var service = this.serviceMap[mobileService];
		if(service){
			service.getCaptchaImageBase64(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.getCaptchaImageBase64(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
	};
	
	MobileService.prototype.messageSubscribeQuery = function(param,callback,isLastReq,isShowWait,timeOutFunc)
	{
		var service = this.serviceMap[mobileService];
		if(service){
			service.messageSubscribeQuery(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.messageSubscribeQuery(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
	};

    //added by jyc  金腾通开户交易时间查询   accountTransactionTime
    MobileService.prototype.accountTransactionTime = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
        var service = this.serviceMap[mobileService];
        if(service){
            service.accountTransactionTime(param,callback,isLastReq,isShowWait,timeOutFunc);
        }else{
            var This = this;
            require.async(mobileService,function(module){
                if(module){
                    service = module.getInstance();
                    This.serviceMap[mobileService] = service;
                    service.accountTransactionTime(param,callback,isLastReq,isShowWait,timeOutFunc);
                }else{
                    alert("服务层，js模块类["+mobileService+"]不存在!");
                }
            });
        }
    };


    MobileService.prototype.checkTransactionTime = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
        var service = this.serviceMap[mobileService];
        if(service){
            service.checkTransactionTime(param,callback,isLastReq,isShowWait,timeOutFunc);
        }else{
            var This = this;
            require.async(mobileService,function(module){
                if(module){
                    service = module.getInstance();
                    This.serviceMap[mobileService] = service;
                    service.checkTransactionTime(param,callback,isLastReq,isShowWait,timeOutFunc);
                }else{
                    alert("服务层，js模块类["+mobileService+"]不存在!");
                }
            });
        }
    };
	
	
	MobileService.prototype.registerOnlineUsersSession = function(param,callback,isLastReq,isShowWait,timeOutFunc)
	{
		var service = require("project/scripts/thinkive/service/mobileService").getInstance();
    	service.registerOnlineUsersSession(param,callback,isLastReq,isShowWait,timeOutFunc);
	};
	
	MobileService.prototype.getCipherTokenByDurableToken = function(param,callback,isLastReq,isShowWait,timeOutFunc)
	{
		var service = require("project/scripts/thinkive/service/mobileService").getInstance();
    	service.getCipherTokenByDurableToken(param,callback,isLastReq,isShowWait,timeOutFunc);
	};
	
	MobileService.prototype.getPassport = function(param,callback,isLastReq,isShowWait,timeOutFunc)
	{
		var service = require("project/scripts/thinkive/service/mobileService").getInstance();
    	service.getPassport(param,callback,isLastReq,isShowWait,timeOutFunc);
	};
	
	MobileService.prototype.messageSubscribeTxtQuery = function(param,callback,isLastReq,isShowWait,timeOutFunc)
	{
		var service = this.serviceMap[mobileService];
		if(service){
			service.messageSubscribeTxtQuery(param,callback,isLastReq,isShowWait,timeOutFunc);
		}else{
			var This = this;
			require.async(mobileService,function(module){
				if(module){
					service = module.getInstance();
					This.serviceMap[mobileService] = service;
					service.messageSubscribeTxtQuery(param,callback,isLastReq,isShowWait,timeOutFunc);
				}else{
					alert("服务层，js模块类["+mobileService+"]不存在!");
				}
			});
		}
	};
	
	
	MobileService.prototype.firstIncomeDate = function(param,callback,isLastReq,isShowWait,timeOutFunc)
    {
        var service = this.serviceMap[mobileService];
        if(service){
            service.firstIncomeDate(param,callback,isLastReq,isShowWait,timeOutFunc);
        }else{
            var This = this;
            require.async(mobileService,function(module){
                if(module){
                    service = module.getInstance();
                    This.serviceMap[mobileService] = service;
                    service.firstIncomeDate(param,callback,isLastReq,isShowWait,timeOutFunc);
                }else{
                    alert("服务层，js模块类["+mobileService+"]不存在!");
                }
            });
        }
    };
	/***应用接口......................................................结束*/
	
	/**
	 * 释放操作
	 */
    MobileService.prototype.destroy = function(){
		for(var key in this.serviceMap){
			var service = this.serviceMap[key];
			service.destroy();
			delete this.serviceMap[key];
		}
		this.serviceMap = {};                          
	};
	
	function getInstance(){
		return new MobileService();
	}
	
	var service = {
		"getInstance" : getInstance
	};
	
	// 暴露对外的接口
	module.exports = service;
});