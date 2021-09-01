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
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { updateGlobalState } from 'redux-plus';
import { WithDefaultProps } from '../core/default';
import AuditForm from './component/audit-form';
import { RoleAssignmentForm } from './component/role-assignment-form';
import { RoleForm } from './component/role-form';
import { RolesForm } from './component/roles-form';
import { UserForm } from './component/user-form';
import { UsersForm } from './component/users-form';
var StatelessApp = /** @class */ (function (_super) {
    __extends(StatelessApp, _super);
    function StatelessApp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StatelessApp.prototype.render = function () {
        // if (authenticated()) {
        return (React.createElement(React.Fragment, null,
            React.createElement(Route, { path: this.props.match.url + 'users', exact: true, component: WithDefaultProps(UsersForm) }),
            React.createElement(Route, { path: this.props.match.url + 'users/add', exact: true, component: WithDefaultProps(UserForm) }),
            React.createElement(Route, { path: this.props.match.url + 'users/:id', exact: true, component: WithDefaultProps(UserForm) }),
            React.createElement(Route, { path: this.props.match.url + 'roles', exact: true, component: WithDefaultProps(RolesForm) }),
            React.createElement(Route, { path: this.props.match.url + 'roles/add', exact: true, component: WithDefaultProps(RoleForm) }),
            React.createElement(Route, { path: this.props.match.url + 'roles/:id', exact: true, component: WithDefaultProps(RoleForm) }),
            React.createElement(Route, { path: this.props.match.url + 'audit-logs', exact: true, component: WithDefaultProps(AuditForm) }),
            React.createElement(Route, { path: this.props.match.url + '/access-role-assignment/add', exact: true, component: WithDefaultProps(RoleAssignmentForm) }),
            React.createElement(Route, { path: this.props.match.url + '/access-role-assignment/edit/:id/:cId', exact: true, component: WithDefaultProps(RoleAssignmentForm) })));
        /*
      } else {
        const resourceService = resource();
        const title = resourceService.value('error_permission');
        const msg = resourceService.value('error_unauthorized');
        alert(msg, title);
        return <Redirect to={{ pathname: '/auth', state: { from: this.props.location } }} />;
      }*/
    };
    return StatelessApp;
}(React.Component));
function mapDispatchToProps(dispatch) {
    return {
        setGlobalState: function (res) { return dispatch(updateGlobalState(res)); }
    };
}
var withConnect = connect(null, mapDispatchToProps);
var AccessRoutes = compose(withRouter, withConnect)(StatelessApp);
export default AccessRoutes;
//# sourceMappingURL=routes.js.map