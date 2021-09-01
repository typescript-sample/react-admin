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
import Uploads from 'src/uploads/components/UploadModal/UploadContainer';
import './app.scss';
import DragDrop from './components/DragDrop';
import { deleteFile, deleteFileYoutube, fetchImageUploaded, getUser, uploadVideoYoutube } from './service';
var UploadFile = function () {
    var _a = React.useState(), filesUploaded = _a[0], setFilesUploaded = _a[1];
    var _b = React.useState(''), videoIdInput = _b[0], setVideoIdInput = _b[1];
    React.useEffect(function () {
        handleFetch();
    }, []);
    var handleFetch = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchImageUploaded()];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, getUser()];
                case 2:
                    user = _a.sent();
                    setFilesUploaded(res);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleDeleteFile = function (url, source) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(source === 'youtube')) return [3 /*break*/, 3];
                    return [4 /*yield*/, deleteFileYoutube(url)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, handleFetch()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 3: return [4 /*yield*/, deleteFile(url)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, handleFetch()];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var handleInput = function (e) {
        setVideoIdInput(e.target.value);
    };
    var handleAddVideoYoutube = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (videoIdInput !== '') {
                uploadVideoYoutube(videoIdInput).then(function (r) {
                    setVideoIdInput('');
                });
            }
            return [2 /*return*/];
        });
    }); };
    return (React.createElement("div", { className: 'container' },
        React.createElement("div", { className: 'row' },
            React.createElement("div", { className: 'col xl4 l5 m12 s12' },
                React.createElement("div", { style: { textAlign: 'center' } },
                    React.createElement(Uploads, { handleFetch: handleFetch }),
                    React.createElement("div", { className: 'youtube-add' },
                        React.createElement("input", { onChange: handleInput, value: videoIdInput, className: 'input-video-id', type: 'type', placeholder: 'Input youtube video id' }),
                        React.createElement("button", { className: 'btn-add-youtube', onClick: handleAddVideoYoutube },
                            React.createElement("i", { className: 'material-icons icon-delete' }, "library_add"))))),
            React.createElement("div", { className: 'col xl8 l7 m12 s12' },
                React.createElement("div", { className: 'file-area' },
                    React.createElement("div", { className: 'label' },
                        React.createElement("i", { className: 'menu-type' }),
                        React.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                            React.createElement("i", { className: 'material-icons menu-type' }, "description"),
                            React.createElement("span", { className: 'menu-type' }, "File"))),
                    filesUploaded && filesUploaded.length > 0 && React.createElement(DragDrop, { setList: setFilesUploaded, handleDeleteFile: handleDeleteFile, list: filesUploaded }))))));
};
export default UploadFile;
//# sourceMappingURL=app.js.map