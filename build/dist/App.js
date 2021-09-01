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
import * as csv from 'csvtojson';
import { currency, locale } from 'locale-service';
import * as moment from 'moment';
import { phonecodes } from 'phonecodes';
import * as React from 'react';
import * as LazyLoadModule from 'react-loadable/lib/index';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { alert, confirm } from 'ui-alert';
import { loading } from 'ui-loading';
import { DefaultUIService, resources as uiresources } from 'ui-plus';
import { toast } from 'ui-toast';
import { storage } from 'uione';
import { resources as vresources } from 'validation-util';
import { DefaultCsvService, resources } from 'web-clients';
import AuthenticationRoutes from './authentication/routes';
import NotFoundPage from './core/containers/400/page';
import UnAuthorizedPage from './core/containers/401/page';
import InternalServerErrorPage from './core/containers/500/page';
import DefaultWrapper from './core/default';
import { Loading } from './core/Loading';
import Resources from './core/Resources';
import { WelcomeForm } from './core/welcome-form';
var AccessRoutes = LazyLoadModule({ loader: function () { return import("./admin/routes"); }, loading: Loading });
function parseDate(value, format) {
    if (!format || format.length === 0) {
        format = 'MM/DD/YYYY';
    }
    else {
        format = format.toUpperCase();
    }
    try {
        var d = moment(value, format).toDate();
        return d;
    }
    catch (err) {
        return null;
    }
}
var StatelessApp = /** @class */ (function (_super) {
    __extends(StatelessApp, _super);
    function StatelessApp(props) {
        var _this = _super.call(this, props) || this;
        resources.csv = new DefaultCsvService(csv);
        /*
        const c: SearchConfig = {
          page: 'pageIndex',
          limit: 'pageSize',
          firstLimit: 'firstPageSize'
        };
        resource.config = c;
        */
        storage.moment = true;
        storage.home = '/welcome';
        storage.setResources(Resources);
        storage.setLoadingService(loading);
        storage.setUIService(new DefaultUIService());
        storage.currency = currency;
        storage.locale = locale;
        storage.alert = alert;
        storage.confirm = confirm;
        storage.message = toast;
        var resourceService = storage.resource();
        vresources.phonecodes = phonecodes;
        uiresources.date = parseDate;
        uiresources.currency = currency;
        uiresources.resource = resourceService;
        return _this;
    }
    StatelessApp.prototype.render = function () {
        if (location.href.startsWith(storage.redirectUrl) || location.href.startsWith(location.origin + '/index.html?oauth_token=')) {
            window.location.href = location.origin + '/auth/connect/oauth2' + location.search;
        }
        return (React.createElement(Switch, null,
            React.createElement(Route, { path: '/401', component: UnAuthorizedPage }),
            React.createElement(Route, { path: '/500', component: InternalServerErrorPage }),
            React.createElement(Route, { path: '/auth', component: AuthenticationRoutes }),
            React.createElement(Route, { path: '/', exact: true, render: function (props) { return (React.createElement(Redirect, __assign({ to: '/auth' }, props))); } }),
            React.createElement(DefaultWrapper, { history: this.props.history, location: this.props.location },
                React.createElement(Route, { path: '/welcome', component: WelcomeForm }),
                React.createElement(Route, { path: '', component: AccessRoutes })),
            React.createElement(Route, { path: '**', component: NotFoundPage })));
    };
    return StatelessApp;
}(React.Component));
// const withStore = withReducer(globalStateReducer, GLOBAL_STATE);
export var App = compose(withRouter)(StatelessApp);
//# sourceMappingURL=App.js.map