import * as React from 'react';
import 'react-day-picker/lib/style.css';
import { createModel, error } from 'react-onex';
import { useEdit } from 'src/core/hooks/useEdit';
import { formatter } from 'ui-plus';
import { inputEdit, storage } from 'uione';
import { emailOnBlur, phoneOnBlur } from 'uione';
import '../../assets/css//datepicker.css';
import { context } from '../app';
import { Gender } from '../enum/Gender';
import { ModelStatus } from '../enum/ModelStatus';
var createUser = function () {
    var user = createModel();
    user.status = ModelStatus.Active;
    return user;
};
var initialize = function (id, load, set) {
    var masterDataService = context.getMasterDataService();
    Promise.all([
        masterDataService.getTitles(),
        masterDataService.getPositions()
    ]).then(function (values) {
        var titleList = values[0], positionList = values[1];
        set({ titleList: titleList, positionList: positionList }, function () { return load(id); });
    }).catch(function (err) { return error(err, storage.resource().value, storage.alert); });
};
var updateTitle = function (title, user, set) {
    user.title = title;
    user.gender = (user.title === 'Mr' ? Gender.Male : Gender.Female);
    set({ user: user });
};
var initialState = {
    user: {},
    titleList: [],
    positionList: []
};
var param = {
    createModel: createUser,
    initialize: initialize
};
export var UserForm = function (props) {
    var refForm = React.useRef();
    var _a = useEdit(props, refForm, initialState, context.getUserService(), param, inputEdit()), state = _a.state, setState = _a.setState, back = _a.back, flag = _a.flag, updateState = _a.updateState, saveOnClick = _a.saveOnClick, updatePhoneState = _a.updatePhoneState, resource = _a.resource;
    var user = state.user;
    return (React.createElement("div", { className: 'view-container' },
        React.createElement("form", { id: 'userForm', name: 'userForm', "model-name": 'user', ref: refForm },
            React.createElement("header", null,
                React.createElement("button", { type: 'button', id: 'btnBack', name: 'btnBack', className: 'btn-back', onClick: back }),
                React.createElement("h2", null,
                    flag.newMode ? resource.create : resource.edit,
                    " ",
                    resource.user)),
            React.createElement("div", { className: 'row' },
                React.createElement("label", { className: 'col s12 m6' },
                    resource.user_id,
                    React.createElement("input", { type: 'text', id: 'userId', name: 'userId', value: user.userId, readOnly: !flag.newMode, onChange: updateState, maxLength: 20, required: true, placeholder: resource.user_id })),
                React.createElement("label", { className: 'col s12 m6' },
                    resource.display_name,
                    React.createElement("input", { type: 'text', id: 'displayName', name: 'displayName', value: user.displayName, onChange: updateState, maxLength: 40, required: true, placeholder: resource.display_name })),
                React.createElement("label", { className: 'col s12 m6' },
                    resource.person_title,
                    React.createElement("select", { id: 'title', name: 'title', value: user.title, onChange: function (e) { return updateTitle(e.target.value, state.user, setState); } },
                        React.createElement("option", { selected: true, value: '' }, resource.please_select),
                        ")",
                        state.titleList.map(function (item, index) { return (React.createElement("option", { key: index, value: item.value }, item.text)); }))),
                React.createElement("label", { className: 'col s12 m6' },
                    resource.position,
                    React.createElement("select", { id: 'position', name: 'position', value: user.position, onChange: updateState },
                        React.createElement("option", { selected: true, value: '' }, resource.please_select),
                        state.positionList.map(function (item, index) { return (React.createElement("option", { key: index, value: item.value }, item.text)); }))),
                React.createElement("label", { className: 'col s12 m6' },
                    resource.phone,
                    React.createElement("input", { type: 'tel', id: 'phone', name: 'phone', value: formatter.formatPhone(user.phone), onChange: updatePhoneState, onBlur: phoneOnBlur, maxLength: 17, placeholder: resource.phone })),
                React.createElement("label", { className: 'col s12 m6' },
                    resource.email,
                    React.createElement("input", { type: 'text', id: 'email', name: 'email', "data-type": 'email', value: user.email, onChange: updateState, onBlur: emailOnBlur, maxLength: 100, placeholder: resource.email })),
                React.createElement("label", { className: 'col s12 m6' },
                    resource.gender,
                    React.createElement("div", { className: 'radio-group' },
                        React.createElement("label", null,
                            React.createElement("input", { type: 'radio', id: 'gender', name: 'gender', onChange: updateState, disabled: user.title !== 'Dr', value: Gender.Male, checked: user.gender === Gender.Male }),
                            resource.male),
                        React.createElement("label", null,
                            React.createElement("input", { type: 'radio', id: 'gender', name: 'gender', onChange: updateState, disabled: user.title !== 'Dr', value: Gender.Female, checked: user.gender === Gender.Female }),
                            resource.female))),
                React.createElement("div", { className: 'col s12 m6 radio-section' },
                    resource.status,
                    React.createElement("div", { className: 'radio-group' },
                        React.createElement("label", null,
                            React.createElement("input", { type: 'radio', id: 'active', name: 'status', onChange: updateState, value: ModelStatus.Active, checked: user.status === ModelStatus.Active }),
                            resource.yes),
                        React.createElement("label", null,
                            React.createElement("input", { type: 'radio', id: 'inactive', name: 'status', onChange: updateState, value: ModelStatus.Inactive, checked: user.status === ModelStatus.Inactive }),
                            resource.no)))),
            React.createElement("footer", null, !flag.readOnly &&
                React.createElement("button", { type: 'submit', id: 'btnSave', name: 'btnSave', onClick: saveOnClick }, resource.save)))));
};
//# sourceMappingURL=user-form-hook.js.map