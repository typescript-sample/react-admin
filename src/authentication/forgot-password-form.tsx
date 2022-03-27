import { email, PasswordService, validateAndForgotPassword, validateContact } from 'password-client';
import * as React from 'react';
import { MessageComponent, MessageState, navigate } from 'react-hook-core';
import { handleError, initForm, registerEvents, storage } from 'uione';
import logo from '../assets/images/logo.png';
import { context } from './service';

interface ContactInternalState extends MessageState {
  contact: string;
}

export class ForgotPasswordForm extends MessageComponent<ContactInternalState, any> {
  constructor(props: any) {
    super(props);
    this.signin = this.signin.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.passwordService = context.getPasswordServicer();
    this.state = {
      message: '',
      contact: ''
    };
  }
  private passwordService: PasswordService;

  componentDidMount() {
    this.form = initForm(this.ref.current, registerEvents);
  }

  signin() {
    navigate(this.props.history, 'signin');
  }

  resetPassword() {
    navigate(this.props.history, 'reset-password');
  }

  forgotPassword(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    validateAndForgotPassword(
      this.passwordService.forgotPassword, this.state.contact, 'email', storage.resource(),
      this.showMessage, this.showError, this.hideMessage, validateContact, handleError, email, storage.loading());
  }

  render() {
    const resource = storage.getResource();
    const message = this.state.message;
    return (
      <div className='view-container central-full'>
        <form id='forgotPasswordForm' name='forgotPasswordForm' noValidate={true} autoComplete='off' ref={this.ref}>
          <div>
            <img className='logo' src={logo} alt='logo'/>
            <h2>{resource.forgot_password}</h2>
            <div className={'message ' + this.alertClass}>
              {message}
              <span onClick={this.hideMessage} hidden={!message || message === ''} />
            </div>
            <label>
              {resource.email}
              <input type='text'
                id='contact' name='contact'
                value={this.state.contact}
                placeholder={resource.placeholder_user_email}
                onChange={this.updateFlatState}
                maxLength={255} required={true}
              />
            </label>
            <button type='submit' id='btnForgotPassword' name='btnForgotPassword'
              onClick={this.forgotPassword}>{resource.button_send_code_to_reset_password}</button>
            <a id='btnSignin' href='signin'>{resource.button_signin}</a>
            <a id='btnResetPassword' href='reset-password'>{resource.button_reset_password}</a>
          </div>
        </form>
      </div>
    );
  }
}
