define("project/scripts/cash/autorecharge",function(require,exports,module){
	var appUtils = require("appUtils"),
		layerUtils = require("layerUtils"),
		service = require("serviceImp").getInstance(),  //业务层接口，请求数据
	   _pageId = "#cash_autorecharge",
	   pwdCheckUtils = require("project/scripts/common/pwdCheckUtils");
    var gconfig = require("gconfig");
    var global = gconfig.global;
	var validatorUtil = require("validatorUtil");
    var common = require("project/scripts/common/common");
    var user=require("project/scripts/common/user");
    var utils=require("project/scripts/common/utils");

	//var user = require("project/scripts/include/user");
	//var userInfo = user.getUserInfo();//用户信息

	var submitbtn_id = "autorechargeBtn";

//    $(".click_back").click(function(){
//        appUtils.pageInit("cash/autorecharge", "cash/cashhasopened", {});
//    });
    var webHeight = document.documentElement.clientHeight;
//    var webWidth = document.documentElement.clientWidth;
    $(".page").height(webHeight );
	/**
	 * 初始化
	 * */


    $(".window").click(function(e){
        //判断鼠标位置
        var div = document.getElementById("expiredPwdWindow-in-a");
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

    function init(){

        $("#header_message").html("设置金额");
//        _pageId = "#cash_autorecharge";
//        utils.clickBack(_pageId);
		$(_pageId+" #autorechargeBtn").removeClass("oran-next-btn").addClass("gray-next-btn");
        $("#autorecharge_input").attr("placeholder", "最低" + global.min_auto_apply_threshold + "元");

        // placeholder="最低200元，当前设置为300元"
        layerUtils.iLoading(true,"请等待...",true);
        var jsonParam = {"fund_account":user.fund_account, "fund_code":user.fund_code};
        var currentinfoComplate = function(resultVo){
            if(resultVo.error_no == 0)
            {
                var resultDataJson = resultVo["results"][0];
                var resultData = JSON.parse(resultDataJson["result"]);
                //最低触发金额
                var auto_apply_threshold = resultData["auto_apply_threshold"];
                if(auto_apply_threshold != null)
                {
                    auto_apply_threshold = common.fmoney(auto_apply_threshold, 2);
                }
//				var tipInfo = "最低200元，当前设置为" + auto_apply_threshold + "元";
//				$(_pageId + " #autorecharge_input").attr("placeholder", tipInfo);
                $(_pageId + " #auto_apply_threshold").html(auto_apply_threshold);
                $(_pageId + " #autorecharge_string_tip").html(auto_apply_threshold);
            }
            else
            {
                //跳入新的页面

                layerUtils.iMsg(-1, resultVo.error_info);
                var jsonParam = {};
                appUtils.pageInit("cash/autorecharge","cash/cashhasopened",jsonParam);

                return false;
            }
        };
        //现金产品登记查询
        service.currentinfo(jsonParam,currentinfoComplate);
        layerUtils.iLoading(false);

	}

	
	/**
	 * 事件绑定
	 * */
	function bindPageEvent(){
//        utils.clickBack(_pageId);
        appUtils.bindEvent($(_pageId+" #autorecharge_input"),function(){
            var autorecharge_input = $(_pageId + " #autorecharge_input").val();
            if (/^(\+|-)?\d+($|\.\d+$)/.test( autorecharge_input ))
            {
                $(_pageId+" #autorechargeBtn").removeClass("gray-next-btn").addClass("oran-next-btn");
            }
        },"input propertychange");

        $(_pageId+" #nextBtn_r").click(function(){
            $(_pageId + " #expiredWindow").hide();
        });
        //点击确定
        $(_pageId + " #autorechargeBtn").click(function(){
            // 1检查输入是否数字
            // 2提交接口
            var autorecharge_input = $(_pageId + " #autorecharge_input").val();
            if (!/^(\+|-)?\d+($|\.\d+$)/.test( autorecharge_input ))
            {
                layerUtils.iMsg(-1,"保留金额必须为数字");
                return false;
            }
            if(autorecharge_input < global.min_auto_apply_threshold)
            {
                layerUtils.iMsg(-1,"保留金额最低" + global.min_auto_apply_threshold + "元");
                return false;
            }
            var auto_apply_threshold = autorecharge_input;

            // 测试数据
            /*
             */
            //交易密码输入框
            $(_pageId + " #expiredWindow").show();
            if($(_pageId + " #hiddenflag").val() == -1)
            {
                pwdCheckUtils.pwdChecked(_pageId,submitbtn_id);
            }
            else
            {
                $(_pageId + " #hiddenflag").val(-1);
                var password = $(_pageId + " #expiredWindow #password").val();
                var jsonParam = {"fund_account":user.fund_account,"fund_code":user.fund_code,"auto_apply_threshold":auto_apply_threshold,"password":user.password};
                var autoapplyComplate = function(resultVo){
                    $(_pageId + " #expiredWindow #password").val("");
                    $(_pageId + " #expiredWindow").hide();
                    if(resultVo.error_no == 0)
                    {
                        layerUtils.iMsg(-1,"修改成功",2);
                        setTimeout(function(){
                            var jsonParam = {};
                            appUtils.pageInit("cash/autorecharge","cash/autorecharge",jsonParam);
                        },2000);
                        return false;
                    }
                    else
                    {
                        layerUtils.iMsg(-1,resultVo.error_info);
                        return false;
                    }
                };
                //修改保留金额
                service.autoapply(jsonParam,autoapplyComplate);
            }
        });

	}
	/**
	 * 销毁
	 * */
	function destroy(){
		service.destroy();
		$(_pageId + " #autorecharge_input").val("");
		$(_pageId + " #autorecharge_input").attr("placeholder","");
		$(_pageId + " #expiredWindow").hide();
	}
	
	var autorecharge = {
		"init" : init,
		"bindPageEvent" : bindPageEvent,
		"destroy" : destroy
	};
	
	module.exports = autorecharge;
});