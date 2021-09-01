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
import * as React from 'react';
import { EditComponent } from 'react-onex';
import { handleError, inputEdit, resource as getResource } from 'uione';
import femaleIcon from '../../assets/images/female.png';
import maleIcon from '../../assets/images/male.png';
import { context } from '../app';
import { UsersLookup } from './users-lookup';
var RoleAssignmentForm = /** @class */ (function (_super) {
    __extends(RoleAssignmentForm, _super);
    function RoleAssignmentForm(props) {
        var _this = _super.call(this, props, context.getRoleAssignmentService(), inputEdit()) || this;
        _this.roleService = context.getApprRoleAssignmentService();
        _this.handleUsersDeselect = function (deselectedOptions) {
            var role = _this.state.role;
            var selectedOptions = role.users.slice();
            deselectedOptions.forEach(function (option) {
                selectedOptions.splice(selectedOptions.indexOf(option), 1);
            });
            _this.setState({ role: __assign(__assign({}, role), { users: selectedOptions }) });
        };
        _this.handleUsersSelect = function (selectedOptions) {
            selectedOptions.sort(function (a, b) { return a.id - b.id; });
            var role = _this.state.role;
            _this.setState({ role: __assign(__assign({}, role), { users: selectedOptions }) });
        };
        _this.handleGroupdIdChange = function () {
            var _a = _this.state, roles = _a.roles, role = _a.role;
            var a = roles.filter(function (item) { return item['roleId'] === role.roleId; });
            if (a.length > 0) {
                var selectedRole = a[0];
                var uType = '';
                var setRole = __assign(__assign({}, selectedRole), { userType: uType });
                _this.setState({ role: setRole });
            }
        };
        _this.onSearch = function (event) {
            var _a;
            var role = _this.state.role;
            if (role.users) {
                var result = role.users.filter(function (value) {
                    return value['userId'].includes(event.target.value);
                });
                _this.setState((_a = {}, _a[event.target.name] = event.target.value, _a.roleAssignToUsers = result, _a));
            }
        };
        _this.onModelSave = function (array) {
            var roleAssignToUsers = _this.state.roleAssignToUsers;
            var role = _this.state.role;
            var roles = roleAssignToUsers ? roleAssignToUsers : role.users ? role.users : [];
            array.map(function (value) {
                roles.push(value);
            });
            roleAssignToUsers = roles;
            role.users = roles;
            _this.setState({ role: role, roleAssignToUsers: roleAssignToUsers, isOpenModel: false });
        };
        _this.onModelClose = function () {
            _this.setState({ isOpenModel: false });
        };
        _this.onCheckBox = function (userId) {
            var _a = _this.state, role = _a.role, checkBoxList = _a.checkBoxList;
            if (role.users) {
                var result = role.users.find(function (value) {
                    if (value) {
                        return value.userId === userId;
                    }
                });
                if (result) {
                    var index = checkBoxList.indexOf(result);
                    if (index !== -1) {
                        delete checkBoxList[index];
                    }
                    else {
                        checkBoxList.push(result);
                    }
                }
            }
            _this.setState({ checkBoxList: checkBoxList });
        };
        _this.onShowCheckBox = function () {
            var isShowCheckbox = _this.state.isShowCheckbox;
            if (isShowCheckbox === false) {
                isShowCheckbox = true;
            }
            else {
                isShowCheckbox = false;
            }
            _this.setState({ isShowCheckbox: isShowCheckbox });
        };
        _this.onDeleteCheckBox = function () {
            var r = getResource();
            _this.confirm(r.value('msg_confirm_delete'), r.value('confirm'), function () {
                var _a = _this.state, roleAssignToUsers = _a.roleAssignToUsers, checkBoxList = _a.checkBoxList;
                var role = _this.state.role;
                var roles = roleAssignToUsers ? roleAssignToUsers : role.users ? role.users : [];
                var arr = [];
                roles.map(function (value) {
                    var result = checkBoxList.find(function (v) {
                        if (v) {
                            return v.userId === value.userId;
                        }
                    });
                    if (result === undefined) {
                        arr.push(value);
                    }
                });
                roleAssignToUsers = arr;
                role.users = arr;
                checkBoxList = [];
                _this.setState({ role: role, roleAssignToUsers: roleAssignToUsers, checkBoxList: checkBoxList, isShowCheckbox: false });
            });
        };
        _this.onCheckAll = function () {
            var checkBoxList = _this.state.checkBoxList;
            var role = _this.state.role;
            if (role.users) {
                checkBoxList = role.users;
            }
            _this.setState({ checkBoxList: checkBoxList });
        };
        _this.onUnCheckAll = function () {
            _this.setState({ checkBoxList: [] });
        };
        _this.confirm = _this.confirm.bind(_this);
        _this.state = {
            role: {},
            date: new Date(),
            userTypeList: [],
            roles: [],
            roleAssignToUsers: null,
            textSearch: '',
            isOpenModel: false,
            isShowCheckbox: false,
            checkBoxList: []
        };
        return _this;
    }
    RoleAssignmentForm.prototype.load = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                Promise.all([
                    this.roleService.all()
                ]).then(function (values) {
                    var roles = values[0];
                    _this.setState({ roles: roles }, function () { return _super.prototype.load.call(_this, id); });
                    _this.newMode = false; // ??
                }).catch(handleError);
                return [2 /*return*/];
            });
        });
    };
    RoleAssignmentForm.prototype.render = function () {
        var _this = this;
        var resource = this.resource;
        var _a = this.state, role = _a.role, roleAssignToUsers = _a.roleAssignToUsers, roles = _a.roles, isOpenModel = _a.isOpenModel, isShowCheckbox = _a.isShowCheckbox, checkBoxList = _a.checkBoxList;
        var resultRoleAssignToUsers = roleAssignToUsers ? roleAssignToUsers : role.users ? role.users : [];
        return (React.createElement("div", { className: 'view-container' },
            React.createElement("form", { id: 'roleAssignmentForm', name: 'roleAssignmentForm', "model-name": 'role', ref: this.ref },
                React.createElement("header", null,
                    React.createElement("button", { type: 'button', id: 'btnBack', name: 'btnBack', className: 'btn-back', onClick: this.back }),
                    React.createElement("h2", null,
                        this.newMode ? resource.create : resource.edit,
                        " ",
                        resource.role_assignment_subject)),
                React.createElement("div", null,
                    React.createElement("section", { className: 'row' },
                        React.createElement("h4", null, resource.role_assignment_subject),
                        React.createElement("label", { className: 'col s12 m6' },
                            resource.role_id,
                            React.createElement("select", { id: 'roleId', name: 'roleId', defaultValue: '', required: true, value: role.roleId, disabled: !this.newMode, onChange: function (e) {
                                    _this.updateState(e, _this.handleGroupdIdChange);
                                } },
                                React.createElement("option", { selected: true, value: '' }, resource.please_select),
                                roles.map(function (item, index) { return (React.createElement("option", { key: index, value: item.roleId }, item.roleId)); }))),
                        React.createElement("label", { className: 'col s12 m6' },
                            resource.role_name,
                            React.createElement("input", { type: 'text', id: 'roleName', name: 'roleName', value: role.roleName || '', onChange: this.updateState, maxLength: 255, placeholder: resource.role_name, disabled: true })),
                        React.createElement("label", { className: 'col s12 m6' },
                            resource.description,
                            React.createElement("input", { type: 'text', id: 'remark', name: 'remark', value: role.remark || '', onChange: this.updateState, maxLength: 255, placeholder: resource.description, disabled: true }))),
                    React.createElement("section", { className: 'row detail' },
                        React.createElement("h4", null,
                            resource.user,
                            React.createElement("div", { className: 'btn-group' },
                                !this.readOnly && React.createElement("button", { type: 'button', onClick: function () { return _this.setState({ isOpenModel: true }); } }, resource.add),
                                !this.readOnly && React.createElement("button", { type: 'button', onClick: this.onShowCheckBox }, isShowCheckbox ? resource.deselect : resource.select),
                                isShowCheckbox ? React.createElement("button", { type: 'button', onClick: this.onCheckAll }, resource.check_all) : '',
                                isShowCheckbox ? React.createElement("button", { type: 'button', onClick: this.onUnCheckAll }, resource.uncheck_all) : '',
                                isShowCheckbox ? React.createElement("button", { type: 'button', onClick: this.onDeleteCheckBox }, resource.delete) : '')),
                        !this.readOnly &&
                            React.createElement("label", { className: 'col s12 search-input' },
                                React.createElement("i", { className: 'btn-search' }),
                                React.createElement("input", { type: 'text', id: 'textSearch', name: 'textSearch', onChange: this.onSearch, value: this.state.textSearch, maxLength: 40, placeholder: resource.role_assignment_search_user })),
                        React.createElement("ul", { className: 'row list-view' }, resultRoleAssignToUsers && resultRoleAssignToUsers.map(function (value, i) {
                            var result = checkBoxList.find(function (v) {
                                if (v) {
                                    return v.userId === value.userId;
                                }
                            });
                            return (React.createElement("li", { key: i, className: 'col s12 m6 l4 xl3', onClick: isShowCheckbox === true ? function () { return _this.onCheckBox(value.userId); } : function () { } },
                                React.createElement("section", null,
                                    isShowCheckbox === true ? React.createElement("input", { type: 'checkbox', name: 'selected', checked: result ? true : false }) : '',
                                    React.createElement("img", { src: value.gender === 'F' ? femaleIcon : maleIcon, className: 'round-border' }),
                                    React.createElement("div", null,
                                        React.createElement("h3", null, value.userId),
                                        React.createElement("p", null,
                                            value.firstName,
                                            " ",
                                            value.lastName)),
                                    React.createElement("button", { className: 'btn-detail' }))));
                        })))),
                React.createElement("footer", null, !this.readOnly &&
                    React.createElement("button", { type: 'submit', id: 'btnSave', name: 'btnSave', onClick: this.saveOnClick }, resource.save))),
            React.createElement(UsersLookup, { location: this.props.location, history: this.props.history, props: this.props['props'], isOpenModel: isOpenModel, onModelClose: this.onModelClose, onModelSave: this.onModelSave, roleAssignToUsers: resultRoleAssignToUsers })));
    };
    return RoleAssignmentForm;
}(EditComponent));
export { RoleAssignmentForm };
//# sourceMappingURL=role-assignment-form.js.map