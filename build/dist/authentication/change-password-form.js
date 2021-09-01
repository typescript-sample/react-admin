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
import { strongPassword, validateAndChangePassword, validateChange } from 'password-component';
import * as React from 'react';
import { MessageComponent } from 'react-message-component';
import { navigate } from 'react-onex';
import { handleError, initForm, loading, registerEvents, resource as getResource, storage } from 'uione';
import logo from '../assets/images/logo.png';
import { context } from './app';
var ChangePasswordForm = /** @class */ (function (_super) {
    __extends(ChangePasswordForm, _super);
    function ChangePasswordForm(props) {
        var _this = _super.call(this, props) || this;
        _this.signin = _this.signin.bind(_this);
        _this.changePassword = _this.changePassword.bind(_this);
        _this.passwordService = context.getPasswordServicer();
        var user = {
            step: null,
            username: '',
            currentPassword: '',
            password: '',
            passcode: '',
        };
        _this.state = {
            message: '',
            user: user,
            confirmPassword: '',
            hiddenPasscode: true
        };
        return _this;
    }
    ChangePasswordForm.prototype.componentDidMount = function () {
        this.form = initForm(this.ref.current, registerEvents);
    };
    ChangePasswordForm.prototype.signin = function () {
        navigate(this.props.history, 'signin');
    };
    ChangePasswordForm.prototype.changePassword = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.preventDefault();
                        user = this.state.user;
                        return [4 /*yield*/, validateAndChangePassword(this.passwordService.changePassword, user, this.state.confirmPassword, getResource(), this.showMessage, this.showError, this.hideMessage, validateChange, handleError, strongPassword, loading())];
                    case 1:
                        _a.sent();
                        this.setState({ user: user });
                        return [2 /*return*/];
                }
            });
        });
    };
    ChangePasswordForm.prototype.render = function () {
        var resource = storage.getResource();
        var user = this.state.user;
        var hiddenPasscode = !(user.step && user.step >= 1);
        return (React.createElement("div", { className: 'view-container central-full' },
            React.createElement("form", { id: 'changePasswordForm', name: 'changePasswordForm', noValidate: true, autoComplete: 'off', ref: this.ref },
                React.createElement("div", null,
                    React.createElement("img", { className: 'logo', src: logo }),
                    React.createElement("h2", null, resource.change_password),
                    React.createElement("div", { className: 'message ' + this.alertClass },
                        this.state.message,
                        React.createElement("span", { onClick: this.hideMessage, hidden: !this.state.message || this.state.message === '' })),
                    React.createElement("label", { hidden: !hiddenPasscode },
                        resource.username,
                        React.createElement("input", { type: 'text', id: 'username', name: 'username', value: user.username, onChange: this.updateState, maxLength: 255, placeholder: resource.placeholder_username })),
                    React.createElement("label", { hidden: !hiddenPasscode },
                        resource.current_password,
                        React.createElement("input", { type: 'password', className: 'form-control', id: 'currentPassword', name: 'currentPassword', value: user.currentPassword, onChange: this.updateState, maxLength: 255, placeholder: resource.placeholder_current_password })),
                    React.createElement("label", { hidden: !hiddenPasscode },
                        resource.new_password,
                        React.createElement("input", { type: 'password', className: 'form-control', id: 'password', name: 'password', value: user.password, onChange: this.updateState, maxLength: 255, placeholder: resource.placeholder_new_password })),
                    React.createElement("label", { hidden: !hiddenPasscode },
                        resource.confirm_password,
                        React.createElement("input", { type: 'password', className: 'form-control', id: 'confirmPassword', name: 'confirmPassword', value: this.state.confirmPassword, onChange: this.updateFlatState, maxLength: 255, placeholder: resource.placeholder_confirm_password })),
                    React.createElement("label", { hidden: hiddenPasscode },
                        resource.passcode,
                        React.createElement("input", { type: 'password', className: 'form-control', id: 'passcode', name: 'passcode', value: user.passcode, onChange: this.updateState, maxLength: 255, placeholder: resource.placeholder_passcode })),
                    React.createElement("button", { type: 'submit', id: 'btnChangePassword', name: 'btnChangePassword', onClick: this.changePassword }, resource.button_change_password),
                    React.createElement("a", { id: 'btnSignin', onClick: this.signin }, resource.button_signin)))));
    };
    return ChangePasswordForm;
}(MessageComponent));
export { ChangePasswordForm };
//# sourceMappingURL=change-password-form.js.map