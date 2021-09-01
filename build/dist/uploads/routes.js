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
import { Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { WithDefaultProps } from '../core/default';
import UploadFile from './app';
var StatelessApp = /** @class */ (function (_super) {
    __extends(StatelessApp, _super);
    function StatelessApp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StatelessApp.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(Route, { path: this.props.match.url + '/:id/image', exact: true, component: WithDefaultProps(UploadFile) })));
    };
    return StatelessApp;
}(React.Component));
var UploadRoutes = compose(withRouter)(StatelessApp);
export default UploadRoutes;
//# sourceMappingURL=routes.js.map