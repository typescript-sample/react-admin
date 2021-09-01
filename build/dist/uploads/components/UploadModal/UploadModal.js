import * as React from 'react';
import CropImage from './CropImage';
import Loading from './Loading';
import { dataURLtoFile } from './UploadHook';
var UploadsModal = function (props) {
    var _a = React.useState(null), cropImage = _a[0], setCropImage = _a[1];
    var _b = React.useState(false), select = _b[0], setSelect = _b[1];
    var _c = React.useState(false), isCrop = _c[0], setIsCrop = _c[1];
    var handleSelectFile = function (event) {
        var fileUpload = event.target.files[0];
        if (fileUpload) {
            props.setFile(fileUpload);
        }
    };
    var handleDelete = function () {
        props.setFile(null);
        if (cropImage) {
            setCropImage(null);
            setSelect(null);
            setIsCrop(false);
        }
    };
    var handleSelectCropImage = function () {
        if (cropImage) {
            props.setFile(dataURLtoFile(cropImage, props.file.name));
            setIsCrop(true);
            setSelect(true);
        }
    };
    return (React.createElement("div", { className: 'upload-modal' },
        React.createElement("div", { className: 'frame' },
            React.createElement("div", { className: 'center' }, props.file !== null ? (React.createElement(React.Fragment, null,
                React.createElement("p", { className: 'file-name' }, props.file.name),
                React.createElement("div", { className: 'preview-image' }, (props.file.type === 'image/jpeg' || props.file.type === 'image/png') &&
                    React.createElement("div", null, select ? (React.createElement("img", { className: 'image-cut', src: URL.createObjectURL(props.file), alt: 'file' })) : (React.createElement(React.Fragment, null,
                        React.createElement(CropImage, { image: props.file, setCropImage: setCropImage }),
                        React.createElement("button", { onClick: handleSelectCropImage }, "Select"))))),
                React.createElement("div", { className: 'row btn-area' },
                    props.state.loading ? (React.createElement("div", { className: 'loading col xl5 md5 s5', style: { position: 'relative' } },
                        React.createElement(Loading, null))) : (React.createElement("button", { disabled: props.file.type === 'image' && !isCrop, className: 'btn col xl5 md5 s5', type: 'button', onClick: function () { return props.upload(); } }, "Upload")),
                    React.createElement("button", { disabled: props.state.loading, className: 'btn remove col xl5 md5 s5', type: 'button', onClick: handleDelete }, "Remove")))) : (React.createElement(React.Fragment, null,
                React.createElement("div", { className: 'title' },
                    React.createElement("h1", null, "Drop file to upload")),
                React.createElement("div", { className: 'dropzone' },
                    React.createElement("label", { className: 'area', htmlFor: 'upload' },
                        React.createElement("div", null,
                            React.createElement("img", { alt: 'upload', src: 'http://100dayscss.com/codepen/upload.svg', className: 'upload-icon' }),
                            React.createElement("p", null, "Or Click Here!"),
                            React.createElement("input", { id: 'upload', type: 'file', accept: "*", className: 'upload-input', onChange: handleSelectFile }))))))))));
};
export default UploadsModal;
//# sourceMappingURL=UploadModal.js.map