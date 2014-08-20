/**
 * 程序入口配置读取
 * 项目开发时需要的自定义配置
 * 另外：configuration为系统配置模块或者配置模板
 * 这里可以扩展，支持多个系统共用一个项目：
 * 思路：在最开始的地方做一个sysCode的获取，然后在这个模块初始化时赋不同系统的configuration配置模块的引用，
 * 当然还要做修改的地方，比如地址栏hash处理，需要增加sysCode（涉及到的模块main和appUtils）
 */
define(function(require, exports, module) {
	var configuration = {
		/**
		 * 平台，不传默认为0：
		 * 0：pc或者手机浏览器、1：android壳子嵌phonegap、2：ios壳子嵌phonegap、3：ios壳子嵌AIR
		 */
		"platform": "0",
        "seaBaseUrl": "/me/",//"seaBaseUrl": "/m/",
		"defaultPage": {"pageCode": "mine/iUnBind", "jsonParam":{}}, //项目的默认页面
//        "defaultPage": {"pageCode": "cash/cashhasopened", "jsonParam":{}}, //项目的默认页面
        //"defaultPage": {"pageCode": "yjb/yjb_i_beforeLogin", "jsonParam":{}}, //项目的默认页面
        //"firstLoadCss": ["/project/css/style.css","/project/css/jquery.circliful.css"],//"firstLoadCss": ["/m/project/css/style.css","/m/project/css/jquery.circliful.css"], //项目中的需要先加载的css样式文件，如果多个，添加在数组里面
        "firstLoadCss": ["project/css/style.css","project/css/jquery.circliful.css", "project/css/yjb/base.css","project/css/yjb/colorbox.css","project/css/yjb/style_yjb.css"],
        "layerTheme": "gold", //各种弹出层主题样式，默认为系统自带
		/**
		 * 后台返回结果集出参结构，类似errorNo、errorInfo的出参命名定义，
		 * 防止不同项目的后台的出参命名不一致，而框架中写死导致解析出错，可由项目自己定义
		 * 标准命名结构：errorNo、errorInfo，这里只为表示可以自定义，但后台必须统一
		 */
		"resultsParser": {"errorNo": "error_no", "errorInfo": "error_info"},
		/**
		 * 前端根据后台的errorNo做的过滤器配置，需要后台配合定义errorCode，
		 * 有的需要跳转页面，有的只做提示
		 */
		"filters": {
			"-999": {"pageCode": "business/index", "jsonParam": {}} //请重新登录
		},
		//项目中模块的别名配置
		"pAlias": {

			"utils": "project/scripts/common/utils",
	        "domain": "project/scripts/thinkive/domain",
	        "service": "project/scripts/thinkive/service",
	        "serviceImp": "project/scripts/thinkive/base/serviceImp",
	        "dictionary":"project/scripts/dictionary/dictionary",
	        "common":"project/scripts/common/common",
	        "directBackModule":"project/scripts/common/directBackModule",
	        "pwdCheckUtils":"project/scripts/common/pwdCheckUtils"
		},
		/**
		 * 项目中需要调用到的常量、变量这里配置serverPath
		 * 调用方式，通过require("gconfig").global.*来调用
		 */
		"global": {

			"protocol":"ajax", //协议
			// 后台地址
			"serverPath": "/servlet/json", // 微信 --公司环境
			"account_type":"8", //表示微信账户
			"captchaPath": "/servlet/CaptchaServlet", // 验证码路径
			"weixinPath": "/servlet/OpenIdServlet",//https://api.weixin.qq.com/sns/oauth2/access_token
			"serverDatePath": "/servlet/ServerDateServlet",//服务器时间
			"ups_duration_hours": "24",
			"ups_app_id": "yjbwx", // weixin
			"ups_cipher_type": "1",
			"cipher_type": "0",
			//"direct_return_urls":["/cash/index.html","/cash/cashnotopen.html","/bind.html","/mine/index.html"],
			"fund_company_code": "76",
            "fund_code": "000540",

            "min_auto_apply_threshold": 203,  //最低触发金额最小限定值

            "1000302":"FND_0002",   //每日交易汇总信息  cashhasopened
            "1000303":"FND_0003",   //交易流水查询
            "1000304":"FND_0004",   //现金产品登记查询
            "1000306":"FND_0006",   //触发金额修改
            "1000323":"FND_0009",   //现金产品收益数据查询 totalreturn
            "1000322":"FND_0008",   //现金产品表现数据查询
            "FND_0004":"FND_0004",  //现金产品登记查询  进入"我的现金理财"页面前检查
            "1000312":"ACT_0005",   //证券账户资产信息统计查询
            "1000316":"ACT_0009",   //用户信息查询
            //"1000334":"待定",        //查询日期是否节假日
            "1000320":"ACT_0013",   //查询协议内容
            "1000308":"ACT_0001",   //电子协议签署
            "1000310":"ACT_0003",   //电子协议基本信息查询
            "1000301":"FND_0001",    //现金产品登记
            "1000324":"CHECK_TRANSACTION_TIME", //交易时间检查
            "1000325":"CALC_TRADE_DAY",    //calcTradeDay 计算特定时间点后的第N个交易日期  查询转账日志  rechargesuccess
            "1001604":"BANK_TRADE_0004",   //BANK_TRADE_0004  查询转账日志  rechargeresult
            "1001603":"BANK_TRADE_0003",   //BANK_TRADE_0003  充值转账  recharge充值
            "1001602":"BANK_TRADE_0002",    //BANK_TRADE_0002  查询银行卡余额 recharge
            "BANK_TRADE_0002":"BANK_TRADE_0002", //BANK_TRADE_0002  查询银行卡余额 recharge
            "BANK_TRADE_0011":"BANK_TRADE_0011", //BANK_TRADE_0011  查询充值相关日期 rechargesuccess
            "1001120":"PASPT_0011",         //PASPT_0011  认证服务 (交易密码验证框使用)
            "PASPT_0011":"PASPT_0011",      //PASPT_0011 认证服务  创建通行证 (交易密码验证框使用)
            "1001601":"BANK_TRADE_0001",    //BANK_TRADE_0001 银行绑定账号属性查询 (获取用户绑定第三方存管银行)recharge
            "1000328":"FND_0011",            //FND_0011 提现撤销  takenbackhistory
            "1000330":"FND_0013",            //FND_0013 获取理财产品首个收益日期( 获取当前是否基金交易时间 ) takenbackhistory
            "1000327":"FND_0010",            //FND_0010提现历史记录查询 takenbackhistory
            "1000329":"FND_0014",            //FND_0014 现金理财累计提现总额 takenbackhistory
            "1001605":"BANK_TRADE_0005",    //BANK_TRADE_0005 查询转账历史  rechargehistory
            "1000332" :"FND_0012",           //获取基金下n个交易日期
            "1000321":"ACT_0014",             //存管银行信息查询
            "1001002":"UPS_0002",             //提取密码(UPS_0002)
            "1000305":"FND_0005",             //FND_0005 现金理财取现 （取款）
//            "1001201":"DT_001"                 //注册全局会话（已經不用了）
            "1000333":"FND_0022 ",             //FND_0022 金腾通开户交易时间查询
            "1000317":"ACT_0010",            //用户信息修改

            action: {
                "modifyPassword": "112"
            }
		},
		/**
		 * 需要直接返回微信对话框的url
		 *
		 */
		 "firstLoad": {"isLoad": false, "doFunctionObj": {"moduleCode":"directBackModule", "moduleFuncName":"directBack"}}
	};
	
	//暴露对外的接口
	module.exports = window.configuration = configuration;
});