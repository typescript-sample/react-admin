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
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { ChangePasswordForm } from './change-password-form';
import { ConnectForm } from './connect-form';
import { ConnectOauth2Form } from './connect-oauth2-form';
import { ForgotPasswordForm } from './forgot-password-form';
import { ResetPasswordForm } from './reset-password-form';
// import {SigninForm} from './signin-form';
import SigninForm from './sigin-form-hooks';
import { SignupForm } from './signup-form';
var StatelessApp = /** @class */ (function (_super) {
    __extends(StatelessApp, _super);
    function StatelessApp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StatelessApp.prototype.render = function () {
        var currentUrl = this.props.match.url;
        return (React.createElement(Switch, null,
            React.createElement(Route, { path: currentUrl + '/connect/oauth2', exact: true, component: ConnectOauth2Form }),
            React.createElement(Route, { path: currentUrl + '/connect/:connectType', exact: true, component: ConnectForm }),
            React.createElement(Route, { path: currentUrl + '/signup', exact: true, component: SignupForm }),
            React.createElement(Route, { path: currentUrl + '/signin', exact: true, component: SigninForm }),
            React.createElement(Route, { path: currentUrl + '/change-password', exact: true, component: ChangePasswordForm }),
            React.createElement(Route, { path: currentUrl + '/forgot-password', exact: true, component: ForgotPasswordForm }),
            React.createElement(Route, { path: currentUrl + '/reset-password', exact: true, component: ResetPasswordForm }),
            React.createElement(Route, { path: currentUrl, exact: true, component: SigninForm })));
    };
    return StatelessApp;
}(React.Component));
var AuthenticationRoutes = compose(withRouter)(StatelessApp);
export default AuthenticationRoutes;
//# sourceMappingURL=routes.js.map