define("project/scripts/cash/takenback",function(require,exports,module){
	var appUtils = require("appUtils"),
		layerUtils = require("layerUtils"),
		service = require("serviceImp").getInstance(),  //业务层接口，请求数据
	    _pageId = "#cash_takenback";
	var pwdCheckUtils = require("project/scripts/common/pwdCheckUtils");
	var validatorUtil = require("validatorUtil");
	var commonservice = require("project/scripts/common/commonservice");
    var dictionary = require("dictionary");
    var common = require("project/scripts/common/common");
    var user = require("project/scripts/include/user");
    var global = require("gconfig").global;
    var failtimes = appUtils.getLStorageInfo("failtimes") == null ? 0 : appUtils.getLStorageInfo("failtimes");

    var user_=require("project/scripts/common/user");
	var submitbtn_id = "takenbackBtn";

    // 最大可赎回份额
    var asset_available_balance="";  // 临时注释赋值（目前测试账号没有绑定）
//    var asset_available_balance=540;
    var tradeDate_str;  //预计到达银行卡的日期

    var utils=require("project/scripts/common/utils");

//    $(".click_back").click(function(){
//        appUtils.pageInit("cash/takenback", "cash/cashhasopened", {});
//    });
	/**
	 * 初始化
	 * */
	function init(){

        layerUtils.iLoading(true,"请等待...",true);
        $("#header_message").html("取出");
//        utils.clickBack(_pageId);

		$(_pageId+" #takenbackBtn").removeClass("oran-next-btngray-next-btn").addClass("gray-next-btn");

		if(user_.fund_account!=="")
		{
            //FND_004 现金产品登记查询(1000304) 开始   获得最大可赎回份额      临时注释 （因测试账号未绑定）
			var jsonParam = {"fund_account":user_.fund_account,"fund_code":user_.fund_code};
			var currentinfoComplate = function(resultVo){
				if(resultVo.error_no == 0)
				{
					try
					{
						var resultDataJson = resultVo["results"][0];
						var resultData = JSON.parse(resultDataJson["result"]);
						asset_available_balance = resultData["curr_valid_balance"];
                        if(asset_available_balance==undefined){
                            asset_available_balance="";
                        }
						$(_pageId + " #asset_available_balance_strong").html(common.fmoney(asset_available_balance,2));
					}
					catch(e){}
				}else if(resultVo.error_no==2030015){
                    layerUtils.iMsg(-1,resultVo.error_info);
                    alert("跳转到绑定页面或返回");
                    //跳转到   绑定页面  or 直接返回
                    return false;
                }
				else
				{
                    // 测试临时添加  and 临时注释  （待完成）
//                    $(_pageId + " #asset_available_balance_strong").html(common.fmoney(asset_available_balance,2));
					layerUtils.iMsg(-1,resultVo.error_info);

					return false;
				}
			};
			service.currentinfo(jsonParam,currentinfoComplate);
            //现金产品登记查询(1000304) 结束   获得最大可赎回份额


            //获取基金下n个交易日期(FND_0012)  开始      机选款项预计到达银行卡的日期
			// 获取取现到账日期
			// 测试数据
			// 测试数据

			var plus_days = 1;
			var jsonParam1={"plus_days":plus_days,"fund_company":user_.fund_company};
			var nextTradeDateComplate=function(resultVo){
				if(resultVo.error_no == 0)
				{
					var resultDataJson = resultVo["results"][0];
					if(resultDataJson != null)
					{
						try{
						var resultProcess = JSON.parse(resultDataJson["result"]);
						var tradeDate = resultProcess["tradeDate"];
						tradeDate_str = new Date(tradeDate).format("yyyy年MM月dd日");
					    //预计到达银行卡的日期
						$(_pageId + " #next_settle_date_em").html(tradeDate_str);
						}
						catch(e){}
						var innerHtml = "";
					}
				}
				else
				{
					layerUtils.iMsg(-1,resultVo.error_info);
					return false;
				}
		 	};
			service.nextTradeDate(jsonParam1,nextTradeDateComplate);
            //获取基金下n个交易日期(FND_0012)  结束



			// ACT_0014 存管银行信息查询(1000321)   开始   获取当前客户绑定的三方存管银行信息（含银行卡号，注意：建行目前无法获取绑定的银行卡号）
			jsonParam = {"fund_account":user_.fund_account,"password":user_.password};
			var depositoryBankInfoComplate = function(resultVo){
				if(resultVo.error_no == 0)
				{
					try
					{
						var resultDataJson = resultVo["results"][0];
						var resultData = JSON.parse(resultDataJson["result"]);
						/*
						bank_account: "6226090211558537"
						bank_account_status: "0"
						bank_name: "招行存管"
						bank_no: "7"
						*/
						var bank_account = resultData["bank_account"];
						var bank_account_status = resultData["bank_account_status"];
						var bank_name = resultData["bank_name"];
						var bank_no = resultData["bank_no"];
						var bankNameShow = dictionary.getBankNameMap().get(bank_no);
						var bankClass = dictionary.getBankClassMap().get(bank_no);
						
						// 银行卡卡编号与银行对应关系需要单独取数据字典，20140520暂时测试写死 
						
						/*
						$(_pageId + " #bank_logo").removeClass().addClass("bank-item bg-" + bankClass);
						$(_pageId + " #bank_logo_s").removeClass().addClass("icon-" +  + bankClass);
						$(_pageId + " #bank_name").html(bankNameShow);
						if(bank_account != null && bank_account != "")
						{
							bank_account = "****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;" + bank_account.substring(bank_account.length - 4,bank_account.length);
						}
						// $(_pageId + " #bank_card_no").html(bank_account);
						*/
						$(_pageId + " #bank_name_em").html(bankNameShow);
						$(_pageId + " #bank_card_no_em").html(bank_account.substring(bank_account.length - 4,bank_account.length));
					}
					catch(e){}
				}
				else
				{
					layerUtils.iMsg(-1,"takenback->depositoryBankInfoComplate"+resultVo.error_info);
					return false;
				}
			};
			service.depositoryBankInfo(jsonParam,depositoryBankInfoComplate);
            // 存管银行信息查询(1000321)   结束

		}else{
            //如果用户未登陆 ， 则跳转到登陆页面
            var jsonParam = {};
            appUtils.pageInit("cash/takenback","yjb/yjb_i_beforeLogin",jsonParam);
        }
	}


    $(".window").click(function(e){
        //判断鼠标位置
        var div = document.getElementById("expiredPwdWindow-in");
        var x=event.clientX;
        var y=event.clientY;
        var divx1 = div.offsetLeft;
        var divy1 = div.offsetTop;
        var divx2 = div.offsetLeft + div.offsetWidth;
        var divy2 = div.offsetTop + div.offsetHeight;
        if( x < divx1 || x > divx2 || y < divy1 || y > divy2) {
            //如果离开，则执行。。
            $(_pageId + " #expiredWindow").hide();
            $(_pageId + " #errorTips").html("");
            $(_pageId+" #password").val("");

        }
    });
    $(_pageId+" #nextBtn_r").click(function(){
        $(_pageId + " #expiredWindow").hide();
    });

	//点击立即取款按钮
	$(_pageId + " #takenbackBtn").click(function(){
		
		// 1检查输入是否数字
		// 2提交接口
		var takenback_input = $(_pageId + " #redeem_amount_input").val();
		
		if(parseFloat(takenback_input) > parseFloat(asset_available_balance))
		{
			layerUtils.iMsg(-1,"亲，宝宝发现您的余额不足，请重新输入哦！");
			return false;
		}else if(!validatorUtil.isMoney(takenback_input))
		{
			layerUtils.iMsg(-1,"亲，请输入有效的取款金额（最少0.01元）！",1000);
			return false;
		}else if(takenback_input == "0"){
			layerUtils.iMsg(-1,"亲，请输入有效的取款金额（最少0.01元）！");
			return false;
		}else if(parseInt(takenback_input)!=takenback_input&&(takenback_input+"").split(".")[1].length >= 3){
			layerUtils.iMsg(-1,"亲，请输入有效的取款金额（最少0.01元）！");
			return false;
		}else if(0 >= parseFloat(takenback_input)){   // 判断金额小于0的情况
            layerUtils.iMsg(-1,"亲，请输入有效的取款金额（最少0.01元）！");
            return false;
        }

//		var fund_account = appUtils.getLStorageInfo("fund_account");
		var redeem_amount = takenback_input;


        //交易时间的判断
        // 判断是否是交易时间
        var isTradeTimeNow = false;
        var type = "2";
        var exchange_type = "76";
        var time_kind = "1";
        var date = "";
        var time = "";
        var jsonParam = {"type":type,"exchange_type":exchange_type,"time_kind":time_kind,"date":date,"time":time};
        var checkTransactionTimeComplate = function(resultVo){
//				if(resultVo.error_no == 0)   测试临时注释
            if(resultVo.error_no != 0)
            {
                layerUtils.iMsg(-1,"亲，请在交易日9:00-15:00办理提款手续哦！");
                return false;
            }
        };
        service.checkTransactionTime(jsonParam,checkTransactionTimeComplate);

		
		
		$(_pageId + " #expiredWindow").show();
		if($(_pageId + " #hiddenflag").val() == -1)    //测试临时注释(待完成)
//        if($(_pageId + " #hiddenflag").val() != -1)
		{
			pwdCheckUtils.pwdChecked(_pageId,submitbtn_id); //待完成

		}
		else
		{
			$(_pageId + " #hiddenflag").val(-1);

            //基金赎回(1000305)  开始
			var password = $(_pageId + " #expiredWindow #password").val();
            if(password.length==0){
                layerUtils.iMsg(-1,"密码不可以为空",2);
                return false;
            }
			var jsonParam = {"fund_account":user_.fund_account,"fund_code":user_.fund_code,"redeem_amount":redeem_amount,"fund_company":user_.fund_company,"password":user_.password};
			var redeemComplate = function(resultVo){
				$(_pageId + " #expiredWindow #password").val("");
				$(_pageId + " #expiredWindow").hide();
				if(resultVo.error_no == 0)
				{
					layerUtils.iMsg(-1,"提现请求提交成功",2);
					setTimeout(function(){
						var jsonParam = {};
						appUtils.pageInit("cash/takenback","cash/takenbackhistory",jsonParam);
					},2000);
					return false;
				}
				else
				{
					layerUtils.iMsg(-1,resultVo.error_info);
					return false;
				}
			};
			service.redeem(jsonParam,redeemComplate);
            //基金赎回(1000305)  结束
		}
	});

    //控制点击 按钮事件
    appUtils.bindEvent($(_pageId+" #redeem_amount_input"),function(){
        var takenback_input = $(_pageId + " #redeem_amount_input").val();
        if (takenback_input.length > 0)
        {
            $(_pageId+" #takenbackBtn").removeClass("gray-next-btn").addClass("oran-next-btn");
        }

    },"input propertychange");


	/**
	 * 事件绑定
	 * */
	function bindPageEvent(){
		//appUtils.bindEvent($(_pageId + " #takenbackBtn"),function(){
//			
		//});
	}
	/**
	 * 销毁
	 * */
	function destroy(){
		$(_pageId + " #redeem_amount_input").val("");
		$(_pageId + " #expiredWindow").hide();
		service.destroy();
	}
	
	var takenback = {
		"init" : init,
		"bindPageEvent" : bindPageEvent,
		"destroy" : destroy
	};
	
	module.exports = takenback;
});