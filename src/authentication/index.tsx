import * as React from 'react';
import { Route, Routes } from 'react-router';
import { Hello } from './hello';
import { SigninForm } from './signin-form';

export default function Authentication() {
  return (
    <Routes>
      <Route path='signin' element={<SigninForm/>} />
      {/* <Route path='test' element={<Hello/>} /> */}
    </Routes>
  );
}
