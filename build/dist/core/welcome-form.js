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
import * as React from 'react';
import { Link } from 'react-router-dom';
import { privileges, storage } from 'uione';
import './welcome-form.css';
var WelcomeForm = /** @class */ (function (_super) {
    __extends(WelcomeForm, _super);
    function WelcomeForm(props) {
        var _this = _super.call(this, props) || this;
        _this.resource = {};
        _this.renderForms = function (forms) {
            return forms.map(function (form, idx) {
                return _this.renderForm(form, idx);
            });
        };
        _this.renderForm = function (feature, idx) {
            var resourceKey = _this.resource[feature.resource];
            var name = !resourceKey || resourceKey.length === 0 ? feature.name : _this.resource[feature.resource];
            if (feature.children && Array.isArray(feature.children)) {
                var className = !feature.icon || feature.icon.length === 0 ? 'settings' : feature.icon;
                var features = feature.children;
                return (React.createElement("label", { className: 'col s12 m12', key: idx },
                    React.createElement("i", { className: className + ' menu-type' }),
                    React.createElement("span", { className: 'menu-type' }, name),
                    React.createElement("div", null,
                        React.createElement("i", { className: 'material-icons menu-type' }, className),
                        React.createElement("span", { className: 'menu-type' }, name)),
                    React.createElement("ul", { className: 'menu-ul' }, _this.renderForms(features)),
                    React.createElement("hr", null)));
            }
            else {
                var className = !feature.icon || feature.icon.length === 0 ? 'settings' : feature.icon;
                return (React.createElement("label", { className: 'col s6 m6 l3 welcome-span', key: idx },
                    React.createElement(Link, { to: feature.path },
                        React.createElement("div", null,
                            React.createElement("i", { className: 'material-icons' }, className),
                            React.createElement("span", null, name)))));
            }
        };
        _this.resource = storage.resource().resource();
        _this.state = {
            forms: [],
        };
        return _this;
    }
    WelcomeForm.prototype.componentWillMount = function () {
        var forms = privileges();
        this.setState({ forms: forms });
    };
    WelcomeForm.prototype.render = function () {
        var resource = this.resource;
        return (React.createElement("div", { className: 'view-container' },
            React.createElement("header", null,
                React.createElement("h2", { className: 'label' }, resource.welcome_title)),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement(React.Fragment, null,
                React.createElement("section", { className: 'row welcome hr-height-1' }, this.renderForms(this.state.forms)))));
    };
    return WelcomeForm;
}(React.Component));
export { WelcomeForm };
//# sourceMappingURL=welcome-form.js.map