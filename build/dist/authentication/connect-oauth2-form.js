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
import { MessageComponent } from 'react-message-component';
var ConnectOauth2Form = /** @class */ (function (_super) {
    __extends(ConnectOauth2Form, _super);
    function ConnectOauth2Form(props) {
        return _super.call(this, props) || this;
    }
    ConnectOauth2Form.prototype.componentDidMount = function () {
        var urlSearchParams = new URLSearchParams(this.props.location.search);
        var code = urlSearchParams.get('code');
        if (urlSearchParams.has('oauth_token') && urlSearchParams.has('oauth_verifier')) {
            code = urlSearchParams.get('oauth_token') + ':' + urlSearchParams.get('oauth_verifier');
        }
        localStorage.setItem('code', code);
        window.close();
    };
    ConnectOauth2Form.prototype.render = function () {
        return (React.createElement("div", null));
    };
    return ConnectOauth2Form;
}(MessageComponent));
export { ConnectOauth2Form };
//# sourceMappingURL=connect-oauth2-form.js.map