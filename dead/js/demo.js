var str = $.camelCase('hello-there');var bBtn = $.contains(document.getElementById('depCheckbox'), document.getElementById('depCap'));$.each(['a', 'b', 'c'], function(index, item){	console.log('item %d is: %s', index, item)});var oData = {};var activeClass = 'depIcoNone';initialize();// 初始化function initialize() {	// 模拟checkbox	ckbox('#depCheckbox', '.depIco', 'd`epIcoNone');	qryTrustBankList(function(resultList) {		var kjArr = [],			wyArr = [];		for (var i = 0; i < resultList.length; i++) {			if (resultList[i].fun_flag === '1') { // 签约				kjArr.push(resultList[i]);			} else { // 网银				wyArr.push(resultList[i]);			}		}		fillTrustBankList(document.getElementById('selectBank'), kjArr, wyArr);	});		oTools.ReadToLocal(function (data) {		oData = $.extend(oData, data);	}, "clientId=&fundAccount=&MobileNo=");};// 网银签约$('#selectBank').live('change', function() {	if (this.value === '0') { 		$('.depCheckbox').show();		$('#depCheckbox').hide();		$('#depcardBox').hide(); 		$('#bankNo').val('');		$('#bankPwd').val('');		return; 	}	if (this.value != '6') {		$('#depcardBox').show(); 	} else {		$('#bankNo').val('');		$('#bankPwd').val('');		$('#depcardBox').hide();	}	$('.depCheckbox').hide();	$('#depCheckbox').show();});// 开通三方存管$('.btnContinue').bind('click', function() {	var bankNo = $.trim($('#bankNo').val()),		selectBank = $.trim($('#selectBank').val()),		bankPwd = $.trim($('#bankPwd').val()),		re = /^\d{8,}$/;	if (selectBank === '0') {		alert('请选择银行');		return;	}		if ($('#depCheckbox .depIco').hasClass('depIcoNone')) {		alert('您需要全部阅读并同意签署协议');		return;	}	if (!re.test(bankNo) && $('#depcardBox').css('display') != 'none') {		alert('您输入的银行卡号有误，请重新填写');		return;	}		if (!bankPwd && $('#depcardBox').css('display') != 'none') {		alert('您输入的密码有误，请重新输入');		return;	}		//oData.bankNo = kjBank ? kjBank : wyBank;		oData.bankNo=selectBank;		oData.bankAccount = bankNo;	oData.bkPassword = bankPwd;		openBankAccount(function() {		//window.location.href = 'risk.htm';		qryOpenStatus(function(binData) {			var open_status = getStatusIndex(binData.open_status);			if (open_status[7] == 0 && open_status[8] == 0) {				onJsOverrideUrlLoading('/sjkh/risk.htm');			} else {				var oDate = new Date(),					hours = oDate.getHours(),					minutes = oDate.getMinutes();								if ((hours >= 13 && hours < 15) || ((hours >= 9 && hours < 11 && minutes >= 30) || (hours === 11 && minutes < 30))) {					//window.location.href = 'transuccess.htm';					onJsOverrideUrlLoading('/sjkh/transuccess.htm');				} else {					//window.location.href = 'success.htm';					onJsOverrideUrlLoading('/sjkh/success.htm');				}			}					});	});});// 获取状态索引位置(0000000000);0: 未开过户；FALSE：已开过户(已完成所有步骤)：大于0：表示对应跳到这步function getStatusIndex(str) {	var arr = str.split(''),		i = 0,		len = arr.length,		result = [];		for (; i < len; i++) {		if (arr[i] == '0') {			result.push('0');		} else {			result.push('1');		}	}	return result;};// 存管银行列表查询function qryTrustBankList(succ) {	var original = encodeURIComponent('branch_no=0&bank_no=');	var params = cRequestSign + encodeURI("?action=31001&path=/WA0002&op_station=($tztudid)&branch_no=0&bank_no=&signature=($signature)") + "&original=" + original;	getData(params, '', function (data){		var binData = JSON.parse(data.BINDATA),			error_no = binData.error_no,			error_info = binData.error_info;		if (error_no === '0') {			succ(binData.resultList);		} else {			alert(error_info);		}	});};// 填充存管银行列表function fillTrustBankList(obj, kjArr, wyArr) {	var i = 0,		j = 0,		kjLen = kjArr.length,		wyLen = wyArr.length,		str = '<option value="0">请选择三方存管银行</option>';	for (; i < kjLen; i++) {		str += '<option value="' + kjArr[i].bank_no + '">' + kjArr[i].bank_name + '</option>';	}		for (; j < wyLen; j++) {		str += '<option value="' + wyArr[j].bank_no + '">' + wyArr[j].bank_name + '(网银签约)</option>';	}	obj.innerHTML += str;};// 存管账号开户申请function openBankAccount(succ) {	var accountStr = oData.bankAccount ? "&bank_account=" + oData.bankAccount : '',		pwdStr = oData.bkPassword ? "&bk_password=" + oData.bkPassword : '',		original = encodeURIComponent("branch_no=10&client_id=" + oData.CLIENTID + "&fund_account=" + oData.FUNDACCOUNT + "&bank_no=" + oData.bankNo + accountStr + pwdStr),		params = cRequestSign + encodeURI("?action=31001&path=/WA0033&op_station=($tztudid)&branch_no=10&client_id=" + oData.CLIENTID + "&fund_account=" + oData.FUNDACCOUNT + "&signature=($signature)&bank_no=" + oData.bankNo + accountStr + pwdStr) + "&original=" + original;	getData(params, '', function (data){		var binData = JSON.parse(data.BINDATA),			error_no = binData.error_no,			error_info = binData.error_info;			if (error_no === '0') {			succ();		} else {			alert(error_info);		}	});};// 开户状态查询function qryOpenStatus(succ) {	var original = encodeURIComponent("branch_no=10&client_id=" + oData.CLIENTID + "&mobile_tel=" + oData.MOBILENO);	var params = cRequestSign + encodeURI("?action=31001&path=/WA0037&op_station=($tztudid)&branch_no=10&client_id=" + oData.CLIENTID + "&signature=($signature)&mobile_tel=" + oData.MOBILENO) + "&original=" + original;	getData(params, '', function (data){		var binData = JSON.parse(data.BINDATA),			error_no = binData.error_no,			error_info = binData.error_info;		if (error_no === '0') {			succ(binData);		} else {			alert(error_info);		}	});};