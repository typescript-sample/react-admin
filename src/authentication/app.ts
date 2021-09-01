import {Authenticator, AuthInfo} from 'authentication-component';
import {AuthenticationClient} from 'authentication-component';
import {OAuth2Client} from 'authentication-component';
import {OAuth2Service} from 'authentication-component';
import axios from 'axios';
import {HttpRequest} from 'axios-core';
import {PasswordService} from 'password-component';
import {PasswordWebClient} from 'password-component';
import {SignupInfo} from 'signup-component';
import {SignupService} from 'signup-component';
import {SignupClient} from 'signup-component';
import config from 'src/config';
import {options} from 'uione';

class ApplicationContext {
  private readonly httpRequest = new HttpRequest(axios, options);
  public signupService: SignupService<SignupInfo>;
  public authenticator: Authenticator<AuthInfo>;
  public passwordService: PasswordService;
  public oauth2Service: OAuth2Service;
  getSignupService(): SignupService<SignupInfo> {
    if (!this.signupService) {
      this.signupService = new SignupClient<SignupInfo>(this.httpRequest, config.signupUrl + '/signup/signup', config.signupUrl);
    }
    return this.signupService;
  }
  getAuthenticator(): Authenticator<AuthInfo> {
    if (!this.authenticator) {
      this.authenticator = new AuthenticationClient<AuthInfo>(this.httpRequest, config.authenticationUrl + '/authenticate');
    }
    return this.authenticator;
  }
  getPasswordServicer(): PasswordService {
    if (!this.passwordService) {
      this.passwordService = new PasswordWebClient(this.httpRequest, config.passwordUrl);
    }
    return this.passwordService;
  }
  getOAuth2Service(): OAuth2Service {
    if (!this.oauth2Service) {
      this.oauth2Service = new OAuth2Client(this.httpRequest, config.authenticationUrl + '/oauth2/authenticate', config.authenticationUrl + '/oauth2/configurations');
    }
    return this.oauth2Service;
  }
  // readonly signupService: SignupService<SignupInfo> = new SignupClient<SignupInfo>(this.httpRequest, config.signupUrl + '/signup/signup', config.signupUrl);
  // readonly authenticator: Authenticator<AuthInfo> = new AuthenticationClient<AuthInfo>(this.httpRequest, config.authenticationUrl + '/authenticate');
  // readonly passwordService: PasswordService = new PasswordWebClient(this.httpRequest, config.passwordUrl);
  // readonly oauth2Service: OAuth2Service = new OAuth2Client(this.httpRequest, config.authenticationUrl + '/oauth2/authenticate', config.authenticationUrl + '/oauth2/configurations');
}

export const context = new ApplicationContext();
