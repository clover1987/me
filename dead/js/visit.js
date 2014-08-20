var oData = {};
var activeClass = 'riskCheck';
initialize();
// 初始化
function initialize() {
	//var nHeight = $('#visitHead').outerHeight(true) + $('#visitFoot').outerHeight(true) + $(".visit_prompt").outerHeight(true);
			//calculateHeight("visitWraper", nHeight+32); //125
	oTools.ReadToLocal(function (data) {
		oData = $.extend(oData, data);
		getRevisitPaper(function(data){
			fillRevisitPaper(document.getElementById('scroller'), data.resultList);
			// 模拟表单控件input(checkbox和radio)
			$('#visitWraper .itemRisk').each(function(i){
				var $riskIco = $(this).find('.listCheck'),
					iIndex = $(this).attr('default_answer');
				/*$riskIco.eq(iIndex).find('.riskIco').addClass(activeClass);	*///选中默认值
				simRadio($riskIco, '.riskIco', iIndex, function(obj, index) {
					var str = '',
						len = 0;
					switch(i){
						case 0:
						len = obj.length - 1;
						str = '如非本人意愿，请办理注销手续。';
						break;
						case 1:
						len = obj.length - 1;
						str = '请仔细阅读后选择是。';
						break;
						case 2:
						len = obj.length - 1; 
						str = '请本人立刻修改密码后重新选择是。';
						break;
						case 3:
						len = 0;
						str	= '如我公司工作人员有上述违规言行，请您立即拨打我公司客服热线4006600109反馈，谢谢！';
						break;
						case 4:
						len = obj.length - 1;
						str	= '请您妥善保管好您的账户相关密码，不要轻易告知他人，防止密码外泄给您带来风险。';
						break;
					}
					if (len == index) {
						alert(str);
					} else {
						$('#visitWraper .itemRisk').eq(i).css({'border':"none"});
					}
				});
			});
			var nHeight = $('#visitHead').outerHeight(true) + $('#visitFoot').outerHeight(true) + $(".visit_prompt").outerHeight(true);
			calculateHeight("visitWraper", nHeight+32); //125
			loaded();
		});
	}, "clientId=&MobileNo=");
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
};
function loaded() {
	var bBtn = true;
	if(app.indexOf("iphone")>0 || app.indexOf("android 2.3")>0){
		 bBtn = false;
	 }else if(app.indexOf("android")>0){
		 bBtn = true;
	 }
	myScroll = new iScroll('visitWraper', {
		hScroll: false,
		bounce: false,
		hScrollbar: false,
		onBeforeScrollStart: false,
		handleClick: bBtn,
		useTransform: false,
		useTransition: false
	});
};
// 下一步
$('.btnContinue').bind('click', nextFunc);
function nextFunc() {
	var paper_answer = getEligSurvey(),	wrongQuestion = '';
	for (var i = 0; i < paper_answer.resultArr.length; i++) {
		if (paper_answer.resultArr[i] == 0 || $('#visitWraper .itemRisk').eq(i).attr('default_answer') != paper_answer.resultArr[i]) {
			wrongQuestion += (i+1) + '、';
			$('#visitWraper .itemRisk').eq(i).css({'border':"1px solid red"});
		} else {
			continue;
		}
	}
	myScroll.refresh();
	if(wrongQuestion.slice(-1) ==  '、' ){ wrongQuestion = wrongQuestion.slice(0,-1);}
	if (wrongQuestion.length > 0) {
		alert('请认真阅读回访题目' + wrongQuestion + '后，作出正确选择！');
		return;
	}
	setRevisitPaper(paper_answer.resultStr, function() {
		qryOpenStatus(function() {
				onJsOverrideUrlLoading('/sjkh/success.htm');
		});
	});
};
// 获取答案
function getEligSurvey() {
	var re = /\^$/,
		result = {
			resultStr: '',
			resultArr: []
		};
	$('#visitWraper .itemRisk').each(function(index){
		var $riskIco = $(this).find('.riskIco'), str = (index+1) + '&',	sel = 0;
			$riskIco.each(function(m) {
			if ($(this).hasClass(activeClass)) {
				str += (m+1) + '^';
				sel = m+1;
			}
		});
		var str2 = str.replace(re, '|');
		result.resultStr += str2;
		result.resultArr.push(sel);
	});
	
	return result;
};
// 回访问卷获取
function getRevisitPaper(succ) {
	var params = cRequestSign + encodeURI("?action=31001&path=/WA0042&client_id=" + oData.CLIENTID);
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
// 回访问卷填充
function fillRevisitPaper(obj, arr){
	var i = 0,
		len = arr.length,
		str = '';
	
	for (; i < len; i++) {
		var key; //0表示没有选中
		switch(arr[i].default_answer){
			case 'A':
			key = 1;
			break;
			case 'B':
			key = 2;
			break;
			case 'C':
			key = 3;
			break;
			case 'D':
			key = 4;
			break;
		}
		str += '<ul class="itemRisk" default_answer="' + key + '" question_kind="' + arr[i].question_kind + '" question_no="' + arr[i].question_no + '"><li class="listTitle">' + (i+1) + '.' + arr[i].question_content + '</li>';
		var j = 1;
		for (var attr in arr[i].answer_content) {
			str += '<li class="listCheck listVisit"><a class="linkRisk">' + arr[i].answer_content[attr] + '</a><b class="riskIco"></b></li>';
			j++;
		}
		
		str += '</ul>';
	}
	obj.innerHTML = str + '<br/>';
};
// 回访问卷提交
function setRevisitPaper(paper_answer, succ) {
	var params = cRequestSign + encodeURI("?action=31001&path=/WA0043&op_station=($tztudid)&branch_no=" + branchNo + "&client_id=" + oData.CLIENTID + "&paper_answer=") + encodeURIComponent(paper_answer);
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
/* 回访激活
function activeClient(succ) {
	var params = cRequestSign + encodeURI("?action=31001&path=/WA0018&op_station=($op_station)&client_id=" + oData.CLIENTID);
	getData(params, '', function (data){
		var binData = JSON.parse(data.BINDATA),
			error_no = binData.error_no,
			error_info = binData.error_info;
		if (error_no === '0') {
			succ(binData);
		} else {
			//fail();
			alert(error_info);
		}
	});
};*/
// 开户状态查询
function qryOpenStatus(succ) {
	var params = cRequestSign + encodeURI("?action=31001&path=/WA0037&op_station=($tztudid)&branch_no=" + branchNo + "&client_id=" + oData.CLIENTID + "&mobile_tel=" + oData.MOBILENO);
	getData(params, '', function (data){
		var binData = JSON.parse(data.BINDATA),
			error_no = binData.error_no,
			error_info = binData.error_info;
		if (error_no == '0') {
			succ();
		} else {
			alert(error_info);
		}
	});
};