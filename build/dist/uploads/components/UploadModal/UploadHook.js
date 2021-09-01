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
import axios from 'axios';
import * as React from 'react';
var url = 'http://localhost:7070/uploads';
var urlGetImg = 'http://localhost:7070/users/image';
var user = JSON.parse(sessionStorage.getItem('authService'));
export var useUpload = function () {
    var _a = React.useState(null), file = _a[0], setFile = _a[1];
    var _b = React.useState({
        success: false,
        loading: false
    }), state = _b[0], setState = _b[1];
    var upload = function () {
        if (file) {
            setState(function (pre) { return (__assign(__assign({}, pre), { loading: true })); });
            var bodyFormData = new FormData();
            bodyFormData.append('file', file);
            bodyFormData.append('id', user.id);
            bodyFormData.append('source', 'google-storage');
            var headers = new Headers();
            headers.append('Content-Type', 'multipart/form-data');
            return axios.post(url, bodyFormData, { headers: headers }).then(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    setState(function (pre) { return (__assign(__assign({}, pre), { open: false, success: true, loading: false })); });
                    setFile(null);
                    return [2 /*return*/];
                });
            }); }).catch(function () {
                setState(function (pre) { return (__assign(__assign({}, pre), { loading: false })); });
            });
        }
    };
    return { upload: upload, file: file, setFile: setFile, state: state, setState: setState };
};
export var getImageAvt = function () { return __awaiter(void 0, void 0, void 0, function () {
    var urlImg, res, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                urlImg = '';
                if (!user) return [3 /*break*/, 4];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios
                        .get(urlGetImg + ("/" + user.id))];
            case 2:
                res = _a.sent();
                urlImg = res.data;
                return [2 /*return*/, urlImg];
            case 3:
                e_1 = _a.sent();
                return [2 /*return*/, urlImg];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var dataURLtoFile = function (dataurl, filename) {
    var arr = dataurl.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};
//# sourceMappingURL=UploadHook.js.map