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
import axios from 'axios';
import { HttpRequest } from 'axios-core';
import * as React from 'react';
import { BaseComponent, navigate } from 'react-onex';
import PageSizeSelect from 'react-page-size-select';
import { Link } from 'react-router-dom';
import { getLocale, handleError, removeError, storage } from 'uione';
import { options } from 'uione';
import { isArray } from 'util';
import logoTitle from '../assets/images/logo-title.png';
import logo from '../assets/images/logo.png';
import topBannerLogo from '../assets/images/top-banner-logo.png';
import config from '../config';
var DefaultWrapper = /** @class */ (function (_super) {
    __extends(DefaultWrapper, _super);
    function DefaultWrapper(props) {
        var _this = _super.call(this, props, getLocale, removeError) || this;
        _this.resource = {};
        _this.pageSize = 20;
        _this.pageSizes = [10, 20, 40, 60, 100, 200, 400, 10000];
        _this.pageSizeChanged = function (event) { };
        _this.clearKeyworkOnClick = function () {
            _this.setState({
                keyword: '',
            });
        };
        _this.activeWithPath = function (path, isParent, features) {
            if (isParent && features && isArray(features)) {
                var hasChildLink = features.some(function (item) { return _this.props.location.pathname.startsWith(item['link']); });
                return path && _this.props.location.pathname.startsWith(path) && hasChildLink ? 'active' : '';
            }
            return path && _this.props.location.pathname.startsWith(path) ? 'active' : '';
        };
        _this.toggleMenuItem = function (event) {
            event.preventDefault();
            var target = event.currentTarget;
            var currentTarget = event.currentTarget;
            var elI = currentTarget.querySelectorAll('.menu-item > i')[1];
            if (elI) {
                if (elI.classList.contains('down')) {
                    elI.classList.remove('down');
                    elI.classList.add('up');
                }
                else {
                    if (elI.classList.contains('up')) {
                        elI.classList.remove('up');
                        elI.classList.add('down');
                    }
                }
            }
            if (currentTarget.nextElementSibling) {
                currentTarget.nextElementSibling.classList.toggle('expanded');
            }
            if (target.nodeName === 'A') {
                target = target.parentElement;
            }
            if (target.nodeName === 'LI') {
                target.classList.toggle('open');
            }
        };
        _this.searchOnClick = function () { };
        _this.toggleSearch = function () {
            _this.setState(function (prev) { return ({ isToggleSearch: !prev.isToggleSearch }); });
        };
        _this.toggleMenu = function (e) {
            e.preventDetault();
            _this.setState(function (prev) { return ({ isToggleMenu: !prev.isToggleMenu }); });
        };
        _this.toggleSidebar = function () {
            _this.setState(function (prev) { return ({ isToggleSidebar: !prev.isToggleSidebar }); });
        };
        _this.toggleProfile = function () {
            _this.setState(function (prevState) {
                return { classProfile: prevState.classProfile === 'show' ? '' : 'show' };
            });
        };
        _this.signout = function (event) { return __awaiter(_this, void 0, void 0, function () {
            var httpRequest, url, success, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.preventDefault();
                        httpRequest = new HttpRequest(axios, options);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        url = config.authenticationUrl + '/authentication/signout/' + storage.username();
                        return [4 /*yield*/, httpRequest.get(url)];
                    case 2:
                        success = _a.sent();
                        if (success) {
                            sessionStorage.setItem('authService', null);
                            sessionStorage.clear();
                            storage.setUser(null);
                            navigate(this.props.history, '');
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        handleError(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this.viewMyprofile = function (e) {
            e.preventDefault();
            navigate(_this.props.history, '/my-profile');
        };
        _this.viewMySetting = function (e) {
            e.preventDefault();
            navigate(_this.props.history, '/my-profile/my-settings');
        };
        _this.viewChangePassword = function (e) {
            e.preventDefault();
            navigate(_this.props.history, '/auth/change-password');
        };
        _this.renderForms = function (features, isPinnedModules) {
            if (isPinnedModules === void 0) { isPinnedModules = false; }
            return features.map(function (feature, index) {
                return _this.renderForm(index, feature, isPinnedModules);
            });
        };
        _this.renderForm = function (key, module, isPinnedModules) {
            if (isPinnedModules === void 0) { isPinnedModules = false; }
            var name = !_this.resource[module.resource] || _this.resource[module.resource] === '' ? module.name : _this.resource[module.resource];
            // if (module.status !== 'A') {
            //   return (null);
            // }
            if (module.children && Array.isArray(module.children)) {
                var className = !module.icon || module.icon === '' ? 'settings' : module.icon;
                var link = module.path;
                var features = module.children;
                return (React.createElement("li", { key: key, className: 'open ' + _this.activeWithPath(link, true, features) },
                    React.createElement("a", { className: 'menu-item', onClick: function (e) {
                            _this.toggleMenuItem(e);
                        } },
                        React.createElement("button", { type: 'button', className: "btn-pin " + (isPinnedModules ? 'pinned' : ''), onClick: function (event) { return _this.pinModulesHandler(event, key, module.sequence); } }),
                        React.createElement("i", { className: 'material-icons' }, className),
                        React.createElement("span", null, name),
                        React.createElement("i", { className: 'entity-icon down' })),
                    React.createElement("ul", { className: 'list-child' }, _this.renderForms(features))));
            }
            else {
                var className = !module.icon || module.icon === '' ? 'settings' : module.icon;
                return (React.createElement("li", { key: key, className: _this.activeWithPath(module.path, false) },
                    React.createElement(Link, { to: module.path },
                        React.createElement("i", { className: 'material-icons' }, className),
                        React.createElement("span", null, name))));
            }
        };
        _this.onMouseHover = function (e) {
            e.preventDefault();
            var sysBody = window.sysBody;
            if (sysBody.classList.contains('top-menu') && window.innerWidth > 768) {
                var navbar = Array.from(document.querySelectorAll('.sidebar>nav>ul>li>ul.expanded'));
                var icons = Array.from(document.querySelectorAll('.sidebar>nav>ul>li>a>i.up'));
                if (navbar.length > 0) {
                    for (var i = 0; i < navbar.length; i++) {
                        navbar[i].classList.toggle('expanded');
                        if (icons[i]) {
                            icons[i].className = 'entity-icon down';
                        }
                    }
                }
            }
        };
        _this.onShowAllMenu = function (e) {
            e.preventDefault();
            var sysBody = window.sysBody;
            if (sysBody.classList.contains('top-menu2')) {
                var navbar = Array.from(document.querySelectorAll('.sidebar>nav>ul>li>ul.list-child'));
                var icons = Array.from(document.querySelectorAll('.sidebar>nav>ul>li>a>i.down'));
                if (navbar.length > 0) {
                    var i = 0;
                    for (i = 0; i < navbar.length; i++) {
                        navbar[i].className = 'list-child expanded';
                        if (icons[i]) {
                            icons[i].className = 'entity-icon up';
                        }
                    }
                }
            }
        };
        _this.onHideAllMenu = function (e) {
            e.preventDefault();
            var sysBody = window.sysBody;
            if (sysBody.classList.contains('top-menu2')) {
                var navbar = Array.from(document.querySelectorAll('.sidebar>nav>ul>li>ul.expanded'));
                var icons = Array.from(document.querySelectorAll('.sidebar>nav>ul>li>a>i.up'));
                if (navbar.length > 0) {
                    var i = 0;
                    for (i = 0; i < navbar.length; i++) {
                        navbar[i].className = 'list-child';
                        if (icons[i]) {
                            icons[i].className = 'entity-icon down';
                        }
                    }
                }
            }
        };
        _this.resource = storage.resource().resource();
        _this.renderForm = _this.renderForm.bind(_this);
        _this.renderForms = _this.renderForms.bind(_this);
        // this.menuItemOnBlur = this.menuItemOnBlur.bind(this);
        _this.state = {
            pageSizes: [10, 20, 40, 60, 100, 200, 400, 10000],
            pageSize: 10,
            authenticationService: undefined,
            se: {},
            keyword: '',
            classProfile: '',
            isToggleMenu: false,
            isToggleSidebar: false,
            isToggleSearch: false,
            forms: [],
            username: '',
            userType: '',
            pinnedModules: [],
        };
        _this.httpRequest = new HttpRequest(axios, options);
        return _this;
    }
    DefaultWrapper.prototype.componentWillMount = function () {
        // TODO : TB temporary fix form service null .
        /*
        if (!this.formService) {
          this.formService = new FormServiceImpl();
        }
        this.formService.getMyForm().subscribe(forms => {
          if (forms) {
            this.setState({ forms });
          } else {
            logger.warn('DefaultWrapper:  cannot load form from cache , re direct');
            this.props.history.push('/');
          }
        });
        */
        var forms = storage.privileges();
        this.setState({ forms: forms });
        var username = storage.username();
        var storageRole = storage.getUserType();
        if (username || storageRole) {
            this.setState({ username: username, userType: storageRole });
        }
    };
    DefaultWrapper.prototype.pinModulesHandler = function (event, index, moduleSequence) {
        event.stopPropagation();
        var _a = this.state, forms = _a.forms, pinnedModules = _a.pinnedModules;
        if (forms.find(function (module) { return module.sequence === moduleSequence; })) {
            var removedModule = forms.splice(index, 1);
            pinnedModules.push(removedModule[0]);
            forms.sort(function (moduleA, moduleB) { return moduleA.sequence - moduleB.sequence; });
            this.setState({ forms: forms, pinnedModules: pinnedModules });
        }
        else {
            var removedModule = pinnedModules.splice(index, 1);
            forms.push(removedModule[0]);
            forms.sort(function (moduleA, moduleB) { return moduleA.sequence - moduleB.sequence; });
            this.setState({ forms: forms, pinnedModules: pinnedModules });
        }
    };
    DefaultWrapper.prototype.render = function () {
        var pageSize = this.pageSize;
        var pageSizes = this.pageSizes;
        var children = this.props.children;
        var _a = this.state, isToggleSidebar = _a.isToggleSidebar, isToggleMenu = _a.isToggleMenu, isToggleSearch = _a.isToggleSearch, userType = _a.userType, username = _a.username;
        var topClassList = ['sidebar-parent'];
        if (isToggleSidebar) {
            topClassList.push('sidebar-off');
        }
        if (isToggleMenu) {
            topClassList.push('menu-on');
        }
        if (isToggleSearch) {
            topClassList.push('search');
        }
        var topClass = topClassList.join(' ');
        var user = storage.user();
        return (React.createElement("div", { className: topClass },
            React.createElement("div", { className: 'top-banner' },
                React.createElement("div", { className: 'logo-banner-wrapper' },
                    React.createElement("img", { src: topBannerLogo, alt: 'Logo of The Company' }),
                    React.createElement("img", { src: logoTitle, className: 'banner-logo-title', alt: 'Logo of The Company' }))),
            React.createElement("div", { className: 'menu sidebar' },
                React.createElement("nav", null,
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("a", { className: 'toggle-menu', onClick: this.toggleMenu }),
                            React.createElement("p", { className: 'sidebar-off-menu' },
                                React.createElement("i", { className: 'toggle', onClick: this.toggleSidebar }),
                                !isToggleSidebar ? React.createElement("i", { className: 'expand', onClick: this.onShowAllMenu }) : null,
                                !isToggleSidebar ? React.createElement("i", { className: 'collapse', onClick: this.onHideAllMenu }) : null)),
                        this.renderForms(this.state.pinnedModules, true),
                        this.renderForms(this.state.forms)))),
            React.createElement("div", { className: 'page-container' },
                React.createElement("div", { className: 'page-header' },
                    React.createElement("form", null,
                        React.createElement("div", { className: 'search-group' },
                            React.createElement("section", null,
                                React.createElement("button", { type: 'button', className: 'toggle-menu', onClick: this.toggleMenu }),
                                React.createElement("button", { type: 'button', className: 'toggle-search', onClick: this.toggleSearch }),
                                React.createElement("button", { type: 'button', className: 'close-search', onClick: this.toggleSearch })),
                            React.createElement("div", { className: 'logo-wrapper' },
                                React.createElement("img", { className: 'logo', src: logo, alt: 'Logo of The Company' })),
                            React.createElement("label", { className: 'search-input' },
                                React.createElement(PageSizeSelect, { pageSize: pageSize, pageSizes: pageSizes, onPageSizeChanged: this.pageSizeChanged }),
                                React.createElement("input", { type: 'text', id: 'keyword', name: 'keyword', value: this.state.keyword, onChange: this.updateState, maxLength: 1000, placeholder: this.resource.keyword }),
                                React.createElement("button", { type: 'button', hidden: !this.state.keyword, className: 'btn-remove-text', onClick: this.clearKeyworkOnClick }),
                                React.createElement("button", { type: 'submit', className: 'btn-search', onClick: this.searchOnClick })),
                            React.createElement("section", null,
                                React.createElement("div", { className: 'dropdown-menu-profile' },
                                    (!user || !user.imageURL) && (React.createElement("i", { className: 'material-icons', onClick: this.toggleProfile }, "person")),
                                    React.createElement("ul", { id: 'dropdown-basic', className: this.state.classProfile + ' dropdown-content-profile' },
                                        React.createElement("li", null,
                                            React.createElement("label", null,
                                                "User Name: ",
                                                username,
                                                " "),
                                            React.createElement("br", null),
                                            React.createElement("label", null,
                                                "Role : ",
                                                userType === 'M' ? 'Maker' : 'Checker',
                                                " ")),
                                        React.createElement("hr", { style: { margin: 0 } }),
                                        React.createElement("li", null,
                                            React.createElement("a", { className: 'dropdown-item-profile', onClick: this.signout }, this.resource.button_signout)))))))),
                React.createElement("div", { className: 'page-body' }, children))));
    };
    return DefaultWrapper;
}(BaseComponent));
export default DefaultWrapper;
export var WithDefaultProps = function (Component) { return function (props) {
    return React.createElement(Component, { props: props, history: props.history });
}; };
//# sourceMappingURL=default.js.map