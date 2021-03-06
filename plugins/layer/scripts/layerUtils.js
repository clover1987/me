/**************************************************************
 @author liaohl
 @date: 2013-10-08
 @description 以下几种弹层是对layer.js的修改和封装
 	iAlert(alertMsg, msgType, yesFunc) 提示框，带确认按钮
 	iConfirm(conMsg, yesFunc, noFunc) 选择确认框，只带"确认"和"取消"按钮
 	iMsg(msgType, msgText, msgTime) 提示框，不带确认按钮，自动消失
 	iTips(msgText, divEle) tips框
 	iLoading(controlShowFlag, tipWords, isShowOverLay) 加载等待层
 	layerCustom(viewContent) 自定义弹出层
**************************************************************/
define(function (require, exports, module) {
	var $ = jQuery = require('jquery'), layer = require('layer'), gconfig = require("gconfig"), layerTheme = gconfig.layerTheme;
	
	//各类弹出层全局引用，用用控制关闭各类弹出层
	var iAlertIdx = -9999, iConfirmIdx = -9999, iMsgIdx = -9999, iTipsIdx = -9999, iLoadingIdx = -9999, iCustomIdx = -9999;
	var iMsgTimer = null;
	
	/**
	 * 阻止默认事件的行为
	 * @param e
	 */
	function stopDefaultAction(e)
	{
		if(e && e.preventDefault) {
			e.preventDefault();
		} else {
			window.event.returnValue = false;
		}
	}


	/**
	 * 提示框，带确认按钮
	 * @param alertMsg 提示内容
	 * @param msgType 成功还是失败，0表示成功，-1表示失败，可不传，默认为-1
	 * @param yesFunc 确认按钮的回调，可不传，默认只会取消提示框
	 * @param btnWords 确认按钮的文字，可不传，默认为“确定”
	 */
	function iAlert(alertMsg, msgType, yesFunc, btnWords)
	{
		if(layerTheme != "default") {
			var viewContent = '<div class="pop_tip'+(msgType==0?" right":" error")+'" id="pop_tip_alert"><span class="icon"></span><p>'
			+'<span style="display:block;text-align:center;padding:0 16px;font-size:16px">'+alertMsg+'</span>'+
			'</p><div class="btn"><a href="javascript:void(0);" id="pop_tip_alert_btn">'+(btnWords||"确  定")+'</a></div></div>';
			var iAlertLayer = function(){
				return $.layer({
					type: 1,
					title: false,
					closeBtn: false,
					shade : [0.5 , '#000' , true],
					border: [5, 0.5, '', true],
					area: ['310px','auto'],
					offset: [(gconfig.appHeight*0.3)+'px', ''],
					page: {
						html: viewContent
					},
					success: function(iLayer) {
						window.ontouchmove = stopDefaultAction;
						var eType = gconfig.triggerEventName;
						$x("pop_tip_alert", "pop_tip_alert_btn").off(eType);
						$x("pop_tip_alert", "pop_tip_alert_btn").on(eType, function() {
							if(yesFunc){ yesFunc(); }
							layer.close(iAlertIdx);
							iAlertIdx = -9999;
						});
						$("#pop_tip_alert").css("margin-top","-"+($("#pop_tip_alert").height()/2)+"px");
					},
					end: function() {window.ontouchmove = null;}
				});
			};
			if(iAlertIdx == -9999) { //如果没有iAlert层
				iAlertIdx = iAlertLayer();
			} else { //存在iAlert层，先关闭前面那个iAlert层，再弹出新的iAlert层
				layer.close(iAlertIdx);
				iAlertIdx = iAlertLayer();
			}
		} else {
			var type = msgType==0?1:3; //显示的图标
			iAlertIdx = $.layer({
				area: ['310px','auto'],
				offset: [(gconfig.appHeight*0.3)+'px', ''],
				dialog: {
					btn: [btnWords||"确  定"],
					msg: alertMsg,
					type: type,
					yes: function(index) {layer.close(index); if(yesFunc){yesFunc();}}
				},
				title: "提示信息",
				border: [0 , 0 , '', false],
				shade : [0.5 , '#000' , true],
				success: function(layer) {window.ontouchmove = stopDefaultAction;},
				end: function() {window.ontouchmove = null;}
			});
		}
	}
	
	/**
	 * 选择确认框，只带"确认"和"取消"按钮
	 * @param conMsg 提示内容
	 * @param yesFunc 确认按钮的回调，可不传，默认只是去掉提示层
	 * @param noFunc 取消按钮的回调，可不传，默认只是去掉提示层
	 * 	callback参数支持3种形式：iConfirm("conMsg",funcName);、iConfirm("conMsg",function () {});、iConfirm("conMsg",function funcName() {});
	 * @param yesBtnWords 确认按钮的文字，可不传，默认为“确定”
	 * @param noBtnWords 取消按钮的文字，可不传，默认为“取消”
	 */
	function iConfirm(conMsg, yesFunc, noFunc, yesBtnWords, noBtnWords)
	{
		if(layerTheme != "default") {
			var viewContent = '<div class="pop_tip notice" id="pop_tip_confirm"><span class="icon"></span><p>'
			+'<span style="display:block;text-align:center;padding:0 16px;font-size:16px">'+conMsg+'</span>'+
			'</p><div class="btn"><a href="javascript:void(0);" id="pop_tip_confirm_yes">'+(yesBtnWords||"确 定")+'</a><a href="javascript:void(0);" id="pop_tip_confirm_no">'+(noBtnWords||"取消")+'</a></div></div>';
			var iConfirmLayer = function(){
				return $.layer({
					type: 1,
					title: false,
					closeBtn: false,
					shade : [0.5 , '#000' , true],
					border: [5, 0.5, '', true],
					area: ['310px','auto'],
					offset: [(gconfig.appHeight*0.3)+'px', ''],
					page: {
						html: viewContent
					},
					success: function(iLayer) {
						window.ontouchmove = stopDefaultAction;
						var eType = gconfig.triggerEventName;
						$x("pop_tip_confirm", "pop_tip_confirm_yes").off(eType);
						$x("pop_tip_confirm", "pop_tip_confirm_yes").on(eType, function() {
							if(yesFunc){ yesFunc(); }
							layer.close(iConfirmIdx);
							iConfirmIdx = -9999;
						});
						$x("pop_tip_confirm", "pop_tip_confirm_no").off(eType);
						$x("pop_tip_confirm", "pop_tip_confirm_no").on(eType, function() {
							if(noFunc){ noFunc(); }
							layer.close(iConfirmIdx);
							iConfirmIdx = -9999;
						});
						$("#pop_tip_confirm").css("margin-top","-"+($("#pop_tip_confirm").height()/2)+"px");
					},
					end: function() {window.ontouchmove = null;}
				});
			};
			if(iConfirmIdx == -9999) { //如果没有iConfirm层
				iConfirmIdx = iConfirmLayer();
			} else { //存在iConfirm层，先关闭前面那个iConfirm层，再弹出新的iConfirm层
				layer.close(iConfirmIdx);
				iConfirmIdx = iConfirmLayer();
			}
		} else {
			iConfirmIdx = $.layer({
				area: ['310px','auto'],
				offset: [(gconfig.appHeight*0.3)+'px', ''],
				dialog: {
					btns: 2,
					btn: [yesBtnWords||'确 定', noBtnWords||'取消'],
					msg: conMsg,
					type: 4,
					yes: function(index) {layer.close(index); if(yesFunc) {yesFunc();}},
					no: function(index) {layer.close(index); if(noFunc) {noFunc();}}
				},
				title: "提示信息",
				border: [0 , 0 , '', false],
				shade : [0.5 , '#000' , true],
				success: function(layer) {window.ontouchmove = stopDefaultAction;},
				end: function() {window.ontouchmove = null;}
			});
		}
	}
	
	/**
	 * 提示框，不带确认按钮
	 * @param msgType 成功还是失败，0表示成功，-1表示失败，可不传，默认为-1
	 * @param msgText 提示内容
	 * @param msgTime 提示层msgTime后自动消失：单位秒，可不传，默认为2秒
	 */
	function iMsg(msgType, msgText, msgTime)
	{
		if(iMsgTimer != null) {
			clearTimeout(iMsgTimer);
			iMsgTimer = null;
		}
		msgTime = msgTime>0?msgTime:2;
		if(layerTheme != "default") {
			var viewContent = '<div class="pop_tip'+(msgType==0?" right":" error")+'" id="pop_tip_msg"><span class="icon"></span><p>'
			+'<span style="display:block;text-align:center;padding:0 16px;font-size:16px">'+msgText+'</span>'+
			'</p></div>';
			var iMsgLayer = function(){
				var myMsgIdx = $.layer({
					type: 1,
					title: false,
					closeBtn: false,
					shadeClose: true,
					shade : [0.5 , '#000' , true],
					border: [5, 0.5, '', true],
					area: ['310px','auto'],
					offset: [(gconfig.appHeight*0.3)+'px', ''],
					page: {
						html: viewContent
					},
					success: function(iLayer) {
						window.ontouchmove = stopDefaultAction;
						$("#pop_tip_msg").css("margin-top","-"+($("#pop_tip_msg").height()/2)+"px");
					},
					end: function() {window.ontouchmove = null;}
				});
				iMsgTimer = setTimeout(function() {
					layer.close(iMsgIdx);
					iMsgIdx = -9999;
				}, msgTime*1000);
				return myMsgIdx;
			};
			if(iMsgIdx == -9999) { //如果没有iMsg层
				iMsgIdx = iMsgLayer();
			} else { //存在iMsg层，先关闭前面那个iMsg层，再弹出新的iMsg层
				layer.close(iMsgIdx);
				iMsgIdx = iMsgLayer();
			}
		} else {
			var type = msgType==0?1:3; //显示的图标
			iMsgIdx = $.layer({
				area: ['310px','auto'],
				offset: [(gconfig.appHeight*0.4)+'px', ''], //这里的纵坐标是不是需要调整下？
				closeBtn: [0 , false],
				shadeClose: true,
				time: msgTime,
				dialog: {
					btns: 0,
					msg: msgText,
					type: type
				},
				title: false, //"提示信息",
				border: [0 , 0 , '', false],
				shade : [0.5 , '#000' , true],
				success: function(layer) {window.ontouchmove = stopDefaultAction;},
				end: function() {window.ontouchmove = null;}
			});
		}
	}
	
	/**
	 * 提示框，不带确认按钮
	 * @param msgText 提示内容
	 * @param divEle 元素对象，tips层在该元素位置附件
	 */
	function iTips(msgText,divEle)
	{
		iTipsIdx = layer.tips(msgText , $(divEle) , 0, 200, 0, ['background-color:#CC0000; color:#fff', '#CC0000']);
		$(divEle).ScrollTo(200);
	}
	
	/**
	 * 关闭提示层
	 */
	function iTipsClose()
	{
		if(iTipsIdx != -9999) {
			layer.close(iTipsIdx);
			iTipsIdx = -9999;
		}
	}
	
	/**
	 * 关闭自定义层
	 */
	function iCustomClose()
	{
		if(iCustomIdx != -9999) {
			layer.close(iCustomIdx);
			iCustomIdx = -9999;
		}
	}
	
	/**
	 * 关闭弹出层（iAlert、iTips、iConfirm、iCustomIdx）
	 * iMsg和iLoading不会关闭，本身提供点击遮罩层关闭
	 */
	function iLayerClose()
	{
		if(iAlertIdx != -9999) {
			layer.close(iAlertIdx);
			iAlertIdx = -9999;
		}
		if(iConfirmIdx != -9999) {
			layer.close(iConfirmIdx);
			iConfirmIdx = -9999;
		}
		if(iTipsIdx != -9999) {
			layer.close(iTipsIdx);
			iTipsIdx = -9999;
		}
		if(iCustomIdx != -9999) {
			layer.close(iCustomIdx);
			iCustomIdx = -9999;
		}
	}

	/**
	 * ajax等待层处理
	 * @param controlShowFlag true/false： 显示/隐藏，传false时，以下两个参数省略
	 * @param tipWords 可不传，默认显示器"请等待..."
	 * @param isShowOverLay 是否显示遮罩层，默认显示
	 */
	function iLoading(controlShowFlag, tipWords, isShowOverLay)
	{
		if(controlShowFlag)
		{
			tipWords = tipWords || "请等待..."; //显示loading的内容
			var displayOverLay = typeof(isShowOverLay)!="undefined"?(isShowOverLay?"block":"none"):"block", //是否显示遮罩层控制
				iLoadingStr = '<div id="iLoading_overlay" class="iLoading_overlay" style="display: '+displayOverLay+';"></div><div class="iLoading_showbox" style="display: block; opacity: 1;"><div class="iLoading_loading_pic"></div><p>'+tipWords+'</p></div>';
				loadingLayer = function() {
					return $.layer({
						type: 1,
						title: false,
						closeBtn: false,
						shade : [0.5 , '#000' , false],
						border: [0, 0, '#fff', true],
						area: ['auto','auto'],
						offset: ['0px', '0px'],
						page: { html: iLoadingStr },
						success: function(layer) {
							if(gconfig.isClickShadeHide){
								$("#iLoading_overlay").click(function() { $(this).hide(); });
							}
						}
					});
				};
			
			//控制不能滑动touchmove
			window.ontouchmove = stopDefaultAction;
			if(iLoadingIdx == -9999) //如果没有iLoading层
			{
				iLoadingIdx = loadingLayer();
			} else { //存在iLoading层，先关闭前面那个iLoading层，再弹出新的iLoading层
				layer.close(iLoadingIdx);
				iLoadingIdx = loadingLayer();
			}
		} else {
			window.ontouchmove = null; //允许滑动touchmove
            layer.close(iLoadingIdx);

            /*
            //edited by jhl 2014-07-16
            if (layer.close) {
                layer.close(iLoadingIdx);
            }
            */

			iLoadingIdx = -9999;
		}
	}

	/**
	 * 自定义弹出层
	 * @param viewContent 弹出层静态页面内容
	 */
	function layerCustom(viewContent)
	{
		iCustomIdx = $.layer({
			type: 1,
			title: false,
			closeBtn: false,
			border: [5, 0.5, '', true],
			area: ['310px','auto'],
			offset: [(gconfig.appHeight*0.3)+'px', ''],
			page: {
				html: viewContent
			}
		});
		return iCustomIdx;
	}
	
	/**调用layerCustom的例子，需暴露layerCustom对外，然后在调用的模块js里调用layerCustom
	function iLayerRedeemMyProd(prodDesc, prodCode, prodName, func) 
	{
		layerCustom('<div class="popbox pop_rebuy" id="iLayer_myProd"><div class="ptitle"><h2>赎回'+prodDesc+'</h2></div><div class="pmain"><p class="input_text"><input id="iLayer_prodCode" type="hidden" value='+prodCode+'/><label>基金名称</label><em id="iLayer_prodName">'+prodName+'</em></p><p class="input_text"><label>赎回份额</label><input type="number" class="t1" id="iLayer_redeemNum"/></p><p class="input_text"><label>交易密码</label><input type="password" class="t1" id="iLayer_tradePwd"/></p><p class="input_text"><a href="javascript:void(0);" class="btn" id="iLayer_redeemBtn">赎回</a><a href="javascript:void(0);" class="btn2" id="iLayer_closeBtn">关闭</a></p></div></div>');
		preBindEvent($x("iLayer_myProd", "iLayer_redeemBtn"), function() { func(); iCustomClose();});
		preBindEvent($x("iLayer_myProd", "iLayer_closeBtn"), function() { iCustomClose(); });
	}
	 */

	/**
	 * 获取custom、alert、confirm、msg、tips、loading、各种的索引idx
	 * @param type 弹出层类型：0/custom、1/alert、2/confirm、3/msg、4/tips、5/loading、
	 */
	function getLayerIdx(type)
	{
		var idx = 0;
		type += "";
		switch (type) {
		case "0":
			idx = iCustomIdx;
			break;
		case "1":
			idx = iAlertIdx;
			break;
		case "2":
			idx = iConfirmIdx;
			break;
		case "3":
			idx = iMsgIdx;
			break;
		case "4":
			idx = iTipsIdx;
			break;
		case "5":
			idx = iLoadingIdx;
			break;
		default:
			idx = -9999;
			break;
		}
		return idx;
	}
	
	var layerUtils = {
		"iAlert": iAlert,
		"iConfirm": iConfirm,
		"iMsg": iMsg,
		"iTips": iTips,
		"iTipsClose": iTipsClose,
		"iCustomClose": iCustomClose,
		"iLayerClose": iLayerClose,
		"iLoading": iLoading,
		"layerCustom": layerCustom,
		"getLayerIdx": getLayerIdx
	};
	//暴露对外的接口
	module.exports = layerUtils;
});