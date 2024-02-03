import { Route, Routes } from 'react-router';
// import { LocaleForm } from './locale-form';
import { LocalesForm } from './locales-form';

export default function LocalesRoute() {
  return (
    <Routes >
      <Route path='' element={<LocalesForm />} />
    </Routes>
  );
}
