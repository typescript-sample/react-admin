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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { dayDiff, getMessage, handleCookie, store, validate } from 'authentication-component';
import { DefaultCookieService } from 'cookie-core';
import { Base64 } from 'js-base64';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import useMessage from 'src/core/hooks/useMessage';
import { alertInfo } from 'ui-alert';
import { handleError, message, storage } from 'uione';
import { context } from './app';
export var map = {
    '3': 'fail_authentication',
    '4': 'fail_wrong_password',
    '5': 'fail_expired_password',
    '6': 'fail_access_time_locked',
    '7': 'fail_suspended_account',
    '8': 'fail_locked_account',
    '9': 'fail_disabled_account',
    '10': 'fail_disabled_account',
};
var status = {
    success: 1,
    two_factor_required: 2,
    fail: 3,
    password_expired: 5
};
var SigninData = {
    user: {
        username: '',
        password: '',
        passcode: ''
    },
    remember: false,
    message: ''
};
var cookie = new DefaultCookieService(document);
var SigninForm = function () {
    var history = useHistory();
    var resource = storage.getResource();
    var authenticator = context.getAuthenticator();
    var hooks = useMessage(SigninData);
    var signinInfor = hooks.signinInfor, alertClass = hooks.alertClass, handleChange = hooks.handleChange, updateRemember = hooks.updateRemember, showError = hooks.showError, hideMessage = hooks.hideMessage, setSiginInfor = hooks.setSiginInfor;
    var form = React.useRef();
    var isTwoFactor = (signinInfor.user.step ? signinInfor.user.step === 1 : false);
    var forgotPassword = function () {
        history.push('/auth/forgot-password');
    };
    var signup = function () {
        history.push('/auth/signup');
    };
    var succeed = function (result) {
        store(result.user, storage.setUser, storage.setPrivileges);
        navigateToHome();
    };
    var navigateToHome = function () {
        var redirect = window.location.search;
        if (redirect) {
            var url = new URL(window.location.href);
            var searchParams = new URLSearchParams(url.search);
            history.push(searchParams.get('redirect'));
        }
        else {
            history.push(storage.home);
        }
    };
    var signin = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var r, user, remember, result_1, s, expiredDays, msg, msg, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    r = storage.resource();
                    user = signinInfor.user;
                    if (!validate(user, r, showError)) {
                        return [2 /*return*/];
                    }
                    else {
                        hideMessage();
                    }
                    remember = signinInfor.remember;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    storage.loading().showLoading();
                    return [4 /*yield*/, authenticator.authenticate(user)];
                case 2:
                    result_1 = _a.sent();
                    s = result_1.status;
                    if (s === status.two_factor_required) {
                        user.step = 1;
                        setSiginInfor(function (prev) { return (__assign(__assign({}, prev), { user: user })); });
                    }
                    else if (s === status.success || s === status.success_and_reactivated) {
                        handleCookie('data', user, remember, cookie, 60 * 24 * 3, Base64.encode);
                        expiredDays = dayDiff(result_1.user.passwordExpiredTime, new Date());
                        if (expiredDays > 0) {
                            msg = r.format(r.value('msg_password_expired_soon'), expiredDays);
                            message(msg);
                        }
                        if (s === status.success) {
                            succeed(result_1);
                        }
                        else {
                            alertInfo(r.value('msg_account_reactivated'), r.value('info'), function () {
                                succeed(result_1);
                            });
                        }
                    }
                    else {
                        store(null, storage.setUser, storage.setPrivileges);
                        msg = getMessage(s, r.value);
                        showError(msg);
                    }
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    handleError(err_1);
                    return [3 /*break*/, 5];
                case 4:
                    storage.loading().hideLoading();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: 'view-container central-full sign-in-view-container' },
        React.createElement("form", { id: 'signinForm', name: 'signinForm', noValidate: true, autoComplete: 'off', ref: form },
            React.createElement("div", null,
                React.createElement("h2", null, resource.signin),
                React.createElement("div", { className: 'message ' + alertClass },
                    signinInfor.message,
                    React.createElement("span", { onClick: hideMessage, hidden: !signinInfor.message || signinInfor.message === '' })),
                React.createElement("label", { hidden: isTwoFactor },
                    resource.username,
                    React.createElement("input", { type: 'text', id: 'username', name: 'username', placeholder: resource.placeholder_username, onChange: function (e) { return handleChange(e); }, maxLength: 255 })),
                React.createElement("label", { hidden: isTwoFactor },
                    resource.password,
                    React.createElement("input", { type: 'password', id: 'password', name: 'password', placeholder: resource.placeholder_password, onChange: function (e) { return handleChange(e); }, maxLength: 255 })),
                React.createElement("label", { hidden: !isTwoFactor },
                    resource.passcode,
                    React.createElement("input", { type: 'password', id: 'passcode', name: 'passcode', placeholder: resource.placeholder_passcode, onChange: handleChange, maxLength: 255 })),
                React.createElement("label", { className: 'col s12 checkbox-container', hidden: isTwoFactor },
                    React.createElement("input", { type: 'checkbox', id: 'remember', name: 'remember', checked: signinInfor.remember ? true : false, onChange: updateRemember }),
                    resource.signin_remember_me),
                React.createElement("button", { type: 'submit', id: 'btnSignin', name: 'btnSignin', onClick: signin }, resource.button_signin),
                React.createElement("a", { id: 'btnForgotPassword', onClick: forgotPassword }, resource.button_forgot_password),
                React.createElement("a", { id: 'btnSignup', onClick: signup }, resource.button_signup)))));
};
export default SigninForm;
//# sourceMappingURL=sigin-form-hooks.js.map