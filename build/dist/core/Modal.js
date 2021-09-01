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
import '../myProfile/modal.scss';
var Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    function Modal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Modal.prototype.render = function () {
        if (!this.props.show) {
            return null;
        }
        return (React.createElement("div", { className: 'modal-backdrop fade show' },
            React.createElement("div", { className: 'modal-dialog modal-dialog-centered modal-dialog-log' },
                React.createElement("div", { className: 'modal-content' }, this.props.children))));
    };
    return Modal;
}(React.Component));
// @ts-ignore
Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};
export default Modal;
//# sourceMappingURL=Modal.js.map