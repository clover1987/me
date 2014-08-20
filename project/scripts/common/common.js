/**
 * 公共方法 
 */
define(function(require,exports,module){
	var appUtils = require("appUtils"),
		layerUtils = require("layerUtils"),
		service = require("serviceImp").getInstance(),
		VIscroll = require("vIscroll"),
		gconfig = require("gconfig"),
		global = gconfig.global;
	var openId = "";	
	var weixinPK = "";
	/**
	 * 请求验证码
	 * @param {Object} pageId 页面id
	 */
	function reuqestValidateCode(_pageId)
	{
		$(_pageId+" img").attr("src",global.basePath+"/servlet/TicketImgServlet?v="+Math.random());
	}
	
	/**
	 * json数据转换
	 * @param {Object} value 入参
	 * @return {TypeName} 	返回json数据
	 */
	function helperToObject(value){
		return $.parseJSON(value);
	}
	/**
	 * 加载滑动组件
	 * @param {Object} _pageId 		页面id
	 * @param {Object} vIscroll		viscroll对象
	 * @param {Object} curPage		当前页码
	 * @param {Object} totalPage	总页面数
	 * @param {Object} isShowWaitFlag	是否显示等待层标志
	 * @param {Object} callBack		回调方法
	 */
	 /**
	 * 增加 pageSimpleId
	 * @param pageSimpleId	页面命名id
	 * @param ulElementId ul节点id
	 * @param numPerPage 每页记录数
	 */
	function loadInitVIscroll(_pageId,pageSimpleId,ulElementId,vIscroll,curPage,numPerPage,totalPage,isShowWaitFlag,callBack,blankWords,blankHeight)
	{
		$(_pageId+" #applyamount_ul").css("background-image","url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAABCAYAAADq6085AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAPSURBVBhXY1h5/f9/UjAA/BYp6dvUNa4AAAAASUVORK5CYII=')");
		$(_pageId+" #applyamount_top").css("background-image","url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAGCAYAAAD37n+BAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABkSURBVChTjY4xCoBADATz/5+I2Av+w9NCH2BnIRqRWx3hGjnFYiFkZzcxdxdaN1c7HWrGqKrXLWZ2eIkzhnnZVQ9RRVBWeDCwRvoLTiUwsBauk2/Nzz2s8effAKyVXf7vXAnsCSIsAiZNu5mJAAAAAElFTkSuQmCC')");
		$(_pageId+" #applyamount_bot").css("background-image","url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAGCAYAAAD37n+BAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABfSURBVChTY1h94///ldeJw2tv/v/PsPveP6I1gNQyXHv1h2gNILUM33/8/L/jLmFbtgPVgNQy/Pz58//Hr7/wagIZCFIDUgvWAMIg3SArdwLduQYYECAMYoPEQHIwdQAUegIewdE+TAAAAABJRU5ErkJggg==')");
		if(blankHeight == null){
			blankHeight = 40;//留白长度默认值
		}
		if(!vIscroll._init)
		{
			var config = {
				"isPagingType": false,	//累加形式，true表示分页形式
				"isHasHead": false,		//是否有包含头部
				"visibleHeight": gconfig.appHeight-blankHeight,
				"container": $(_pageId + " #v_container_" + pageSimpleId),
				"wrapper": $(_pageId + " #v_wrapper_" + pageSimpleId),
				"downHandle": function() {	//向下拉
					if(totalPage > 1){
						$(_pageId + " #v_wrapper_" + pageSimpleId + " .visc_pullUp").show();
						$(_pageId + " .visc_pullUp").removeClass("visc_loading");
						$(_pageId + " .visc_pullUpLabel").html("上拉加载下一页");
					}
					curPage=1;
					isAppendFlag = false;
					// callBack(curPage,isAppendFlag,isShowWaitFlag);
					callBack(_pageId,pageSimpleId,ulElementId,curPage,numPerPage,isAppendFlag,isShowWaitFlag);
				},
				"upHandle": function() {	//向上拉
					if(curPage < totalPage)
					{
						curPage++;
						isAppendFlag = true;
						// callBack(curPage,isAppendFlag,isShowWaitFlag);
						callBack(_pageId,pageSimpleId,ulElementId,curPage,numPerPage,isAppendFlag,isShowWaitFlag);
					}
					else
					{
						$(_pageId+" #v_wrapper_" + pageSimpleId + " .visc_pullUp").hide();
						
						// 针对交易记录查询 特殊处理样式 add by chenxy20140521
						if(_pageId == '#cash_applyamount')
						{
							$(_pageId + ' .trade-bg-bot').removeClass().addClass('trade-bg-bot-0bottom');
						}
					}
				},
				"wrapperObj": null
			};
			vIscroll.scroll = new VIscroll(config); //初始化
			vIscroll._init = true; //尽量只初始化一次，保持性能（如果是项目开发，这句和下一句可以忽略）
		}
		else {
			vIscroll.scroll.refresh();
		}
		if(totalPage == 1)
		{
			$(_pageId + " #v_wrapper_" + pageSimpleId + " .visc_pullUp").hide();
		}
		else if(totalPage == null || totalPage <= 0)
		{
			if(blankWords != null)
			{
				$(_pageId+" #applyamount_ul").css("background-image","url('')");
				$(_pageId+" #applyamount_top").css("background-image","url('')");
				$(_pageId+" #applyamount_bot").css("background-image","url('')");
				$(_pageId+" #"+ulElementId).html("<li style='border-bottom: 0px;text-align:center;padding-top:10px;'><span>"+blankWords+"</span></li>");
			}
			else
			{
				$(_pageId+" #"+ulElementId).html("<li style='border-bottom: 0px;text-align:center;padding-top:10px;'><span>暂无数据</span></li>");
			}
			$(_pageId + " #v_wrapper_" + pageSimpleId + " .visc_pullUp").hide();
		}
	}
	
	/**
	 * 格式化数字，s为元数字，n为格式化后保留几位小数
	 **/
	function fmoney(s, n) {
		var negativeNumber = false;
		if(s < 0){
			s = -s;
			negativeNumber = true;
		}
		if(n != 0)
		{
			n = n > 0 && n <= 20 ? n : 2;
			s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
			var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
			t = "";
			for (i = 0; i < l.length; i++) {
				t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
			}
			if(negativeNumber){
				return "-"+t.split("").reverse().join("") + "." + r;
			}else{
				return t.split("").reverse().join("") + "." + r;
			}
		}
		else
		{
			s = parseFloat((s + "").replace(/[^\d\.-]/g, "")) + "";
			var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
			t = "";
			for (i = 0; i < l.length; i++) {
				t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
			}
			if(negativeNumber){
				return "-"+t.split("").reverse().join("");
			}else{
				return t.split("").reverse().join("");
			}
		}
	}
	
	var common = {
		"reuqestValidateCode":reuqestValidateCode,
		"helperToObject":helperToObject,
		"loadInitVIscroll":loadInitVIscroll,
		"fmoney":fmoney,
	};
	
	module.exports = common;
});