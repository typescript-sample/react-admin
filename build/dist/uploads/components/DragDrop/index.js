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
import * as React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { updateData } from 'src/uploads/service';
import RenderItem from '../RenderFile';
var DragDrop = function (props) {
    var onDragEnd = function (result) { return __awaiter(void 0, void 0, void 0, function () {
        var newList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!result.destination) {
                        return [2 /*return*/];
                    }
                    newList = reorder(props.list, result.source.index, result.destination.index);
                    return [4 /*yield*/, handleUpdateData(newList)];
                case 1:
                    _a.sent();
                    props.setList(newList);
                    return [2 /*return*/];
            }
        });
    }); };
    var reorder = function (listReorder, startIndex, endIndex) {
        var result = Array.from(listReorder);
        var removed = result.splice(startIndex, 1)[0];
        result.splice(endIndex, 0, removed);
        return result;
    };
    var handleUpdateData = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateData(data)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(DragDropContext, { onDragEnd: onDragEnd },
        React.createElement(Droppable, { droppableId: 'droppable', direction: 'vertical' }, function (provided, snapshot) { return (React.createElement("div", __assign({ ref: provided.innerRef }, provided.droppableProps),
            props.list.map(function (item, index) { return (React.createElement(Draggable, { key: item.url, draggableId: item.url, index: index }, function (provide, _) { return (React.createElement("div", __assign({ key: item.url, className: 'row card-image', ref: provide.innerRef, style: provide.draggableProps.style }, provide.draggableProps),
                React.createElement("div", __assign({}, provide.dragHandleProps, { className: 'col xl1 l1 m1 s1' }),
                    React.createElement("i", { className: 'material-icons menu-type' }, "menu"),
                    React.createElement("i", { onClick: function () { return props.handleDeleteFile(item.url, item.source); }, className: 'material-icons icon-delete' }, "delete")),
                React.createElement(RenderItem, { item: item }))); })); }),
            provided.placeholder)); })));
};
export default DragDrop;
//# sourceMappingURL=index.js.map