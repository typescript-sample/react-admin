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
import * as React from 'react';
import { EditComponent } from 'react-onex';
import { handleError, inputEdit } from 'uione';
import { context } from '../app';
function getPrivilege(id, all) {
    if (!all || !id) {
        return null;
    }
    for (var _i = 0, all_1 = all; _i < all_1.length; _i++) {
        var root = all_1[_i];
        if (root.id === id) {
            return root;
        }
        if (root.children && root.children.length > 0) {
            var m = getPrivilege(id, root.children);
            if (m) {
                return m;
            }
        }
    }
    return null;
}
function containOne(privileges, all) {
    if (!privileges || privileges.length === 0 || !all || all.length === 0) {
        return false;
    }
    for (var _i = 0, all_2 = all; _i < all_2.length; _i++) {
        var m = all_2[_i];
        if (privileges.includes(m.id)) {
            return true;
        }
    }
    return false;
}
function buildAll(privileges, all) {
    for (var _i = 0, all_3 = all; _i < all_3.length; _i++) {
        var root = all_3[_i];
        privileges.push(root.id);
        if (root.children && root.children.length > 0) {
            buildAll(privileges, root.children);
        }
    }
}
function buildPrivileges(id, type, privileges, all) {
    if (type === 'parent') {
        var parent_1 = getPrivilege(id, all);
        var ids_1 = parent_1.children.map(function (i) { return i.id; });
        var ms = privileges.filter(function (i) { return !ids_1.includes(i); });
        if (containOne(privileges, parent_1.children)) {
            return ms;
        }
        else {
            return ms.concat(parent_1.children.map(function (i) { return i.id; }));
        }
    }
    else {
        var checked = true;
        if (privileges && privileges.length > 0) {
            var m = privileges.find(function (item) { return item === id; });
            checked = (m != null);
        }
        else {
            checked = false;
        }
        if (!checked) {
            return privileges.concat([id]);
        }
        else {
            return privileges.filter(function (item) { return item !== id; });
        }
    }
}
function isCheckedAll(privileges, all, setState2) {
    var checkedAll = privileges && all && privileges.length === all.length;
    setState2({ checkedAll: checkedAll });
}
function buildShownModules(keyword, allPrivileges) {
    if (!keyword || keyword === '') {
        return allPrivileges;
    }
    var w = keyword.toLowerCase();
    var shownPrivileges = allPrivileges.map(function (parent) {
        var parentCopy = Object.assign({}, parent);
        if (parentCopy.children) {
            parentCopy.children = parentCopy.children.filter(function (child) { return child.name.toLowerCase().includes(w); });
        }
        return parentCopy;
    }).filter(function (item) { return item.children && item.children.length > 0 || item.name.toLowerCase().includes(w); });
    return shownPrivileges;
}
var RoleForm = /** @class */ (function (_super) {
    __extends(RoleForm, _super);
    function RoleForm(props) {
        var _this = _super.call(this, props, context.getRoleService(), inputEdit()) || this;
        _this.masterDataService = context.getMasterDataService();
        _this.roleService = context.getRoleService();
        _this.handleCheckAll = function (event) {
            var _a = _this.state, role = _a.role, all = _a.all;
            event.persist();
            var checkedAll = event.target.checked;
            role.privileges = (checkedAll ? all : []);
            _this.setState({ role: role, checkedAll: checkedAll });
        };
        _this.handleCheck = function (event) {
            var _a = _this.state, role = _a.role, all = _a.all, allPrivileges = _a.allPrivileges;
            event.persist();
            var target = event.target;
            var id = target.getAttribute('data-id');
            var type = target.getAttribute('data-type');
            role.privileges = buildPrivileges(id, type, role.privileges, allPrivileges);
            _this.setState({ role: role }, function () { return isCheckedAll(role.privileges, all, _this.setState); });
        };
        _this.onChangekeyword = function (event) {
            var keyword = event.target.value;
            var allPrivileges = _this.state.allPrivileges;
            var shownPrivileges = buildShownModules(keyword, allPrivileges);
            _this.setState({ keyword: keyword, shownPrivileges: shownPrivileges });
        };
        _this.renderForms = function (role, modules, parentId, disabled, allPrivileges) {
            if (!modules || modules.length === 0) {
                return '';
            }
            return modules.map(function (m) { return _this.renderForm(role, m, parentId, disabled, allPrivileges); });
        };
        _this.renderForm = function (role, m, parentId, disabled, allPrivileges) {
            if (m.children && m.children.length > 0) {
                var checked = containOne(role.privileges, m.children);
                return (React.createElement("section", { className: 'col s12' },
                    React.createElement("label", { className: 'checkbox-container' },
                        React.createElement("input", { type: 'checkbox', name: 'modules', disabled: disabled, "data-id": m.id, "data-type": 'parent', checked: checked, onChange: _this.handleCheck }),
                        m.name),
                    React.createElement("section", { className: 'row checkbox-group' }, _this.renderForms(role, m.children, m.id, disabled, allPrivileges)),
                    React.createElement("hr", null)));
            }
            else {
                return (React.createElement("label", { className: 'col s6 m4 l3' },
                    React.createElement("input", { type: 'checkbox', name: 'modules', "data-id": m.id, "data-parent": parentId, checked: role.privileges ? (role.privileges.find(function (item) { return item === m.id; }) ? true : false) : false, onChange: _this.handleCheck }),
                    m.name));
            }
        };
        _this.setState = _this.setState.bind(_this);
        _this.patchable = false;
        _this.state = {
            role: _this.createModel(),
            allPrivileges: [],
            shownPrivileges: [],
            keyword: ''
        };
        return _this;
    }
    RoleForm.prototype.load = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                Promise.all([
                    this.roleService.getPrivileges()
                ]).then(function (values) {
                    var allPrivileges = values[0];
                    var all = [];
                    buildAll(all, allPrivileges);
                    _this.setState({ all: all, allPrivileges: allPrivileges, shownPrivileges: allPrivileges }, function () { return _super.prototype.load.call(_this, id); });
                }).catch(handleError);
                return [2 /*return*/];
            });
        });
    };
    RoleForm.prototype.showModel = function (role) {
        var _this = this;
        if (!role) {
            return;
        }
        var all = this.state.all;
        if (!role.privileges) {
            role.privileges = [];
        }
        else {
            role.privileges = role.privileges.map(function (p) { return p.split(' ', 1)[0]; });
        }
        this.setState({ role: role }, function () { return isCheckedAll(role.privileges, all, _this.setState); });
    };
    RoleForm.prototype.render = function () {
        var resource = this.resource;
        var _a = this.state, shownPrivileges = _a.shownPrivileges, allPrivileges = _a.allPrivileges, keyword = _a.keyword, role = _a.role;
        var disabled = (keyword !== '');
        return (React.createElement("div", { className: 'view-container' },
            React.createElement("form", { id: 'roleForm', name: 'roleForm', "model-name": 'role', ref: this.ref },
                React.createElement("header", null,
                    React.createElement("button", { type: 'button', id: 'btnBack', name: 'btnBack', className: 'btn-back', onClick: this.back }),
                    React.createElement("h2", null,
                        this.newMode ? resource.create : resource.edit,
                        " ",
                        resource.role)),
                React.createElement("div", null,
                    React.createElement("section", { className: 'row' },
                        React.createElement("label", { className: 'col s12 m6' },
                            resource.role_id,
                            React.createElement("input", { type: 'text', id: 'roleId', name: 'roleId', value: role.roleId, onChange: this.updateState, maxLength: 20, required: true, readOnly: !this.newMode, placeholder: resource.role_id })),
                        React.createElement("label", { className: 'col s12 m6' },
                            resource.role_name,
                            React.createElement("input", { type: 'text', id: 'roleName', name: 'roleName', value: role.roleName, onChange: this.updateState, maxLength: 255, placeholder: resource.role_name })),
                        React.createElement("label", { className: 'col s12 m6' },
                            resource.remark,
                            React.createElement("input", { type: 'text', id: 'remark', name: 'remark', value: role.remark, onChange: this.updateState, maxLength: 255, placeholder: resource.remark })),
                        React.createElement("div", { className: 'col s12 m6 radio-section' },
                            resource.status,
                            React.createElement("div", { className: 'radio-group' },
                                React.createElement("label", null,
                                    React.createElement("input", { type: 'radio', id: 'active', name: 'status', onChange: this.updateState, value: 'A', checked: role.status === 'A' }),
                                    resource.active),
                                React.createElement("label", null,
                                    React.createElement("input", { type: 'radio', id: 'inactive', name: 'status', onChange: this.updateState, value: 'I', checked: role.status === 'I' }),
                                    resource.inactive)))),
                    React.createElement("h4", null,
                        React.createElement("label", null,
                            React.createElement("input", { type: 'checkbox', value: 'all', disabled: keyword !== '', "data-type": 'all', checked: this.state.checkedAll, onChange: this.handleCheckAll }),
                            resource.all_privileges),
                        React.createElement("label", { className: 'col s12 search-input' },
                            React.createElement("i", { className: 'btn-search' }),
                            React.createElement("input", { type: 'text', id: 'keyword', name: 'keyword', maxLength: 40, placeholder: resource.role_filter_modules, value: keyword, onChange: this.onChangekeyword }))),
                    React.createElement("section", { className: 'row hr-height-1' }, this.renderForms(role, shownPrivileges, '', disabled, allPrivileges))),
                React.createElement("footer", null, !this.readOnly &&
                    React.createElement("button", { type: 'submit', id: 'btnSave', name: 'btnSave', onClick: this.saveOnClick }, resource.save)))));
    };
    return RoleForm;
}(EditComponent));
export { RoleForm };
//# sourceMappingURL=role-form.js.map