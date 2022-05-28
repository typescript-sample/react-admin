import * as csv from 'csvtojson';
import { currency, locale } from 'locale-service';
import { phonecodes } from 'phonecodes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { alert, confirm } from 'ui-alert';
import { loading } from 'ui-loading';
import { resources as uiresources, UIService } from 'ui-plus';
import { toast } from 'ui-toast';
import { storage } from 'uione';
import { resources as vresources } from 'validation-core';
import { DefaultCsvService, resources } from 'web-clients';
import { resources as locales } from './core/resources';

import { RoleAssignmentForm } from './admin/role-assignment-form';
import { RoleForm } from './admin/role-form';
import { RolesForm } from './admin/roles-form';
import { UserForm } from './admin/user-form';
import { UsersForm } from './admin/users-form';
import { ChangePasswordForm } from './authentication/change-password-form';
import { ForgotPasswordForm } from './authentication/forgot-password-form';
import { ResetPasswordForm } from './authentication/reset-password-form';
import { SigninForm } from './authentication/signin-form';
import { SignupForm } from './authentication/signup-form';
import { config } from './config';
import AboutPage from './core/about';
import HomePage from './core/home';
import LayoutPage from './core/layout';

// tslint:disable:ordered-imports
import './assets/css/reset.css';
import './App.css';
import './assets/fonts/material-icon/css/material-icons.css';
// import "./assets/fonts/Roboto/font.css";
import './assets/css/checkbox.css';
import './assets/css/radio.css';
import './assets/css/grid.css';
import './assets/css/alert.css';
import './assets/css/loader.css';
import './assets/css/main.css';
import './assets/css/modal.css';
import './assets/css/multi-select.css';
import './assets/css/form.css';
import './assets/css/article.css';
import './assets/css/list-view.css';
import './assets/css/table.css';
import './assets/css/list-detail.css';
import './assets/css/solid-container.css';
import './assets/css/button.css';
import './assets/css/search.css';
import './assets/css/layout.css';
import './assets/css/theme.css';
import './assets/css/dark.css';

function parseDate(value: string, format: string): Date | null | undefined {
  if (!format || format.length === 0) {
    format = 'MM/DD/YYYY';
  } else {
    format = format.toUpperCase();
  }
  const dateItems = format.split(/\.| |-/);
  const valueItems = value.split(/\.| |-/);
  let imonth  = dateItems.indexOf('M');
  let iday    = dateItems.indexOf('D');
  let iyear   = dateItems.indexOf('YYYY');
  if (imonth === -1) {
    imonth  = dateItems.indexOf('MM');
  }
  if (iday === -1) {
    iday  = dateItems.indexOf('DD');
  }
  if (iyear === -1) {
    iyear  = dateItems.indexOf('YY');
  }
  const month = parseInt(valueItems[imonth], 10) - 1;
  let year = parseInt(valueItems[iyear], 10);
  if (year < 100) {
    year += 2000;
  }
  const day = parseInt(valueItems[iday], 10);
  return new Date(year, month, day);
}

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
    storage.home = '/home';
  }
  storage.home = '/home';
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
  uiresources.date = parseDate;
  uiresources.currency = currency;
  uiresources.resource = resource;
}
function App() {
  init();
  return (
    <BrowserRouter>
      <Routes>
        <Route index={true} element={<SigninForm />} />
        <Route path='signin' element={<SigninForm />} />
        <Route path='signup' element={<SignupForm />} />
        <Route path='change-password' element={<ChangePasswordForm />} />
        <Route path='reset-password' element={<ResetPasswordForm />} />
        <Route path='forgot-password' element={<ForgotPasswordForm />} />
        <Route path='about'>
          <Route index={true} element={<AboutPage />} />
          <Route path=':number' element={<AboutPage />} />
        </Route>
        <Route path='' element={<LayoutPage />}>
          <Route path='/home' element={<HomePage />} />
          <Route path=':number' element={<AboutPage />} />
          <Route path='admin/users' element={<UsersForm />} />
          <Route path='admin/users/add' element={<UserForm />} />
          <Route path='admin/users/edit/:id' element={<UserForm />} />
          <Route path='admin/roles' element={<RolesForm />} />
          <Route path='admin/roles/add' element={<RoleForm />} />
          <Route path='admin/roles/edit/:id' element={<RoleForm />} />
          <Route path='admin/roles/assign/:id' element={<RoleAssignmentForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
