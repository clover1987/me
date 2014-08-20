define("project/scripts/cash/recharge",function(require,exports,module){
	var appUtils = require("appUtils"),
		layerUtils = require("layerUtils"),
		service = require("serviceImp").getInstance(),  //业务层接口，请求数据
	    _pageId = "#cash_recharge";
	var pwdCheckUtils = require("project/scripts/common/pwdCheckUtils");
	var validatorUtil = require("validatorUtil");
	var commonservice = require("project/scripts/common/commonservice");
    var user_=require("project/scripts/common/user");

    //test
    //appUtils.setLStorageInfo("fund_account", "39264129");   //工行账号 bank_no = 4
    //appUtils.setLStorageInfo("fund_account", "39264173");   //建设银行 bank_no = 6 (取不到银行卡号)
    //appUtils.setLStorageInfo("fund_account", "39135017");   //招行账号 bank_no = 7 (不支持查询余额)
    //appUtils.setLStorageInfo("fund_account", "40001475");   //兴业银行 bank_no = 9  (没有背景css和图 bg-xinye)
    //appUtils.setLStorageInfo("fund_account", "39979607");  //浦发银行 bank_no = J  query_mode = 2
    //appUtils.setLStorageInfo("fund_account", "39999417");   //农业银行 bank_no = A

	var dictionary = require("dictionary");
	
	var common = require("project/scripts/common/common");
	var user = require("project/scripts/include/user");
	var global = require("gconfig").global;
	var submitbtn_id = "rechargeBtn";
	var query_mode = "";
	var windowId = "";
	var recharge_input = "";
	var branch_no = "33";
	var transfer_check_type="";
    var utils=require("project/scripts/common/utils");

	
//	var failtimes = appUtils.getLStorageInfo("failtimes") == null ? 0 : appUtils.getLStorageInfo("failtimes");

	var recharge_failtimes = appUtils.getLStorageInfo("recharge_failtimes") == null ? 0 : appUtils.getLStorageInfo("recharge_failtimes");
	var flag = true;
	var recharge_totalTime = (appUtils.getLStorageInfo("recharge_totalTime") == null || appUtils.getLStorageInfo("recharge_totalTime") == 0) ? 600000 : appUtils.getLStorageInfo("recharge_totalTime"); // 毫秒
	var rechargeutil = require("project/scripts/common/rechargeutil");
//    $(".click_back").click(function(){
//        appUtils.pageInit("cash/recharge", "cash/cashhasopened", {});
//    });
    /**
	 * 初始化
	 * */


    var webHeight = document.documentElement.clientHeight;
//    var webWidth = document.documentElement.clientWidth;
//    $(".page").height(webHeight);

    function init(){

        $("#header_message").html("充值");
//        utils.clickBack(_pageId);
		appUtils.setSStorageInfo("serialNO","");
		appUtils.setSStorageInfo("success","");
		appUtils.setSStorageInfo("failure","");
		appUtils.setSStorageInfo("inprogress","");
		layerUtils.iLoading(true,"请等待...",true);

        //查询余额链接
		$(_pageId + " #balance").show();
        var jsonParam = {"fund_account":user_.fund_account,"password":user_.password};
        //alert(user_.password);
        var bankAccountInfoComplate = function(resultVo){
            if(resultVo.error_no == 0)
            {
                var resultDataJson = resultVo["results"][0];
                var resultData = JSON.parse(resultDataJson["result"]);
                var bankNo = resultData["bankNo"];
console.log("bankNo = " + bankNo);
                var bankAccount = resultData["bankAccount"];
                query_mode = resultData["query_mode"];
                transfer_check_type = resultData["transfer_check_type"];

                var bankNameShow = dictionary.getBankNameMap().get(bankNo);
                var bankClass = dictionary.getBankClassMap().get(bankNo);

                $(_pageId + " #bank_logo").removeClass().addClass("bank-item bg-" + bankClass);
                $(_pageId + " #bank_logo_s").removeClass().addClass("icon-"+ bankClass);
                $(_pageId + " #bank-name").html(bankNameShow);

                //已绑定银行卡
                if(bankAccount != null && bankAccount != "")
                {
                    bankAccount = "****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;"+bankAccount.substring(bankAccount.length-4,bankAccount.length+1);
                }
                $(_pageId + " #bank-card").html(bankAccount);
                //建行(取不到银行卡号， 不显示)
                if(bankNo == 6)
                {
                    $(_pageId + " #bank-card").hide();
                }
                //银行卡余额查询  0-不支持 1-支持查询且只需卡号 2-支持查询且需要卡号密码
                if(query_mode == 0)
                {
                    $(_pageId + " #showBalanceDiv").show();
                    $(_pageId + " #showbalance").html("客服电话：4001-600109");
                }
                else if(query_mode == 1 || query_mode == 2)
                {
                    $(_pageId + " #queryBalanceDiv").show();
                    $(_pageId + " #balance").html("查询余额");
                }
            }
            else
            {
                layerUtils.iMsg(-1,resultVo.error_info);
                //layerUtils.iMsg(-1,"recharge->init()");
                return false;
            }
        };
        //查询资金账号对应的银行卡
        service.bankAccountInfo(jsonParam,bankAccountInfoComplate);
	}			
	
	/**
	 * 事件绑定
	 * */
	function bindPageEvent(){

        $(".window").click(function(e){
            //判断鼠标位置
            var div = document.getElementById("expiredPwdWindow-in-r");
            var x=event.clientX;
            var y=event.clientY;
            var divx1 = div.offsetLeft;
            var divy1 = div.offsetTop;
            var divx2 = div.offsetLeft + div.offsetWidth;
            var divy2 = div.offsetTop + div.offsetHeight;
            if( x < divx1 || x > divx2 || y < divy1 || y > divy2) {
                //如果离开，则执行。。
                $(_pageId + " #expiredPwdWindow").hide();
                $(_pageId + " #errorTips").html("");
                $(_pageId+" #password").val("");
            }
        });

        //点击充值
		$(_pageId + " #rechargeBtn").click(function(){
console.log("transfer_check_type=" + transfer_check_type);
			// 1检查输入是否数字
			// 2提交接口
			recharge_input = $(_pageId + " #redeem_amount_input").val();
			var balance = $(_pageId + " #queryBalanceDiv #inputbalance").val();

			if(balance != null && balance != "" )
			{
				if(parseFloat(recharge_input) > parseFloat(balance))
				{
					layerUtils.iMsg(-1,"亲，宝宝发现您的余额不足，请重新输入哦！");
					return false;
				}
			}
			if(recharge_input <= 0){
				layerUtils.iMsg(-1,"亲，请输入有效的充值金额（最少0.01元）！");
				return false;
			}
			else if(!validatorUtil.isMoney(recharge_input))
			{
				layerUtils.iMsg(-1,"亲，请输入有效的取款金额（最少0.01元）！",1000);
				return false;
			}
			else if(parseInt(recharge_input)!=recharge_input&&(recharge_input+"").split(".")[1].length >= 3){
				layerUtils.iMsg(-1,"亲，请输入有效的充值金额（最少0.01元）！");
				return false;
			}

            //输入密码之前的充值确认框
            $("#fade").width(document.body.scrollWidth);
            $("#fade").height(document.body.scrollHeight);
            $("#MyDiv").show();
            $("#fade").show();

            /*
            //显示交易密码或银行卡密码输入框
			if (transfer_check_type == 0)//支持充值且只需卡号  输入交易密码
			{
                //增加显示密码之前的界面判断
                $("#fade").width(document.body.scrollWidth);
                $("#fade").height(document.body.scrollHeight);
                $("#MyDiv").show();
                $("#fade").show();
//				$(_pageId + " #expiredPwdWindow").show();
//				rechargeutil.rechargePagePwdChecked(_pageId,submitbtn_id,"expiredPwdWindow",recharge_input);
			}
			else if (transfer_check_type == 1)//支持充值，但需卡号和银行卡密码
			{
                //增加显示密码之前的界面判断
                $("#fade").width(document.body.scrollWidth);
                $("#fade").height(document.body.scrollHeight);
                $("#MyDiv").show();
                $("#fade").show();
//				$(_pageId + " #expiredBankWindow").show();
//				rechargeutil.rechargePagePwdChecked(_pageId,submitbtn_id,"expiredBankWindow",recharge_input);
			}
			*/
			
		});

        //充值确认框点击确认充值
        $(_pageId+" #ok").click(function(){
            if (transfer_check_type == 0)//支持充值且只需卡号  输入交易密码
            {
                $(_pageId + " #expiredPwdWindow").show();
                $("#MyDiv").hide();
                $("#fade").hide();

                $(_pageId + " #expiredPwdWindow").show();
                rechargeutil.rechargePagePwdChecked(_pageId,submitbtn_id,"expiredPwdWindow",recharge_input);
            }
            else if (transfer_check_type == 1)//支持充值，但需卡号和银行卡密码
            {
                $(_pageId + " #expiredPwdWindow").show();
                $("#MyDiv").hide();
                $("#fade").hide();

                $(_pageId + " #expiredBankWindow").show();
                rechargeutil.rechargePagePwdChecked(_pageId,submitbtn_id,"expiredBankWindow",recharge_input);
            }
        });

        //充值确认框点击放弃充值
        $(_pageId+" #cancel").click(function(){
            $("#MyDiv").hide();
            $("#fade").hide();
        });
        $(_pageId+" #nextBtn_r").click(function(){
            $(_pageId + " #expiredPwdWindow").hide();
            $(_pageId + " #expiredBankWindow").hide();
        });

        //点击查询余额
		$(_pageId + " #balance").click(function(){
			$(_pageId + " #balance").hide();
console.log("query_mode = " + query_mode);
			if(query_mode == 1)
			{
                //支持查询且只需卡号  输入交易密码
				$(_pageId + " #expiredPwdWindow").show();
				rechargeutil.currentPagePwdChecked(_pageId,submitbtn_id,"expiredPwdWindow",recharge_input);
			}
			else if(query_mode == 2)
			{
                //支持查询且同时需要银行卡号和密码  输入银行卡
				$(_pageId + " #expiredBankWindow").show();
				rechargeutil.currentPagePwdChecked(_pageId,submitbtn_id,"expiredBankWindow",recharge_input);
			}
		});
	}
	
	/**
	 * 销毁
	 * */
	function destroy(){
		$(_pageId + " #redeem_amount_input").val("");
		$(_pageId + " #expiredPwdWindow").hide();
		$(_pageId + " #expiredBankWindow").hide();
		$(_pageId + " #queryBalanceDiv #showbalance").hide();
		
		service.destroy();
	}
	
	var recharge = {
		"init" : init,
		"bindPageEvent" : bindPageEvent,
		"destroy" : destroy
	};
	
	module.exports = recharge;
});