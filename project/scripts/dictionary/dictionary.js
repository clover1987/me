define("project/scripts/dictionary/dictionary",function(require,exports,module){
	var Map = require("map");
	/**
	 * 订阅消息字典
	 */
	var iWRreaderMap = new Map();
		iWRreaderMap.put("MSG_0001","成交回报提示");
		iWRreaderMap.put("MSG_0002","银证转账提醒");
		iWRreaderMap.put("MSG_0003","持仓股重要公告");
		iWRreaderMap.put("MSG_0004","个股到价提醒");
		iWRreaderMap.put("MSG_0005","个股涨跌幅通知");
		iWRreaderMap.put("MSG_0006","新股中签通知");
		iWRreaderMap.put("MSG_0007","金腾通每日净值播报");
		iWRreaderMap.put("MSG_0008","佣金宝银证转账提醒");
		iWRreaderMap.put("MSG_0009","佣金宝每日对账单提醒");
		iWRreaderMap.put("MSG_00010","佣金宝交易成功提醒");
		
	// 公众账号匹配
	var weixinpkMap = new Map();
	weixinpkMap.put("01","gh_b1a30e94ea48"); // 佣金宝
	weixinpkMap.put("02","gh_d37eee96a4f9"); // 质押宝
	weixinpkMap.put("03","gh_a18ee2e17f62"); // 零佣宝
	
	var appidMap = new Map();
	appidMap.put("gh_b1a30e94ea48","wx20412eabda63b081"); // 佣金宝
	appidMap.put("gh_d37eee96a4f9","wx381337489446dca2"); // 质押宝
	appidMap.put("gh_a18ee2e17f62","wx1ca27bf8efd5f8c7"); // 零佣宝
	
	var appSecretMap = new Map();
	appSecretMap.put("gh_b1a30e94ea48","60de64809a657e026bf3897d7931dff3"); // 佣金宝
	appSecretMap.put("gh_d37eee96a4f9","f8a5548330525f21c4a6b7c3cc65654e"); // 质押宝
	appSecretMap.put("gh_a18ee2e17f62","a4c76ce563bc09097223edbb9532e19f"); // 零佣宝
	
	// 银行卡匹配
	var bankNameMap = new Map();
	bankNameMap.put("4","工商银行"); // 工行存管
	bankNameMap.put("6","建设银行"); // 建行存管
	bankNameMap.put("7","招商银行"); // 招行存管
	bankNameMap.put("9","兴业银行"); // 兴业存管
	bankNameMap.put("A","农业银行"); // 农行存管
	bankNameMap.put("B","民生银行"); // 民生存管
	bankNameMap.put("C","交通银行"); // 交行存管
	bankNameMap.put("D","中信银行"); // 中信存管
	bankNameMap.put("E","中国银行"); // 中行存管
	bankNameMap.put("F","华夏银行"); // 华夏存管
	bankNameMap.put("G","上海银行"); // 上海银行
	bankNameMap.put("H","北京银行"); // 北京银行
	bankNameMap.put("I","光大银行"); // 光大存管
	bankNameMap.put("J","浦发银行"); // 浦发存管
	bankNameMap.put("K","平安银行"); // 平安存管
	
	// 银行卡匹配
	var bankClassMap = new Map();
	bankClassMap.put("4","gongshang"); // 工行存管
	bankClassMap.put("6","jianshe"); // 建行存管
	bankClassMap.put("7","zhaoshang"); // 招行存管
	bankClassMap.put("9","兴业银行"); // 兴业存管
	bankClassMap.put("A","nongye"); // 农行存管
	bankClassMap.put("B","minsheng"); // 民生存管
	bankClassMap.put("C","交通银行"); // 交行存管
	bankClassMap.put("D","zhongxin"); // 中信存管
	bankClassMap.put("E","zhongguo"); // 中行存管
	bankClassMap.put("F","huaxia"); // 华夏存管
	bankClassMap.put("G","shanghai"); // 上海银行
	bankClassMap.put("H","北京银行"); // 北京银行
	bankClassMap.put("I","guangda"); // 光大存管
	bankClassMap.put("J","pufa"); // 浦发存管
	bankClassMap.put("K","pingan"); // 平安存管

	
	var getMap = function(){
		return iWRreaderMap;
	};
	var getWeixinpkMap = function(){
		return weixinpkMap;
	};
	var getAppidMap = function(){
		return appidMap;
	};
	var getAppSecretMap = function(){
		return appSecretMap;
	};
	var getBankNameMap = function(){
		return bankNameMap;
	};
	var getBankClassMap = function(){
		return bankClassMap;
	};
	
//	var iWRreaderKeys = iWRreaderMap.keys()
//	dictionaryMap.get(iWRreaderKeys[])取值方法
	var dictionary = {
		"getMap":getMap,
		"getWeixinpkMap":getWeixinpkMap,
		"getAppidMap":getAppidMap,
		"getBankNameMap":getBankNameMap,
		"getBankClassMap":getBankClassMap,
		"getAppSecretMap":getAppSecretMap,
	};
	module.exports = dictionary;
});