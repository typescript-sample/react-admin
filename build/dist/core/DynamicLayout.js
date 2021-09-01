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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import axios from 'axios';
import { HttpRequest } from 'axios-core';
import * as React from 'react';
import { clone } from 'reflectx';
import { options } from 'uione';
import LazyLoadModule from './LazyLoadModule';
var DynamicLayout = /** @class */ (function (_super) {
    __extends(DynamicLayout, _super);
    function DynamicLayout(props) {
        var _this = _super.call(this, props) || this;
        _this.renderChildren = function (childrens, loopData, infoFromParent) {
            return childrens ? childrens.map(function (child, idx) {
                var tagName = child.tagName, childComponents = child.childComponents, isLoopElement = child.isLoopElement;
                var newChildren = childComponents ? __spreadArrays(childComponents) : null;
                var key;
                if (loopData && isLoopElement) {
                    var listAttributes_1 = loopData.listAttributes, nameOfListData_1 = loopData.nameOfListData;
                    var listData = _this.props.listData;
                    var data = listData.find(function (obj) { return obj.name === nameOfListData_1; });
                    var arrayChild_1 = [];
                    data.data.map(function (loopEle, loopIdx) {
                        var loopInfo = {
                            attrs: listAttributes_1,
                            data: loopEle
                        };
                        key = child.tagName + "-" + loopIdx;
                        if (newChildren && newChildren.length > 0) {
                            arrayChild_1.push(_this.renderTagToHtmlElement(child, newChildren, key, false, loopInfo));
                        }
                        else {
                            arrayChild_1.push(_this.renderTagToHtmlElement(child, null, key, false, loopInfo));
                        }
                    });
                    return arrayChild_1;
                }
                else {
                    if (newChildren && newChildren.length > 0) {
                        key = tagName + "-" + idx;
                        return _this.renderTagToHtmlElement(child, newChildren, key, false, infoFromParent);
                    }
                    else {
                        key = tagName + "-" + idx;
                        return _this.renderTagToHtmlElement(child, null, key, false, infoFromParent);
                    }
                }
            }) : null;
        };
        _this.renderTagToHtmlElement = function (node, childOfNode, key, isFirstLoad, loopInfo) {
            if (childOfNode === void 0) { childOfNode = null; }
            if (key === void 0) { key = null; }
            if (isFirstLoad === void 0) { isFirstLoad = false; }
            if (loopInfo === void 0) { loopInfo = null; }
            var _a = node || _this.props.json, tagName = _a.tagName, attributes = _a.attributes, childComponents = _a.childComponents, actions = _a.actions, customs = _a.customs, text = _a.text, isCustomComponent = _a.isCustomComponent, path = _a.path;
            var children = null;
            if (isFirstLoad) {
                children = _this.renderChildren(childComponents);
            }
            else if (node && node.loopData && Object.keys(node.loopData).length > 0) {
                children = childOfNode ? _this.renderChildren(childOfNode, node.loopData) : null;
            }
            else if (loopInfo && !node.loopData) {
                children = childOfNode ? _this.renderChildren(childOfNode, null, loopInfo) : null;
            }
            else {
                children = childOfNode ? _this.renderChildren(childOfNode) : null;
            }
            // Append child component
            var totalChildren = [children];
            if (text) {
                if (loopInfo) {
                    var data = loopInfo.data;
                    totalChildren.unshift(loopInfo.data.text || data[node.text]);
                }
                else {
                    totalChildren.unshift(text === 'titleForm' ? _this.props[text] : _this.props.resource[text]);
                }
            }
            if (!isCustomComponent) {
                return React.createElement.apply(React, __spreadArrays([tagName, __assign(__assign(__assign({ key: key }, _this.formatDataComponent(attributes, false, loopInfo)), _this.formatDataComponent(actions, true, loopInfo)), customs)], totalChildren));
            }
            else {
                if (path.indexOf('PageSizeSelect') !== -1) {
                    return React.createElement(LazyLoadModule, __assign({ resolve: function () { return import("react-page-size-select"); } }, _this.formatDataCustomComponent(node.attributes)));
                }
                else {
                    return React.createElement(LazyLoadModule, __assign({ resolve: function () { return import("react-pagination-x"); } }, _this.formatDataCustomComponent(node.attributes)));
                }
            }
        };
        _this.formatDataCustomComponent = function (element) {
            var listData = _this.props.listData;
            var item = clone(element);
            if (item && Object.keys(item).length > 0) {
                var objKeys = Object.keys(item);
                objKeys.forEach(function (ele) {
                    if (!listData) {
                        console.log('element', element);
                    }
                    var temp = listData.find(function (obj) { return obj.name === element[ele]; });
                    if (temp) {
                        item[ele] = temp.data;
                    }
                });
            }
            return item;
        };
        _this.formatDataComponent = function (element, isActions, loopInfo) {
            if (isActions === void 0) { isActions = false; }
            if (loopInfo === void 0) { loopInfo = null; }
            var item = clone(element);
            if (item && Object.keys(item).length > 0) {
                var objKeys = Object.keys(item);
                if (isActions) {
                    objKeys = Object.keys(item.events);
                }
                objKeys.forEach(function (ele) {
                    if (ele === 'value') {
                        var _a = _this.props, modelData = _a.modelData, self_1 = _a.self;
                        if (item[ele] && typeof item[ele] !== 'string' && item[ele].value) {
                            var value = modelData[item[ele].value];
                            var func = self_1[item[ele].formatedBy];
                            item[ele] = item[ele].isStaticText ? item[ele].value : func(value);
                        }
                        else {
                            item[ele] = loopInfo && loopInfo.attrs.indexOf(ele) !== -1 ? loopInfo.data[ele] : modelData[item[ele]];
                        }
                    }
                    else if (ele === 'placeholder') {
                        item[ele] = _this.props.resource[item[ele]];
                    }
                    else if (ele === 'key') {
                        item[ele] = _this.props.resource[item[ele]];
                    }
                    else if (ele === 'checked') {
                        if (typeof (item[ele]) !== 'boolean') {
                            var _b = item[ele], compareValue = _b.compareValue, compareSyntax = _b.compareSyntax, customFunc = _b.customFunc, nameOfList_1 = _b.nameOfList;
                            if (compareSyntax === '>') {
                                item[ele] = item.value > compareValue;
                            }
                            else if (compareSyntax === '<') {
                                item[ele] = item.value < compareValue;
                            }
                            else if (customFunc) {
                                var temp = _this.props.listData.find(function (obj) { return obj.name === nameOfList_1; });
                                // Set boolen result if custom condition is true
                                item[ele] = temp.data[customFunc](loopInfo.data.value);
                            }
                            else {
                                item[ele] = _this.props.modelData[item.name] === compareValue;
                            }
                        }
                    }
                    else if (isActions) {
                        if (item.type === 'application') {
                            if (item.params) {
                                var params_1 = [];
                                item.params.map(function (param) {
                                    params_1.push(loopInfo.data[param]);
                                });
                                var func_1 = _this.props.self[item.events[ele]];
                                item.events[ele] = function (e) { return func_1.apply(void 0, __spreadArrays([e], params_1)); };
                            }
                            else {
                                item.events[ele] = _this.props.self[item.events[ele]];
                            }
                        }
                        else {
                            var _c = item.events[ele], method = _c.method, data = _c.data, url = _c.url;
                            switch (method) {
                                case 'get':
                                    var pathRequest = "" + url;
                                    if (data) {
                                        pathRequest = url + "/" + data.id;
                                    }
                                    item.events[ele] = _this.httpRequest.get(pathRequest);
                                    break;
                                case 'post':
                                    item.events[ele] = _this.httpRequest.post("" + url, data.Object);
                                    break;
                                case 'put':
                                    item.events[ele] = _this.httpRequest.put(url + "/" + data.id, data.objhttpOptionsService);
                                    break;
                                case 'delete':
                                    item.events[ele] = _this.httpRequest.delete(url + "/" + data.id);
                                    break;
                                case 'default':
                                    break;
                            }
                        }
                    }
                });
            }
            return isActions && item && item.events ? item.events : item;
        };
        _this.state = {
            module: null
        };
        _this.httpRequest = new HttpRequest(axios, options);
        return _this;
    }
    DynamicLayout.prototype.render = function () {
        return (React.createElement(React.Fragment, null, this.renderTagToHtmlElement(null, null, null, true)));
    };
    return DynamicLayout;
}(React.Component));
export default DynamicLayout;
//# sourceMappingURL=DynamicLayout.js.map