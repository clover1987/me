/**
 * 数据基础模型定义，基于jquery语法,这个模块无需export
 */
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	
	/**
	 * 定义$.domain的命名空间
	 */
	$.extend({domain:{}});
	/**
	 * 定义$.domain命名空间里面的方法
	 */
	$.extend($.domain,{
		DynModle : DynModle,
		ReqParamVo : ReqParamVo,
		ResultVo : ResultVo
	});
	/**
	 * jquery的全局扩展方法
	 */
	$.extend({
		/**
	     *得到统一请求对象
	     */
		getReqParamVo : function (){
			var reqParamVo = new $.domain.ReqParamVo();
			var timestamp = new Date().getTime();
		 	var flowNo = timestamp + "_" + Math.random();
		 	reqParamVo.setFlowNo(flowNo); //流水号
			reqParamVo.setStartTime(new Date().getTime()); //开始时间
			reqParamVo.setIsDebug(false); //是否调试
			reqParamVo.setSendType("post"); //请求方式
			reqParamVo.setProtocol("ajax");//异步请求
			reqParamVo.setIsAsync(true); //是否支持异步
			reqParamVo.setIsLastReq(true);
			reqParamVo.setIsShowWait(true);
			reqParamVo.setIsShowOverLay(true);
			reqParamVo.setDataType("json");
			reqParamVo.setUrl("/servlet/json?random="+Math.random());
			return reqParamVo;
	    }
	}
	);
	/**
	 * 基础的module模型
	 */
	function DynModle(){
	    this.obj = {};
	}
	DynModle.prototype.put = function(key,value){
		if(key === null || key === "" || key === undefined){
			return;
		}
		this.obj[key] =  value;
	};
	DynModle.prototype.getString = function(key){
		if(key === null || key === "" || key === undefined){
			return "";
		}
		if(!this.obj.hasOwnProperty(key)){
			return "";
		}else{
			return String(this.obj[key]);
		}
	};
	DynModle.prototype.getInt = function(key){
		if(key === null || key === "" || key === undefined){
			return 0;
		}
		if(!this.obj.hasOwnProperty(key)){
			return 0;
		}else{
			return parseInt(this.obj[key]);
		}
	};
	DynModle.prototype.getFloat = function(key){
		if(key === null || key === "" || key === undefined){
			return 0;
		}
		if(!this.obj.hasOwnProperty(key)){
			return 0;
		}else{
			return parseFloat(this.obj[key]);
		}
	};
	DynModle.prototype.getNumber = function(key){
		if(key === null || key === "" || key === undefined){
			return 0;
		}
		if(!this.obj.hasOwnProperty(key)){
			return 0;
		}else{
			return Number(this.obj[key]);
		}
	};
	DynModle.prototype.getBoolean = function(key){
	    if(key === null || key === "" || key === undefined){
			return false;
		}
		if(!this.obj.hasOwnProperty(key)){
			return false;
		}else{
			return Boolean(this.obj[key]);
		}
	};
	DynModle.prototype.getObject = function(key){
		if(key === null || key === "" || key === undefined){
			return null;
		}
		if(!this.obj.hasOwnProperty(key)){
			return null;
		}else{
			return this.obj[key];
		}
	};
	DynModle.prototype.fromObject = function(_obj){
		if(_obj !== null){
			for(var key in _obj){
				this.obj[key] = _obj[key];
			}
		}
	};
	DynModle.prototype.toObject = function(){
	    return this.obj;
	};
	DynModle.prototype.clear = function(){
	    for(var key in this.obj){
			delete this.obj[key];
			this.obj[key] = null;
		}
		this.obj = null;
	};
	DynModle.prototype.clone = function(){
	    var dynModle = new DynModle();
		dynModle.fromObject(this.toObject());
		return dynModle;
	};
	
	/**
	 * 调用接口的请求对象
	*/
	function ReqParamVo(){
	   this.obj = {};
	}
	ReqParamVo.consts = {
	   //流水号
	   FLOWNO : "flowNo" ,
	   //请求方式
	   SENDTYPE : "sendType" ,
	   //请求参数
	   REQPARAM : "reqParam" ,
	   //URL地址
	   URL : "url" ,
	   //是否开启调试
	   ISDEBUG : "isDebug" ,
	   //请求发送的开始时间
	   START_TIME : "start_time",
	   //是否异步
	   ISASYNC : "isAsync",
	   //请求协议
	   PROTOCOL : "protocol",
	   //是否最后一次的请求
	   ISLASTREQ : "isLastReq",
	   //是否显示等待效果
	   ISSHOWWAIT : "isShowWait",
	   //是否显示蒙层
	   ISSHOWOVERLAY : "isShowOverLay",
	   //等待显示的文字
	   TIPSWORDS : "tipsWords",
	   //超时后的处理函数
	   TIMEOUTFUNC: "timeOutFunc",
	   //出参格式
	   DATATYPE: "dataType",
	   //是否返回List数据
	   ISRETURNLIST : "isReturnList"
	};
	ReqParamVo.prototype = new DynModle();
	ReqParamVo.prototype.setFlowNo = function(flowNo){
	  this.put(ReqParamVo.consts.FLOWNO,flowNo);
	};
	ReqParamVo.prototype.getFlowNo = function(){
	  return this.getString(ReqParamVo.consts.FLOWNO);
	};
	ReqParamVo.prototype.setSendType = function(sendType){
	  this.put(ReqParamVo.consts.SENDTYPE,sendType);
	};
	ReqParamVo.prototype.getSendType = function(){
	  return this.getString(ReqParamVo.consts.SENDTYPE);
	};
	ReqParamVo.prototype.setReqParam = function(reqParam){
	   this.put(ReqParamVo.consts.REQPARAM,reqParam);
	};
	ReqParamVo.prototype.getReqParam = function(){
		return this.getObject(ReqParamVo.consts.REQPARAM);
	};
	ReqParamVo.prototype.setUrl = function(url){
		this.put(ReqParamVo.consts.URL,url);
	};
	ReqParamVo.prototype.getUrl = function(){
		return this.getString(ReqParamVo.consts.URL);
	};
	ReqParamVo.prototype.setIsDebug = function(isDebug){
	    this.put(ReqParamVo.consts.ISDEBUG,isDebug);
	};
	ReqParamVo.prototype.getIsDebug = function(){
		return this.getBoolean(ReqParamVo.consts.ISDEBUG);
	};
	ReqParamVo.prototype.setStartTime = function(start_time){
		this.put(ReqParamVo.consts.START_TIME,start_time);
	};
	ReqParamVo.prototype.getStartTime = function(){
	    return this.getNumber(ReqParamVo.consts.START_TIME);
	};
	ReqParamVo.prototype.setIsAsync = function(isAsync){
	    this.put(ReqParamVo.consts.ISASYNC,isAsync);
	};
	ReqParamVo.prototype.getIsAsync = function(){
		return this.getBoolean(ReqParamVo.consts.ISASYNC);
	};
	ReqParamVo.prototype.setProtocol = function(agreement){
	    this.put(ReqParamVo.consts.PROTOCOL,agreement);
	};
	ReqParamVo.prototype.getProtocol = function(){
		return this.getString(ReqParamVo.consts.PROTOCOL);
	};
	ReqParamVo.prototype.setIsLastReq = function(isLastReq){
	    this.put(ReqParamVo.consts.ISLASTREQ,isLastReq);
	};
	ReqParamVo.prototype.getIsLastReq = function(){
		return this.getBoolean(ReqParamVo.consts.ISLASTREQ);
	};
	ReqParamVo.prototype.setIsShowWait = function(isShowWait){
	    this.put(ReqParamVo.consts.ISSHOWWAIT,isShowWait);
	};
	ReqParamVo.prototype.getIsShowWait = function(){
		return this.getBoolean(ReqParamVo.consts.ISSHOWWAIT);
	};
	ReqParamVo.prototype.setIsShowOverLay = function(isShowOverLay){
	    this.put(ReqParamVo.consts.ISSHOWOVERLAY,isShowOverLay);
	};
	ReqParamVo.prototype.getIsShowOverLay = function(){
		return this.getBoolean(ReqParamVo.consts.ISSHOWOVERLAY);
	};
	ReqParamVo.prototype.setTipsWords = function(tipsWords){
	    this.put(ReqParamVo.consts.TIPSWORDS,tipsWords);
	};
	ReqParamVo.prototype.getTipsWords = function(){
		return this.getString(ReqParamVo.consts.TIPSWORDS);
	};
	ReqParamVo.prototype.setTimeOutFunc = function(timeOutFunc){
	    this.put(ReqParamVo.consts.TIMEOUTFUNC,timeOutFunc);
	};
	ReqParamVo.prototype.getTimeOutFunc = function(){
		return this.getObject(ReqParamVo.consts.TIMEOUTFUNC);
	};
	ReqParamVo.prototype.setDataType = function(dataType){
	    this.put(ReqParamVo.consts.DATATYPE,dataType);
	};
	ReqParamVo.prototype.getDataType = function(){
		return this.getString(ReqParamVo.consts.DATATYPE);
	};
	ReqParamVo.prototype.setIsReturnList = function(isReturnList){
	    this.put(ReqParamVo.consts.ISRETURNLIST,isReturnList);
	};
	ReqParamVo.prototype.getIsReturnList = function(){
		return this.getBoolean(ReqParamVo.consts.ISRETURNLIST);
	};
	ReqParamVo.prototype.clone = function(){
		var reqParamVo = new ReqParamVo();
		reqParamVo.fromObject(this.toObject());
		return reqParamVo;
	};

	/**
	 * 返回结果对象
	 */
	function ResultVo(){
	  this.obj = {};
	}
	ResultVo.consts = {
		//错误号
		ERROR_NO : "error_no" ,
		//错误信息
		ERROR_INFO : "error_info" ,
		//返回的多结果集的名称集合
		DSNAME : "dsName",
		//结果集
		RESULTS : "results" ,
		//请求参数
		REQPARAMVO : "reqParamVo" ,
		//返回的表头数据
		RESULTHEADERS : "fileds"
	};
	ResultVo.prototype = new DynModle();
	ResultVo.prototype.setErrorNo = function(errorNo){
		this.put(ResultVo.consts.ERROR_NO,errorNo);
	};
	ResultVo.prototype.getErrorNo = function(){
		return this.getString(ResultVo.consts.ERROR_NO);
	};
	ResultVo.prototype.setErrorInfo = function(errorInfo){
		this.put(ResultVo.consts.ERROR_INFO,errorInfo);
	};
	ResultVo.prototype.getErrorInfo = function(){
		return this.getString(ResultVo.consts.ERROR_INFO);
	};
	ResultVo.prototype.setResults = function(resultsMap){
		this.put(ResultVo.consts.RESULTS,resultsMap);
	};
	ResultVo.prototype.getResults = function(dsName){
        if(!dsName){
        	var dsNames = this.getDsName();
        	dsName = dsNames[0];
        }
        var resultsMap = this.getObject(ResultVo.consts.RESULTS);
        var results = resultsMap[dsName];
        var reqParamVo = this.getReqParamVo();
		if(!reqParamVo.getIsReturnList()){
			if(results != null && results.length > 0){
				results = results[0];
			}else{
				results = {};
			}
		}
		return results;
	};
	ResultVo.prototype.setResultHeaders = function(resultHeaders){
		this.put(ResultVo.consts.RESULTHEADERS,resultHeaders);
	};
	ResultVo.prototype.getResultHeaders = function(){
		return this.getObject(ResultVo.consts.RESULTHEADERS);
	};
	ResultVo.prototype.setReqParamVo = function(reqParamVo){
		this.put(ResultVo.consts.REQPARAMVO,reqParamVo);
	};
	ResultVo.prototype.getReqParamVo = function(){
		return this.getObject(ResultVo.consts.REQPARAMVO);
	};
	ResultVo.prototype.setDsName = function(dsName){
		this.put(ResultVo.consts.DSNAME,dsName);
	};
	ResultVo.prototype.getDsName = function(){
		return this.getObject(ResultVo.consts.DSNAME);
	};
	ResultVo.prototype.clone = function(){
		var resultVo = new ResultVo();
		resultVo.fromObject(this.toObject());
		return resultVo;
	};
	
});