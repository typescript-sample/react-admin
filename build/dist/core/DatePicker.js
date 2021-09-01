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
import BaseDatePicker from 'react-date-picker';
var DatePicker = /** @class */ (function (_super) {
    __extends(DatePicker, _super);
    function DatePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        _this.onChange = _this.onChange.bind(_this);
        _this.convertToDate = _this.convertToDate.bind(_this);
        return _this;
    }
    DatePicker.prototype.convertToDate = function (date) {
        if (date && date instanceof Date) {
            return date;
        }
        else if (date !== undefined) {
            return new Date(date);
        }
    };
    DatePicker.prototype.onChange = function (date) {
        var _a = this.props, onChangeData = _a.onChangeData, name = _a.name;
        onChangeData(name, date);
    };
    DatePicker.prototype.render = function () {
        var _a = this.props, minDate = _a.minDate, maxDate = _a.maxDate, required = _a.required, name = _a.name, locale = _a.locale, value = _a.value, className = _a.className;
        var start = minDate ? this.convertToDate(minDate) : null;
        var end = maxDate ? this.convertToDate(maxDate) : null;
        var formatedValue = value ? this.convertToDate(value) : null;
        return (React.createElement(BaseDatePicker, { onChange: this.onChange, value: formatedValue, maxDate: end, minDate: start, showLeadingZeros: true, required: required, name: name, locale: locale, className: className }));
    };
    return DatePicker;
}(React.Component));
export { DatePicker };
//# sourceMappingURL=DatePicker.js.map