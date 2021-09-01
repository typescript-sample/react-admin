// import {Component} from 'react';
// import * as React from 'react';
// import {Redirect, Route, RouteComponentProps, RouteProps} from 'react-router-dom';
// import {AuthorizationRequiredService} from './common/service/AuthorizationRequiredService';
//
// export const PrivateRoute = ({component: Component, ...rest}) => (
//     <Route {...rest} render={props => (
//         AuthorizationRequiredService.isLoggedIn() ?
//             AuthorizationRequiredService.checkPrevileges(props.match.path)
//                 ? <Component {...props}/>
//                 : <Redirect to={{pathname: '401', state: {from: props.location}}}/>
//         : <Redirect to={{pathname: 'auth', state: {from: props.location}}}/>
//         )}/>
// );
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
import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { alert, resource } from 'uione';
import { authorized } from './core/authorization';
export var PrivateRoute = function (props) {
    var Component = props.component, path = props.path, rootPath = props.rootPath, exact = props.exact, setGlobalState = props.setGlobalState;
    if (authorized(rootPath)) {
        return (React.createElement(Route, { path: path, exact: exact, render: function (propsRoute) { return (React.createElement(Component, __assign({ key: path }, propsRoute, { setGlobalState: setGlobalState }))); } }));
    }
    else {
        var r = resource();
        var title = r.value('error_permission');
        var msg = r.value('error_permission_view');
        alert(msg, title);
        return React.createElement(Redirect, { to: { pathname: '/auth' } });
    }
};
//# sourceMappingURL=PrivateRoute.js.map