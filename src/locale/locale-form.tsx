import { Item } from "onecore"
import { useEffect, useRef } from "react"
import { createModel, EditComponentParam, setReadOnly, useEdit } from "react-hook-core"
import { hasPermission, inputEdit, Permission, requiredOnBlur } from "uione"
import { getLocaleService, Locale } from "./service"

interface InternalState {
  locale: Locale
  titleList: Item[]
  positionList: Item[]
}

const createLocale = (): Locale => {
  const locale = createModel<Locale>()
  return locale
}

const initialState: InternalState = {
  locale: {} as Locale,
  titleList: [],
  positionList: [],
}

const param: EditComponentParam<Locale, string, InternalState> = {
  createModel: createLocale,
}
export const LocaleForm = () => {
  const refForm = useRef()
  const { resource, state, updateState, flag, save, back } = useEdit<Locale, string, InternalState>(
    refForm,
    initialState,
    getLocaleService(),
    inputEdit(),
    param,
  )
  useEffect(() => {
    const isReadOnly = !hasPermission(Permission.write, 1)
    if (isReadOnly) {
      setReadOnly(refForm.current as any)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  const locale = state.locale
  return (
    <div className="view-container">
      <form id="localeForm" name="localeForm" model-name="locale" ref={refForm as any}>
        <header className="view-header">
          <button type="button" id="btnBack" name="btnBack" className="btn-back" onClick={back} />
          <h2 className="view-title">{resource.locale}</h2>
        </header>
        <div className="row">
          <label className="col s12 m6">
            {resource.locale_code}
            <input
              type="text"
              id="code"
              name="code"
              value={locale.code || ""}
              readOnly={!flag.newMode}
              onChange={updateState}
              maxLength={20}
              required={true}
              placeholder={resource.locale_code}
            />
          </label>
          <label className="col s12 m6">
            {resource.locale_name}
            <input
              type="text"
              id="name"
              name="name"
              value={locale.name || ""}
              onChange={updateState}
              maxLength={100}
              required={true}
              placeholder={resource.locale_name}
            />
          </label>
          <label className="col s12 m6">
            {resource.locale_native_name}
            <input
              type="text"
              id="nativeName"
              name="nativeName"
              value={locale.nativeName || ""}
              onChange={updateState}
              maxLength={100}
              required={true}
              placeholder={resource.locale_native_name}
            />
          </label>
          <label className="col s12 m6">
            {resource.country_code}
            <input
              type="text"
              id="countryCode"
              name="countryCode"
              value={locale.countryCode || ""}
              onChange={updateState}
              maxLength={3}
              required={true}
              placeholder={resource.country_code}
            />
          </label>
          <label className="col s12 m6">
            {resource.country_name}
            <input
              type="text"
              id="countryName"
              name="countryName"
              value={locale.countryName || ""}
              onChange={updateState}
              maxLength={20}
              required={true}
              placeholder={resource.country_name}
            />
          </label>
          <label className="col s12 m6">
            {resource.country_native_name}
            <input
              type="text"
              id="nativeCountryName"
              name="nativeCountryName"
              value={locale.nativeCountryName || ""}
              onChange={updateState}
              maxLength={100}
              required={true}
              placeholder={resource.country_native_name}
            />
          </label>
          <label className="col s12 m6">
            {resource.date_format}
            <input
              type="text"
              id="dateFormat"
              name="dateFormat"
              value={locale.dateFormat || ""}
              onChange={updateState}
              maxLength={12}
              required={true}
              placeholder={resource.date_format}
            />
          </label>
          <label className="col s12 m6 flying">
            {resource.first_day_of_week}
            <input
              type="text"
              id="firstDayOfWeek"
              name="firstDayOfWeek"
              className="text-right"
              data-type="integer"
              value={locale.firstDayOfWeek || ""}
              onChange={updateState}
              maxLength={1}
              placeholder={resource.first_day_of_week}
            />
          </label>
          <label className="col s12 m6">
            {resource.currency_code}
            <input
              type="text"
              id="currencyCode"
              name="currencyCode"
              value={locale.currencyCode || ""}
              onChange={updateState}
              onBlur={requiredOnBlur}
              maxLength={3}
              required={true}
              placeholder={resource.currency_code}
            />
          </label>
          <label className="col s12 m6">
            {resource.currency_symbol}
            <input
              type="text"
              id="currencySymbol"
              name="currencySymbol"
              value={locale.currencySymbol || ""}
              onChange={updateState}
              onBlur={requiredOnBlur}
              maxLength={40}
              required={true}
              placeholder={resource.currency_symbol}
            />
          </label>
          <label className="col s12 m6 flying">
            {resource.currency_decimal_digits}
            <input
              type="text"
              id="currencyDecimalDigits"
              name="currencyDecimalDigits"
              className="text-right"
              data-type="integer"
              value={locale.currencyDecimalDigits || ""}
              onChange={updateState}
              maxLength={1}
              placeholder={resource.currency_decimal_digits}
            />
          </label>
          <label className="col s12 m6">
            {resource.currency_pattern}
            <input
              type="text"
              id="currencyPattern"
              name="currencyPattern"
              className="text-right"
              data-type="integer"
              value={locale.currencyPattern || ""}
              onChange={updateState}
              onBlur={requiredOnBlur}
              maxLength={40}
              required={true}
              placeholder={resource.currency_pattern}
            />
          </label>
          <label className="col s12 m6">
            {resource.currency_sample}
            <input
              type="text"
              id="currencySample"
              name="currencySample"
              value={locale.currencySample || ""}
              onChange={updateState}
              onBlur={requiredOnBlur}
              maxLength={40}
              required={true}
              placeholder={resource.currency_sample}
            />
          </label>
        </div>
        <footer className="view-footer">
          {!flag.readOnly && (
            <button type="submit" id="btnSave" name="btnSave" onClick={save}>
              {resource.save}
            </button>
          )}
        </footer>
      </form>
    </div>
  )
}
