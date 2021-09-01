var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
var useMessage = function (signInInfor) {
    var _a = React.useState(''), alertClass = _a[0], setAlertClass = _a[1];
    var _b = React.useState(signInInfor), signinInfor = _b[0], setSiginInfor = _b[1];
    var handleChange = function (e) {
        var type = e.target.id;
        var value = e.target.value ? e.target.value : '';
        if (type === 'username') {
            setSiginInfor(function (prev) { return (__assign(__assign({}, prev), { user: {
                    username: value,
                    password: prev.user.password,
                    passcode: prev.user.passcode
                } })); });
        }
        else if (type === 'password') {
            setSiginInfor(function (prev) { return (__assign(__assign({}, prev), { user: {
                    username: prev.user.username,
                    password: value,
                    passcode: prev.user.passcode
                } })); });
        }
        else if (type === 'passcode') {
            setSiginInfor(function (prev) { return (__assign(__assign({}, prev), { user: {
                    username: prev.user.username,
                    password: prev.user.password,
                    passcode: value
                } })); });
        }
    };
    var updateRemember = function (e) {
        e.preventDefault();
        setSiginInfor(function (prev) { return (__assign(__assign({}, prev), { remember: !signinInfor.remember })); });
    };
    var hideMessage = function () {
        setAlertClass('');
        setSiginInfor(function (prev) { return (__assign(__assign({}, prev), { message: '' })); });
    };
    var showMessage = function (msg) {
        setAlertClass('alert alert-info');
        setSiginInfor(function (prev) { return (__assign(__assign({}, prev), { message: msg })); });
    };
    var showError = function (msg) {
        setAlertClass('alert alert-erro');
        if (typeof msg === 'string') {
            setSiginInfor(function (prev) { return (__assign(__assign({}, prev), { message: msg })); });
        }
        else if (Array.isArray(msg) && msg.length > 0) {
            setSiginInfor(function (prev) { return (__assign(__assign({}, prev), { message: msg[0].message })); });
        }
        else {
            var x_1 = JSON.stringify(msg);
            setSiginInfor(function (prev) { return (__assign(__assign({}, prev), { message: x_1 })); });
        }
    };
    return { signinInfor: signinInfor, setSiginInfor: setSiginInfor, alertClass: alertClass, handleChange: handleChange, showError: showError, showMessage: showMessage, updateRemember: updateRemember, hideMessage: hideMessage };
};
export default useMessage;
//# sourceMappingURL=useMessage.js.map