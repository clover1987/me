var oData = {};
var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];    // 加权因子
var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];            // 身份证验证位值.10代表X

initialize();

function canContinue(sign){
	if(sign){
		$('.btnContinue').eq(0).html('继续开户');
		$('.btnContinue').eq(0).attr("data-click","Y");
	}else{
		$('.btnContinue').eq(0).attr("data-click","N");
		$('.btnContinue').eq(0).html('处理中...');
	}
};
// 初始化
function initialize() {
	var $name = $('#personWraper .textContent').eq(0),
		$idNum = $('#personWraper .textContent').eq(1),
		$issuedDepart = $('#personWraper .textContent').eq(2),
		$idAddress = $('#personWraper .textContent').eq(3),
		$address = $('#personWraper .textContent').eq(4),
		$postCode = $('#personWraper .textContent').eq(5),
		$branch = $('#branch'),
		$profession = $('#profession'),
		$degree = $('#degree');
	// 自动加载身份证识别信息
	oTools.ReadToLocal(function (data) {
		oData = $.extend(oData, data);
		data.CLIENTNAME && $name.val(data.CLIENTNAME);
		data.PICIDNUMBER &&$idNum.val(data.PICIDNUMBER);
		data.ISSUEDDEPART && $issuedDepart.val(data.ISSUEDDEPART);
		data.IDADDRESS && $idAddress.val(data.IDADDRESS);
		data.IDADDRESS && $address.val(data.IDADDRESS);
		data.POSTCODE && $postCode.val(data.POSTCODE);

		getBranch(function(data1){
			fillBranch(data1);
			getDefaultBranch(data.PICIDNUMBER,data.MOBILENO, function(branch_no){
				$branch.val(branch_no); //选择默认营业部
			});
		});

	}, "picIdNumber=&MobileNo=&clientId=&clientName=&idAddress=&issuedDepart=&clientGender=&birthday=&idBeginDate=&idEndDate=&csdcOpenFlag=&postCode=");
	$idNum.bind('focus',function(){
		$idNum.css('color','#000');
	});
	// 继续开户
	$('.btnContinue').eq(0).bind('click', nextFun);

	function nextFun() {

		var re = /^[\u4E00-\u9FA5]+$/;
		oData.CLIENTNAME = $.trim($name.val());
		oData.INPUTIDNUMBER = $.trim($idNum.val()).toUpperCase();
		oData.ISSUEDDEPART = $.trim($issuedDepart.val());
		oData.IDADDRESS = $.trim($idAddress.val());
		oData.ADDRESS = $.trim($address.val());
		oData.POSTCODE = $.trim($postCode.val());
		oData.PROFESSION = $.trim($profession.val());
		oData.DEGREE = $.trim($degree.val());
		oData.BRANCHNO = $.trim($branch.val());
		oData.BIRTHDAY = oData.INPUTIDNUMBER.substring(6,14);
		oData.TESTBIRTH = oData.INPUTIDNUMBER.substring(6,10)+"-"+oData.INPUTIDNUMBER.substring(10,12)+"-"+oData.INPUTIDNUMBER.substring(12,14);
		oData.AGE= getAge(oData.INPUTIDNUMBER);
		if (!oData.CLIENTNAME || !re.test(oData.CLIENTNAME.replace('·','点')) || oData.CLIENTNAME.length < 2) {
			alert('您好，请填写正确的姓名');
			return;
		}
		if (!oData.INPUTIDNUMBER) {
			alert('您好，请填写身份证');
			return;
		}
		/*if(!oData.ISSUEDDEPART){
			alert('您好，请填写签发机关');
			return;
		}*/
		if(!oData.IDADDRESS){
			alert('您好，请填写证件地址');
			return;
		}
		if (!oData.ADDRESS) {
			alert('您好，请填写联系地址');
			return;
		}
		if(!Prove.postCode(oData.POSTCODE)){
			alert('您好，请填写正确邮编');
			return;
		}
		if(oData.PROFESSION === 'none'){
			alert('您好，请选择职业');
			return;
		}
		if(oData.DEGREE === 'none'){
			alert('您好，请选择学历');
			return;
		}
		if(oData.BRANCHNO === 'none'){
			alert('您好，请选择营业部');
			return;
		}
		if (!IdCardValidate(oData.INPUTIDNUMBER)) {
			$idNum.css('color','red');
			alert('身份证号码不合法');
			return;
		}
		if (oData.AGE<18) {
			alert('亲，您跟宝宝一样没满18岁，不能开户哦');
			return;
		}
		if (oData.IDADDRESS.length<8) {
			alert('证件住址至少需要输入八位中文');
			return;
		}
		if (oData.ADDRESS.length<8) {
			alert('联系地址至少需要输入八位中文');
			return;
		}
		if (oData.PICIDNUMBER && isSameIdNumber(oData.PICIDNUMBER, oData.INPUTIDNUMBER)) {
			// $('#reCardPic').show();
			// $('#reWszl').show();
			if (confirm('亲，您修改过的身份证号码与宝宝眼里看到的号码差异较大，请您再次确认证件号码，或者选【确认】重新拍摄照片。')) {
				if (oData.CSDCOPENFLAG === '0') {
					onJsOverrideUrlLoading('/sjkh/newuploadpic.htm');
					return;
				} else {
					onJsOverrideUrlLoading('/sjkh/uploadpic.htm');
					return;
				}
			} else {
				if (oData.CSDCOPENFLAG === '0') {
					onJsOverrideUrlLoading('/sjkh/wszl.htm?type=1');
					return;
				} else {
					onJsOverrideUrlLoading('/sjkh/wszl.htm?type=2');
					return;
				}
			}
		} else {
			// $('#reCardPic').hide();
			// $('#reWszl').hide();
			oData.IDNUMBER = oData.INPUTIDNUMBER;
		}
		//oData.IDNUMBER = oData.INPUTIDNUMBER;
		checkDate();

		oData.TIME = oData.TIME || 0; // 提交公安校验的次数

		var sClick = $('.btnContinue').eq(0).attr("data-click");
		if(sClick == "N"){return false;}
		canContinue(false);

		getIDCardInfo(function() {
			checkIdno(function() {
				openClientAccount(function(binData) {
					oData.CLIENTID = binData.client_id;
					oData.FUNDACCOUNT = binData.fund_account;
					oTools.SaveToLocal({
						IdNumber: oData.IDNUMBER,
						clientName: oData.CLIENTNAME,
						issuedDepart: oData.ISSUEDDEPART,
						idAddress: oData.IDADDRESS,
						clientId: oData.CLIENTID,
						fundAccount: oData.FUNDACCOUNT,
						professionNo: oData.PROFESSION, // 学历
						branchNo: oData.BRANCHNO
					}, function() {
						if (getUrlParameter("type") === '1') {
							// 跳转视频见证
							onJsOverrideUrlLoading('http://action:10050?urlfalse=/sjkh/fail.htm?state=3&&urltrue=/sjkh/setpwd.htm&&cardId=' + oData.IDNUMBER +
							'&&mobileNo=' + oData.MOBILENO + '&&branchNo=' + oData.BRANCHNO + '&&clientId=' + oData.CLIENTID + '&&clientName=' + oData.CLIENTNAME);
							return;
						} else {
							onJsOverrideUrlLoading('/sjkh/digital.htm');
							return;
						}
					});
				});
			});
		}, function(){
			oData.TIME += 1;
			if (oData.TIME >= 2) {
				var timer = null, total_time = 10 * 60, time = calTime(total_time);
				canContinue(false);
				$('.btnContinue').eq(0).html('请10分钟后重试（' + time + '）');
				timer = setInterval(function(){
					total_time -= 1;
					time = calTime(total_time);
					if (time == '00:00') {
						canContinue(true);
						oData.TIME = 0;
						clearInterval(timer);
					} else {
						$('.btnContinue').eq(0).html('请10分钟后重试（' + time + '）');
					}
				}, 1000);
				alert('亲，宝宝用了吃奶的力气也没找到您的身份信息，请您休息十分钟后重新上传照片并确认身份资料，宝宝等着您');
				return;
			} else {
				alert('亲，宝宝翻箱倒柜，也没能找到您的身份证信息，请您确认填写了正确的身份证信息');
				return;
			}
		});
	};
	/* 重新上传身份证
	$('.btnContinue').eq(1).bind('click', function() {
		if (oData.CSDCOPENFLAG === '0') {
			onJsOverrideUrlLoading('/sjkh/newuploadpic.htm');
		} else {
			onJsOverrideUrlLoading('/sjkh/uploadpic.htm');
		}
	});*/
	/* 重新确认身份证
	$('.btnContinue').eq(2).bind('click', function() {
		onJsOverrideUrlLoading('/sjkh/wszl.htm');
	});*/
};
function calTime(total_time) {
		var minutes = parseInt(total_time / 60), minstr = '';
		var second = total_time % 60, secstr = '';
		if(minutes <= 9){
			minstr = '0' + minutes;
		} else {
			minstr = minutes;
		}
		if(second <= 9){
			secstr = '0' + second;
		} else {
			secstr = second;
		}
		return minstr + ':' + secstr;
};
// 填充营业部
function fillBranch(arr, succ) {
	var i = 0,
		len = arr.length,
		str = '<option value="none">请选择营业部</option>';
	for (; i < len; i++) {
		str += '<option value="' + arr[i].branch_no + '">' + arr[i].branch_name + '</option>';
	}
	$('#branch').html(str);
};
// 获取营业部
function getBranch(succ) {
	var params = cRequestSign + encodeURI("?action=31001&path=/WA0001&op_station=($tztudid)&local_no=999&branch_no=0");
	getDataHS(params, '', function (data){
		if(finlish(data)){return;}

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
//取默认营业部号
function getDefaultBranch(PICIDNUMBER,MOBILENO, succ) {
	var params = cRequestSign + encodeURI("?action=31002&path=/baseservice/parsebranchno&op_station=($tztudid)&card_no=" + PICIDNUMBER + "&phone=" + MOBILENO);
	getDataHS(params, '', function (data){
		if(finlish(data)){return;}

		var binData = JSON.parse(data.BINDATA),
			error_no = binData.code;
		if (error_no == '0') {
			succ(binData.result.branch_no);
		}
	});
};
// 验证身份证合法性
function IdCardValidate(idCard) {
    idCard = trim(idCard.replace(/ /g, ""));               //去掉字符串头尾空格
    if (idCard.length == 15) {
        return false;       //进行15位身份证的验证
    } else if (idCard.length == 18) {
        var a_idCard = idCard.split("");                // 得到身份证数组
        if(isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)){   //进行18位身份证的基本验证和第18位的验证
            return true;
        } else {
			return false;
        }
    } else {
        return false;
    }
};
/**
 * 判断身份证号码为18位时最后的验证位是否正确
 * @param a_idCard 身份证号码数组
 * @return
 */
function isTrueValidateCodeBy18IdCard(a_idCard) {
    var sum = 0;                             // 声明加权求和变量
    if (a_idCard[17].toLowerCase() == 'x') {
        a_idCard[17] = 10;                    // 将最后位为x的验证码替换为10方便后续操作
    }
    for ( var i = 0; i < 17; i++) {
        sum += Wi[i] * a_idCard[i];            // 加权求和
    }
    valCodePosition = sum % 11;                // 得到验证码所位置
    if (a_idCard[17] == ValideCode[valCodePosition]) {
        return true;
    } else {
        return false;
    }
}
/**
  * 验证18位数身份证号码中的生日是否是有效生日
  * @param idCard 18位书身份证字符串
  * @return
  */
function isValidityBrithBy18IdCard(idCard18){
    var year =  idCard18.substring(6,10);
    var month = idCard18.substring(10,12);
    var day = idCard18.substring(12,14);
    var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
    // 这里用getFullYear()获取年份，避免千年虫问题
    if(temp_date.getFullYear()!=parseFloat(year)
          ||temp_date.getMonth()!=parseFloat(month)-1
          ||temp_date.getDate()!=parseFloat(day)){
            return false;
    }else{
        return true;
    }
};
/**
* 验证15位数身份证号码中的生日是否是有效生日
* @param idCard15 15位书身份证字符串
* @return
*/
function isValidityBrithBy15IdCard(idCard15){
  var year =  idCard15.substring(6,8);
  var month = idCard15.substring(8,10);
  var day = idCard15.substring(10,12);
  var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
  // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
  if(temp_date.getYear()!=parseFloat(year)
		  ||temp_date.getMonth()!=parseFloat(month)-1
		  ||temp_date.getDate()!=parseFloat(day)){
			return false;
	}else{
		return true;
	}
};
//去掉字符串头尾空格
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
};
function start(msg){ //通讯开始
	onJsOverrideUrlLoading('http://action:10049?show=1&&text=' + msg);
};
function finlish(data){ //通讯完成
	onJsOverrideUrlLoading('http://action:10049?show=0');

	if(data.ERRORNO < 0){
		if(!(data.ERRORMESSAGE == null|| data.ERRORMESSAGE == '')){
			alert(data.ERRORMESSAGE);
		}else{
			alert('错误信息为空！');
		}
		return true;
	}else{
		return false;
	}
};
//通用ajax请求
function getDataHS(requestUrl, requestData, cfunc){ //回调函数 cfunc
	$.ajax({
		type: "POST",
		url: requestUrl,
		data: requestData,
		contentType: "application/x-www-form-urlencoded;", //避免乱码
		success: function(data){
			cfunc(data);

			/*if(data.ERRORNO < 0 && !(data.ERRORMESSAGE == null|| data.ERRORMESSAGE == '')){
				alert(data.ERRORMESSAGE);
			}else{
				cfunc(data);
			} */
		},
		error: ajaxError
	});
};
// 客户开户申请(资料信息保存同时开通资产账号)
function openClientAccount(succ) {
	start('开户申请中...');

	var params = cRequestSign + encodeURI("?action=31001&path=/WA0017&op_station=($tztudid)&branch_no=" + oData.BRANCHNO +
	"&id_kind=0&id_no=" + oData.IDNUMBER + "&client_name=" + oData.CLIENTNAME + "&id_begindate=" + (oData.IDBEGINDATE || '') +
	"&id_enddate=" + (oData.IDENDDATE || '') + "&mobile_tel=" + oData.MOBILENO + "&birthday=" + (oData.BIRTHDAY || '19820123') +
	"&issued_depart=" + oData.ISSUEDDEPART + "&client_gender=" + (oData.CLIENTGENDER || '男') + "&nationality=CHN&zipcode=" + oData.POSTCODE +
	"&degree_code=" + oData.DEGREE + "&profession_code=" + oData.PROFESSION + '&nciis_flag=' + '1'/* oData.CSDCOPENFLAG */) +
	"&id_address=" + encodeURIComponent(oData.IDADDRESS) + '&address=' + encodeURIComponent(oData.ADDRESS);
	getDataHS(params, '', function (data){
		if(finlish(data)){canContinue(true);return;}

		var binData = JSON.parse(data.BINDATA),	error_no = binData.error_no, error_info = binData.error_info;
		if (error_no == '0') {
			succ(binData);
		} else {
			canContinue(true);
			alert(error_info);
		}
	});
};
// 客户身份检查(验证是否是国金客户)
function checkIdno(succ) {
	start('开户查询中...');

	var params = cRequestSign + encodeURI("?action=31001&path=/WA0013&op_station=($tztudid)&branch_no=" + oData.BRANCHNO +
	"&client_name=" + oData.CLIENTNAME + "&id_kind=0&id_no=" + oData.IDNUMBER);
	getDataHS(params, '', function (data){
		if(finlish(data)){canContinue(true);return;}

		var binData = JSON.parse(data.BINDATA),
			error_no = binData.error_no,
			error_info = binData.error_info;
		if (error_no == '0') {
			succ();
		} else {
			canContinue(true);
			alert(error_info);
		}
	});
};
// 证件开始日期和结束日期判断
function checkDate() {
	var re = /\d{6}/,
		oDate = new Date(),
		sYears = oDate.getFullYear(),
		sMonths = oDate.getMonth() + 1;
		sDay = oDate.getDate();
	sMonths = sMonths < 10 ? ('0' + sMonths) : sMonths;
	nowDate = sYears + sMonths + sDay;
	if (!re.test(oData.IDBEGINDATE) || !re.test(oData.IDENDDATE) || (nowDate < oData.IDBEGINDATE) || (oData.IDENDDATE < oData.IDBEGINDATE)) {
		oData.IDBEGINDATE = '';
		oData.IDENDDATE = '';
		return;
	}
};
	//根据身份证号码获取年龄
function getAge(UUserCard){
	var myDate = new Date();
	var month = myDate.getMonth() + 1;
	var day = myDate.getDate();
	var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
	if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
	age++;
	}
	return age;
};
// 判断识别的身份证和用户输入的身份证是否有五位以上的数字不一样
function isSameIdNumber(picNumber, inputNumber) {
	var picArr = picNumber.split(''),
		inputArr = inputNumber.split(''),
		i = 0,
		picLen = picArr.length,
		inputLen = inputArr.length,
		len = Math.min(picLen, inputLen),
		time = (picLen != inputLen ? Math.abs(picLen - inputLen) : 0);
	for (; i < len; i++) {
		if (picArr[i] != inputArr[i]) {
			time += 1;
		}
	}
	//测试环境下把这个限制关闭
  return (time > 5 ? true : false);
	//return false;
};
// 公安接口验证
function getIDCardInfo(succ, fail) {
	start('身份验证中...');

	var params = cRequestSign + encodeURI("?action=31001&path=/WA0014&op_station=($tztudid)&client_name=" + oData.CLIENTNAME + "&id_no=" + oData.IDNUMBER);
	getDataHS(params, '', function (data){
		if(finlish(data)){canContinue(true);return;}

		var binData = JSON.parse(data.BINDATA),
			error_no = binData.error_no,
			error_info = binData.error_info;
		if (error_no == '0') {
			succ();
		} else {
			canContinue(true);
			fail();
		}
	});
};