import * as React from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
export default function CropImage(props) {
    var _a, _b;
    var _c = React.useState(), upImg = _c[0], setUpImg = _c[1];
    var imgRef = React.useRef(null);
    var previewCanvasRef = React.useRef(null);
    var _d = React.useState({ unit: '%', width: 30, aspect: 16 / 9 }), crop = _d[0], setCrop = _d[1];
    var _e = React.useState(null), completedCrop = _e[0], setCompletedCrop = _e[1];
    React.useEffect(function () {
        onSelectFile(props.image);
    }, []);
    var onSelectFile = function (file) {
        var reader = new FileReader();
        reader.addEventListener('load', function () { return setUpImg(reader.result); });
        reader.readAsDataURL(file);
    };
    var onLoad = React.useCallback(function (img) {
        imgRef.current = img;
    }, []);
    React.useEffect(function () {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }
        var image = imgRef.current;
        var canvas = previewCanvasRef.current;
        var scaleX = image.naturalWidth / image.width;
        var scaleY = image.naturalHeight / image.height;
        var ctx = canvas.getContext('2d');
        var pixelRatio = window.devicePixelRatio;
        canvas.width = completedCrop.width * pixelRatio;
        canvas.height = completedCrop.height * pixelRatio;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(image, completedCrop.x * scaleX, completedCrop.y * scaleY, completedCrop.width * scaleX, completedCrop.height * scaleY, 0, 0, completedCrop.width, completedCrop.height);
        var imagee = new Image();
        imagee.src = canvas.toDataURL();
        props.setCropImage(imagee.src);
    }, [completedCrop]);
    return (React.createElement("div", { className: 'Crop-Image' },
        React.createElement(ReactCrop, { src: upImg, onImageLoaded: onLoad, crop: crop, onChange: function (c) { return setCrop(c); }, onComplete: function (c) { return setCompletedCrop(c); } }),
        React.createElement("div", { style: { display: 'none' } },
            React.createElement("canvas", { ref: previewCanvasRef, style: {
                    width: Math.round((_a = completedCrop === null || completedCrop === void 0 ? void 0 : completedCrop.width) !== null && _a !== void 0 ? _a : 0),
                    height: Math.round((_b = completedCrop === null || completedCrop === void 0 ? void 0 : completedCrop.height) !== null && _b !== void 0 ? _b : 0)
                } }))));
}
//# sourceMappingURL=CropImage.js.map