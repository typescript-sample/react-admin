import { Route, Routes } from 'react-router';
import { CurrencyForm } from './currency-form';
import { CurrenciesForm } from './currencies-form';


export default function CurrenciesRoute() {
  return (
    <Routes >
      <Route path='' element={<CurrenciesForm />} />
      <Route path='/new' element={<CurrencyForm />} />
      <Route path='/:id' element={<CurrencyForm />} />
    </Routes>
  );
}
