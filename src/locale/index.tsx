import { Route, Routes } from 'react-router';
import { LocalesForm } from './locales-form';
import { LocaleForm } from './locale-form';

export default function LocalesRoute() {
  return (
    <Routes >
      <Route path='' element={<LocalesForm />} />
      <Route path='/new' element={<LocaleForm />} />
      <Route path='/:id' element={<LocaleForm />} />
    </Routes>
  );
}
