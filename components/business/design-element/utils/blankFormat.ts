// 校验身份证号码
export function isIdCard(idCard:any) {
    // 15位和18位身份证号码的正则表达式
    var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    if (idCard.length != 18) { return false; }
    if (!regIdCard.test(idCard)) { return false; }
    var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); // 将前17位加权因子保存在数组里
    var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
    var idCardWiSum = 0; // 用来保存前17位各自乖以加权因子后的总和
    for (var i = 0; i < 17; i++) { idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i]; }
    var idCardMod = idCardWiSum % 11;// 计算出校验码所在数组的位置
    var idCardLast = idCard.substring(17);// 得到最后一位身份证号码
    // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
    if (idCardMod == 2) {
        return (idCardLast == "X" || idCardLast == "x") ? true : false;
    } else {
        return (idCardLast == idCardY[idCardMod]) ? true : false;
    }
    return false;
}
export const blankFormat = (type: string, value: string) => {
    switch (type) {
        case 'Email':
            return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
        case 'QQ':
            return /^[1-9]\d{4,10}$/.test(value)
        case 'Mobile':
            return /^1[3-9]\d{9}$/.test(value)
        case 'Website':
            return /^(https?:|http:)/.test(value)
        case 'Date':
            return /^\d{4}-\d{2}-\d{2}$/.test(value) || /^\d{2}\/\d{2}\/\d{4}$/.test(value)
        case 'Chinese':
            const reg = /^[\u4E00-\u9FA5]+$/
            return reg.test(value)
        case 'English':
            return /^[a-zA-Z]+$/.test(value)
        case 'IdCard':
            return isIdCard(value)
        default:
            return true

    }
}