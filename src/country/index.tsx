import { Route, Routes } from "react-router"
import { CountriesForm } from "./countries-form"
import { CountryForm } from "./country-form"

export default function CountriesRoute() {
  return (
    <Routes>
      <Route path="" element={<CountriesForm />} />
      <Route path="/new" element={<CountryForm />} />
      <Route path="/:id" element={<CountryForm />} />
    </Routes>
  )
}
