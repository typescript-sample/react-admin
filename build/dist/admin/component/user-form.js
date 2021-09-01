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
import 'react-day-picker/lib/style.css';
import { buildId, EditComponent } from 'react-onex';
import { setValue } from 'reflectx';
import { formatter } from 'ui-plus';
import { getDateFormat, handleError, initForm, inputEdit, registerEvents } from 'uione';
import { emailOnBlur, phoneOnBlur } from 'uione';
import '../../assets/css//datepicker.css';
import { context } from '../app';
import { Gender } from '../enum/Gender';
import { ModelStatus } from '../enum/ModelStatus';
var UserForm = /** @class */ (function (_super) {
    __extends(UserForm, _super);
    function UserForm(props) {
        var _this = _super.call(this, props, context.getUserService(), inputEdit()) || this;
        _this.dateFormat = getDateFormat();
        _this.masterDataService = context.getMasterDataService();
        _this.updateDayPicker = _this.updateDayPicker.bind(_this);
        _this.state = {
            user: _this.createModel(),
            titleList: [],
            positionList: [],
            selectedDay: undefined,
        };
        return _this;
    }
    UserForm.prototype.getKeyValue = function (objs, key, value) {
        return objs.map(function (item) {
            return { value: item[key], text: item[value] };
        });
    };
    UserForm.prototype.componentDidMount = function () {
        this.form = initForm(this.ref.current, registerEvents);
        var id = buildId(this.props, this.keys);
        this.init(id);
    };
    UserForm.prototype.init = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                Promise.all([
                    this.masterDataService.getTitles(),
                    this.masterDataService.getPositions()
                ]).then(function (values) {
                    var titleList = values[0], positionList = values[1];
                    _this.setState({
                        titleList: titleList,
                        positionList: positionList
                    }, function () { return _this.load(id); });
                }).catch(handleError);
                return [2 /*return*/];
            });
        });
    };
    /*
    async load(_id: number) {
      const id: any = _id;
      const com = this;
      if (id != null && id !== '') {
        try {
          this.running = true;
          if (this.loading) {
            this.loading.showLoading();
          }
          const ctx: any = {};
          const obj = await this.service.load(id, ctx);
          if (!obj) {
            com.handleNotFound(com.form);
          } else {
            com.resetState(false, obj, clone(obj));
          }
        } catch (err) {
          const data = err && err.response ? err.response : err;
          if (data) {
            const status = data.status;
            if (status == 404) {
  
            }
          }
          handleError(err);
        } finally {
          com.running = false;
          if (this.loading) {
            this.loading.hideLoading();
          }
        }
      } else {
        // Call service state
        const obj = this.createModel();
        this.resetState(true, obj, null);
      }
    }
  */
    UserForm.prototype.loadGender = function (user) {
        user = user === undefined ? this.state.user : user;
        if (user.title === 'Mr') {
            this.setState({ user: __assign(__assign({}, user), { gender: Gender.Male }) });
        }
        else {
            this.setState({ user: __assign(__assign({}, user), { gender: Gender.Female }) });
        }
    };
    UserForm.prototype.createModel = function () {
        var user = _super.prototype.createModel.call(this);
        user.status = ModelStatus.Active;
        return user;
    };
    UserForm.prototype.updateDayPicker = function (day, dayModifiers, dayPickerInput) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        var ctr = dayPickerInput;
        var props = ctr.props;
        var value = ctr.state.value;
        var input = ctr.getInput();
        var form = input.form;
        var modelName = form.getAttribute('model-name');
        var state = this.state[modelName];
        var dataField = props['data-field'];
        if (!dataField && input.parentElement.classList.contains('DayPickerInput')) {
            var label = input.parentElement.parentElement;
            dataField = label.getAttribute('data-field');
        }
        var valueSplit = value.split('/');
        var date = new Date(valueSplit[2], valueSplit[0] - 1, valueSplit[1]);
        if (props.setGlobalState) {
            var data = props.shouldBeCustomized ? this.prepareCustomData((_a = {}, _a[dataField] = date, _a)) : (_b = {}, _b[dataField] = date, _b);
            props.setGlobalState((_c = {}, _c[modelName] = __assign(__assign({}, state), data), _c));
        }
        else {
            if (form) {
                if (modelName && modelName !== '') {
                    if (dataField.indexOf('.') !== -1) {
                        var arrSplit = dataField.split('.');
                        var obj = __assign(__assign({}, state[arrSplit[0]]), (_d = {}, _d[arrSplit[1]] = date, _d));
                        this.setState((_e = {}, _e[modelName] = __assign(__assign({}, state), (_f = {}, _f[arrSplit[0]] = obj, _f)), _e));
                    }
                    else {
                        this.setState((_g = {}, _g[modelName] = __assign(__assign({}, state), (_h = {}, _h[dataField] = date, _h)), _g));
                    }
                }
                else {
                    if (dataField.indexOf('.') > 0) {
                        var split = dataField.split('.');
                        var dateObj = this.state[split[0]];
                        var indexdot = dataField.indexOf('.');
                        var subrightdatafield = dataField.substring(indexdot, dataField.length);
                        setValue(dateObj, subrightdatafield, date);
                    }
                    else {
                        this.setState((_j = {}, _j[dataField] = date, _j));
                    }
                }
            }
        }
    };
    UserForm.prototype.render = function () {
        var _this = this;
        var resource = this.resource;
        var user = this.state.user;
        var _a = this.state, titleList = _a.titleList, positionList = _a.positionList;
        return (React.createElement("div", { className: 'view-container' },
            React.createElement("form", { id: 'userForm', name: 'userForm', "model-name": 'user', ref: this.ref },
                React.createElement("header", null,
                    React.createElement("button", { type: 'button', id: 'btnBack', name: 'btnBack', className: 'btn-back', onClick: this.back }),
                    React.createElement("h2", null,
                        this.newMode ? resource.create : resource.edit,
                        " ",
                        resource.user)),
                React.createElement("div", { className: 'row' },
                    React.createElement("label", { className: 'col s12 m6' },
                        resource.user_id,
                        React.createElement("input", { type: 'text', id: 'userId', name: 'userId', value: user.userId, readOnly: !this.newMode, onChange: this.updateState, maxLength: 20, required: true, placeholder: resource.user_id })),
                    React.createElement("label", { className: 'col s12 m6' },
                        resource.person_title,
                        React.createElement("select", { id: 'title', name: 'title', value: user.title, onChange: function (e) {
                                _this.updateState(e, _this.loadGender);
                            } },
                            React.createElement("option", { selected: true, value: '' }, resource.please_select),
                            ")",
                            titleList.map(function (item, index) { return (React.createElement("option", { key: index, value: item.value }, item.text)); }))),
                    React.createElement("label", { className: 'col s12 m6' },
                        resource.gender,
                        React.createElement("div", { className: 'radio-group' },
                            React.createElement("label", null,
                                React.createElement("input", { type: 'radio', id: 'gender', name: 'gender', onChange: this.updateState, disabled: user.title !== 'Dr', value: Gender.Male, checked: user.gender === Gender.Male }),
                                resource.male),
                            React.createElement("label", null,
                                React.createElement("input", { type: 'radio', id: 'gender', name: 'gender', onChange: this.updateState, disabled: user.title !== 'Dr', value: Gender.Female, checked: user.gender === Gender.Female }),
                                resource.female))),
                    React.createElement("label", { className: 'col s12 m6' },
                        resource.position,
                        React.createElement("select", { id: 'position', name: 'position', value: user.position, onChange: this.updateState },
                            React.createElement("option", { selected: true, value: '' }, resource.please_select),
                            ")",
                            positionList.map(function (item, index) { return (React.createElement("option", { key: index, value: item.value }, item.text)); }))),
                    React.createElement("label", { className: 'col s12 m6' },
                        resource.phone,
                        React.createElement("input", { type: 'tel', id: 'phone', name: 'phone', value: formatter.formatPhone(user.phone), onChange: this.updatePhoneState, onBlur: phoneOnBlur, maxLength: 17, placeholder: resource.phone })),
                    React.createElement("label", { className: 'col s12 m6' },
                        resource.email,
                        React.createElement("input", { type: 'text', id: 'email', name: 'email', "data-type": 'email', value: user.email, onChange: this.updateState, onBlur: emailOnBlur, maxLength: 100, placeholder: resource.email })),
                    React.createElement("div", { className: 'col s12 m6 radio-section' },
                        resource.user_activate,
                        React.createElement("div", { className: 'radio-group' },
                            React.createElement("label", null,
                                React.createElement("input", { type: 'radio', id: 'active', name: 'status', onChange: this.updateState, value: ModelStatus.Active, checked: user.status === ModelStatus.Active }),
                                resource.yes),
                            React.createElement("label", null,
                                React.createElement("input", { type: 'radio', id: 'inactive', name: 'status', onChange: this.updateState, value: ModelStatus.Inactive, checked: user.status === ModelStatus.Inactive }),
                                resource.no)))),
                React.createElement("footer", null, !this.readOnly &&
                    React.createElement("button", { type: 'submit', id: 'btnSave', name: 'btnSave', onClick: this.saveOnClick }, resource.save)))));
    };
    return UserForm;
}(EditComponent));
export { UserForm };
//# sourceMappingURL=user-form.js.map