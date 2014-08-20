/*
khPhone({
	phone: $("#phone"), // 必选，电话号码输入框
	code: $("#code-btn"), // 必选，获取短信按钮
	activeClass: "yzmon", // 必选，可点击状态样式
	time: 30 // 可选，等待时间，默认为60s
	// callback 可选，点击获取验证码按钮回调函数
});
*/
var GetVerifyCode = function (options) {
	this.opts = options;
	this.oPhone = this.opts.phone;
	this.oCodeBtn = this.opts.code;
	this.time = this.opts.time || 60;
	this.activeClass = this.opts.activeClass;
	this.re = /^1[3|4|5|8|6]\d{9}$/;
	this.callback = this.opts.callback || false;
	this.timeoverflag = 1;
	GetVerifyCode._this = this;
	this.init();
};
GetVerifyCode.prototype = {
	init: function () {
		this.oPhone.bind("input", this.phoneTest);
	},
	phoneTest: function () {
		var _this = GetVerifyCode._this;
		if(_this.re.test(_this.oPhone.attr("value")) && _this.timeoverflag ==1) {
			_this.oCodeBtn.addClass(_this.activeClass);
			_this.oCodeBtn.unbind();
			_this.oCodeBtn.bind("click", _this.getCode);
		} else {
			_this.oCodeBtn.removeClass(_this.activeClass);
			_this.oCodeBtn.unbind("click", _this.getCode);
		}
	},
	getCode: function () {
		var _this = GetVerifyCode._this,
			timer;
		_this.oCodeBtn.unbind();
		if (_this.callback) _this.callback(function(){
			_this.oCodeBtn.removeClass(_this.activeClass);
			_this.oCodeBtn.html("重新发送(" + _this.time + ")");
			
			timer = setInterval(function () {
				if (_this.time === 1) {
					_this.timeoverflag = 1;
					_this.time = _this.opts.time;
					_this.oCodeBtn.html("获取验证码");
					_this.phoneTest();
					clearInterval(timer);
				} else {
					_this.oCodeBtn.unbind("click", _this.getCode);
					_this.time -= 1;
					_this.timeoverflag = 0;
					_this.oCodeBtn.html("重新发送(" + _this.time + ")");
				}
			}, 1000);
		}, function(){
			_this.phoneTest();
		});
	}
};
var khPhone = function (options) {
	return new GetVerifyCode(options);
};
