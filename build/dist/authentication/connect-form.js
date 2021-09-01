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
import { getMessage } from 'authentication-component';
import * as React from 'react';
import { MessageComponent } from 'react-message-component';
import { alertInfo } from 'ui-alert';
import { handleError, storage } from 'uione';
import logo from '../assets/images/logo.png';
import { context } from './app';
var status = {
    success: 0,
    success_and_reactivated: 1,
    two_factor_required: 2,
    fail: 3,
    password_expired: 5
};
var SourceType = /** @class */ (function () {
    function SourceType() {
    }
    SourceType.username = 'email';
    SourceType.facebook = 'facebook';
    SourceType.google = 'google';
    SourceType.linkedIn = 'linkedIn';
    SourceType.twitter = 'twitter';
    SourceType.amazon = 'amazon';
    SourceType.microsoft = 'microsoft';
    SourceType.dropbox = 'dropbox';
    return SourceType;
}());
export { SourceType };
var ConnectForm = /** @class */ (function (_super) {
    __extends(ConnectForm, _super);
    function ConnectForm(props) {
        var _this = _super.call(this, props) || this;
        _this.oauth2Service = context.getOAuth2Service();
        _this.state = {
            connectType: '',
            connectTypePretty: '',
            message: '',
            componentRef: React.createRef()
        };
        _this.connect = _this.connect.bind(_this);
        return _this;
    }
    ConnectForm.prototype.navigateToHome = function () {
        var redirect = window.location.search;
        if (redirect) {
            var url = new URL(window.location.href);
            var searchParams = new URLSearchParams(url.search);
            this.props.history.push(searchParams.get('redirect'));
        }
        else {
            this.props.history.push('/welcome');
        }
    };
    ConnectForm.prototype.componentDidMount = function () {
        var connectType = this.props.match.params['connectType'].toLowerCase();
        if (connectType !== 'signin' && connectType !== 'signup') {
            connectType = 'signup';
        }
        var connectTypePretty = connectType === 'signup' ? 'Sign up' : 'Sign in';
        this.setState({ connectType: connectType, connectTypePretty: connectTypePretty });
    };
    ConnectForm.prototype.content = function () {
        this.props.history.push('/content/drive');
    };
    ConnectForm.prototype.connect = function (signInType) {
        return __awaiter(this, void 0, void 0, function () {
            var connectType, r_1, integrationConfiguration, msg, url, redirectUrl, u, oAuth2Info_1, left, top_1, win_1, com_1, interval_1, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.hideMessage();
                        connectType = this.state.connectType;
                        if (!signInType || signInType.length === 0) {
                            return [2 /*return*/, this.props.history.push('/auth/' + connectType)];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        r_1 = storage.resource();
                        return [4 /*yield*/, this.oauth2Service.configuration(signInType)];
                    case 2:
                        integrationConfiguration = _a.sent();
                        if (!integrationConfiguration) {
                            msg = r_1.format(r_1.value('msg_set_integration_information'), signInType);
                            return [2 /*return*/, this.showError(msg)];
                        }
                        url = void 0;
                        redirectUrl = storage.getRedirectUrl();
                        if (signInType === SourceType.linkedIn) {
                            url = 'https://www.linkedin.com/uas/oauth2/authorization?client_id=' + integrationConfiguration.clientId + '&response_type=code&redirect_uri='
                                + redirectUrl + '&state=Rkelw7xZWQlV7f8d&scope=r_basicprofile%20r_emailaddress';
                        }
                        else if (signInType === SourceType.google) {
                            url = 'https://accounts.google.com/o/oauth2/auth?client_id=' + integrationConfiguration.clientId + '&response_type=code&redirect_uri='
                                + redirectUrl + '&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive&include_granted_scopes=true';
                        }
                        else if (signInType === SourceType.facebook) {
                            url = 'https://www.facebook.com/v2.5/dialog/oauth?client_id=' + integrationConfiguration.clientId + '&redirect_uri='
                                + redirectUrl + '&scope=public_profile%2cemail%2cuser_birthday';
                        }
                        else if (signInType === SourceType.twitter) {
                            url = 'https://api.twitter.com/oauth/authorize?oauth_token=' + integrationConfiguration.clientId;
                        }
                        else if (signInType === SourceType.amazon) {
                            url = 'https://www.amazon.com/ap/oa?client_id=' + integrationConfiguration.clientId + '&scope=profile&response_type=code&redirect_uri=' + redirectUrl;
                        }
                        else if (signInType === SourceType.microsoft) {
                            u = 'http://localhost:3001/auth/connect/oauth2';
                            redirectUrl = encodeURIComponent(u);
                            url = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=' + integrationConfiguration.clientId + '&response_type=code&redirect_uri='
                                + redirectUrl + '&response_mode=query&scope=https%3A%2F%2Fgraph.microsoft.com%2FFiles.ReadWrite.All%20onedrive.readwrite%20onedrive.appfolder%20offline_access&state=12345&grant_type=authorization_Code';
                        }
                        else if (signInType === SourceType.dropbox) {
                            url = 'https://www.dropbox.com/oauth2/authorize?client_id=' + integrationConfiguration.clientId + '&response_type=code&redirect_uri=' + redirectUrl;
                        }
                        oAuth2Info_1 = {
                            id: SourceType[signInType],
                            redirectUri: redirectUrl,
                            code: null
                        };
                        left = screen.width / 2 - 300;
                        top_1 = screen.height / 2 - 350;
                        win_1 = window.open(url, '', 'top=' + top_1 + ',left=' + left + ', width=600, height=700');
                        com_1 = this;
                        interval_1 = window.setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                            var code, result_1, s, message3, msg, e_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 3, , 4]);
                                        if (!(win_1 == null || win_1.closed)) return [3 /*break*/, 2];
                                        window.clearInterval(interval_1);
                                        code = localStorage.getItem('code');
                                        if (!(code && code !== '')) return [3 /*break*/, 2];
                                        if (oAuth2Info_1.id === SourceType.google) {
                                            code = encodeURIComponent(code);
                                        }
                                        oAuth2Info_1.code = code;
                                        return [4 /*yield*/, com_1.oauth2Service.authenticate(oAuth2Info_1)];
                                    case 1:
                                        result_1 = _a.sent();
                                        s = result_1.status;
                                        if (s === status.success || s === status.success_and_reactivated) {
                                            if (s === status.success) {
                                                storage.setUser(result_1.user);
                                                com_1.content();
                                                // _this.navigateToHome();
                                            }
                                            else {
                                                message3 = r_1.value('msg_account_reactivated');
                                                alertInfo(message3, null, function () {
                                                    storage.setUser(result_1.user);
                                                    com_1.navigateToHome();
                                                });
                                            }
                                        }
                                        else {
                                            storage.setUser(null);
                                            msg = getMessage(s, r_1);
                                            com_1.showError(msg);
                                        }
                                        return [3 /*break*/, 2];
                                    case 2: return [3 /*break*/, 4];
                                    case 3:
                                        e_1 = _a.sent();
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); }, 0);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        handleError(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ConnectForm.prototype.render = function () {
        var _this = this;
        var resource = storage.getResource();
        var connectTypePretty = this.state.connectTypePretty;
        return (React.createElement("div", { className: 'view-container central-full', ref: this.state.componentRef },
            React.createElement("form", { id: 'connectForm', name: 'connectForm', noValidate: true, autoComplete: 'off' },
                React.createElement("div", null,
                    React.createElement("img", { className: 'logo', src: logo }),
                    React.createElement("h2", null, connectTypePretty),
                    React.createElement("div", { className: 'message ' + this.alertClass },
                        this.state.message,
                        React.createElement("span", { onClick: this.hideMessage, hidden: !this.state.message || this.state.message === '' })),
                    React.createElement("button", { type: 'button', onClick: function () { return _this.connect('linkedIn'); } },
                        React.createElement("i", { className: 'fa fa-linkedin pull-left' }),
                        resource.connect_linkedin),
                    React.createElement("button", { type: 'button', onClick: function () { return _this.connect('google'); } },
                        React.createElement("i", { className: 'fa fa-google pull-left' }),
                        resource.connect_google),
                    React.createElement("button", { type: 'button', onClick: function () { return _this.connect('facebook'); } },
                        React.createElement("i", { className: 'fa fa-facebook pull-left' }),
                        resource.connect_facebook),
                    React.createElement("button", { type: 'button', onClick: function () { return _this.connect('twitter'); } },
                        React.createElement("i", { className: 'fa fa-twitter pull-left' }),
                        resource.connect_twitter),
                    React.createElement("button", { type: 'button', onClick: function () { return _this.connect('amazon'); } },
                        React.createElement("i", { className: 'fa fa-amazon pull-left' }),
                        resource.connect_amazon),
                    React.createElement("button", { type: 'button', onClick: function () { return _this.connect('microsoft'); } },
                        React.createElement("i", { className: 'fa fa-windows pull-left' }),
                        resource.connect_microsoft),
                    React.createElement("button", { type: 'button', onClick: function () { return _this.connect('dropbox'); } },
                        React.createElement("i", { className: 'fa fa-dropbox pull-left' }),
                        resource.connect_dropbox),
                    React.createElement("button", { type: 'submit', onClick: function () { return _this.connect(); } },
                        React.createElement("i", { className: 'fa fa-envelope-o pull-left' }),
                        resource.connect_username),
                    React.createElement("button", { type: 'button', className: 'btn-cancel', id: 'btnCancel', name: 'btnCancel', onClick: this.back }, resource.button_back)))));
    };
    return ConnectForm;
}(MessageComponent));
export { ConnectForm };
//# sourceMappingURL=connect-form.js.map