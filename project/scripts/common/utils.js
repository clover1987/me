/**
 * 通用工具类，将项目中的公用方法抽出来
 */
define(function(require,exports,module){
	
	var appUtils = require("appUtils"),
		service = require("serviceImp").getInstance(),  //业务层接口，请求数据
		layerUtils = require("layerUtils"),
		gconfig = require("gconfig"),
		global = gconfig.global;
		

	/**
	 * 计算页面滞留时间
	 * @param  weixin_pk 微信PK
     * @param	open_id   
     * @param	enter_time 页面进入时间 例如2014-05-10 12:25:30 233
     * @param	exit_time	退出时间   如上
     * @param 	duringtime 经过时间
     * @param	visit_url 访问页面的地址
     * @param	name_url  访问页面的title
	 */
	window.onbeforeunload = function(weixin_pk,open_id,enter_time,minutes,seconds,visit_url,name_url) {     
		var n = window.event.screenX - window.screenLeft;     
		var b = n > document.documentElement.scrollWidth-20;
		var date = new Date();
		var exit_time = "",
			duringtime = "";
		if(b && window.event.clientY < 0 || window.event.altKey) {  
			exit_time = getLocalTime();
			duringtime = (date.getMinutes() - minutes)*60+date.getSeconds()-seconds;
			var param = {
					"weixin_pk": weixin_pk,
					"open_id":open_id,
					"enter_time":enter_time,
					"exit_time":exit_time,
					"duringtime":duringtime,
					"visit_url":visit_url,
					"name_url":name_url
			};
			service.submitPageStayTime(param,function(){
				
			},true,false);
		} else{   
			
		}    
	}; 
	/**
	 * 计算页面停滞时间 当跳转下一页面
	 */
	var destroyGetStayPageTime = function(weixin_pk,open_id,enter_time,minutes,seconds,visit_url,name_url) {
		var date = new Date();
		var exit_time = "",
			duringtime = "";
		exit_time = getLocalTime();
		duringtime = (date.getMinutes() - minutes)*60+date.getSeconds()-seconds;
		var param = {
				"weixin_pk": weixin_pk,
				"open_id":open_id,
				"enter_time":enter_time,
				"exit_time":exit_time,
				"duringtime":duringtime,
				"visit_url":visit_url,
				"name_url":name_url
		};
		service.submitPageStayTime(param,function(){
			
		},true,false);
	};
	/**
	 * 获取当前格式化系统时间
	 */
	var getLocalTime = function(){
		var date = new Date();
		return  date.format("yyyy-MM-dd hh:mm:ss")+" "+date.getMilliseconds();
	};

    var getLocalTime2=function(){

        var date=new Date();
        return date.format("yyyyMMdd");
    };

	Date.prototype.format = function(format){ 
		var o = { 
		"M+" : this.getMonth()+1, //month 
		"d+" : this.getDate(), //day 
		"h+" : this.getHours(), //hour 
		"m+" : this.getMinutes(), //minute 
		"s+" : this.getSeconds(), //second 
		"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
		"S" : this.getMilliseconds() //millisecond 
		} 

		if(/(y+)/.test(format)) { 
		format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
		} 

		for(var k in o) { 
		if(new RegExp("("+ k +")").test(format)) { 
		format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
		} 
		} 
		return format; 
	};
	/**
	 * 数字滚动
	 */
	var moveNum = function (g,h){
		var a=[];
		var b=0;
		var c = [];
		var d = g;
		var e = (g+"").split("");
		var f = 0;
		for(var i=e.length-1;i>=0;i--){
			if(e[i]>='0' && e[i]<='9'){
				a.push(e[i]);	
				c.push(i);
				$(h).prepend("<span id=a"+i+">0</>");
			}else{
				$(h).prepend("<span>"+e[i]+"</span>");
			}
		}
		move(h,d);
		function move(g,d){
			var k=0;
			var p=window.setInterval(function(){
			$(g+" #a"+c[f]).html(k);
			if(k==a[b]){
			    window.clearInterval(p);
			    b++;
			    if(a[b]){
			    	move(h,d);
			    	f++;
			    }else{
			    	$(h).html(d);
			    }
			}
			k++;
			},20);
		}
	}

//                $(".header-menu-u").click(function(){
//                    layerUtils.iMsg(-1, "亲，请您先登录！");
//                });

        $(".click_back").click(function(){
//            appUtils.pageInit("cash/cashhasopened", "mine/iHasBind", {});
            var len=$(".page").length;
            for(var i=0;i<len;i++){
                var page_val=$(".page").eq(i).attr("data-display");
                if(page_val=="block"){
                    var urlId=$(".page").eq(i).attr("id");
                    //            if(_pageId=="#mine_iHasBind"){
//                return false;
//            }
                    if(urlId=="cash_cashhasopened"){

                        appUtils.pageInit("cash/cashhasopened", "mine/iHasBind", {});
                        $("#"+urlId).css("height","100%");
                        $("#mine_iHasBind").css("height","100%");
                        return false;
                    }
                    if(urlId=="yjb_yjb_i_jtt_unbind_success"){

                        appUtils.pageInit("yjb/yjb_i_jtt_unbbind_success", "mine/iHasBind", {});
                        $("#"+urlId).css("height","100%");
                        $("#mine_iHasBind").css("height","100%");
                        return false;
                    }
                    if(urlId=="yjb_yjb_i_jtt_unbind_fail"){
                        appUtils.pageInit("yjb/yjb_i_jtt_unbind_fail", "mine/iHasBind", {});
                        $("#"+urlId).css("height","100%");
                        $("#mine_iHasBind").css("height","100%");
                        return false;
                    }
                    if(urlId=="yjb_yjb_i_remind_set"){
                        appUtils.pageInit("yjb/yjb_i_remind_set", "mine/iHasBind", {});
                        $("#"+urlId).css("height","100%");
                        $("#mine_iHasBind").css("height","100%");
                        return false;
                    }
                    if(urlId=="yjb_yjb_i_jtt_commonProblem"){
                        appUtils.pageInit("yjb/yjb_i_jtt_commonProblem","cash/cashhasopened");
                        $("#"+urlId).css("height","100%");
                        $("#cash_cashhasopened").css("height","100%");
                        return false;
                    }
                    //...............................................................................................

                    if(urlId=="cash_applyamount"){
                        appUtils.pageInit("cash/applyamount", "cash/cashhasopened", {});
                        $("#"+urlId).css("height","100%");
                        $("#cash_cashhasopened").css("height","100%");
                        return false;
                    }
                    if(urlId=="cash_totalreturn"){
                        appUtils.pageInit("cash/totalreturn", "cash/cashhasopened", {});
                        $("#"+urlId).css("height","100%");
                        $("#cash_cashhasopened").css("height","100%");
                        return false;
                    }
                    if(urlId=="cash_dailyprofit"){
                        appUtils.pageInit("cash/dailyprofit", "cash/cashhasopened", {});
                        $("#"+urlId).css("height","100%");
                        $("#cash_cashhasopened").css("height","100%");
                        return false;
                    }
                    if(urlId=="cash_latestweeklyyield"){
                        appUtils.pageInit("cash/latestweeklyyield", "cash/cashhasopened", {});
                        $("#"+urlId).css("height","100%");
                        $("#cash_cashhasopened").css("height","100%");
                        return false;
                    }
                    if(urlId=="cash_recharge"){
                        appUtils.pageInit("cash/recharge", "cash/cashhasopened", {});
                        $("#"+urlId).css("height","100%");
                        $("#cash_cashhasopened").css("height","100%");
                        return false;
                    }
                    if(urlId=="cash_takenback"){
                        appUtils.pageInit("cash/takenback", "cash/cashhasopened", {});
                        $("#"+urlId).css("height","100%");
                        $("#cash_cashhasopened").css("height","100%");
                        return false;
                    }

                    //cash_rechargehistory
                    if(urlId=="cash_rechargehistory"){
                        appUtils.pageInit("cash/rechargehistory", "cash/cashhasopened", {});
                        $("#"+urlId).css("height","100%");
                        $("#cash_cashhasopened").css("height","100%");
                        return false;
                    }
                    if(urlId=="cash_autorecharge"){
                        appUtils.pageInit("cash/autorecharge", "cash/cashhasopened", {});
                        $("#"+urlId).css("height","100%");
                        $("#cash_cashhasopened").css("height","100%");
                        return false;
                    }
                    if(urlId=="cash_takenbackhistory"){
                        appUtils.pageInit("cash/takenbackhistory", "cash/cashhasopened", {});
                        $("#"+urlId).css("height","100%");
                        $("#cash_cashhasopened").css("height","100%");
                        return false;
                    }

                }
            }
        });


//    }

	
	var utils = {
//            "clickBack":clickBack,
			"getLocalTime":getLocalTime,
             "getLocalTime2":getLocalTime2,
			"onbeforeunload":onbeforeunload,
			"destroyGetStayPageTime":destroyGetStayPageTime,
			"moveNum":moveNum
	};
	
	module.exports = utils;
});