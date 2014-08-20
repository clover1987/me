/**
 * 通用工具类，将项目中的公用方法抽出来
 */
define(function(require,exports,module){
	var appUtils = require("appUtils");
	var gconfig = require("gconfig");

	function directBack()
	{
		window.onpopstate = function(event) {
			var direct_return_urls = gconfig.global.direct_return_urls;
			if(direct_return_urls != null && direct_return_urls.length > 0)
			{
				var hasUrlFlag = false;
				for(var i=0;i < direct_return_urls.length;i++)
				{
					if(location.href.indexOf(direct_return_urls[i]) > 0)
					{
						var ua = navigator.userAgent.toLowerCase();
						if(ua.match(/MicroMessenger/i)=="micromessenger")
						{
							hasUrlFlag = true;
						}
					}
				}
				if(hasUrlFlag)
				{
					window.close();
					WeixinJSBridge.call("closeWindow");
				}
			}
			if(!(window.history && window.history.pushState)) { return false; }
			if(event && event.state) {
				var stateObj = event.state,
				 	prePageCode = stateObj.prePageCode,
					pageCode = stateObj.pageCode,
					param = stateObj.param,
					isLastReq = stateObj.isLastReq,
					isShowWait = stateObj.isShowWait,
					isShowOverLay = stateObj.isShowOverLay;
				
				var iPrePageCode = appUtils.getSStorageInfo("_curPageCode"); //当前页面，注意上面的prePageCode是hash值中的页面的前置页面
				var pageId = pageCode.replaceAll("/", "_");
				appUtils.setSStorageInfo("_curPage", JSON.stringify(stateObj)); //保存当前页面信息，注意：防止刷新参数丢失
//				appUtils.setSStorageInfo(pageCode, JSON.stringify(stateObj)); //保存页面最近一次访问的入参信息，history.pushState不兼容的处理
				if($("#" + pageId).length < 1 || ($("#" + pageId).attr("data-refresh") == "yes" || $("#" + pageId).attr("data-refresh") == "true")) {
					appUtils.pageInit(iPrePageCode, pageCode, param, isLastReq, isShowWait, isShowOverLay);
				} else {
					var title = $("#" + pageId).attr("data-pageTitle");
					title = title ? title : "3GWeb";
					document.title = title;
					
					//调用前也页面销毁方法，再switchPage
					iPrePageCode = (!iPrePageCode || iPrePageCode=="null")?"":iPrePageCode;
					appUtils.clearRequest(); //清除正在请求的ajax或者websocket
					require.async(gconfig.scriptsPath+iPrePageCode, function(page) {
						if(page.destroy) { //页面存在切换页面后的清理工作，主要是原来页面重置显示的值
							page.destroy();
						} else {
							appUtils.pageResetValue(iPrePageCode.replaceAll("/", "_"));
						}
						appUtils.switchPage(pageId);
						appUtils.setSStorageInfo("_curPageCode", pageCode); //保存当前页面标识curPageCode
					});
				}
			} else {
				//增加微平台返回兼容处理
				if(location.href.indexOf(appUtils.preHashUrl) < 0 && location.href.indexOf("#!") != -1) {
					if(appUtils.startInitFlag) {
						dispatchPage();
					}
				} else {
					history.go(-1);
				}
			}
		};
	}
	
	var directBackModule = {
			"directBack":directBack
	};
	
	module.exports = directBackModule;
});