import React from 'react';
import * as csv from 'csvtojson';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { currency, locale } from 'locale-service';
import { phonecodes } from 'phonecodes';
import { alert, confirm } from 'ui-alert';
import { loading } from 'ui-loading';
import { resources as uiresources, UIService } from 'ui-plus';
import { toast } from 'ui-toast';
import { storage } from 'uione';
import { resources as vresources } from 'validation-core';
import { DefaultCsvService, resources } from 'web-clients';
import LayoutComponent from './components/Layout';
import AboutPage from './pages/About';
import HomePage from './pages/Home';
import { SigninForm } from './authentication/signin-form';
import { ChangePasswordForm } from './authentication/change-password-form';
import { ForgotPasswordForm } from './authentication/forgot-password-form';
import { ResetPasswordForm } from './authentication/reset-password-form';
import { UsersForm } from './admin/users-form';
import { UserForm } from './admin/user-form';
import { RolesForm } from './admin/roles-form';
import { RoleForm } from './admin/role-form';
// import Authentication from './authentication';
import { config } from './config';
import { resources as locales } from './core/resources';

import './App.css';
import './assets/css/reset.css';
import './assets/css/checkbox.css';
import './assets/css/radio.css';
import './assets/css/materialize-grid.css';
import './assets/css/alert.css';
import './assets/css/loader.css';
import './assets/css/main.css';
import './assets/css/modal.css';
import './assets/css/multi-select.css';
import './assets/css/date-picker.css';
import './assets/css/form.css';
import './assets/css/diff.css';
import './assets/css/group.css';
import './assets/css/article.css';
import './assets/css/list-view.css';
import './assets/css/table.css';
import './assets/css/list-detail.css';
import './assets/css/navigation-bar.css';
import './assets/css/pagination.css';
import './assets/css/solid-container.css';
import './assets/css/common-button.css';
import './assets/css/search.css';
import './assets/css/default-layout.css';
import './assets/css/profile.css';
import './assets/css/theme.css';

let isInit = false;
export function init() {
  if (isInit) {
    return;
  }
  isInit = true;
  storage.setConfig(config);
  resources.csv = new DefaultCsvService(csv);
  resources.config = {
    list: 'list'
  };
  if (storage.home == null || storage.home === undefined) {
    storage.home = '/admin/users';
  }
  storage.home = '/admin/users';
  // storage.token = getToken;
  storage.moment = true;
  storage.setResources(locales);
  storage.setLoadingService(loading);
  storage.setUIService(new UIService());
  storage.currency = currency;
  storage.locale = locale;
  storage.alert = alert;
  storage.confirm = confirm;
  storage.message = toast;

  const resource = storage.resource();
  vresources.phonecodes = phonecodes;
  // uiresources.date = parseDate;
  uiresources.currency = currency;
  uiresources.resource = resource;
}
function App() {
  init();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="signin" element={<SigninForm />} />
        <Route path="change-password" element={<ChangePasswordForm />} />
        <Route path="reset-password" element={<ResetPasswordForm />} />
        <Route path="forgot-password" element={<ForgotPasswordForm />} />
        <Route path="about">
          <Route index element={<AboutPage />} />
          <Route path=":number" element={<AboutPage />} />
        </Route>
        <Route path="/admin" element={<LayoutComponent />}>          
          <Route index element={<AboutPage />} />
          <Route path=":number" element={<AboutPage />} />
          <Route path="users" element={<UsersForm />} />
          <Route path="users/:id" element={<UserForm />} />
          <Route path="roles" element={<RolesForm />} />
          <Route path="roles/:id" element={<RoleForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
  /*
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  */
}

export default App;
