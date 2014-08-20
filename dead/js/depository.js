var oData = {};
var activeClass = 'depIcoNone';
initialize();
// 初始化
function initialize() {
	// 模拟checkbox
	ckbox('#depCheckbox', '.depIco', 'depIcoNone');
	qryTrustBankList(function (resultList) {
	    var kjArr = [],
			wyArr = [],
			htmlObj = {
			    '4': ['亲，宝宝提醒：您选择工商银行，签约后还需要登录工行网银(www.icbc.com.cn)才能完成第三方存管业务办理。', '请输入6位银行卡密码'], // 工商银行
			    '6': ['亲，宝宝提醒：您选择建设银行，签约后还需要登录建行网银(www.ccb.com)才能完成第三方存管业务办理。', '请输入6位银行卡密码'], // 建设银行
			    '7': ['亲，宝宝提醒：请您使用本人且未绑定其他券商三方存管的银行卡，三方存管开通后首笔转账需要从招行网银(www.cmbchina.com)发起。', '请输入6位银行卡密码'], // 招商银行
			    '9': ['亲，宝宝提醒：请您使用本人且未绑定其他券商三方存管的银行卡。', '请输入6位银行卡密码'], // 兴业银行
			    'A': ['亲，宝宝提醒：请您使用本人且未绑定其他券商三方存管的银行卡。', '请输入6位银行卡密码'], // 农业银行
			    'B': ['亲，宝宝提醒：请您使用本人且未绑定其他券商三方存管的银行卡。', '请输入6位银行卡查询密码'], // 民生银行
			    'C': ['亲，宝宝提醒：请您使用本人且未绑定其他券商三方存管的银行卡。', '请输入6位银行卡密码'], // 交通银行
			    'D': ['亲，宝宝提醒：请您使用本人且未绑定其他券商三方存管的银行卡。', '请输入6位银行卡密码'], // 中信银行
			    'E': ['亲，宝宝提醒：请您使用本人且未绑定其他券商三方存管的银行卡。', '请输入6位电话银行密码'], // 中国银行
			    'F': ['亲，宝宝提醒：请您使用本人且未绑定其他券商三方存管的银行卡。', '请输入6位银行卡密码'], // 华夏银行
			    'G': ['亲，宝宝提醒：请您使用本人且未绑定其他券商三方存管的银行卡。', '请输入6位银行卡密码'], // 上海银行
			    'H': ['亲，宝宝提醒：请您使用本人且未绑定其他券商三方存管的银行卡。', '请输入6位银行卡密码'], // 北京银行
			    'I': ['亲，宝宝提醒：请您使用本人且未绑定其他券商三方存管的银行卡。', '请输入6位银行卡密码'], // 光大银行
			    'J': ['亲，宝宝提醒：请您使用本人且未绑定其他券商三方存管的银行卡，三方存管开通后首笔转账需要从浦发网银(www.spdb.com.cn)发起。', '请输入6位银行卡密码'], // 浦发银行
			    'K': ['亲，宝宝提醒：请您使用本人且未绑定其他券商三方存管的银行卡，三方存管开通后首笔转账需要从平安网银(bank.pingan.com)发起。', '请输入6位银行卡密码'] // 平安银行
			};
	    for (var i = 0; i < resultList.length; i++) {
	        if (resultList[i].bank_no === 'C' || resultList[i].bank_no === 'H') {
	            continue;
	        } else if (resultList[i].fun_flag === '1') { // 签约
	            kjArr.push(resultList[i]);
	        } else { // 网银
	            wyArr.push(resultList[i]);
	        }
	    }
	    //fillTrustBankList(document.getElementById('selectBank'), kjArr, wyArr);
	    fillTrustBankList(document.getElementById('selectBank'), resultList);
	    // 网银签约
	    $('#selectBank').live('change', function () {
	        if (this.value === '0') {
	            $('.depCheckbox').show();
	            $('#depCheckbox').hide();
	            $('.textCheckLink').hide();
	            $('#depcardBox').hide();
	            $('#bankNo').val('');
	            $('#bankPwd').val('');
	            return;
	        }
	        if (checkArr(this.value, wyArr)) {
	            $('#depcardBox').show();
	            //$('.depPrompt').show();
	        } else {
	            $('#bankNo').val('');
	            $('#bankPwd').val('');
	            $('#depcardBox').hide();
	            //$('.depPrompt').hide();
	        }
	        $('.depPrompt').show();
	        var iProIndex = this.value.split('|')[0];
	        $('.depPrompt').html(htmlObj[iProIndex][0]);
	        $('#bankPwd').attr('placeholder', htmlObj[iProIndex][1]);
	        $('.depCheckbox').hide();
	        $('#depCheckbox').show();
	        $('.textCheckLink').show();
	    });
	});

	oTools.ReadToLocal(function (data) {
		oData = $.extend(oData, data);
	}, "fundAccount=&IdNumber=&clientName=&clientId=&MobileNo=&csdcOpenFlag=&openStatus=&digitalPwd=");
};
function checkArr(value, arr) {
	var i = 0,
		len = arr.length,
		result = true;

	for (; i < len; i++) {
		if (arr[i].bank_no === value.split('|')[0]) {
			result = false;
		}
	}

	return result;
}
// 查看协议内容
var oShow = $('.show_warp'),
	aHeight = $(document).height();
$('.textCheckLink').click(function(){
	getEcontractTextConfig($('#selectBank').val().split('|')[1], function(binData){
		oShow.css({width: '100%', height: aHeight}).show();
		document.body.scrollTop = 0;
		$('.box').css({width: '100%'}).html('<h2>'+binData.econtract_name+'</h2>'+ '<p>' + binData.econtract_content + '</p>');
	});
});
var iHeight = $(window).height()-272;
if (iHeight > $("#wrapped ul").height()) {
	iHeight = 330;
}
$("#wrapped").height(iHeight);
$('#closed').click(function(){
	oShow.hide();
});
// 协议配置列表获取
function getEcontractConfig(succ) {
	var params = cRequestSign + encodeURI("?action=31001&path=/WA0008&op_station=($tztudid)&econtract_type=0");
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
// 开通三方存管
$('.btnContinue').bind('click', nextFunc);
function nextFunc() {
	var bankNo = $.trim($('#bankNo').val()),
		selectBank = $.trim($('#selectBank').val().split('|')[0]),
		bankPwd = $.trim($('#bankPwd').val()),
		rBandPWD = /^\d{6,}$/g,
		re = /^\d{8,}$/;
	if (selectBank === '0') {
        alert('请选择银行');
		return;
	}

	if ($('#depCheckbox .depIco').hasClass('depIcoNone')) {
        alert('您需要全部阅读并同意签署协议');
		return;
	}
	if($('#depcardBox').css('display') != 'none'){
		if (!re.test(bankNo)) {
	        alert('您输入的银行卡号格式有误，请重新输入');
			return;
		}

		if (!bankPwd) {
	        alert('请输入银行卡密码');
			return;
		}

		if(!rBandPWD.test(bankPwd)){
			alert('银行卡密码格式有误，请重新输入');
			return ;
		}
	}
	$('.btnContinue').eq(0).unbind();
	$('.btnContinue').eq(0).html('处理中...');
	var timer1 = setInterval(function(){
		    $('.btnContinue').eq(0).html('继续开户');
				$('.btnContinue').eq(0).unbind();
				$('.btnContinue').eq(0).bind('click', nextFunc);
				clearInterval(timer1);
			}, 20000);

	//oData.bankNo = kjBank ? kjBank : wyBank;

	oData.bankNo=selectBank;

	oData.bankAccount = bankNo;
	oData.bkPassword = bankPwd;

	getEcontractConfig(function(resultList){
		jsonTrans(resultList, function() {
			reqSignature(function(data) {
				if(!data.CERT_SIGN || data.CERT_SIGN == ''){
					alert('亲，数字签名失败，需重新下载安装数据证书!' );
					if (oData.CSDCOPENFLAG === '0') {
						onJsOverrideUrlLoading('http://action:10053?urlfalse=/sjkh/setpwd.htm&&urltrue=/sjkh/depository.htm&&cardId=' + oData.IDNUMBER + '&&clientId=' + oData.CLIENTID + '&&clientName=' + oData.CLIENTNAME + '&&MobileNo=' + oData.MOBILENO + '&&tztcerttype=0&&digitalPwd=123456');// + (oData.DIGITALPWD || '123456')
					} else {
						onJsOverrideUrlLoading('http://action:10053?urlfalse=/sjkh/digital.htm&&urltrue=/sjkh/depository.htm&&cardId=' + oData.IDNUMBER + '&&clientId=' + oData.CLIENTID + '&&clientName=' + oData.CLIENTNAME + '&&MobileNo=' + oData.MOBILENO + '&&tztcerttype=1&&digitalPwd=123456');
					}
					return;
				}

				oData.dataStr = oData.BINDATA + oData.summary + 'cert_sign=' + data.CERT_SIGN;
	
				saveEcontract(function() {
					openBankAccount(function() {
						//window.location.href = 'risk.htm';
						qryOpenStatus(function(binData) {
							var open_status = getStatusIndex(binData.open_status);
							if (open_status[7] == 0) {
								onJsOverrideUrlLoading('/sjkh/risk.htm');
							} else if(open_status[8] == 0) {
								onJsOverrideUrlLoading('/sjkh/visit.htm');
							} else {
								onJsOverrideUrlLoading('/sjkh/success.htm');
							}
						});
					});
				});
			});
		});
	});
};
// 获取状态索引位置(0000000000);0: 未开过户；FALSE：已开过户(已完成所有步骤)：大于0：表示对应跳到这步
function getStatusIndex(str) {
	var arr = str.split(''),
		i = 0,
		len = arr.length,
		result = [];

	for (; i < len; i++) {
		if (arr[i] == '0') {
			result.push('0');
		} else {
			result.push('1');
		}
	}
	return result;
};
// 协议配置列表获取
function getEcontractConfig(succ) {
	var params = cRequestSign + encodeURI("?action=31001&path=/WA0008&op_station=($tztudid)&econtract_type=0");
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

 //存管银行列表查询
function qryTrustBankList(succ) {
    var terminal_type = ""; var business_type = '';
    getData('/reqreadmap?business_type=', '', function (oReturn) {
        business_type = oReturn.BUSINESS_TYPE;
        getData('/reqlocal?tztudid=', '', function (oData) {
            terminal_type = oData.TZTUDID.split(";")[0];
            var params31004 = cRequestSign + encodeURI("?action=31004&path=/yjbapi/bank/depositoryBankList&op_station=($tztudid)&branch_no=" + branchNo + "&bank_no=&terminal_type=" + terminal_type + "&business_type=" + business_type + "&return_actcnt=true");
            var params31001 = cRequestSign + encodeURI("?action=31001&path=/WA0002&op_station=($tztudid)&branch_no=" + branchNo + "&bank_no=");
            $.when(getData(params31004), getData(params31001)).done(function (a, b) {
                var binData04 = JSON.parse(a[0].BINDATA),
			error_no = binData04.code,
			error_info = binData04.message;
                if (error_no != '0') {
                    alert(error_info);
                }
                var binData01 = JSON.parse(b[0].BINDATA),
    			error_no = binData01.error_no,
    			error_info = binData01.error_info;
                if (error_no == '0') {
                    for (var i = 0; i < binData04.result.length; i++) {
                        for (var z = 0; z < binData01.resultList.length; z++) {
                            if (binData04.result[i].bank_no == binData01.resultList[z].bank_no) {
                                $.extend(binData04.result[i], binData01.resultList[z]);
                                binData01.resultList.splice(z, 1);
                            }
                        }
                    }
                } else {
                    alert(error_info);
                }
                succ(binData04.result);
            });
        });
    });
};

function fillTrustBankList(obj, aBankList) {
    var str = '<option value="0">请选择三方存管银行</option>';
    for (var i = 0; i < aBankList.length; i++) {
        var value = aBankList[i].bank_no + '|' + aBankList[i].econtract_id;
        str += '<option value="' + value + '">' + aBankList[i].bank_name + '</option>';
    }
    obj.innerHTML += str;
}
// 填充存管银行列表
/*function fillTrustBankList(obj, kjArr, wyArr) {
	var i = 0,
		j = 0,
		kjLen = kjArr.length,
		wyLen = wyArr.length,
		str = '<option value="0">请选择三方存管银行</option>';
	for (; i < kjLen; i++) {
		var value = kjArr[i].bank_no + '|' + kjArr[i].econtract_id;
		str += '<option value="' + value + '">' + kjArr[i].bank_name + '</option>';
	}

	for (; j < wyLen; j++) {
		var value = wyArr[j].bank_no + '|' + wyArr[j].econtract_id;
		str += '<option value="' + value + '">' + wyArr[j].bank_name + '(网银签约)</option>';
	}
	obj.innerHTML += str;
};*/
// 存管账号开户申请
function openBankAccount(succ) {
	var accountStr = oData.bankAccount ? "&bank_account=" + oData.bankAccount : '',
		pwdStr = oData.bkPassword ? "&bk_password=" + oData.bkPassword : '',
		params = cRequestSign + encodeURI("?action=31001&path=/WA0033&op_station=($tztudid)&branch_no=" + branchNo + "&client_id=" + oData.CLIENTID + "&fund_account=" + oData.FUNDACCOUNT + "&bank_no=" + oData.bankNo + accountStr + pwdStr);
	getData(params, '', function (data){
		var binData = JSON.parse(data.BINDATA),
			error_no = binData.error_no,
			error_info = binData.error_info;

		if (error_no == '0') {
			succ();
		} else {
	    alert('亲，宝宝很难过，您的三方存管签约失败，原因：' + error_info + '，请您确保银行卡号、密码输入正确，且银行卡已在原券商处取消三方存管签约后重试。');
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
// 数据结构转换
function jsonTrans(arr, callback) {
	var i = 0, len = arr.length, reLine = /^\&|\&$/g;

	reqTztcertsn('tztcertsn=', function(snData) {
		oData.SN = snData.TZTCERTSN;
		var econtract_id = $('#selectBank').val().split('|')[1];
		for (; i < len; i++) {
			if(econtract_id == arr[i].econtract_id){
				oData.econtractMd5 = 'econtract_md5=' + arr[i].econtract_md5 + '&';
				oData.econtractId = 'econtract_id=' + arr[i].econtract_id + '&';
				oData.econtractName = 'econtract_name=' + arr[i].econtract_name + '&';
				oData.plainText = 'plain_text=' + arr[i].econtract_md5 + '&';
				var oDate = new Date();
				var years = oDate.getFullYear();
				var month = oDate.getMonth();
				var months = (month+1) > 9 ? month+1 : ('' + 0+(month+1));
				var day = oDate.getDate();
				var sDate = '' + years + months + day;
				oData.summary = 'summary=Attathed$' + sDate + '$' + arr[i].econtract_version + '$' + arr[i].econtract_id + '$' + oData.SN + '$' + arr[i].econtract_remark + '&';

				oData.BINDATA = oData.econtractId + oData.econtractMd5 + oData.econtractName + oData.plainText;
				oData.signaData = 'cert_sign=' + arr[i].econtract_md5;

				callback && callback();
        break;
			}
		}
	});
};
// 电子协议签署
function saveEcontract(succ) {
	var reLine = /^\&|\&$/g;
	var str = oData.dataStr.replace(reLine, '');
	var cert_type = oData.CSDCOPENFLAG == '0' ? '1' : '0';
	//alert('开发测试：开户类型' + oData.CSDCOPENFLAG + '证书类型' + cert_type);
	var params = cRequestSign + encodeURI("?action=31001&path=/WA0026&op_station=($tztudid)&cert_type=" + cert_type +
	"&HaveTransfer=1&client_id=" + oData.CLIENTID + '&BINDATA=') + encodeURIComponent(str);
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
