import { Result } from "onecore"
import React, { useEffect, useRef, useState } from "react"
import { clone, goBack, isEmptyObject, isSuccessful, makeDiff, OnClick, updateState } from "react-hook-core"
import { useNavigate, useParams } from "react-router-dom"
import { alertError, alertSuccess, alertWarning, confirm } from "ui-alert"
import { hideLoading, showLoading } from "ui-loading"
import { initForm, registerEvents, requiredOnBlur, setReadOnly, showFormError, validateForm } from "ui-plus"
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
  const [initialLocale, setInitialLocale] = useState<Locale>(createLocale())
  const [locale, setLocale] = useState<Locale>(createLocale())

  const { id } = useParams()
  const newMode = !id
  useEffect(() => {
    initForm(refForm?.current, registerEvents)
    if (id) {
      showLoading()
      getLocaleService()
        .load(id)
        .then((locale) => {
          if (!locale) {
            alertError(resource.error_404, () => navigate(-1))
          } else {
            setInitialLocale(clone(locale))
            setLocale(locale)
            if (!canWrite) {
              setReadOnly(refForm?.current)
            }
          }
        })
        .catch(handleError)
        .finally(hideLoading)
    }
  }, [id, newMode, canWrite]) // eslint-disable-line react-hooks/exhaustive-deps

  const back = (e: OnClick) => goBack(navigate, confirm, resource, initialLocale, locale)

  const save = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault()
    const valid = validateForm(refForm?.current, getLocale())
    if (valid) {
      const service = getLocaleService()
      if (!newMode) {
        const diff = makeDiff(initialLocale, locale, ["localeId"])
        if (isEmptyObject(diff)) {
          return alertWarning(resource.msg_no_change)
        }
        confirm(resource.msg_confirm_save, () => {
          showLoading()
          service
            .patch(locale)
            .then((res) => afterSaved(res))
            .catch(handleError)
            .finally(hideLoading)
        })
      } else {
        confirm(resource.msg_confirm_save, () => {
          showLoading()
          service
            .create(locale)
            .then((res) => afterSaved(res))
            .catch(handleError)
            .finally(hideLoading)
        })
      }
    }
  }
  const afterSaved = (res: Result<Locale>) => {
    if (Array.isArray(res)) {
      showFormError(refForm?.current, res)
    } else if (isSuccessful(res)) {
      alertSuccess(resource.msg_save_success, () => navigate(-1))
    } else if (res === 0) {
      alertError(resource.error_not_found)
    } else {
      alertError(resource.error_conflict)
    }
  }

  return (
    <form id="localeForm" name="localeForm" className="form" model-name="locale" ref={refForm as any}>
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
            readOnly={!newMode}
            onChange={(e) => updateState(e, locale, setLocale)}
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
            onChange={(e) => updateState(e, locale, setLocale)}
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
            onChange={(e) => updateState(e, locale, setLocale)}
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
            onChange={(e) => updateState(e, locale, setLocale)}
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
            onChange={(e) => updateState(e, locale, setLocale)}
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
            onChange={(e) => updateState(e, locale, setLocale)}
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
            onChange={(e) => updateState(e, locale, setLocale)}
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
            value={locale.firstDayOfWeek?.toString()}
            onChange={(e) => updateState(e, locale, setLocale)}
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
            onChange={(e) => updateState(e, locale, setLocale)}
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
            onChange={(e) => updateState(e, locale, setLocale)}
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
            value={locale.currencyDecimalDigits?.toString()}
            onChange={(e) => updateState(e, locale, setLocale)}
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
            value={locale.currencyPattern?.toString()}
            onChange={(e) => updateState(e, locale, setLocale)}
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
            onChange={(e) => updateState(e, locale, setLocale)}
            onBlur={requiredOnBlur}
            maxLength={40}
            required={true}
            placeholder={resource.currency_sample}
          />
        </label>
      </div>
      <footer className="view-footer">
        {canWrite && (
          <button type="submit" id="btnSave" name="btnSave" onClick={save}>
            {resource.save}
          </button>
        )}
      </footer>
    </form>
  )
}
