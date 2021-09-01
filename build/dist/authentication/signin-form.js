var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { dayDiff, getMessage, handleCookie, initFromCookie, store, validate } from 'authentication-component';
import { DefaultCookieService } from 'cookie-core';
import { Base64 } from 'js-base64';
import * as React from 'react';
import { MessageComponent } from 'react-message-component';
import { navigate } from 'react-onex';
import { alertInfo } from 'ui-alert';
import { handleError, message, storage } from 'uione';
import { initForm, registerEvents } from 'uione';
import { context } from './app';
import './signin.css';
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
var cookie = new DefaultCookieService(document);
var SigninForm = /** @class */ (function (_super) {
    __extends(SigninForm, _super);
    function SigninForm(props) {
        var _this = _super.call(this, props) || this;
        _this.updateRemember = function (e) {
            e.preventDefault();
            var objSet = {};
            objSet['remember'] = !_this.state.remember;
            _this.setState(objSet);
        };
        _this.signin = _this.signin.bind(_this);
        _this.signup = _this.signup.bind(_this);
        _this.forgotPassword = _this.forgotPassword.bind(_this);
        _this.authenticator = context.getAuthenticator();
        var remember = false;
        var user = {
            username: '',
            passcode: '',
            password: ''
        };
        remember = initFromCookie('data', user, cookie.get, Base64.decode);
        _this.state = {
            user: user,
            remember: remember,
            message: ''
        };
        return _this;
    }
    SigninForm.prototype.componentDidMount = function () {
        this.form = initForm(this.ref.current, registerEvents);
    };
    SigninForm.prototype.forgotPassword = function () {
        navigate(this.props.history, '/auth/forgot-password');
    };
    SigninForm.prototype.signup = function () {
        navigate(this.props.history, '/auth/signup');
    };
    SigninForm.prototype.succeed = function (result) {
        store(result.user, storage.setUser, storage.setPrivileges);
        this.navigateToHome();
    };
    SigninForm.prototype.navigateToHome = function () {
        var redirect = window.location.search;
        if (redirect) {
            var url = new URL(window.location.href);
            var searchParams = new URLSearchParams(url.search);
            this.props.history.push(searchParams.get('redirect'));
        }
        else {
            this.props.history.push(storage.home);
        }
    };
    SigninForm.prototype.signin = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var r, user, remember, result_1, s, expiredDays, msg, msg, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.preventDefault();
                        r = storage.resource();
                        user = this.state.user;
                        if (!validate(user, r, this.showError)) {
                            return [2 /*return*/];
                        }
                        else {
                            this.hideMessage();
                        }
                        remember = this.state.remember;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        storage.loading().showLoading();
                        return [4 /*yield*/, this.authenticator.authenticate(user)];
                    case 2:
                        result_1 = _a.sent();
                        s = result_1.status;
                        if (s === status.two_factor_required) {
                            user.step = 1;
                            this.setState({ user: user });
                        }
                        else if (s === status.success || s === status.success_and_reactivated) {
                            handleCookie('data', user, remember, cookie, 60 * 24 * 3, Base64.encode);
                            expiredDays = dayDiff(result_1.user.passwordExpiredTime, new Date());
                            if (expiredDays > 0) {
                                msg = r.format(r.value('msg_password_expired_soon'), expiredDays);
                                message(msg);
                            }
                            if (s === status.success) {
                                this.succeed(result_1);
                            }
                            else {
                                alertInfo(r.value('msg_account_reactivated'), r.value('info'), function () {
                                    _this.succeed(result_1);
                                });
                            }
                        }
                        else {
                            store(null, storage.setUser, storage.setPrivileges);
                            msg = getMessage(s, r.value);
                            this.showError(msg);
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
        });
    };
    SigninForm.prototype.render = function () {
        var resource = storage.getResource();
        var user = this.state.user;
        var isTwoFactor = (user.step === 1);
        return (React.createElement("div", { className: 'view-container central-full sign-in-view-container' },
            React.createElement("form", { id: 'signinForm', name: 'signinForm', noValidate: true, autoComplete: 'off', ref: this.ref },
                React.createElement("div", null,
                    React.createElement("h2", null, resource.signin),
                    React.createElement("div", { className: 'message ' + this.alertClass },
                        this.state.message,
                        React.createElement("span", { onClick: this.hideMessage, hidden: !this.state.message || this.state.message === '' })),
                    React.createElement("label", { hidden: isTwoFactor },
                        resource.username,
                        React.createElement("input", { type: 'text', id: 'username', name: 'username', value: user.username, placeholder: resource.placeholder_username, onChange: this.updateState, maxLength: 255 })),
                    React.createElement("label", { hidden: isTwoFactor },
                        resource.password,
                        React.createElement("input", { type: 'password', id: 'password', name: 'password', value: user.password, placeholder: resource.placeholder_password, onChange: this.updateState, maxLength: 255 })),
                    React.createElement("label", { hidden: !isTwoFactor },
                        resource.passcode,
                        React.createElement("input", { type: 'password', id: 'passcode', name: 'passcode', value: user.passcode, placeholder: resource.placeholder_passcode, onChange: this.updateState, maxLength: 255 })),
                    React.createElement("label", { className: 'col s12 checkbox-container', hidden: isTwoFactor },
                        React.createElement("input", { type: 'checkbox', id: 'remember', name: 'remember', checked: this.state.remember ? true : false, onChange: this.updateRemember }),
                        resource.signin_remember_me),
                    React.createElement("button", { type: 'submit', id: 'btnSignin', name: 'btnSignin', onClick: this.signin }, resource.button_signin),
                    React.createElement("a", { id: 'btnForgotPassword', onClick: this.forgotPassword }, resource.button_forgot_password),
                    React.createElement("a", { id: 'btnSignup', onClick: this.signup }, resource.button_signup)))));
    };
    return SigninForm;
}(MessageComponent));
export { SigninForm };
//# sourceMappingURL=signin-form.js.map