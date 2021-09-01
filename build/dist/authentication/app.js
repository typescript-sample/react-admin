import { AuthenticationClient } from 'authentication-component';
import { OAuth2Client } from 'authentication-component';
import axios from 'axios';
import { HttpRequest } from 'axios-core';
import { PasswordWebClient } from 'password-component';
import { SignupClient } from 'signup-component';
import config from 'src/config';
import { options } from 'uione';
var ApplicationContext = /** @class */ (function () {
    function ApplicationContext() {
        this.httpRequest = new HttpRequest(axios, options);
        // readonly signupService: SignupService<SignupInfo> = new SignupClient<SignupInfo>(this.httpRequest, config.signupUrl + '/signup/signup', config.signupUrl);
        // readonly authenticator: Authenticator<AuthInfo> = new AuthenticationClient<AuthInfo>(this.httpRequest, config.authenticationUrl + '/authenticate');
        // readonly passwordService: PasswordService = new PasswordWebClient(this.httpRequest, config.passwordUrl);
        // readonly oauth2Service: OAuth2Service = new OAuth2Client(this.httpRequest, config.authenticationUrl + '/oauth2/authenticate', config.authenticationUrl + '/oauth2/configurations');
    }
    ApplicationContext.prototype.getSignupService = function () {
        if (!this.signupService) {
            this.signupService = new SignupClient(this.httpRequest, config.signupUrl + '/signup/signup', config.signupUrl);
        }
        return this.signupService;
    };
    ApplicationContext.prototype.getAuthenticator = function () {
        if (!this.authenticator) {
            this.authenticator = new AuthenticationClient(this.httpRequest, config.authenticationUrl + '/authenticate');
        }
        return this.authenticator;
    };
    ApplicationContext.prototype.getPasswordServicer = function () {
        if (!this.passwordService) {
            this.passwordService = new PasswordWebClient(this.httpRequest, config.passwordUrl);
        }
        return this.passwordService;
    };
    ApplicationContext.prototype.getOAuth2Service = function () {
        if (!this.oauth2Service) {
            this.oauth2Service = new OAuth2Client(this.httpRequest, config.authenticationUrl + '/oauth2/authenticate', config.authenticationUrl + '/oauth2/configurations');
        }
        return this.oauth2Service;
    };
    return ApplicationContext;
}());
export var context = new ApplicationContext();
//# sourceMappingURL=app.js.map