/**
 * Created by jyc on 14-7-21.
 * 通用
 */
define(function (require, exports, module) {

    function tenThousand(num) {
        num = parseFloat(num);
        var result = num / 10000;
        if (result >= 1) {
            return Format.toDecimal(result) + "万";
        } else {
            return num;
        }
    }

    //保留两位小数
    //功能：将浮点数四舍五入，取小数点后2位
    function toDecimal(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return;
        }
        f = Math.round(x*100) / 100;
        return f;
    }

    var Format = {
        tenThousand: tenThousand,
        toDecimal: toDecimal
    };

    //暴露对外的接口
    module.exports = Format;
});