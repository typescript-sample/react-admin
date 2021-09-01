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
var DropZone = /** @class */ (function (_super) {
    __extends(DropZone, _super);
    function DropZone(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            className: 'drop-zone-hide'
        };
        _this._onDragEnter = _this._onDragEnter.bind(_this);
        _this._onDragLeave = _this._onDragLeave.bind(_this);
        _this._onDragOver = _this._onDragOver.bind(_this);
        _this._onDrop = _this._onDrop.bind(_this);
        return _this;
    }
    DropZone.prototype.componentDidMount = function () {
        window.addEventListener('mouseup', this._onDragLeave);
        window.addEventListener('dragenter', this._onDragEnter);
        window.addEventListener('dragover', this._onDragOver);
        document.getElementById('dragbox').addEventListener('dragleave', this._onDragLeave);
        window.addEventListener('drop', this._onDrop);
    };
    DropZone.prototype.componentWillUnmount = function () {
        window.removeEventListener('mouseup', this._onDragLeave);
        window.removeEventListener('dragenter', this._onDragEnter);
        window.addEventListener('dragover', this._onDragOver);
        document.getElementById('dragbox').removeEventListener('dragleave', this._onDragLeave);
        window.removeEventListener('drop', this._onDrop);
    };
    DropZone.prototype._onDragEnter = function (e) {
        this.setState({ className: 'drop-zone-show' });
        e.stopPropagation();
        e.preventDefault();
        return false;
    };
    DropZone.prototype._onDragOver = function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    };
    DropZone.prototype._onDragLeave = function (e) {
        this.setState({ className: 'drop-zone-hide' });
        e.stopPropagation();
        e.preventDefault();
        return false;
    };
    DropZone.prototype._onDrop = function (e) {
        e.preventDefault();
        var files = e.dataTransfer.files;
        /*   if (files) {
             const fileType = files[0].type;
             const isImage = /^(image)\//i.test(fileType);
             if (isImage) {
               this.props.handle_Drop(files);
             } else {
               console.log('Invalid');
             }
           }*/
        this.props.handle_Drop(e);
        // Upload files
        this.setState({ className: 'drop-zone-hide' });
        return false;
    };
    DropZone.prototype.cloneEvent = function (type, event) {
        var evt = new Event(type);
        return Object.setPrototypeOf(evt, event);
    };
    DropZone.prototype.render = function () {
        return (React.createElement("div", { className: 'box has-advanced-upload' },
            this.props.children,
            React.createElement("div", { id: 'dragbox' })));
    };
    return DropZone;
}(React.Component));
// @ts-ignore
DropZone.propTypes = {
    handle_Drop: PropTypes.func,
};
export default DropZone;
//# sourceMappingURL=DropZone.js.map