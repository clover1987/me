define(function(require,exports,module){
	var	appUtils = require("appUtils");
	var iConfirm = function(_pageId,title,okFuck,noFuck,okText,noText){
		if(title == null|| title == ""){
			title = "确认执行当前操作？";
		}
		if(okText == null|| okText == ""){
			okText = "确定";
		}
		if(noText == null|| noText == ""){
			noText = "取消";
		}
		$(_pageId).append('	<div class="mod-phone-opacity" id="_windows" style="z-index: 10">'
				+'<div class="mod-phone02">'
				+'<div class="phone-from02 p20">'
				+'<p class="text" style="text-align: center; font-size:15px;">'+title+'</p>'
				+'<div class="phone-btn-box02" id="phone-btn">'
				+'	<a href="javascript:void(0);" class="cancel" id="cancel">'+noText+'</a> '
				+'		<a href="javascript:void(0);" class="ok" id="ok">'+okText+'</a>'
				+'		</div>'
				+'	</div>'
				+'</div>'
				+'</div>');
		if($(_pageId).find("#_windows") != null){
			$(_pageId + " #_windows").addClass("show");
		}
		if(noFuck != null){
			//取消
			appUtils.bindEvent($(_pageId+" #cancel"),function(){
				noFuck();
			});
				
		}else{
			///取消
			appUtils.bindEvent($(_pageId+" #cancel"),function(){
				$(_pageId + " #_windows").removeClass("show");
			});
		}
		if(okFuck != null){
			appUtils.bindEvent($(_pageId+" #ok"),function(){
				okFuck();
				$(_pageId + " #_windows").removeClass("show");
			});
			
		}
	};
	
	var myLayerUtils = {
		"iConfirm":iConfirm
	};
	module.exports = myLayerUtils;
});