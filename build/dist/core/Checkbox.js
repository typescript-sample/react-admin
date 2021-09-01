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
// @ts-ignore
import PropTypes from 'prop-types';
import * as React from 'react';
var Checkbox = /** @class */ (function (_super) {
    __extends(Checkbox, _super);
    function Checkbox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isChecked: false,
        };
        _this.toggleCheckboxChange = function () {
            var _a = _this.props, handleCheckboxChange = _a.handleCheckboxChange, label = _a.label;
            _this.setState(function (_a) {
                var isChecked = _a.isChecked;
                return ({
                    isChecked: !isChecked,
                });
            });
            handleCheckboxChange(label);
        };
        return _this;
    }
    Checkbox.prototype.render = function () {
        var _a = this.props, label = _a.label, isShowLabel = _a.isShowLabel;
        var isChecked = this.state.isChecked;
        return (React.createElement("div", null,
            React.createElement("label", { className: this.props.classNameLabel },
                React.createElement("input", { className: this.props.className, type: 'checkbox', value: label, checked: isChecked, onChange: this.toggleCheckboxChange }),
                isShowLabel && label,
                this.props.children)));
    };
    return Checkbox;
}(React.Component));
// @ts-ignore
Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    isShowLabel: PropTypes.bool,
    className: PropTypes.string,
    classNameLabel: PropTypes.string,
    handleCheckboxChange: PropTypes.func.isRequired,
};
export default Checkbox;
//# sourceMappingURL=Checkbox.js.map