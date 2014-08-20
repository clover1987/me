var oData = {};
initialize();
// 初始化
function initialize() {
	var reLine = /^\||\|$/g,
		str = '1|1|6010|123987|0|0|',
		aGrid = str.replace(reLine, '').split('|');
	// 模拟checkbox
	ckbox('#openAcc .listAcc', '.choIco', 'choIcoNone', function(str) {
		if (str == '上海A股') {
			alert('若不开通，您将无法参与上交所股票、基金等交易，请您慎重选择');
		} else if (str == '深圳A股') {
			alert('若不开通，您将无法参与深交所股票、基金等交易，请您慎重选择；');
		} else if (str == '沪开放式基金') {
			alert('若不开通，您将无法参与部分上海开放式基金及券商资管产品交易，请您慎重选择');
		}
		//else {
		//	alert('若不开通，您将无法参与部分深圳开放式基金及券商资管产品交易，请您慎重选择');
		//}
	});
	ckbox2('#openFoot', '.openIco', 'openIcoNone', function() {
		var oShow = $('.show_warp'),
			aHeight = $(document).height(),
			iWidth = document.documentElement.clientWidth;
		$('.bmtn').hide();
		oShow.css({width: '100%','overflow':'visible', height:aHeight+"px"}).show();
		$("body").css("background","#fff");
		document.body.scrollTop = 0;
		$('.box').css({width: '100%'}).html('<h2>证券交易委托风险揭示书</h2><p align="left">尊敬的投资者：<br><p align="left" class="indent">没有只涨不跌的市场，也没有包赚不赔的投资。在您进入证券市场之前，为了使您更好地了解相关风险，根据证券市场有关法律法规、行政规章、证券登记结算机构和证券交易所业务规则，以及中国证券业协会自律规则，特提供本风险揭示书，请您认真详细阅读。投资者从事证券投资包括但不限于如下风险：<br></p><p align="left" class="indent">1、宏观经济风险：我国宏观经济形势的变化以及其他国家、地区宏观经济环境和证券市场的变化，可能引起证券市场的波动，使您存在亏损的可能，您将不得不承担由此造成的损失。<p align="left" class="indent">2、政策风险：有关证券市场的法律、法规及相关政策、规则发生变化，可能引起证券市场价格波动，使您存在亏损的可能，您将不得不承担由此造成的损失。<p align="left" class="indent">3、上市公司经营风险：由于上市公司所处行业整体经营形势的变化；由于上市公司经营管理等方面的因素，如经营决策重大失误、高级管理人员变更、重大诉讼等都可能引起该公司证券价格的波动；由于上市公司经营不善甚至于会导致该公司被停牌、摘牌，这些都使您存在亏损的可能。<p align="left" class="indent">4、技术风险：由于交易撮合、清算交收、行情揭示及银证转账是通过电子通讯技术和电脑技术来实现的，这些技术存在着被网络黑客和计算机病毒攻击的可能，同时通讯技术、电脑技术和相关软件具有存在缺陷的可能，这些风险可能给您带来损失或银证转账资金不能即时到账。</p><p align="left" class="indent">由于证券交易所主机和证券公司主机客观上存在时间差，若您的委托时间早于或晚于证券交易所服务器时间，将会产生不利于您的委托成交或不成交的风险。5、不可抗力因素导致的风险：因不可抗力、意外事件、技术故障或交易所认定的其他异常情况，导致部分或全部交易不能进行的，交易所可以决定单独或同时采取暂缓进入交收、技术性停牌或临时停市等措施；诸如地震、台风、火灾、水灾、战争、瘟疫、社会动乱等不可抗力因素可能导致证券交易系统瘫痪；证券公司无法控制和不可预测的系统故障、设备故障、通讯故障、电力故障等也可能导致证券交易系统非正常运行甚至瘫痪；证券公司和银行无法控制和不可预测的系统故障、设备故障、通讯故障、电力故障等也可能导致银证转账系统非正常运行甚至瘫痪，这些都会使您的交易委托无法成交或者无法全部成交，或者银证转账资金不能即时到账，您将不得不承担由此导致的损失和不便。</p><p align="left" class="indent">6、特殊证券品种的风险</p><p align="left" class="indent">您应当根据自身的经济实力、承受能力和对投资品种的了解程度，认真决定证券投资品种及策略，当您有意投资ST、*ST、退市整理类股票或者其他有较大潜在风险的证券品种（如权证等衍生品）时，尤其应当清醒地认识到该类证券品种可能蕴含着更大的投资风险。</p><p align="left" class="indent">7、其他风险</p><p align="left" class="indent">由于您密码失密、数字证书保管不当、投资决策失误、操作不当等原因可能会使您遭受损失；网上委托、热键委托等自助委托方式操作完毕后未及时退出，他人进行恶意操作而造成的损失；网上交易还可能遭遇黑客攻击，从而造成损失；委托他人代理证券交易，且长期不关注账户变化，致使他人恶意操作而造成的损失；由于您疏于防范而轻信非法网络证券欺诈活动，可能会使您遭受损失，上述损失都将由您自行承担。在您进行证券交易时，他人给予您的保证获利或不会发生亏损的任何承诺都是没有根据的，类似的承诺不会减少您发生亏损的可能。</p><p align="left" class="indent"><b>特别提示：</b>本公司敬告投资者，请您配合证券公司进行风险承受能力评估，并客观判断自身风险承受能力与证券交易涉及的各类金融产品的风险是否相匹配，审慎进行投资。</p><p align="left" class="indent">如您是具备证券投资资格的境外投资者，在参与境内证券市场投资前，应充分知晓境内证券市场的相关法规知识、境内证券市场风险特征，了解并遵守境内证券市场的法律法规、监管规定、业务规则及相关规定等。</p><p align="left" class="indent">证券市场是一个风险无时不在的市场。您在进行证券交易时存在赢利的可能，也存在亏损的风险。本风险揭示书并不能揭示从事证券交易的全部风险及证券市场的全部情形。您务必对此有清醒的认识，认真考虑是否参与证券交易。当您决定参与证券交易时，请您务必认真阅读风险揭示书并签字。</p><p align="center">股市有风险，入市需谨慎！</p><div class="showButton"><span class="showClose">我已仔细阅读并同意</span></div>');
		$('.showClose').click(function(){
			$("body").css("background","#515151");	
			oShow.hide();
		});
	});
	getEcontractConfig(function(resultList) {
		jsonTrans(resultList, function() {
			var reLine = /^\&|\&$/g;
			//oData.BINDATA = oData.econtractId + oData.econtractMd5 + oData.econtractName + oData.plainText + oData.certSign + oData.summary.replace(reLine, '');
		});
		fillEcontract(document.getElementById('pactContent'), resultList);
		var oShow = $('.show_warp'),
			aHeight = $(document).height(),
			iWidth = document.documentElement.clientWidth;
		$('.bmtn').css({'width': iWidth});
		$("#pactContent .pactText").each(function(index,obj){
			var oThis = $(obj),
				jDomA = oThis.find("a");
			oThis.on("click",function(){
				oShow.css({width: '100%', height: aHeight+"px"}).show();
				$('.bmtn').show();
				$("body").css("background","#fff");
				document.body.scrollTop = 0;
				getEcontractTextConfig($(this).attr('ecId'), function(binData) {
					$('.box').css({width: '100%'}).html('<h2>'+binData.econtract_name+'</h2>'+ '<p>' + binData.econtract_content + '</p>');
				});
			});
		});
		var iHeight = $(window).height()-272;
		if (iHeight > $("#wrapped ul").height()) {
			iHeight = 330;
		}
		$("#wrapped").height(iHeight);
		$('#closed').click(function(){
			$("body").css("background","#515151");
			oShow.hide();			
		});
	});
	oTools.ReadToLocal(function (data) {
		oData = $.extend(oData, data);
		/*if (oData.CSDCOPENFLAG == '1') { // 已开户
			$('#openAcc .listAcc').eq(2).hide();
			$('#openAcc .listAcc').eq(3).hide();
			$('#openAcc .listAcc').eq(2).find('b').addClass('choIcoNone');
			$('#openAcc .listAcc').eq(3).find('b').addClass('choIcoNone');
		}*/
	}, "accountState=&fundAccount=&IdNumber=&clientName=&clientId=&MobileNo=&csdcOpenFlag=&openStatus=&digitalPwd=");
	// 继续开户
	$('.btnContinue').bind('click', nextFunc);
	function nextFunc() {
		if ($('.openIco').hasClass('openIcoNone')) {
	        alert('您需要全部阅读并同意签署协议');
			return;
		}
		oData.exchangeKind = getStockAccount();
		console.log(oData.exchangeKind);
		if (oData.exchangeKind == '') {
	        alert('请选择需要开通的账户');
			return;
		}
		$('.btnContinue').eq(0).unbind();
		$('.btnContinue').eq(0).html('处理中...');
		var timer1 = setInterval(function(){
			    $('.btnContinue').eq(0).html('继续开户');
					$('.btnContinue').eq(0).unbind();
					$('.btnContinue').eq(0).bind('click', nextFunc);
					clearInterval(timer1);
				}, 20000);
		reqSignature(function(data) {
			if(!data[0] || data[0] == ''){
				alert('亲，数字签名失败，需重新下载安装数据证书!' );
				if (oData.CSDCOPENFLAG === '0') {
					onJsOverrideUrlLoading('http://action:10053?urlfalse=/sjkh/setpwd.htm&&urltrue=/sjkh/ktzh.htm&&cardId=' + oData.IDNUMBER + '&&clientId=' + oData.CLIENTID + '&&clientName=' + oData.CLIENTNAME + '&&MobileNo=' + oData.MOBILENO + '&&tztcerttype=0&&digitalPwd=123456'); //+ (oData.DIGITALPWD || '123456')
				} else {
					onJsOverrideUrlLoading('http://action:10053?urlfalse=/sjkh/digital.htm&&urltrue=/sjkh/ktzh.htm&&cardId=' + oData.IDNUMBER + '&&clientId=' + oData.CLIENTID + '&&clientName=' + oData.CLIENTNAME + '&&MobileNo=' + oData.MOBILENO + '&&tztcerttype=1&&digitalPwd=123456');
				}
				return;
			}
			
			var i = 0, len = oData.BINDATA.length;
			oData.dataStr = '';
			for (; i < len; i++) {
				oData.BINDATA[i] += 'cert_sign=' + data[i];
				oData.dataStr += oData.BINDATA[i] + '&';
			}
			saveEcontract(function() {
					qryOpenStatus(function(binData) {
						var open_status = binData.open_status.split('');
						if(open_status[4] == 0) {
							//alert('开发测试:证券账号未开');
							openStockAccount(function() {
								 		//alert('开发测试:证券账号开成功');
										if (oData.ACCOUNTSTATE == 'true') { // accountState为true时为完成转户流程进入新开户的用户
											onJsOverrideUrlLoading('/sjkh/success.htm');
										} else if (open_status[9] == 0){
											onJsOverrideUrlLoading('/sjkh/setallpwd.htm');
										} else if (open_status[5] == 0 && open_status[7] == 0) {
											onJsOverrideUrlLoading('/sjkh/depository.htm');
										} else if (open_status[7] == 0) {
											onJsOverrideUrlLoading('/sjkh/risk.htm');
										} else if (open_status[8] == 0) {
											onJsOverrideUrlLoading('/sjkh/visit.htm');
										} else {
											onJsOverrideUrlLoading('/sjkh/success.htm');
										}								 		
									});
						} else {
							  //alert('开发测试:证券账号已开');
								//window.location.href = 'setallpwd.htm';
								if (oData.ACCOUNTSTATE == 'true') { // accountState为true时为完成转户流程进入新开户的用户
									onJsOverrideUrlLoading('/sjkh/success.htm');
								} else if (open_status[9] == 0){
									onJsOverrideUrlLoading('/sjkh/setallpwd.htm');
								} else if (open_status[5] == 0 && open_status[7] == 0) {
									onJsOverrideUrlLoading('/sjkh/depository.htm');
								} else if (open_status[7] == 0) {
									onJsOverrideUrlLoading('/sjkh/risk.htm');
								} else if (open_status[8] == 0) {
									onJsOverrideUrlLoading('/sjkh/visit.htm');
								} else {
									onJsOverrideUrlLoading('/sjkh/success.htm');
								}
					}
					});
			});
		});
	};
	//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
};
function ckbox2(id, sClass, activeClass, callback){
	$(id).bind('click', function(){
		var that = $(this).find(sClass),
			selected = that.hasClass(activeClass);
		if(selected){ //已选中
			that.removeClass(activeClass);
			callback && callback($(this).children().eq(1).html());
		}else{ //未选中
			that.addClass(activeClass);
		}
	});
};
// 开户状态查询
function qryOpenStatus(succ) {
	var params = cRequestSign + encodeURI("?action=31001&path=/WA0037&op_station=($tztudid)&branch_no=" + branchNo + "&client_id=" + oData.CLIENTID + "&mobile_tel=" + oData.MOBILENO);
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
function loaded() {
	var bBtn = true;
	if(app.indexOf("iphone")>0 || app.indexOf("android 2.3")>0){
		 bBtn = false;
	 }else if(app.indexOf("android")>0){
		 bBtn = true;
	 }
	myScroll = new iScroll('pactContent', {
		hScroll: false,
		bounce: false,
		hScrollbar: false,
		onBeforeScrollStart: false,
		handleClick: bBtn,
		useTransform: false,
		useTransition: false
	});
};
// 协议配置文本获取
function getEcontractTextConfig(eId, succ) {
	var params = cRequestSign + encodeURI("?action=31001&path=/WA0009&op_station=($tztudid)&econtract_id=" + eId);
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
// 协议配置列表获取
function getEcontractConfig(succ) {
	var params = cRequestSign + encodeURI("?action=31001&path=/WA0008&op_station=($tztudid)&econtract_type=1");
	getData(params, '', function (data){
		var binData = JSON.parse(data.BINDATA),
			error_no = binData.error_no,
			error_info = binData.error_info;
		if (error_no == '0') {
			succ(binData.resultList);
		} else {
			alert(error_info);
		}
	});
};
// 填充协议列表
function fillEcontract(obj, arr) {
	var i = 0,
		len = arr.length,
		str = '';
	for (; i < len; i++) {
		str += '<p class="pactText" ecId="' + arr[i].econtract_id + '"><a class="pactUrl" href="javascript:;">' + arr[i].econtract_name + '</a><img class="pactIco" src="img/arr.png"></p>';
	}
	obj.innerHTML = str;
};
// 电子协议签署
function saveEcontract(succ) {
	var reLine = /^\&|\&$/g;
	var str = oData.dataStr.replace(reLine, '');
	var cert_type = oData.CSDCOPENFLAG == '0' ? '1' : '0'; 
	//alert('开发测试：开户类型' + oData.CSDCOPENFLAG + '证书类型' + cert_type);
	var params = cRequestSign + encodeURI("?action=31001&path=/WA0026&op_station=($tztudid)&cert_type=" + cert_type +
	"&HaveTransfer=1&client_id=" + oData.CLIENTID + '&BINDATA=') + encodeURIComponent(str);
	//var params = cRequestSign + encodeURI("?action=31001&path=/WA0026&op_station=($tztudid)&branch_no=18&client_id=" + oData.CLIENTID + '&mobile_tel=15988496237&HaveTransfer=1&BINDATA=') + encodeURIComponent('econtract_id=econtract_id1003&econtract_name=econtract_name03&econtract_md5=econtract_md51003&cert_sign=cert_sign1004&plain_text=plain_text1004&summary=summary1004&econtract_id=econtract_id1101&econtract_name=econtract_name02&econtract_md5=econtract_md51101&cert_sign=cert_sign1105&plain_text=plain_text1105&summary=summary1105');
	getData(params, '', function (data){
		var binData = JSON.parse(data.BINDATA),
			error_no = binData.error_no,
			error_info = binData.error_info;
		if (error_no == '0') {
			succ();
		} else {
			if(error_info){
				alert(error_info);
			}else{
				alert('电子协议签署失败！');
			}
		}
	});
};
// 证券账号开户申请
function openStockAccount(succ) {
	var params = cRequestSign + encodeURI("?action=31001&path=/WA0034&op_station=($tztudid)&branch_no=" + branchNo + "&HaveTransfer=1&client_id=" + oData.CLIENTID + "&fund_account=" + oData.FUNDACCOUNT + "&BINDATA=") + encodeURIComponent(oData.exchangeKind);
	getData(params, '', function (data){
		var binData = JSON.parse(data.BINDATA),
			error_no = binData.error_no,
			error_info = binData.error_info;
		if (error_no == '0') {
			succ();
		} else {
			if(error_info){
				alert(error_info);
			}else{
				alert('证券账号开户申请失败！');
			}
		}
	});
};
// 获取需要开通的证券账户
function getStockAccount() {
	var reCode = /\&$/,
		resultStr = '';
	var $riskIco = $('#openAcc').find('.choIco');
	$riskIco.each(function(m) {
		if (!$(this).hasClass('choIcoNone')) {
			switch(m) {
				case 0:
				resultStr += 'exchange_kind=10&';
				break;
				case 1:
				resultStr += 'exchange_kind=20&';
				break;
				case 2:
				resultStr += 'exchange_kind=11&';
				break;
				case 3:
				resultStr += 'exchange_kind=21&';
				break;
			}
		}
	});
	resultStr = resultStr.replace(reCode, '');
	return resultStr;
};
// 数据结构转换
function jsonTrans(arr, callback) {
	var i = 0,
		len = arr.length,
		reLine = /^\&|\&$/g;
	oData.BINDATA = oData.BINDATA || [];
	reqTztcertsn('tztcertsn=', function(snData) {
		oData.SN = snData.TZTCERTSN;
		for (; i < len; i++) {
			var str = '';
			for (var attr in arr[i]) {
				oData.econtractMd5 = 'econtract_md5=' + arr[i].econtract_md5 + '&';
				oData.econtractId = 'econtract_id=' + arr[i].econtract_id + '&';
				oData.econtractName = 'econtract_name=' + arr[i].econtract_name + '&';
				oData.plainText = 'plain_text=' + arr[i].econtract_md5 + '&';
				if (attr == 'econtract_md5') {
					oData.signaData = oData.signaData || '';
					oData.signaData += i + '=' + arr[i].econtract_md5 + '&';
				}
				var oDate = new Date();
				var years = oDate.getFullYear();
				var month = oDate.getMonth();
				var months = (month+1) > 9 ? month+1 : ('' + 0+(month+1));
				var day = oDate.getDate();
				var sDate = '' + years + months + day;
				str = 'summary=summary' + 'Detached$' + sDate + '$' + arr[i].econtract_version + '$' + arr[i].econtract_id + '$' + oData.SN + '$' + arr[i].econtract_remark + '&';
			}
			oData.summary = str;
			oData.BINDATA.push(oData.econtractId + oData.econtractMd5 + oData.econtractName + oData.plainText);
		}
		oData.signaData = oData.signaData.replace(reLine,'');
		console.log(oData.BINDATA);
		callback && callback();
	});
};
// 请求签名数据
function reqSignature(callback) {
	var params = oData.signaData;
	getData('/reqsignature' + '?tztcerttype=' + oData.CSDCOPENFLAG, params, function(data) {
		//alert('签名数据:' + JSON.stringify(data));
		callback && callback(data);
	});
};
// 获取证书序列号
function reqTztcertsn(params, callback) {
	getData('/reqlocal', params, function(data) {
		callback && callback(data);
	});
};