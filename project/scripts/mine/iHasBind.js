define("project/scripts/mine/iHasBind",function(require,exports,module){
	var appUtils = require("appUtils");

	var	layerUtils = require("layerUtils");
	var	service = require("serviceImp").getInstance();
	var _pageId = "#mine_iHasBind";  
	require("project/scripts/common/raphael");
	var canvas = require("project/scripts/common/canvas2");
    var user=require("project/scripts/common/user");
    var validate=require("project/scripts/common/yjb/Validate");

    //创建菜单
    //左上菜单和菜单弹出收起效果
//    var webHeight = document.documentElement.clientHeight;
//    $(".header .menu").height(webHeight );



    var utils=require("project/scripts/common/utils");


    var mobile ="";
    var tel = "";
    var address = "";




 	function init(){
//        appUtils.isLoginIn();
        var webHeight = document.documentElement.clientHeight;
        $(".header .menu").height(webHeight );
//        var temp=0;



        $(document).ready(function(){




            $(".header-menu-h").click(function(){


                if ($(".moveBody").css("position")=="relative") {
                    $(".moveBody").animate({
                        left: "86%"
                    }, "slow",function(){
                        $(".moveBody").css("position", "fixed");
                    });
//                $(".footer").animate({
//                    left: "86%"
//                }, "slow");

                } else if($(".moveBody").css("position")=="fixed") {
                    $(".moveBody").animate({
                        left: 0
                    }, "slow",function(){
                        $(".moveBody").css("position", "relative");
                    });
//                $(".footer").animate({
//                    left: 0
//                }, "slow");
                }
            });
        });


//
        queryStock();
        queryPersonInfo();

        //init菜单初始化导入init菜单初始化导入init菜单初始化导入
        //init菜单初始化导入init菜单初始化导入init菜单初始化导入
        //init菜单初始化导入init菜单初始化导入init菜单初始化导入
        $(function(){

            //问候语
            queryPersonInfo_2();
            //鼠标聚焦input
            $("#mobile").focus(function(){
                if(($("#tel").attr("readonly")==="readonly")&&($("#address").attr("readonly")==="readonly")){
                    $("#mobile").removeAttr("readonly");
                    $("#mobile_b").show();
                    $("#mobile_e").hide();
                    $(".menu-item-getCaptcha").hide();
                    $(".modifyMobile").addClass("menu_item_blue");
                    $(".modifyMobile .menu-item-left").addClass("menu_item_left_blue");
                }else{
                    layerUtils.iMsg(-1,"请完成正在编辑的信息！");
                }
            });
            $("#tel").focus(function(){
                if(($("#mobile").attr("readonly")==="readonly")&&($("#address").attr("readonly")==="readonly")){
                    $("#tel").removeAttr("readonly");
                    $("#tel_b").show();
                    $("#tel_e").hide();
                    //menu-item-getCaptcha
                    $(".modifyTel").addClass("menu_item_blue");
                    $(".modifyTel .menu-item-left").addClass("menu_item_left_blue");
                }else{
                    layerUtils.iMsg(-1,"请完成正在编辑的信息！");
                }
            });
            $("#address").focus(function(){
                if(($("#mobile").attr("readonly")==="readonly")&&($("#tel").attr("readonly")==="readonly")){
                    $("#address").removeAttr("readonly");
                    $("#address_b").show();
                    $("#address_e").hide();
                    //menu-item-getCaptcha
                    $(".modifyAddress").addClass("menu_item_blue");
                    $(".modifyAddress .menu-item-left").addClass("menu_item_left_blue");
                }else{
                    layerUtils.iMsg(-1,"请完成正在编辑的信息！");
                }
            });
            //鼠标移出input
            $("#mobile").blur(function(){
                $("#mobile_b").hide();
                $("#mobile_e").show();
                $(".modifyMobile").removeClass("menu_item_blue");
                $(".modifyMobile .menu-item-left").removeClass("menu_item_left_blue");
                var inputVal = $.trim($("#mobile").val());
                var result = "";
                result = validate.checkMobile(inputVal);
                if(result.code<1){
                    layerUtils.iMsg(-1,"您的移动电话格式错误");
                    $("#mobile").removeAttr("readonly");
                    $("#mobile_b").show();
                    $("#mobile_e").hide();
                    //menu-item-getCaptcha
                    $(".modifyMobile").addClass("menu_item_blue");
                    $(".modifyMobile .menu-item-left").addClass("menu_item_left_blue");
                }else{
                    if (inputVal != mobile)
                    {
                        $(".menu-item-getCaptcha").show();
                        updatePersonInfo();
                        $("#mobile").attr("readonly","readonly");
                    }else{
                        $("#mobile").attr("readonly","readonly");
                    }
                }
            });
            $("#tel").blur(function(){
                $("#tel_b").hide();
                $("#tel_e").show();
                //menu-item-getCaptcha
                $(".modifyTel").removeClass("menu_item_blue");
                $(".modifyTel .menu-item-left").removeClass("menu_item_left_blue");
                var inputVal = $.trim($("#tel").val());
                var result = "";
                result = validate.checkTel(inputVal);
                if(result.code<1){
                    layerUtils.iMsg(-1,"您的电话号码格式错误");
                    $("#tel").removeAttr("readonly");
                    $("#tel_b").show();
                    $("#tel_e").hide();
                    //menu-item-getCaptcha
                    $(".modifyTel").addClass("menu_item_blue");
                    $(".modifyTel .menu-item-left").addClass("menu_item_left_blue");
                }else{
                    if (inputVal != tel)
                    {
                        updatePersonInfo();
                        $("#tel").attr("readonly","readonly");
                    }else{
                        $("#tel").attr("readonly","readonly");
                    }
                }
            });
            $("#address").blur(function(){
                $("#address_b").hide();
                $("#address_e").show();
                //menu-item-getCaptcha
                $(".modifyAddress").removeClass("menu_item_blue");
                $(".modifyAddress .menu-item-left").removeClass("menu_item_left_blue");
                var inputVal = $.trim($("#address").val());
                var result = "";
                result = validate.checkAddress(inputVal);
                if(result.code<1){
                    layerUtils.iMsg(-1,"您的地址格式错误");
                    $("#address").removeAttr("readonly");
                    $("#address_b").show();
                    $("#address_e").hide();
                    //menu-item-getCaptcha
                    $(".modifyAddress").addClass("menu_item_blue");
                    $(".modifyAddress .menu-item-left").addClass("menu_item_left_blue");
                }else{
                    if (inputVal != address)
                    {
                        updatePersonInfo();
                        $("#address").attr("readonly","readonly");
                    }else{
                        $("#address").attr("readonly","readonly");
                    }
                }
            });
            $("#menu .menu-item-edit").click(function(e){
                $(this).parent().find("input").focus();
            });
        });
    }
    function greetHtml(){
        var hour = new Date().getHours(),
            minute = new Date().getMinutes(),
            greet = "";//问候
        if(hour >= 5 && hour <= 9){
            greet = "早上好！记得吃早餐，一天才有精神哦！";
        }
        else if(hour >= 9 && hour < 10){
            greet = "一日之计在于晨，读下宝宝的微资讯吧！";
        }
        else if(hour >= 10 && hour <= 11||(hour == 11 &&  minute <= 30)){
            greet = "盘中跌宕起伏，宝宝陪您一起股海掘金！";
        }
        else if((hour > 11 && hour < 13)||(hour == 11 && minute > 30)){
            greet = "休息一下，尽情享受午后慵懒的小憩吧！";
        }
        else if(hour >= 13 && hour < 15){
            greet = "为了生活中的美好，宝宝陪您一起努力!";
        }
        else if(hour >= 15 && hour < 17){
            greet = "收盘啦，宝宝为您闲置资金理财不停歇！";
        }
        else if(hour >= 17 && hour < 20){
            greet = "晚餐时间，和家人朋友一起尽情欢乐吧！";
        }
        else if(hour >= 20 && hour < 23){
            greet = "夜幕降临，与宝宝一起共度精彩夜生活！";
        }
        else if(hour >= 23){
            greet = "夜深了，宝宝伴您一同入眠，好梦哦！";
        }
        else if(hour >= 0 && hour < 1){
            greet = "夜深了，宝宝伴您一同入眠，祝好梦哦！";
        }
        else if(hour >= 1 && hour < 5){
            greet = "凌晨了，宝宝伴您一同入眠，祝好梦哦！";
        }
        return greet;
    }
    //获取用户信息
    function queryPersonInfo(){
        var param = {
            "fund_account":user.fund_account
        };
        //查询个人信息 （方案1 直接查询接口）
        service.userInfoQuery(param,function(data){
            var error_no = data.error_no,
                error_info = data.error_info;
            if(error_no == "0"){
                var results = JSON.parse(data["results"][0]["result"]);//数据结果
                //客户姓名
                if(results["client_name"] != undefined&& results["client_name"].length > 0){
                    //填充姓名和问候内容
                    $(" #username").html("<strong>KING"+results["client_name"]+"</strong>");
                    $(" .menu-title-text").html(greetHtml());
                }
                //手机号码
                if(results["mobile"] != undefined&& results["mobile"].length > 0){
                    //$("#pingfen").val(title);
                    $(" #mobile").val(results["mobile"]);//填充手机号码
                }
                //联系电话
                if(results["tel"] != undefined&& results["tel"].length > 0){
                    $(" #tel").val(results["tel"]);//填充手机号码
                }
                //联系地址
                if(results["address"] != undefined&& results["address"].length > 0){
                    $(" #address").val(results["address"]);
                }

                mobile = $.trim($(" #mobile").val());
                tel = $.trim($(" #tel").val());
                address = $.trim($(" #address").val());

            }else{
                layerUtils.iMsg(-1,error_info);
                return false;
            }
        },true,true,function(){
            layerUtils.iMsg(-1,"获取个人信息失败");
        });
    }
    //fund_account	String	资金账户	Y	　
    //mobile	String	手机号码	N	　
    //tel	String	联系电话	N	　
    //address	String	联系地址	N	　
    //password	String	用户密码	Y
    function updatePersonInfo(){
        tel=$("#tel").val();
        mobile=$("#mobile").val();
        address=$("#address").val();
        var param = {
            "fund_account":user.fund_account,
            "password":user.password,
            "tel":tel,
            "mobile":mobile,
            "address":address
        };
        service.userInfoUpdate(param,function(data){
            var error_no = data.error_no,
                error_info = data.error_info;
            if(error_no == "0"){
                //layerUtils.iMsg(-1,"用户信息更新成功！");
            }else{
                layerUtils.iMsg(-1,error_info);
                var jsonParam = {};
                appUtils.pageInit("yjb/yjb_i_menu","mine/iHasBind",jsonParam);
                return false;
            }
        },true,true,function(){
            layerUtils.iMsg(-1,"获取个人信息失败");
        });
	}

	/**
	 * 事件绑定
	 * */
	function bindPageEvent(){
        $("#nextBtn_r").click(function(){
            $("#expiredPwdWindow").hide();
        });

        $(_pageId+" #cashManagement").click(function(){
            var jsonParam_r={
                "fund_account":user.fund_account,
                "fund_code":user.fund_code
            };
            service.currentinfo(jsonParam_r, function (data) {
                var error_info2=data.error_info;
                if (data.error_no == 0) {
                    //如果正确则进入签订接口
                    console.log("现金产品登记查询接口调用成功 " + data);
                    //进入查看理财产品页面
                    var jsonParam={

                    };
                    appUtils.pageInit("mine/iHasBind", "cash/cashhasopened", jsonParam);

                }else if(data.error_no==2030001){
                    //进入购买页面
                    var jsonParam={
                    };
                    appUtils.pageInit("mine/iHasBind", "yjb/yjb_i_jtt_unbind", jsonParam);
                }
                else if(data.error_no==2030006) {
                    //基金账户开户失败
                    var jsonParam={
                    };
                    appUtils.pageInit("mine/iHasBind", "yjb/yjb_i_jtt_unbind_fail", jsonParam);

                }else if(data.error_no==2030015){
                    //基金账户未确认
                    var jsonParam={
                    };  // 在unbind_success页面中调用待完成的接口
                    appUtils.pageInit("mine/iHasBind", "yjb/yjb_i_jtt_unbind_success", jsonParam);

                }else if(data.error_no==-302010){
                       alert("网络连接异常！");
                }

                else{
                    var jsonParam={
                    };
                    appUtils.pageInit("mine/iHasBind", "yjb/yjb_i_jtt_unbind_fail", jsonParam);
//                    layerUtils.iMsg(-1,error_info2);
//                    return false;
                }
            },true,true,function(){
                layerUtils.iMsg(-1,"现金产品登记查询失败");
            });
        });

        $(_pageId+" #myAccount").click(function(){

           // alert("点击我的账户");
        });

        $(_pageId+" #myRemind").click(function(){
            var jsonParam={
            };
            appUtils.pageInit("mine/iHasBind", "yjb/yjb_i_remind_set", jsonParam);
//            appUtils.pageInit("mine/iHasBind", "yjb/yjb_i_menu", jsonParam);
        });

        //菜单 重新导入事件菜单 重新导入事件菜单 重新导入事件
        //菜单 重新导入事件菜单 重新导入事件菜单 重新导入事件
        //菜单 重新导入事件菜单 重新导入事件菜单 重新导入事件

        //提醒这块还没开始做，临时注释
//        $("#remindset").click(function(){
//            var jsonParam={};
//            appUtils.pageInit("yjb/yjb_i_menu", "yjb/yjb_i_remind_set", jsonParam);
//        });
//        function test1(f){
//            var d = document.getElementById('test'),wh = getWH(f);
//            d.style.cssText +=";width:"+wh.w+'px;height:'+wh.h+'px'
//        }
//        var getWH = function (){
//            var d = document,doc = d[d.compatMode == "CSS1Compat"?'documentElement':'body'];
//            return function(f){
//                return {
//                    w:doc[(f?'client':'scroll')+'Width'],
//                    h:f?doc.clientHeight:Math.max(doc.clientHeight,doc.scrollHeight)
//                }
//            }
//        }()
        $( "#changePass_j").click(function(){
//            test1();
            $(" #nextBtn").attr("data","2");
            $(" .text").html("修改交易密码");
            $(" #expiredPwdWindow").show();
        });

        $("#changePass_z").click(function(){
            $(" #nextBtn").attr("data","1");
            $(" .text").html("修改资金密码");
            $(" #expiredPwdWindow").show();
        });
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
                $(" #expiredPwdWindow").hide();
                $(" #errorTips").html("");
                $(" #password").val("");
                $(" #newPassword").val("");
                $(" #reNewPassword").val("");
            }
        });
        $("#nextBtn").click(function(){
            if($(" #errorTips").html()!=""){
                $(" #expiredPwdWindow").hide();
                $(" #errorTips").html("");
                $(" #password").val("");
                $(" #newPassword").val("");
                $(" #reNewPassword").val("");
                return false;
            }
            var passwordType=$(" #nextBtn").attr("data");
            var password;
            var newPassword;
            var reNewPassword;
            password=$(" #password").val();
            newPassword=$(" #newPassword").val();
            reNewPassword=$(" #reNewPassword").val();
            //验证初始密码正确
            //验证两次输入密码一致
            /**
             * //修改资金密码、修改交易密码(112)
             * @param MobileCode        String 手机号（手机取）
             * @param Token             String 时间戳（手机取）
             * @param Reqno             Number 请求标示
             * @param PASSWORDTYPE      Number 密码类型 ('1'：资金密码  '2'：交易密码)
             * @param PassWord          String 老密码
             * @param NewPassword       String 新密码
             **/
            var jsonParam={
                "MobileCode":user.MobileCode,
                "Token":user.Token,
                "Reqno":user.Reqno,
                "PASSWORDTYPE":passwordType,
                "PassWord":password,
                "NewPassword":reNewPassword
            };
            service.modifyPassword(jsonParam,function(data){
                var error_no = data.ERRORNO,
                    error_info = data.ERRORMESSAGE;
                if(error_no == "0"){
                    $(" #expiredPwdWindow").hidden();
                    layerUtils.iMsg(-1,"密码修改成功！");
                }else{
                    if(error_info==""){
                        $(" #errorTips").html("出现未知错误");
                    }else{
                        $(" #errorTips").html(error_info);
                    }
                    return false;
                }
            },true,true,function(){
                $(" #errorTips").html("密码修改失败");
            });
        });


	}
	/**
	 * 查询证券信息
	 */
	function queryStock(){
		//证券账户资产信息统计查询
		var param = {
			"fund_account":user.fund_account,
            "password":user.password,
			"money_type":0
		};

		service.assetSummaryInfo(param,function(data){

			var error_no = data.error_no;
			var	error_info = data.error_info;
			if(error_no == "0"){
				var results = JSON.parse(data["results"][0]["result"]);
			if(results != null && results.length != 0 && results[0]["asset_amount"] != 0)
			{
				$(" #hasassetDiv").show();
				for(var i = 0;i< results.length; i++){
					//资产总值(元）
					if(results[i]["asset_amount"] != undefined&& (results[i]["asset_amount"]+"").length > 0){
						appUtils.setLStorageInfo("asset_amount",results[i]["asset_amount"]);
					}
					//可用余额（元）
					if(results[i]["asset_balance"] != undefined&& (results[i]["asset_balance"]+"").length > 0){
						appUtils.setLStorageInfo("asset_balance",results[i]["asset_balance"].toFixed(2));
					}
					//可取余额（元）
					if(results[i]["asset_available_balance"] != undefined&& (results[i]["asset_available_balance"]+"").length > 0){
						appUtils.setLStorageInfo("asset_available_balance",results[i]["asset_available_balance"].toFixed(2));
					}
					//账户收益（元）
					if(results[i]["asset_return"] != undefined&& (results[i]["asset_return"]+"").length > 0){
						appUtils.setLStorageInfo("asset_return",results[i]["asset_return"]);
					}
					//股票总市值（元）
					if(results[i]["stock_marketvalue"] != undefined&& (results[i]["stock_marketvalue"]+"").length > 0){
						appUtils.setLStorageInfo("stock_marketvalue",results[i]["stock_marketvalue"]);
					}
					//证券总市值（元）
					if(results[i]["secu_marketvalue"] != undefined&& (results[i]["secu_marketvalue"]+"").length > 0){
						appUtils.setLStorageInfo("secu_marketvalue",results[i]["secu_marketvalue"]);
//						$(_pageId+" .a1 strong").html("总市值："+(results[i]["secu_marketvalue"]-0.0).toFixed(2));
					}
				}
				var val1 = results[0]["asset_amount"],
					val2 = results[0]["secu_marketvalue"],
					val3 = results[0]["asset_available_balance"],
					val4 = results[0]["asset_balance"],
					val5 = results[0]["asset_return"]; 
				if(results[0]["asset_amount"] > 0){
						drawCircle(val1,val2,val3,val4,val5);
				}else{
					$(" #hasassetDiv").hide();
					$(" #noassetDiv").show();
					$(" #return").show();
					val5 >= 0? $(" #asset_return").attr("style","color:#FE4541"):
						   		$(" #asset_return").attr("style","color:#2C8EE3");
					val5 >= 0? $(" #asset_return").html("+"+parseNum(val5)):
						   		$(" #asset_return").html(parseNum(val5));
				}
			}
			else
			{

				$(" #hasassetDiv").hide();
				$(" #noassetDiv").show();
			}
					
		}else{
			layerUtils.iMsg(-1,error_info);
			return false;
		}
		},true,true,function(){
			layerUtils.iMsg(-1,"获取资产信息失败");
		});
	}
	
	/**
	 * 查询个人信息
	 */
	function queryPersonInfo_2(){
		var param = {
				"fund_account":user.fund_account
		};
		//查询个人信息
		service.userInfoQuery(param,function(data){
			var error_no = data.error_no,
			error_info = data.error_info;
			if(error_no == "0"){
				var results = JSON.parse(data["results"][0]["result"]);//数据结果		
			  //客户ID
				if(results["client_id"] != undefined&& results["client_id"].length > 0){
					appUtils.setLStorageInfo("client_id",results["client_id"]);
				}
			    //客户姓名
				if(results["client_name"] != undefined&& results["client_name"].length > 0){
					appUtils.setLStorageInfo("client_name",results["client_name"]);
					//填充姓名和问候内容
					$(" #username_1").html("<strong>"+results["client_name"]+"</strong>"+greetHtml());
				}
				if(results["gender"] != undefined&& results["gender"].length > 0){
					appUtils.setLStorageInfo("gender",results["gender"]);
				}
				  //手机号码
				if(results["mobile"] != undefined&& results["mobile"].length > 0){
					appUtils.setLStorageInfo("mobile",results["mobile"]);
//					$(_pageId+" .a3 strong").html("手机号码："+ results["mobile"]);//填充手机号码
				}
				  //联系电话
				if(results["tel"] != undefined&& results["tel"].length > 0){
					appUtils.setLStorageInfo("tel",results["tel"]);
				}
				  //联系地址
				if(results["address"] != undefined&& results["address"].length > 0){
					appUtils.setLStorageInfo("address",results["address"]);
				}
			}else{
				layerUtils.iMsg(-1,error_info);
				return false;
			}
		},true,true,function(){
			layerUtils.iMsg(-1,"获取个人信息失败");
		});
	}
	/**
	 * 问候内容
	 */
	function greetHtml(){
		var hour = new Date().getHours(),
		minute = new Date().getMinutes(),
		greet = "";//问候
	if(hour >= 5 && hour <= 9){
		greet = "早上好！记得吃早餐，一天才有精神哦！";
	}
	else if(hour >= 9 && hour < 10){
		greet = "一日之计在于晨，读下宝宝的微资讯吧！";
	}
	else if(hour >= 10 && hour <= 11||(hour == 11 &&  minute <= 30)){
		greet = "盘中跌宕起伏，宝宝陪您一起股海掘金！";
	}
	else if((hour > 11 && hour < 13)||(hour == 11 && minute > 30)){
		greet = "休息一下，尽情享受午后慵懒的小憩吧！";
	}
	else if(hour >= 13 && hour < 15){
		greet = "为了生活中的美好，宝宝陪您一起努力!";
	}
	else if(hour >= 15 && hour < 17){
		greet = "收盘啦，宝宝为您闲置资金理财不停歇！";
	}
	else if(hour >= 17 && hour < 20){
		greet = "晚餐时间，和家人朋友一起尽情欢乐吧！";
	}
	else if(hour >= 20 && hour < 23){
		greet = "夜幕降临，与宝宝一起共度精彩夜生活！";
	}
	else if(hour >= 23){
		greet = "夜深了，宝宝伴您一同入眠，好梦哦！";
	}
	else if(hour >= 0 && hour < 1){
		greet = "夜深了，宝宝伴您一同入眠，祝好梦哦！";
	}
	else if(hour >= 1 && hour < 5){
		greet = "凌晨了，宝宝伴您一同入眠，祝好梦哦！";
	}
	return greet;
	}
	/**
	 * 画饼图
	 */
	function drawCircle(val1,val2,val3,val4,val5){
		$(" #canvas").html("");
		$(" #asset_amount").html(parseNum(val1));
		$(" #secu_marketvalue").html(parseNum(val2));
		$(" #asset_available_balance").html(parseNum(val3));
		$(" #asset_balance").html(parseNum(val4));
		val5 >= 0? $(" #asset_return").attr("style","color:#FE4541"):
	   			   $(" #asset_return").attr("style","color:#2C8EE3");
		val5 >= 0? $(" #asset_return").html("+"+parseNum(val5)):
				   $(" #asset_return").html(parseNum(val5));
		canvas.chartCircle(val1,val2,val3,val4);
	}
	/**
	 * 数据处理
	 */
	function parseNum(num){
		var number = num;
		var isNegativeNum = false;
		if(num < 0){
			number = -num;
			isNegativeNum = true;
		}
		if(number<10000){
			if(isNegativeNum){
				return -number.toFixed(2)+"<b class='value-unit'>元</b>";
			}
			return (number != undefined ? number.toFixed(2) : 0) + "<b class='value-unit'>元</b>";
		}
		if(number >= 10000 && number < 100000000){
			if(isNegativeNum){
				return -(number/10000).toFixed(2)+"<b class='value-unit'>万元</b>";
			}
			return (number/10000).toFixed(2)+"<b class='value-unit'>万元</b>";
		}
		if(number >= 100000000){
			var ths = parseInt(((number/100000000).toFixed(4)+"").split(".")[1]);
			if(isNegativeNum){
				return -parseInt(number/100000000)+"<b class='value-unit'>亿</b>"+(ths==0?"":ths+"<b class='value-unit'>万元</b>");
			}
			return parseInt(number/100000000)+"<b class='value-unit'>亿</b>"+(ths==0?"":ths+"<b class='value-unit'>万元</b>");
		}
		if(isNegativeNum){
			return -number.toFixed(2);
		}
		return number.toFixed(2);
	}
	/**
	 * 清理页面元素
	 */
	function cleanElement(){
		$(" #nodataimg").hide();
	}
	/**
	 * 销毁
	 * */
	function destroy(){
		cleanElement();
		service.destroy();
        $("mine_iHasBind").remove();
	}
	var iHasBind = {
		"init" : init,
		"bindPageEvent" : bindPageEvent,
		"destroy" : destroy
		
	};
	
	module.exports = iHasBind;
});