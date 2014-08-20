/**
/**
 * 微信3g站点前端service层调用接口
 * */
define(function(require,exports,module){
	var appUtils = require("appUtils"),
	gconfig = require("gconfig"),
	domain = require("domain"),
	service = require("service"),
	global = gconfig.global,
	serverPathTrade = global.serverPath,
	layerUtils = require("layerUtils");
    var user=require("project/scripts/common/user");
	
	function MobileService(){
		this.service = new $.domain.Service();
	}
   /***应用接口......................................................开始*/

	/**
	 * 现金产品登记(1000301)
	 * @param fund_account    资金账户
	 * @param fund_company_code    基金公司代码
	 * @param fund_code    基金代码
	 **/

    /** added by jyc 2014-07-28
     * 现金产品登记 ()
     * @param fund_account		        资金账户
     * @param fund_company_code	   基金公司代码
     * @param fund_code		        基金代码
     * @param password	                用户密码
     **/
	MobileService.prototype.accountApply = function(param,callback,isLastReq,isShowWait,timeOutFunc){
		var paraMap = {};
		paraMap["funcNo"]= 1000301;
		paraMap["fund_account"] = param.fund_account;
		paraMap["fund_company_code"] = param.fund_company_code;
		paraMap["fund_code"] = param.fund_code;
		paraMap["password"] = param.password;

//		// 提取密码，传输密码
//		var password = extractPassword();
//		if(password == null || password == '')
//		{
//			// 跳出到登录页去
//        	appUtils.pageInit("cash/cashnotopen","login",{});
//			return false;
//		}
//		else	
//		{
//			paraMap["password"] = password;
//		}
        
		var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
        reqParamVo.setIsAsync(false);
		this.service.invoke(reqParamVo,callback);
	};

   /**
     * 每日交易汇总信息(1000302)
     * @param fund_account    资金账户
     * @param fund_code    基金代码
     * @param trade_date_from    查询日期开始(yyyy-mm-dd)
     * @param trade_date_to    查询日期结束(yyyy-mm-dd)
     * 
     * 该方法必须为同步方法
     *
     * @param page_size	分页大小
     * @param page_no	以1开始的页面序号
   	 **/
	MobileService.prototype.dailyinfo = function(param,callback,isLastReq,isShowWait,timeOutFunc){
		var paraMap = {};
		paraMap["funcNo"]= 1000302;
		paraMap["fund_account"] = param.fund_account;
		paraMap["fund_code"] = param.fund_code;
		paraMap["trade_date_from"] = param.trade_date_from;
		paraMap["trade_date_to"] = param.trade_date_to;
        
		paraMap["page_size"] = param.page_size;
		paraMap["page_no"] = param.page_no;

		var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		reqParamVo.setIsAsync(false);
		this.service.invoke(reqParamVo,callback);
    };
   /**
     * 交易流水查询(1000303)
     * @param fund_account    资金账户
     * @param fund_code    基金代码
     * @param trade_date_from    查询日期开始(yyyy-mm-dd)
     * @param trade_date_to    查询日期结束(yyyy-mm-dd)
     * @param page_size	分页大小
     * @param page_no	以1开始的页面序号
   **/
   MobileService.prototype.tradeinfo = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= 1000303;
        paraMap["fund_account"] = param.fund_account;
        paraMap["fund_code"] = param.fund_code;
        paraMap["trade_date_from"] = param.trade_date_from;
        paraMap["trade_date_to"] = param.trade_date_to;
        
        paraMap["page_size"] = param.page_size;
		paraMap["page_no"] = param.page_no;

        var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		this.service.invoke(reqParamVo,callback);
    };

   /**
     * 现金产品登记查询(1000304)
     * @param fund_account    资金账户
     * @param fund_code    基金代码
    **/
   MobileService.prototype.currentinfo = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= 1000304;
        paraMap["fund_account"] = param.fund_account;
        paraMap["fund_code"] = param.fund_code;

        var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		this.service.invoke(reqParamVo,callback);
    };


    //added by jhl 2014-07-25
    //调用银行绑定账号属性查询
    MobileService.prototype.bankAccountInfo = function(param, callback, isLastReq, isShowWait, timeOutFunc) {
        var paramMap = {};
        paramMap.funcNo = 1001601;
        paramMap.fund_account = param.fund_account;
        paramMap.password = param.password;
        if (null == param.password || "" == param.password) {
            var pswd = extractPassword();
            paramMap.password = pswd;
        }
        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl(service.serverPath);
        reqParamVo.setReqParam(paramMap);
        reqParamVo.setIsLastReq("undefined" == typeof isLastReq || "" === isLastReq ? !0 : isLastReq);
        reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
        reqParamVo.setTimeOutFunc(timeOutFunc);
        this.service.invoke(reqParamVo, callback);
    };

    //added by jhl 2014-07-25
    //调用银行绑定账号属性查询
    MobileService.prototype.balanceQuery = function(param, callback, isLastReq, isShowWait, timeOutFunc) {
        var paramMap = {};
        paramMap.funcNo = 1001602;
        paramMap.money_type = 0;
        paramMap.branch_no = param.branch_no;
        paramMap.fund_account = param.fund_account;
        paramMap.bank_password = param.bank_password;
        paramMap.password = param.password;
        if (null == param.password || "" == param.password) {
            var pswd = extractPassword();
            paramMap.password = pswd;
        }

        /*
        if (h.funcNo = 1001602, h.branch_no = a.branch_no, h.fund_account = a.fund_account, h.password = a.password, null == a.password || "" == a.password) {
            var i = b();
            h.password = i
        }
        h.bank_password = a.bank_password,
            h.money_type = a.money_type;
        */
        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl(service.serverPath);
        reqParamVo.setReqParam(paramMap);
        reqParamVo.setIsLastReq("undefined" == typeof isLastReq || "" === isLastReq ? !0 : isLastReq);
        reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
        reqParamVo.setTimeOutFunc(timeOutFunc);
        this.service.invoke(reqParamVo, callback);
    };


    //addey by jhl 2014-07-29
    //BANK_TRADE_0003 充值转账  佣金宝充值
    MobileService.prototype.transferMoney = function(param, callback, isLastReq, isShowWait, timeOutFunc){
        var paramMap = {};
        paramMap.funcNo = 1001603;
        paramMap.branch_no = param.branch_no;
        paramMap.money_type = 0;
        paramMap.fund_account = param.fund_account;
        paramMap.bank_password = param.bank_password;
        paramMap.password = param.password;
        if (null == param.password || "" == param.password) {
            //var pswd = extractPassword(); //注释 jyc
            var pswd=user.password;
            paramMap.password = pswd;
        }
        paramMap.occur_balance = param.occur_balance;
        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl(service.serverPath);
        reqParamVo.setReqParam(paramMap);
        reqParamVo.setIsLastReq("undefined" == typeof isLastReq || "" === isLastReq ? !0 : isLastReq);
        reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
        reqParamVo.setTimeOutFunc(timeOutFunc);
        this.service.invoke(reqParamVo, callback);
    };


    //addey by jhl 2014-07-29
    //从基金日志中获取余额
    MobileService.prototype.queryBalanceFromFundLog = function(param, callback, isLastReq, isShowWait, timeOutFunc){
        var paramMap = {};
        paramMap.funcNo = 1001604;
        paramMap.serialNO = param.serialNO;
        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl(service.serverPath);
        reqParamVo.setReqParam(paramMap);
        reqParamVo.setIsLastReq("undefined" == typeof isLastReq || "" === isLastReq ? !0 : isLastReq);
        reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
        reqParamVo.setTimeOutFunc(timeOutFunc);
        this.service.invoke(reqParamVo, callback);
    };


    //addey by jhl 2014-07-30
    //计算交易日 rechargesuccess.html
    MobileService.prototype.calculateTradeDay = function(param, callback, isLastReq, isShowWait, timeOutFunc){
        var paramMap = {};
        paramMap.funcNo = "BANK_TRADE_0011";
        paramMap.serialNO = param.serialNO;
        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl(service.serverPath);
        reqParamVo.setReqParam(paramMap);
        reqParamVo.setIsLastReq("undefined" == typeof isLastReq || "" === isLastReq ? !0 : isLastReq);
        reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
        reqParamVo.setTimeOutFunc(timeOutFunc);
        this.service.invoke(reqParamVo, callback);
    };


    //addey by jhl 2014-07-30
    //计算交易日 rechargesuccess.html
    MobileService.prototype.calcTradeDay = function(param, callback, isLastReq, isShowWait, timeOutFunc){
        var paramMap = {};
        paramMap.funcNo = 1000325;
        paramMap.exchange_type = param.exchange_type;
        paramMap.date = param.date;
        paramMap.time = param.time;
        paramMap.ifSkip = param.ifSkip;
        paramMap.nextN = param.nextN;
        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl(service.serverPath);
        reqParamVo.setReqParam(paramMap);
        reqParamVo.setIsLastReq("undefined" == typeof isLastReq || "" === isLastReq ? !0 : isLastReq);
        reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
        reqParamVo.setTimeOutFunc(timeOutFunc);
        this.service.invoke(reqParamVo, callback);
    };


    /**
     * //修改资金密码、修改交易密码(112)
     * @param MobileCode        String 手机号（手机取）
     * @param Token             String 时间戳（手机取）
     * @param Reqno             Number 请求标示
     * @param PASSWORDTYPE      Number 密码类型 ('1'：资金密码  '2'：交易密码)
     * @param PassWord          String 老密码
     * @param NewPassword       String 新密码
     **/
    MobileService.prototype.modifyPassword = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= "actionCode";
        paraMap["funcName"]= "modifyPassword";
        paraMap["MobileCode"]= param.MobileCode;
        paraMap["Token"]= param.Token;
        if ("Reqno" in param) paraMap["Reqno"]= param.Reqno;
        paraMap["PASSWORDTYPE"]= param.PASSWORDTYPE;
        paraMap["PassWord"]= param.PassWord;
        paraMap["NewPassword"]= param.NewPassword;
        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl(global.serverPath);
        reqParamVo.setReqParam(paraMap);
        reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
        reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
        reqParamVo.setTimeOutFunc(timeOutFunc);
        this.service.invoke(reqParamVo,callback);
    };





    /**
     * 基金赎回(1000305)
     * @param fund_account    资金账户
     * @param fund_code    基金代码
     * @param redeem_amount    取现金额（元）
	 * @param fund_company    基金公司代码
	 * @param cipher_token    密码token
    **/
	MobileService.prototype.redeem = function(param,callback,isLastReq,isShowWait,timeOutFunc){
		var paraMap = {};
		paraMap["funcNo"]= 1000305;
		paraMap["fund_account"] = param.fund_account;
		paraMap["fund_code"] = param.fund_code;
		paraMap["redeem_amount"] = param.redeem_amount;
		paraMap["fund_company"] = param.fund_company;
		paraMap["password"] = param.password;
		
//		// 提取密码，传输密码
//        var password = extractPassword();
        var password=user.password;
        if(password == null || password == '')
		{
			// 跳出到登录页去
        	appUtils.pageInit("cash/takenback","login",{});
			return false;
		}
		else
		{
			paraMap["password"] = password;
		}

		var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		this.service.invoke(reqParamVo,callback);
	};

   /**
     * 自动申购触发金额修改(1000306)
     * @param fund_account    资金账户
     * @param fund_code    基金代码
     * @param auto_apply_threshold    最低触发金额（元）
    **/
	MobileService.prototype.autoapply = function(param,callback,isLastReq,isShowWait,timeOutFunc){
		var paraMap = {};
        paraMap["funcNo"]= 1000306;
        paraMap["fund_account"] = param.fund_account;
        paraMap["fund_code"] = param.fund_code;
        paraMap["auto_apply_threshold"] = param.auto_apply_threshold;
        paraMap["password"] = param.password;
        
        // 提取密码，传输密码
//		var password = extractPassword();
//		if(password == null || password == '')
//		{
//			// 跳出到登录页去
//        	var jsonParam = {"pageKind":"cash"};
//			appUtils.pageInit("cash/autorecharge","login",jsonParam);
//			return false;
//		}
//		else	
//		{
//			paraMap["password"] = password;
//		}

        var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		this.service.invoke(reqParamVo,callback);
    };

   /**
     * 现金产品取消(1000307)
     * @param fund_account    资金账户
     * @param fund_company_code    基金公司代码
     * @param fund_code    基金代码
    **/
   MobileService.prototype.accountCancel = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= 1000307;
        paraMap["fund_account"] = param.fund_account;
        paraMap["fund_company_code"] = param.fund_company_code;
        paraMap["fund_code"] = param.fund_code;
        
        // 提取密码，传输密码
        var password = extractPassword();
        if(password == null || password == '')
		{
			// 跳出到登录页去
        	appUtils.pageInit("cash/","login",{});
			return false;
		}
		else	
		{
			paraMap["password"] = password;
		}

        var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		this.service.invoke(reqParamVo,callback);
    };

   /**
     * 电子协议签署(1000308)
     * @param fund_account    资金账户
     * @param econtract_id    电子合同编号
     * @param cert_type    证书类型(0:自建证书 1:中登证书 9:无证)
     * @param cert_sign    数字签名
     * @param cert_plain_text    签名原文
     * @param cert_attachInfo    签名附加信息
    **/
   MobileService.prototype.econtractSign = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= 1000308;
        paraMap["fund_account"] = param.fund_account;
        paraMap["econtract_id"] = param.econtract_id;

        var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
        reqParamVo.setIsAsync(false);
		this.service.invoke(reqParamVo,callback);
    };

   /**
     * 电子协议状态查询(1000309)
     * @param fund_account    资金账户
     * @param econtract_id    参见电子协议字典
    **/
   MobileService.prototype.econtractStatus = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= 1000309;
        paraMap["fund_account"] = param.fund_account;
        paraMap["econtract_id"] = param.econtract_id;

        var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		this.service.invoke(reqParamVo,callback);
    };


    /**
     * 金腾通开户交易时间查询(1000333)
     * @param fund_account	String	资金账户	Y
     * @param fund_code	String	基金代码	Y
     * @param fund_company	String	基金公司	Y
     **/
    MobileService.prototype.accountTransactionTime = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= 1000333;
        paraMap["fund_account"]=param.fund_account;
        paraMap["fund_code"] = param.fund_code;
        paraMap["fund_company"] = param.fund_company;

        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl(global.serverPath);
        reqParamVo.setReqParam(paraMap);
        reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
        reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
        reqParamVo.setTimeOutFunc(timeOutFunc);
        this.service.invoke(reqParamVo,callback);
    };


	/**
      * 电子协议基本信息查询(1000310)
      * @param econtract_id		参见电子协议字典
	  * @param returnContent		是否返回电子合同内容
     **/
   MobileService.prototype.econtractInfo = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= 1000310;
        paraMap["econtract_id"] = param.econtract_id;
        
        paraMap["fund_account"] = param.fund_account;
        paraMap["returnContent"]=param.returnContent;
        var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
       reqParamVo.setIsAsync(false);
		this.service.invoke(reqParamVo,callback);
    };

   /**
     * 资金账户校验(1000311)
     * @param fund_account    资金账户
     * @param fund_pwd    交易密码
    **/
   /*
   MobileService.prototype.fundAuth = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= 1000311;
        paraMap["fund_account"] = param.fund_account;
        paraMap["fund_pwd"] = param.fund_pwd;

        var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		this.service.invoke(reqParamVo,callback);
    };
    */
    /**
     * 认证服务(1001120)
     * @param fund_account	资金账户
     * @param fund_pwd		交易密码
    **/
   MobileService.prototype.fundAuth = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= 1001120;
        paraMap["accountType"] = "1";// 账号类型(1:资金账户)
        paraMap["accountId"] = param.fund_account;
        paraMap["password"] = param.fund_pwd;

        var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		this.service.invoke(reqParamVo,callback);
    };


    /**
     * copied by jhl 2014-07-24
     * 查询充值历史
     *  @param fund_account
     */
    MobileService.prototype.history = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= 1001605;
        paraMap["fund_account"] = param.fund_account;

        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl(global.serverPath);
        reqParamVo.setReqParam(paraMap);
        reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
        reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
        reqParamVo.setTimeOutFunc(timeOutFunc);
        //reqParamVo.setIsAsync(false);
        this.service.invoke(reqParamVo,callback);
    };


   /**
     * 证券账户资产信息统计查询(1000312)
     * @param fund_account		资金账户
     * @param money_type		币种类别,枚举值参见业务字典-货币类型.如果为空,则表示所有币种类别 0人民币 1美元 2港元
     * 
    **/
   MobileService.prototype.assetSummaryInfo = function(param,callback,isLastReq,isShowWait,timeOutFunc){

        var paraMap = {};
        paraMap["funcNo"]= 1000312;
        paraMap["fund_account"] = param.fund_account;
        paraMap["password"] = param.password; //added by jhl 2014-07-24 资金密码
        paraMap["money_type"] = param.money_type;


        var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		this.service.invoke(reqParamVo,callback);
    };

   /**
     * 证券账户当前持股信息(1000313)
     * @param fund_account    资金账户
     * @param money_type		币种类别,枚举值参见业务字典-货币类型.如果为空,则表示所有币种类别 0人民币 1美元 2港元
     * @param page_size			分页大小
     * @param page_no			以1开始的页面序号
    **/
   MobileService.prototype.assetStockHolderInfo = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= 1000313;
        paraMap["fund_account"] = param.fund_account;
		paraMap["money_type"] = param.money_type;
		paraMap["page_size"] = param.page_size;
		paraMap["page_no"] = param.page_no;
		
        var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		this.service.invoke(reqParamVo,callback);
    };


   /**
     * 账户绑定执行(1000314)
     * @param fund_account    资金账户
     * @param account_type    账号类型(0:微信绑定)
     * @param account_id    "账号IDaccount_type=0时为微信open_id"  
     * @param account_info  账号相关的附加信息,JSON对象属性定义见如下缩进部分
     * @param token   account_type=0时有值,微信token
     **/
   MobileService.prototype.userAcctBind = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= 1000314;
        paraMap["fund_account"] = param.fund_account;
        paraMap["account_type"] = param.account_type;
        paraMap["account_id"] = param.account_id;
        paraMap["account_info"] = param.account_info;
        paraMap["token"] = param.token;

        var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		this.service.invoke(reqParamVo,callback);
    };

   /**
     * 账号绑定查询(1000315)
     * @param account_type    账户类型(0:微信绑定)account_type=8时为微信open_id"
     * @param account_id    "账号ID
     **/
   MobileService.prototype.userAcctBindQuery = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= 1000315;
        paraMap["account_type"] = param.account_type;
        paraMap["account_id"] = param.account_id;

        var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		this.service.invoke(reqParamVo,callback);
    };

   /**
     * 用户信息查询(1000316)
     * @param fund_account    资金账户
   **/
   MobileService.prototype.userInfoQuery = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= 1000316;
        paraMap["fund_account"] = param.fund_account;
//       "account":'($account)',
//           "Account":'($Account)',
//           "Password":'($Password)',
//       paraMap["account"] = param.account;
//       paraMap["Account"] = param.Account;
//       paraMap["Password"] = param.Password;
//       paraMap["password"] = param.password;
//       paraMap["FundAccount"] = param.FundAccount;
//       paraMap["Fund_Account"] = param.Fund_Account;

        var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		this.service.invoke(reqParamVo,callback);
    };

   /**
     * 用户信息修改(1000317)
     * @param fund_account    资金账户
     * @param mobile    手机号码
     * @param tel    联系电话
     * @param address    联系地址
    **/
   MobileService.prototype.userInfoUpdate = function(param,callback,isLastReq,isShowWait,timeOutFunc){
	   var paraMap = {};
        paraMap["funcNo"]= 1000317;
        paraMap["fund_account"] = param.fund_account;
       paraMap["password"] = param.password;

        paraMap["mobile"] = param.mobile;
        paraMap["tel"] = param.tel;
        paraMap["address"] = param.address;
        
        // 提取密码，传输密码  临时注释
//        var password = extractPassword();
//        if(password == null || password == '')
//		{
//			// 跳出到登录页去
//        	appUtils.pageInit("mine/iInfo","login",{});
//			return false;
//		}
//		else
//		{
//			paraMap["password"] = password;
//		}
        var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		this.service.invoke(reqParamVo,callback);
    };

   /**
     * 用户消息订阅查询(1000318)
     * @param fund_account    资金账户
     * @param channel    订阅渠道(0:微信渠道)
    **/
   MobileService.prototype.userMessageDescribeQuery = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= 1000318;
        paraMap["fund_account"] = param.fund_account;
        paraMap["subscribe_source"] = param.subscribe_source;

        var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		this.service.invoke(reqParamVo,callback);
    };
    /**
     * 消息订阅查询（1000326）
     * @param subscribe_source 订阅来源(0:微信)
     */
    MobileService.prototype.messageSubscribeQuery = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= 1000326;
        paraMap["subscribe_source"] = param.subscribe_source;

        var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		this.service.invoke(reqParamVo,callback);
    };
    /**
     * 订阅消息提示内容
     * @param subscribe_source 订阅来源（0：微信）
     * @param message_no 消息编号
     */
    MobileService.prototype.messageSubscribeTxtQuery = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= 1000331;
        paraMap["subscribe_source"] = param.subscribe_source;
        paraMap["message_no"] = param.message_no;

        var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		this.service.invoke(reqParamVo,callback);
    };
   /**
     * 用户消息订阅更新(1000319)
     * @param fund_account    资金账户
     * @param channel    订阅渠道(0:微信渠道)
     * @param message_type    消息类型(参见消息类型字典)
     * @param describe_status    订阅状态(0:未订阅,1:订阅中)
    **/
   MobileService.prototype.userMessageDescribeUpdate = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= 1000319;
        paraMap["fund_account"] = param.fund_account;
        paraMap["message_no"] = param.message_no;
        paraMap["subscribe_source"] = param.subscribe_source;
        paraMap["subscribe_channel"] = param.subscribe_channel;
        paraMap["op_type"] = param.op_type;

        var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		this.service.invoke(reqParamVo,callback);
    };

   /**
    * 电子协议内容查询(1000320)   jyc
    * @param econtract_id    资金账户
   **/
   MobileService.prototype.econtractContent = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= 1000320;
        paraMap["econtract_id"] = param.econtract_id;

        var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
        reqParamVo.setIsAsync(false);
		this.service.invoke(reqParamVo,callback);
    };

  /**
    * 存管银行信息查询(1000321)
    * @param fund_account    资金账户
   **/
   MobileService.prototype.depositoryBankInfo = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= 1000321;
        paraMap["fund_account"] = param.fund_account;
        
       	// 提取密码，传输密码
        //var password = extractPassword();
        //测试，临时写入
        var password=user.password;
        if(password == null || password == '')
		{
			// 跳出到登录页去
        	appUtils.pageInit("cash/cashnotopen","login",{});
			return false;
		}
		else	
		{
			paraMap["password"] = password;
		}

        var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		this.service.invoke(reqParamVo,callback);
    };
    
    /**
    * 现金产品表现数据查询(1000322)
    * @param fund_code			基金代码
    * @param trade_date_from	查询日期开始(yyyy-mm-dd)
    * @param trade_date_to		查询日期结束(yyyy-mm-dd)
    * @param page_size			分页大小
    * @param page_no			以1开始的页面序号
   **/
   MobileService.prototype.fundPerformanceInfo = function(param,callback,isLastReq,isShowWait,timeOutFunc){
		var paraMap = {};
		paraMap["funcNo"]= 1000322;
		paraMap["fund_code"] = param.fund_code;
		paraMap["trade_date_from"] = param.trade_date_from;
		paraMap["trade_date_to"] = param.trade_date_to;
		paraMap["page_size"] = param.page_size;
		paraMap["page_no"] = param.page_no;

        var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		this.service.invoke(reqParamVo,callback);
    };


    /** added by jhl 2014-07-22
     * 查看是否开通金腾通 ()
     * @param account_type		账户类型 (8:微信绑定)
     * @param account_id	    账号id (account_type=8时为微信open_id)
     **/
    MobileService.prototype.checkJttBinded = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= "FND_0004";
        paraMap["fund_code"] = param.fund_code;
        paraMap["fund_account"] = param.fund_account;

        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl(global.serverPath);
        reqParamVo.setReqParam(paraMap);
        reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
        reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
        reqParamVo.setTimeOutFunc(timeOutFunc);

        this.service.invoke(reqParamVo,callback);
    };


    
    /**
    * 现金产品收益数据查询(1000323)
    * @param fund_account		资金账户
    * @param fund_code			基金代码
    * @param trade_date_from	查询日期开始(yyyy-mm-dd)
    * @param trade_date_to		查询日期结束(yyyy-mm-dd)
    * @param page_size			分页大小
    * @param page_no			以1开始的页面序号
   **/
   MobileService.prototype.fundReturnInfo = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= 1000323;
        paraMap["fund_account"] = param.fund_account;
        paraMap["fund_code"] = param.fund_code;
		paraMap["trade_date_from"] = param.trade_date_from;
		paraMap["trade_date_to"] = param.trade_date_to;
		paraMap["page_size"] = param.page_size;
		paraMap["page_no"] = param.page_no;
		paraMap["dailyflag"] = param.dailyflag;

        var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		this.service.invoke(reqParamVo,callback);
    };


        /**
     * added by jhl 2014-07-26
     * 验证资金账号和密码是否正确 PASPT_0011  认证服务
     * @param accountType		账户类型 (1:资金账户)
     * @param accountId			账号ID
     * @param password	        密码
     **/
    MobileService.prototype.checkAccount = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= "PASPT_0011";
        paraMap["accountType"]= 1;
        paraMap["accountId"] = param.accountId;
        paraMap["password"] = param.password;

        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl(global.serverPath);
        reqParamVo.setReqParam(paraMap);
        reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
        reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
        reqParamVo.setTimeOutFunc(timeOutFunc);
        this.service.invoke(reqParamVo,callback);
    };


    /**
     * added by jhl 2014-07-26
     * 获取银行卡余额 BANK_TRADE_0002
     * @param accountType		账户类型 (1:资金账户)
     * @param accountId			账号ID
     * @param password	        密码
     **/
    MobileService.prototype.getBankBalance = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= "BANK_TRADE_0002";
        paraMap["branch_no"] = param.branch_no;
        paraMap["fund_account"] = param.fund_account;
        paraMap["password"] = param.password;
        paraMap["bank_password"] = param.bank_password;
        paraMap["money_type"] = param.money_type;

        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl(global.serverPath);
        reqParamVo.setReqParam(paraMap);
        reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
        reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
        reqParamVo.setTimeOutFunc(timeOutFunc);
        this.service.invoke(reqParamVo,callback);
    };



    /**
     * 提现历史记录查询(FND_0010)
     *@param fund_account	  资金号		　
	 *@param page_size 分页大小
	 *@param page_no	页面序号
     */
    MobileService.prototype.redeemHistory = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= 1000327;
        paraMap["fund_account"] = param.fund_account;
        paraMap["page_size"] = param.page_size;
		paraMap["page_no"] = param.page_no;

        var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		this.service.invoke(reqParamVo,callback);
    };

    /**
     * 提现撤销(FND_0011)
     *@param withdraw_id	提现记录id		　
     */
    MobileService.prototype.redeemUndo = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= 1000328;
        paraMap["withdraw_id"] = param.withdraw_id;
        paraMap["fund_account"] = param.fund_account;
        // 提取密码，传输密码
		var password = extractPassword();
		if(password == null || password == '')
		{
			// 跳出到登录页去
        	//appUtils.pageInit("cash/takenbackhistory","login",{});
            appUtils.pageInit("cash/takenbackhistory","yjb/yjb_i_beforeLogin",{});
			return false;
		}
		else	
		{
			paraMap["password"] = password;
		}

        var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		this.service.invoke(reqParamVo,callback);
    };

    /**
     * 成功提现总额(FND_0012)
     *@param fund_account	资金账号	　
     */
    MobileService.prototype.redeemTotalAmount = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= 1000329;
        paraMap["fund_account"] = param.fund_account;

        var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		this.service.invoke(reqParamVo,callback);
    };
    
    /**
     *获取当前是否基金交易时间(FND_0013)
     *@param fund_company	基金公司代码76
     */
    MobileService.prototype.checkFundTradeTime = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= 1000330;
        paraMap["fund_company"] = param.fund_company;
        paraMap["fund_account"]=param.fund_account;
        paraMap["fund_code"]=param.fund_code;

        var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		reqParamVo.setIsAsync(false);
		this.service.invoke(reqParamVo,callback);
    };
    
    
    
    /**
     *获取基金下n个交易日期(FND_0012)
     *@param plus_days	获取基金下n个交易日期
     *@param fund_company	基金公司代码76
     */
    MobileService.prototype.nextTradeDate = function(param,callback,isLastReq,isShowWait,timeOutFunc){
        var paraMap = {};
        paraMap["funcNo"]= 1000332;
        paraMap["plus_days"] = param.plus_days;
        paraMap["fund_company"] = param.fund_company;

        var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		reqParamVo.setIsAsync(false);
		this.service.invoke(reqParamVo,callback);
    };
    
    
    /**
     * 保存密码(UPS_0001)
     *@param app_id	  id		　
	 *@param app_uuid 唯一值　
	 *@param cipher_content	 密码	 
	 *@param cipher_type 密码类型	 
     *@param duration_hours 持久时间(小时)	 

    **/
    MobileService.prototype.savePWDstr = function(param,callback,isLastReq,isShowWait,timeOutFunc){
         var paraMap = {};
         paraMap["funcNo"]= "1001001";
         paraMap["app_id"] = param.app_id;
         paraMap["app_uuid"] = param.app_uuid;
         paraMap["cipher_content"] = param.cipher_content;
         paraMap["cipher_type"] = param.cipher_type;
         paraMap["duration_hours"] = param.duration_hours;

		var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		reqParamVo.setIsAsync(false);
		this.service.invoke(reqParamVo,callback);
    };
     
     /**
      * 提取密码(UPS_0002)
      * @param cipher_token  密码token
     **/
     MobileService.prototype.getPWD = function(param,callback,isLastReq,isShowWait,timeOutFunc){
          var paraMap = {};
          paraMap["funcNo"]= "1001002";
          paraMap["cipher_token"] = param.cipher_token;

		var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		reqParamVo.setIsAsync(false);
		this.service.invoke(reqParamVo,callback);
    };
    
    /**
      * 获取密码失效时间(UPS_0005)
      * @param cipher_token  密码token
     **/
     MobileService.prototype.getExpiredTime = function(param,callback,isLastReq,isShowWait,timeOutFunc){
          var paraMap = {};
          paraMap["funcNo"]= "1001005";
          paraMap["cipher_token"] = param.cipher_token;

		var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		reqParamVo.setIsAsync(false);
		this.service.invoke(reqParamVo,callback);
    };
	
	function extractPassword()
	{
		 // 提取密码，传输密码
		// 仅传输加密密文，不传输原文
		// add by chenxy20140526
        var password = "";
    	// var cipherToken = appUtils.getLStorageInfo("cipherToken");
    	
		// if(cipherToken != null && cipherToken.length != 0)
		// {
		//	password = cipherToken;
			/*
			//根据字符串请求接口取密码
			var param2 = {"cipher_token" : cipherToken};
			getInstance().getPWD(param2,function(data){
				var error_no = data.error_no,
				error_info = data.error_info;
				if(error_no == "0"){
					var results =JSON.parse(data["results"][0]["result"]);
					password = results["cipherContent"];
				}else{
					layerUtils.iMsg(-1,error_info);
					return null;
				}
			});
			*/
		// }
		
		// 从数据库提取加密密文
		// add by chenxy20140529
		var cipher_token = "";
		var weixinpk = appUtils.getLStorageInfo("weixinpk");
		var openid = appUtils.getLStorageInfo("openid");
		var jsonParam = {"weixinpk":weixinpk,"openid":openid};
		var getLocalPasswordComplate = function(resultVo){
			if(resultVo.error_no == 0)
			{
				if(resultVo["results"] != null)
				{
					cipher_token = resultVo["results"][0]["cipher_token"];
					// password = cipher_token;
				}
				else
				{
					cipher_token = null;
				}
			}
			else
			{
				layerUtils.iMsg(-1,resultVo.error_info);
				return false;
			}
		};
		getInstance().getLocalPassword(jsonParam, getLocalPasswordComplate);
		var jsonParam2 = {"cipher_token":cipher_token};
		var getPWDComplate = function(resultVo){
			if(resultVo.error_no == 0)
			{
				if(resultVo["results"] != null)
				{
					var results = JSON.parse(resultVo["results"][0]["result"]);
					password = results["cipherContent"];
				}
				else
				{
					cipher_token = null;
				}
			}
			else
			{
				layerUtils.iMsg(-1,resultVo.error_info);
				return false;
			}
		};
		getInstance().getPWD(jsonParam2, getPWDComplate);
		return password;
	}
	
	/**
	 * 设置密码
	**/
	MobileService.prototype.setPassword = function(fund_pwd)
	{
		// 密码服务
		var date = new Date();
	    var app_id = "weixin";
	    var app_uuid = date.getTime()+Math.random();
	    var cipher_content = fund_pwd; // 密码字段
	    var cipher_type = "1";
	    var duration_hours = "24";
		var jsonParam = {"app_id":app_id,"app_uuid":app_uuid,"cipher_content":cipher_content,"cipher_type":cipher_type,"duration_hours":duration_hours};
		var savePWDstrComplate = function(resultVo){
			if(resultVo.error_no == 0)
			{
				var resultDataJson = resultVo["results"][0];
				resultProcess = JSON.parse(resultDataJson["result"]);
				
				if(resultDataJson != null)
				{
					cipherToken = resultProcess["cipherToken"];
					appUtils.setLStorageInfo("cipherToken",cipherToken);
					
				}
			}
			else
			{
				layerUtils.iMsg(-1,resultVo.error_info);
				return false;
			}
		};
		this.service.savePWDstr(jsonParam,savePWDstrComplate);
	}
	
	/**
	  * 微信库保存密码(1000902)
	  * @param weixinpk		公众号原始id
	  * @param openid			客户唯一标识
	  * @param fund_account	资金账户
	  * @param cipher_token	加密token
	  * @param expires_longtime	过期时间
	  * @param durable_token sso令牌
	  * @param expires_longtime_sso sso过期时间
	 **/
	MobileService.prototype.saveLocalPassword = function(param,callback,isLastReq,isShowWait,timeOutFunc){
		var paraMap = {};
		paraMap["funcNo"]= 1000902;
		paraMap["weixinpk"] = param.weixinpk;
		paraMap["openid"] = param.openid;
		paraMap["fund_account"] = param.fund_account;
		paraMap["cipher_token"] = param.cipher_token;
		paraMap["expires_longtime"] = param.expires_longtime;
		paraMap["durable_token"] = param.durable_token;
		paraMap["expires_longtime_sso"] = param.expires_longtime_sso;

		var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		reqParamVo.setIsAsync(false);
		this.service.invoke(reqParamVo,callback);
	};
    
	/**
	 * 微信库获取密码(1000903)
	 * @param weixinpk		公众号原始id
	 * @param openid			客户唯一标识
	**/
	MobileService.prototype.getLocalPassword = function(param,callback,isLastReq,isShowWait,timeOutFunc){
		var paraMap = {};
		paraMap["funcNo"]= 1000903;
		paraMap["weixinpk"] = param.weixinpk;
		paraMap["openid"] = param.openid;

		var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		reqParamVo.setIsAsync(false);
		this.service.invoke(reqParamVo,callback);
	};
    
    
	/**
	 * 发送短信验证码(1001305)
	 * @param mobile		短信验证手机号码
	 **/
	MobileService.prototype.sendMessageCode = function(param,callback,isLastReq,isShowWait,timeOutFunc){
		var paraMap = {};
		paraMap["funcNo"]= 1001305;
		paraMap["mobile"] = param.mobile;

		var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		reqParamVo.setIsAsync(false);
		this.service.invoke(reqParamVo,callback);
	};
     
	/**
	 * UAS_002  验证验证码(1001302)
	 * @param captcha_id		验证码编号
	 * @param captcha_code    验证码
	 * @param expire_now      是否有效
	 **/
	MobileService.prototype.checkMessageCode = function(param,callback,isLastReq,isShowWait,timeOutFunc){
		var paraMap = {};
		paraMap["funcNo"]= 1001302;
		paraMap["captcha_id"] = param.captcha_id;
		paraMap["captcha_code"] = param.captcha_code;
		paraMap["expire_now"] = param.expire_now;

		var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		reqParamVo.setIsAsync(false);
		this.service.invoke(reqParamVo,callback);
	};
	
	/**
	 * 申请验证码id(1001301)
	 * @param len				验证码长度
	 * @param complex_random	验证码复杂度是否随机(0 否，1是)为0时检查char_len与int_len两个字段
	 * @param char_len		包含多少个字符
	 * @param int_len			包含多少个数字
	**/
	MobileService.prototype.applyCode = function(param,callback,isLastReq,isShowWait,timeOutFunc){
		var paraMap = {};
		paraMap["funcNo"]= 1001301;
		paraMap["len"] = param.len;
		paraMap["complex_random"] = param.complex_random;
		paraMap["char_len"] = param.char_len;
		paraMap["int_len"] = param.int_len;
		
		var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		reqParamVo.setIsAsync(false);
		this.service.invoke(reqParamVo,callback);
	};
      
	/**
	  * 获取验证码图片base64(1001306)
	  * @param captcha_id		验证码编号
	  * @param width    图片宽
	  * @param height   图片长
	  * @param font_size 字体大小
	 **/
	MobileService.prototype.getCaptchaImageBase64 = function(param,callback,isLastReq,isShowWait,timeOutFunc){
		var paraMap = {};
		paraMap["funcNo"]= 1001306;
		paraMap["captcha_id"] = param.captcha_id;
		paraMap["width"] = param.width;
		paraMap["height"] = param.height;
		paraMap["font_size"] = param.font_size;
		
		var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		reqParamVo.setIsAsync(false);
		this.service.invoke(reqParamVo,callback);
	};
	
	/**
	  * DT_001注册全局回话(1001201)
	  * @param app_id		应用程序编号
	  * @param passport_id    通行证编号
	  * @param account   用来登录的账号
	  * @param user_ip 用户IP
	  * @param cipher_content 密码
	  * @param cipher_type 密码类型  0- 交易密码 1 - 资金密码 2 - 电话银行密码
	  * @param key_info 应用程序运行时主键
	 **/
	MobileService.prototype.registerOnlineUsersSession = function(param,callback,isLastReq,isShowWait,timeOutFunc){
		var paraMap = {};
		paraMap["funcNo"]= 1001201;
		paraMap["app_id"] = param.app_id;
		paraMap["passport_id"] = param.passport_id;
		paraMap["account"] = param.account;
		// paraMap["user_ip"] = param.user_ip;
		paraMap["cipher_content"] = param.cipher_content;
		paraMap["cipher_type"] = param.cipher_type;
		paraMap["key_info"] = param.key_info;
		
		var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		reqParamVo.setIsAsync(false);
		this.service.invoke(reqParamVo,callback);
	};
	
	/**
	  * DT_005  通过durable_token获取密码令牌(1001205)
	  * @param durable_token		持久令牌
	 **/
	MobileService.prototype.getCipherTokenByDurableToken = function(param,callback,isLastReq,isShowWait,timeOutFunc){
		var paraMap = {};
		paraMap["funcNo"]= 1001205;
		paraMap["durable_token"] = param.durable_token;
		
		var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		reqParamVo.setIsAsync(false);
		this.service.invoke(reqParamVo,callback);
	};
	
	/**
	  * PASPT_0013  通行证账号信息查询(1001122)
	  * @param passportId		通行证ID
	  * @param accountType		账号类型
	  * @param accountId		账号ID
	 **/
	MobileService.prototype.getPassport = function(param,callback,isLastReq,isShowWait,timeOutFunc){
		var paraMap = {};
		paraMap["funcNo"]= 1001122;
		paraMap["passportId"] = param.passportId;
		paraMap["accountType"] = param.accountType;
		paraMap["accountId"] = param.accountId;
		
		var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		reqParamVo.setIsAsync(false);
		this.service.invoke(reqParamVo,callback);
	};
	
      
	/**
	 * 查询首个交易日时间
	 * @param fund_account 
	 * @param fund_code
	 */
	MobileService.prototype.firstIncomeDate = function(param,callback,isLastReq,isShowWait,timeOutFunc){
		var paraMap = {};
		paraMap["funcNo"]= 1000333;
		paraMap["fund_account"] = param.fund_account;
		paraMap["fund_code"] = param.fund_code;
		
		var reqParamVo = $.getReqParamVo();
		reqParamVo.setUrl(global.serverPath);
		reqParamVo.setReqParam(paraMap);
		reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
		reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
		reqParamVo.setTimeOutFunc(timeOutFunc);
		reqParamVo.setIsAsync(false);
		this.service.invoke(reqParamVo,callback);
	};


    MobileService.prototype.checkTransactionTime = function(param,callback,isLastReq,isShowWait,timeOutFunc) {
        //"type":type,"exchange_type":exchange_type,"time_kind":time_kind,"date":date,"time":time
        var paraMap={};
        paraMap["funcNo"]=1000324;
        paraMap["type"]=param.type;
        paraMap["exchange_type"]=param.exchange_type;
        paraMap["time_kind"]=param.time_kind;
        paraMap["date"]=param.date;
        paraMap["time"]=param.time;
        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl(global.serverPath);
        reqParamVo.setReqParam(paraMap);
        reqParamVo.setIsLastReq((typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq);
        reqParamVo.setIsShowWait((typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait);
        reqParamVo.setTimeOutFunc(timeOutFunc);
        //reqParamVo.setIsAsync(false);
        this.service.invoke(reqParamVo,callback);
    };

   /**
   * 释放操作
   */
   MobileService.prototype.destroy = function(){
        this.service.destroy();
   };
   /**
   * 实例化对象
   */
   function getInstance(){
        return new MobileService();
   }
   var mobileService = {
		   "getInstance" : getInstance   
		};
   // 暴露对外的接口
	module.exports = mobileService;
});