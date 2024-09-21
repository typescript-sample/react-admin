import { Route, Routes } from "react-router"
import { CurrenciesForm } from "./currencies-form"
import { CurrencyForm } from "./currency-form"

export default function CurrenciesRoute() {
  return (
    <Routes>
      <Route path="" element={<CurrenciesForm />} />
      <Route path="/new" element={<CurrencyForm />} />
      <Route path="/:id" element={<CurrencyForm />} />
    </Routes>
  )
}
