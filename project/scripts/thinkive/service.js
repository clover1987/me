/**
 * 底层通信服务层,数据基础模型定义，基于jquery语法,这个模块无需export
 */
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	require('domain');
//	require("gconfig");
	var appUtils = require("appUtils");
	
	/**
	 * 定义$.domain命名空间里面的方法
	 */
	$.extend($.domain,{
		Service : Service
	});
	
	function Service(){
		this.reqDic = {};
		this.callBackDic = {};
	}
	
	/**
	 * 功能:请求服务
	 * 入参: reqParamVo:请求对象
	 *       callBackFunc：回调函数
	 *       isReturnList:返回的结果集是否是数组，否则就是单个对象 默认是true
	 */
	Service.prototype.invoke = function(reqParamVo,callBackFunc){
		var This = this;
//console.log("reqParamVo: ");
//console.log(reqParamVo);
		var protocol = reqParamVo.getProtocol();
//		require.async(protocol,function(module){
			var flowNo = reqParamVo.getFlowNo();
			var url = reqParamVo.getUrl();
			var param = reqParamVo.getReqParam();
			var isLastReq = reqParamVo.getIsLastReq();
			var isAsync = reqParamVo.getIsAsync();
			var isShowWait = reqParamVo.getIsShowWait();
			var isShowOverLay = reqParamVo.getIsShowOverLay();
			var tipsWords = reqParamVo.getTipsWords();
			var timeOutFunc = reqParamVo.getTimeOutFunc();
			var dataType = reqParamVo.getDataType();
			//clientinfo和jsessionid放在ajax的头部，用于保持会话
			param.clientinfo = appUtils.getSStorageInfo("clientinfo");
			param.jsessionid = appUtils.getSStorageInfo("jsessionid");
//			if (typeof(isReturnList) == "undefined" || isReturnList === null || isReturnList === ""){
//				isReturnList = true;
//			}
//			reqParamVo.setIsReturnList(isReturnList);
			This.reqDic[flowNo] = reqParamVo;
			This.callBackDic[flowNo] = callBackFunc;
//			var onResult = $.bindFunc(This.onResult,This);
			appUtils.invokeServer(url,param,callBackFunc,isLastReq, isAsync, isShowWait, isShowOverLay, tipsWords, timeOutFunc,dataType);
			//module.request(flowNo,url, param, onResult, isLastReq, isAsync, isShowWait, tipsWords, timeOutFunc,dataType);
//		});
	};
	/**
	 * 功能：处理结果集
	 * @param flowNo 流水号
	 * @param result 结果数据
	 */
	Service.prototype.onResult = function(flowNo,result){
		var callBackFunc = this.callBackDic[flowNo];
		if(callBackFunc != null){
			 delete this.callBackDic[flowNo];
		}
		
	    var reqParamVo = this.reqDic[flowNo];
	    delete this.reqDic[flowNo];
	    
	    var resultVo = new $.domain.ResultVo();
		resultVo.setErrorNo(result["error_no"]);
		resultVo.setErrorInfo(result["error_info"]);
		if($.string.isEmpty(resultVo.getErrorNo())){
			resultVo.setErrorNo("0");
		}
		var dsName = result["dsName"];
		var resultMap = {};
		if(dsName && dsName.length > 0){
			for(var i = 0; i < dsName.length; i ++){
				var key = dsName[i];
				resultMap[key] = result[key];
			}
		}else{
			resultMap["results"] = result["results"];
			dsName = ["results"];
		}
		resultVo.setDsName(dsName);
		resultVo.setResults(resultMap);
		resultVo.setResultHeaders(result["fields"]);
		resultVo.setReqParamVo(reqParamVo);
//		var filters = $.gconfig.filters;
//		if(filters){
//			var filterFunc = filters[resultVo.getErrorNo()];
//			if(filterFunc){
//				filterFunc(resultVo);
//			}
//		}
		if(callBackFunc != null){
			callBackFunc(resultVo);
		}
	};
	
	/**
	 * 功能：中断请求
	 * 参数: protocol:请求协议
	 *      flowNo:流水号
	 */
	Service.prototype.clearRequest = function(protocol,flowNo){
		require.async(protocol,function(module){
//			module.clearRequest(flowNo);
		});
	};
	
	/**
	 * 功能：释放操作
	 */
	Service.prototype.destroy = function(){
		//删除回调函数
		for(var key in this.callBackDic){
			delete this.callBackDic[key];
		}
		//删除请求对象
		for(var key in this.reqDic){
			var reqParamVo = this.reqDic[key];
			var protocol = reqParamVo.getProtocol();
			this.clearRequest(protocol, key);
			delete this.reqDic[key];
		}
		//删除seajs的临时缓存文件
		for(var key in seajs.cache){
			if(key.indexOf("_async_" + seajs._asyncNum) > -1){
				delete seajs.cache[key];
			}
		}
	};
});