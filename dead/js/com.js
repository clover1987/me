//自定义参数
var cRequestSign = "/reqxml",
	branchNo = '33',
	isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
	hasTouch = 'ontouchstart' in window && !isTouchPad,
	START_EV = hasTouch ? 'touchstart' : 'mousedown',
	MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
	END_EV = hasTouch ? 'touchend' : 'mouseup',
	TAP = 'tap';
	CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup';
var app = navigator.appVersion;
	app = app.toLocaleLowerCase();
function onJsOverrideUrlLoading(str){
     if(app.indexOf("windows phone")>0){
         window.external.notify(str);
     }else if(app.indexOf("iphone")>0){
             window.location.href=str;
     }else if(app.indexOf("android")>0){
		 window.MyWebView.onJsOverrideUrlLoading(str);
     }else{
         window.location.href = str;
     }
}
//通用ajax请求出错处理
function ajaxError(XMLHttpRequest, textStatus, errorThrown) {
    var message = "";
    switch (textStatus) {
        case 'timeout':
            message = "请求超时.";
	        alert(message);
            break;
        case 'parsererror':
            message = "数据格式出错.";
	        alert(message);
            break;
        default:
        return false;
    }
	return false;
}
function getData(requestUrl, requestData, cfunc,oConfig){ //回调函数 cfunc

console.log("requestUrl: " + requestUrl);
/*
console.log("requestData: ");
console.log(requestData);
console.log("oConfig: ");
console.log(oConfig);
*/

	 var 
	 oDefConfig = {
		type: "POST",
		url: requestUrl,
		data: requestData,
		contentType: "application/x-www-form-urlencoded;", //避免乱码
		success: function(data){
			if(data.ERRORNO < 0 && !(data.ERRORMESSAGE == null|| data.ERRORMESSAGE == '')){
				oConfig && oConfig.error && oConfig.error(data);
		        alert(data.ERRORMESSAGE);
				return false;
			}else{cfunc && cfunc(data); }
		},
		error: ajaxError
	},
	oAjaxParm = {},
	oParam = oConfig || {};
	if(oParam){
		delete oParam.url;
		delete oParam.success;
	}
oAjaxParm = $.extend(oDefConfig, oParam);
	return $.ajax(oAjaxParm);
}
//获取url中的参数
function getUrlParameter(parameterName){
	var reg = new RegExp("(^|&)" + parameterName + "=([^&]*)(&|$)", "i");
	var arr = window.location.search.substr(1).match(reg);
	if (arr) {
		return arr[2];
	} else return null;
}
//解析xml文档
function selectXmlAttr(xml, target, attr){
	var objArr = $(xml).find(target);
	var result = [];
	if(objArr.length){
		for(var i=0; i<objArr.length; i++){
			result.push(objArr.eq(i).attr(attr));
		}
		return result;
	}else{
		return false;
	}
};
function calculateHeight(id, iCutHeight) {
	var iAllHeight = document.documentElement.clientHeight;
	var oWrapper = document.getElementById(id);
	var oScroller = oWrapper.children[0];
	var oCont = oWrapper.parentNode || null;
	var iHeight = iAllHeight - iCutHeight;
	var iScrollHeight = oScroller.offsetHeight;
	if (iHeight < iScrollHeight) {
		oWrapper.style.height = iHeight + "px";
		return true;
	} else {
		if (oCont) {
			oCont.style.height = iHeight + 25 + "px";
		}
		oWrapper.style.height = iScrollHeight + "px";
		return false;
	}
}
function getValue(xml, target)
{
	var objArr = $(xml).find(target);
	var result = [];
	if(objArr.length){
		for(var i=0; i<objArr.length; i++){
			result.push(objArr.eq(i).text());
		}
		return result;
	}else{
		return false;
	}
}
/*
	模拟checkbox选中
	WY.2013/11/20
*/
function ckbox(id, sClass, activeClass, callback){
	$(id).bind('click', function(){
		var that = $(this).find(sClass),
			selected = that.hasClass(activeClass);
		if(selected){ //已选中
			that.removeClass(activeClass);
		}else{ //未选中
			that.addClass(activeClass);
			callback && callback($(this).children().eq(1).html());
		}
	});
};
// 模拟radio
function simRadio(obj, sClass, iIndex, callback) {
	var iIndex = iIndex;
	obj.bind('click', function(){
		if (iIndex === $(this).index()-1) return;
		obj.eq(iIndex).find(sClass).removeClass(activeClass);
		$(this).find(sClass).addClass(activeClass);
		iIndex = $(this).index()-1;
		callback && callback(obj, iIndex);
	});
};
/*
	模拟多个radio选中
	WY.2013/11/20
*/
function rdselect(id){
	var sCurrent = 'cssspaned'; //高亮样式
	$(id+" .radio").live(TAP, function(){
		var oThis = $(this);
		var ed = oThis.find('span').hasClass(sCurrent);
		if(!ed){ //点击前状态未选中
			$(id+' span.'+sCurrent).removeClass(sCurrent);
			oThis.find('span').addClass(sCurrent);
		}
	});
}
/*
	模拟点击按钮时类似 a:hover 效果
	WY.2013/11/20
*/
function btnActive(id, classname, func){
	$(id).live(START_EV+" "+END_EV, function(event){
		if(event.type == START_EV){
			$(id).addClass(classname);
		}else{
			$(id).removeClass(classname);
			func();
		}
	});
}
/*
	按钮可用倒计时
	WY.2013/11/20
*/
function timeinterval(id, text, cfunc){
	var endtime = 6000;
	var time = 1000;
	var showtime = endtime;
	$(id).html(text+'(' + endtime/1000 + ')');
	var interval = setInterval(clock, time);
	function clock(){
		showtime = showtime - time;
		$(id).html(text+'(' + showtime/1000 + ')');
	}
	setTimeout(function(){
		clearInterval(interval);
		$(id).html(text);
		$(id).removeClass('btnc').addClass('btna');
		cfunc();
		
	}, endtime);
}
/*
	自适应textarea
	WY.2013/11/20
*/
;(function($){
   $.fn.adaptiveTextarea = function(options){
       $.fn.adaptiveTextarea.defaults = {
           "maxH":99999,
           "minH":0
       };
       var opts = $.extend({},$.fn.adaptiveTextarea.defaults,options);
       return this.each(function(){
           var $this = $(this);
           var defaultH = opts.minH || $this.height();
           //初始化
           $this.css({
               "overflow":"auto",
               "resize":"none",
               "height":defaultH + "px"
           });
           $this.off("propertychange input").on("propertychange input",function(){
               this.style.height = defaultH + "px";
               if(opts.maxH >= opts.minH){
                   this.style.height = Math.min(this.scrollHeight,opts.maxH) + "px";
               }
               // myScroll.refresh();
           });
       });
   }
})(jQuery);
/*
	初入页面textarea高度设置
	WY.2013/11/20
*/
function txtareaInit(id){
	var ht1 = $(id).height();
	var ht2 = $(id).prop("scrollHeight");
	if(ht1<=ht2){
		$(id).height(ht2);
		// myScroll.refresh();
	}
}
// 工具函数
var oTools = (function(doc){
	var getById = function (id) {
		return doc.getElementById(id);
	};
	
	// xml字符串转换为xml
	var toXmlDom = function (str){
		var xmlDoc = null;
		if (window.ActiveXObject) {
			var ARR_ACTIVEX = ["MSXML4.DOMDocument","MSXML3.DOMDocument","MSXML2.DOMDocument","MSXML.DOMDocument","Microsoft.XmlDom"];
			var XmlDomflag = false;
			for (var i = 0;i < ARR_ACTIVEX.length && !XmlDomflag ;i++) {
				try {
					var objXML = new ActiveXObject(ARR_ACTIVEX[i]);
					xmlDoc = objXML;
					XmlDomflag = true;
				} catch (e) {
				}
			}
			if (xmlDoc) { 
				xmlDoc.async = false;
				xmlDoc.loadXML(str);
			}
		}else{
			var parser=new DOMParser();
			var xmlDoc=parser.parseFromString(str,"text/xml");
		}
		return xmlDoc;
	};
	
	// 本地存储
	var SaveToLocal = function (json, callback) {
		var saveUrl, str = "";
		
		for (var attr in json) {
			str += attr + "=" + json[attr] + "&";
		}
		
		str = str.substring(0, str.length-1);
		saveUrl = '/reqsavemap'+encodeURI("?" + str);
		getData(saveUrl, '', function (data){
			callback && callback();
		});
	};
	
	// 本地获取
	var ReadToLocal = function (callback, sStr) {
		var readUrl = '/reqreadmap'+encodeURI("?" + sStr);
		getData(readUrl, '', function (data){
			callback && callback(data);
		});
	};
	
	// 去除头部和尾部的空格和回车及换行
	var trim = function (str) {
		var re = /(^\s*)|(^\r\n*)|(\r\n*$)|(\s*$)/g;
		var str = str.replace(re, '');
		return str;
	};
	
	return {
		getById: getById,
		toXmlDom: toXmlDom,
		SaveToLocal: SaveToLocal,
		ReadToLocal: ReadToLocal,
		trim: trim
	};
})(document);
 function getStockInfo(code,name){
	  var sCode=code,
	      sName=name,
	      sHtml='<span>'+sName+'(</span><span class="code">'+sCode+'</span>)<b class="colse">X</b>';
	  $(".insert p").addClass("cur")
	  $(".insert p").html(sHtml);
	  //alert(sCode)
}
// 开户结果查询
function qryOpenAccount(succ) {
	var params = cRequestSign + encodeURI("?action=31001&path=/WA0038&op_station=($tztudid)&branch_no=" + branchNo + "&client_id=" + oData.CLIENTID);
	getData(params, '', function (data){
		var binData = JSON.parse(data.BINDATA),
			error_no = binData.error_no,
			error_info = binData.error_info;
		if (error_no == '0') {
			succ(binData);
		} else {
	        alert(error_info);
		}
	});
};
// 判断客户是否选错流程分支
function isWrongAccount(arr) {
	var i = 0,
		len = arr.length,
		resultJson = {
			bAccount: false,
			bTime: false
		};
	for (; i < len; i++) {
		if (arr[i].open_status === '3') {
			resultJson.bAccount = true;
			continue;
		}
		if (arr[i].open_status === '0') {
			resultJson.bTime = true;
			continue;
		}
	}
	return resultJson;
};


//加载样式文件
 function getStyle(sUrl, fnSuccess, nTime) {
	var nTime = nTime || 3, bIsLoad = false, nTimeout = setTimeout(function() {
		fnSuccess & fnSuccess(false);
		//超时模式
	}, nTime * 1000);
	return $('<link href="' + sUrl + '" rel="stylesheet" />').appendTo($("head")).on("load", function() {//该Link标签的加载事件
		clearTimeout(nTimeout);
		fnSuccess && fnSuccess(true);
		//成功模式
	})
}
/*皮肤切换*/
function changeSkiin(){
	var sSkin = getUrlParameter("skin"),sStyleurl = 'css/';
	getData('/reqlocal?tztskintype=','',function(oData){
		sSkin = oData.TZTSKINTYPE || sSkin;
		if(sSkin == "1"){
			sStyleurl += 'blue.css';
		}else if(sSkin == "2"){
			sStyleurl += 'red.css';
		}else{
			$("link[href$='blue.css']").remove();
			$("link[href$='red.css']").remove();
		}
		if(sStyleurl != 'css/'){
			getStyle(sStyleurl,function(){	 $('#mask').remove();	});
		}else{
			$('#mask').remove();
		}
	})
}
/*
function GoBackOnLoad(){
	changeSkiin();
}
$(function(){
	$('body').prepend('<div id="mask"></div>');
	changeSkiin();
})

*/