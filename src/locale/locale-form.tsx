import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react"
import { clone, Error, formatText, isEmpty, isSuccessful, makeDiff, onBack, updateState } from "react-hook-core"
import { useNavigate, useParams } from "react-router-dom"
import { alertError, alertSuccess, alertWarning, confirm } from "ui-alert"
import { hideLoading, showLoading } from "ui-loading"
import { addError, initForm, registerEvents, requiredOnBlur, showFormError, validateForm } from "ui-plus"
import { getLocale, handleError, hasPermission, Permission, useResource } from "uione"
import { getLocaleService, Locale } from "./service"

const createLocale = (): Locale => {
  const locale = {} as Locale
  return locale
}

export const LocaleForm = () => {
  const canWrite = hasPermission(Permission.write, 1)

  const resource = useResource()
  const navigate = useNavigate()
  const refForm = useRef<HTMLFormElement>(null)
  const [error500, setError500] = useState(false)
  const [initialLocale, setInitialLocale] = useState<Locale>()
  const [locale, setLocale] = useState<Locale>(createLocale())
  const onChange = (e: ChangeEvent<HTMLInputElement>) => updateState(e, locale, setLocale)

  const service = getLocaleService()
  const { id } = useParams()
  const newMode = !id
  useEffect(() => {
    if (id) {
      showLoading()
      service
        .load(id)
        .then((locale) => {
          if (locale) {
            setInitialLocale(clone(locale))
            setLocale(locale)
            initForm(refForm?.current, registerEvents)
          }
        })
        .catch(err => setError500(true))
        .finally(hideLoading)
    } else {
      initForm(refForm?.current, registerEvents)
    }
  }, [id, newMode, canWrite]) // eslint-disable-line react-hooks/exhaustive-deps

  const back = (e: MouseEvent<HTMLButtonElement>) => onBack(e, navigate, confirm, resource, locale, initialLocale)

  const save = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const valid = validateForm(refForm?.current, getLocale())
    if (valid) {
      if (newMode) {
        confirm(resource.msg_confirm_save, () => {
          showLoading()
          service
            .create(locale)
            .then((res) => {
              if (Array.isArray(res)) {
                showFormError(refForm?.current, res)
              } else if (isSuccessful(res)) {
                alertSuccess(resource.msg_save_success, () => navigate(-1))
              } else {
                const msg = formatText(resource.error_duplicated, resource.locale_code)
                addError(refForm?.current, "code", msg)
              }
            })
            .catch(handleError)
            .finally(hideLoading)
        })
      } else {
        const diff = makeDiff(locale, initialLocale, ["code"])
        if (isEmpty(diff)) {
          return alertWarning(resource.msg_no_change)
        }
        confirm(resource.msg_confirm_save, () => {
          showLoading()
          service
            .patch(diff)
            .then((res) => {
              if (Array.isArray(res)) {
                showFormError(refForm?.current, res)
              } else if (isSuccessful(res)) {
                alertSuccess(resource.msg_save_success, () => navigate(-1))
              } else {
                alertError(resource.error_not_found)
              }
            })
            .catch(handleError)
            .finally(hideLoading)
        })
      }
    }
  }

  const errorTitle = error500 ? resource.error_500_title : resource.error_404_title
  const errorMessage = error500 ? resource.error_500_message : resource.error_404_message
  return (
    error500 || (!newMode && !initialLocale) ? <Error title={errorTitle} message={errorMessage} back={back} /> : !canWrite ? (
      <form id="localeForm" name="localeForm" className="form" ref={refForm}>
        <header>
          <h2>{resource.locale}</h2>
        </header>
        <div>
          <dl className="data-list row">
            <dt className="col s6 m3 l2 xl2">{resource.locale_code}</dt>
            <dd className="col s6 m3 l4 xl2">{locale.code}</dd>
            <dt className="col s6 m3 l2 xl2">{resource.locale_name}</dt>
            <dd className="col s6 m3 l4 xl2">{locale.name}</dd>
            <dt className="col s6 m3 l2 xl2">{resource.locale_native_name}</dt>
            <dd className="col s6 m3 l4 xl2">{locale.nativeName}</dd>
            <dt className="col s6 m3 l2 xl2">{resource.country_code}</dt>
            <dd className="col s6 m3 l4 xl2">{locale.countryCode}</dd>
            <dt className="col s6 m3 l2 xl2">{resource.country_name}</dt>
            <dd className="col s6 m3 l4 xl2">{locale.countryName}</dd>
            <dt className="col s6 m3 l2 xl2">{resource.country_native_name}</dt>
            <dd className="col s6 m3 l4 xl2">{locale.nativeCountryName}</dd>
            <hr />
            <dt className="col s6 m3 l2 xl2">{resource.decimal_separator}</dt>
            <dd className="col s6 m3 l4 xl2">{locale.decimalSeparator}</dd>
            <dt className="col s6 m3 l2 xl2">{resource.group_separator}</dt>
            <dd className="col s6 m3 l4 xl2">{locale.groupSeparator}</dd>
            <dt className="col s6 m3 l2 xl2">{resource.currency_pattern}</dt>
            <dd className="col s6 m3 l4 xl2">{locale.currencyPattern}</dd>
            <hr />
            <dt className="col s6 m3 l2 xl2">{resource.currency_code}</dt>
            <dd className="col s6 m3 l4 xl2">{locale.currencyCode}</dd>
            <dt className="col s6 m3 l2 xl2">{resource.currency_symbol}</dt>
            <dd className="col s6 m3 l4 xl2">{locale.currencySymbol}</dd>
            <dt className="col s6 m3 l2 xl2">{resource.currency_decimal_digits}</dt>
            <dd className="col s6 m3 l4 xl2">{locale.currencyDecimalDigits}</dd>
            <dt className="col s6 m3 l2 xl2">{resource.currency_sample}</dt>
            <dd className="col s6 m3 l4 xl2">{locale.currencySample}</dd>
            <dt className="col s6 m3 l2 xl2">{resource.date_format}</dt>
            <dd className="col s6 m3 l4 xl2">{locale.dateFormat}</dd>
            <dt className="col s6 m3 l2 xl2">{resource.first_day_of_week}</dt>
            <dd className="col s6 m3 l4 xl2">{locale.firstDayOfWeek}</dd>
          </dl>
        </div>
        <footer>
          <button type="button" id="btnClose" name="btnClose" onClick={back}>
            {resource.close}
          </button>
        </footer>
      </form>
    ) : (
      <form id="localeForm" name="localeForm" className="form" ref={refForm}>
        <header>
          <button type="button" id="btnBack" name="btnBack" className="btn-back" onClick={back} />
          <h2>{resource.locale}</h2>
        </header>
        <div className="row">
          <label className="col s12 m6">
            {resource.locale_code}
            <input
              type="text"
              id="code"
              name="code"
              value={locale.code}
              readOnly={!newMode}
              onChange={onChange}
              maxLength={11}
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
              value={locale.name}
              onChange={onChange}
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
              value={locale.nativeName}
              onChange={onChange}
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
              value={locale.countryCode}
              onChange={onChange}
              maxLength={2}
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
              value={locale.countryName}
              onChange={onChange}
              maxLength={100}
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
              value={locale.nativeCountryName}
              onChange={onChange}
              maxLength={100}
              required={true}
              placeholder={resource.country_native_name}
            />
          </label>
          <label className="col s12 m6 flying">
            {resource.first_day_of_week}
            <input
              type="tel"
              id="firstDayOfWeek"
              name="firstDayOfWeek"
              data-type="integer"
              className="text-right"
              value={locale.firstDayOfWeek}
              onChange={onChange}
              maxLength={1}
              placeholder={resource.first_day_of_week}
            />
          </label>
          <label className="col s12 m6">
            {resource.date_format}
            <input
              type="text"
              id="dateFormat"
              name="dateFormat"
              value={locale.dateFormat}
              onChange={onChange}
              maxLength={13}
              required={true}
              placeholder={resource.date_format}
            />
          </label>
          <label className="col s12 m6">
            {resource.decimal_separator}
            <input
              type="text"
              id="decimalSeparator"
              name="decimalSeparator"
              value={locale.decimalSeparator}
              onChange={onChange}
              onBlur={requiredOnBlur}
              maxLength={1}
              required={true}
              placeholder={resource.decimal_separator}
            />
          </label>
          <label className="col s12 m6">
            {resource.group_separator}
            <input
              type="text"
              id="groupSeparator"
              name="groupSeparator"
              value={locale.groupSeparator}
              onChange={onChange}
              onBlur={requiredOnBlur}
              maxLength={1}
              required={true}
              placeholder={resource.group_separator}
            />
          </label>
          <label className="col s12 m6">
            {resource.currency_code}
            <input
              type="text"
              id="currencyCode"
              name="currencyCode"
              value={locale.currencyCode}
              onChange={onChange}
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
              value={locale.currencySymbol}
              onChange={onChange}
              onBlur={requiredOnBlur}
              maxLength={4}
              required={true}
              placeholder={resource.currency_symbol}
            />
          </label>
          <label className="col s12 m6 flying">
            {resource.currency_decimal_digits}
            <input
              type="tel"
              id="currencyDecimalDigits"
              name="currencyDecimalDigits"
              data-type="integer"
              className="text-right"
              value={locale.currencyDecimalDigits}
              onChange={onChange}
              maxLength={1}
              placeholder={resource.currency_decimal_digits}
            />
          </label>
          <label className="col s12 m6">
            {resource.currency_pattern}
            <input
              type="tel"
              id="currencyPattern"
              name="currencyPattern"
              data-type="integer"
              className="text-right"
              value={locale.currencyPattern}
              onChange={onChange}
              onBlur={requiredOnBlur}
              maxLength={1}
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
              value={locale.currencySample}
              onChange={onChange}
              onBlur={requiredOnBlur}
              maxLength={40}
              required={true}
              placeholder={resource.currency_sample}
            />
          </label>
        </div>
        <footer>
          <button type="submit" id="saveBtn" name="saveBtn" onClick={save}>
            {resource.save}
          </button>
        </footer>
      </form>)
  )
}
