import { Result } from "onecore"
import React, { useEffect, useRef, useState } from "react"
import { clone, goBack, isEmptyObject, isSuccessful, makeDiff, OnClick, updateState } from "react-hook-core"
import { useNavigate, useParams } from "react-router-dom"
import { alertError, alertSuccess, alertWarning, confirm } from "ui-alert"
import { hideLoading, showLoading } from "ui-loading"
import { initForm, registerEvents, requiredOnBlur, setReadOnly, showFormError, validateForm } from "ui-plus"
import { getLocale, handleError, hasPermission, Permission, Status, useResource } from "uione"
import { Country, getCountryService } from "./service"

const createCountry = (): Country => {
  const country = {} as Country
  country.status = Status.Active
  return country
}

export const CountryForm = () => {
  const canWrite = hasPermission(Permission.write, 1)
  const resource = useResource()
  const navigate = useNavigate()
  const refForm = useRef<HTMLFormElement>(null)
  const [initialCountry, setInitialCountry] = useState<Country>(createCountry())
  const [country, setCountry] = useState<Country>(createCountry())
  const { id } = useParams()
  const newMode = !id
  useEffect(() => {
    initForm(refForm?.current, registerEvents)
    if (!id) {
      const country = createCountry()
      setInitialCountry(clone(country))
      setCountry(country)
    } else {
      showLoading()
      getCountryService()
        .load(id)
        .then((country) => {
          if (!country) {
            alertError(resource.error_404, () => navigate(-1))
          } else {
            setInitialCountry(clone(country))
            setCountry(country)
            if (!canWrite) {
              setReadOnly(refForm?.current)
            }
          }
        })
        .catch(handleError)
        .finally(hideLoading)
    }
  }, [id, newMode, canWrite]) // eslint-disable-line react-hooks/exhaustive-deps

  const back = (e: OnClick) => goBack(navigate, confirm, resource, initialCountry, country)

  const save = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault()
    const valid = validateForm(refForm?.current, getLocale())
    if (valid) {
      const service = getCountryService()
      if (!newMode) {
        const diff = makeDiff(initialCountry, country, ["countryId"])
        if (isEmptyObject(diff)) {
          return alertWarning(resource.msg_no_change)
        }
        confirm(resource.msg_confirm_save, () => {
          showLoading()
          service
            .patch(country)
            .then((res) => afterSaved(res))
            .catch(handleError)
            .finally(hideLoading)
        })
      } else {
        confirm(resource.msg_confirm_save, () => {
          showLoading()
          service
            .create(country)
            .then((res) => afterSaved(res))
            .catch(handleError)
            .finally(hideLoading)
        })
      }
    }
  }
  const afterSaved = (res: Result<Country>) => {
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
    <form id="countryForm" name="countryForm" className="form" model-name="country" ref={refForm as any}>
      <header className="view-header">
        <button type="button" id="btnBack" name="btnBack" className="btn-back" onClick={back} />
        <h2 className="view-title">{resource.country}</h2>
      </header>
      <div className="row">
        <h4 className="header">Contact Information</h4>
        <label className="col s12 m6">
          {resource.country_code}
          <input
            type="text"
            id="countryCode"
            name="countryCode"
            value={country.countryCode || ""}
            readOnly={!newMode}
            onChange={(e) => updateState(e, country, setCountry)}
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
            value={country.countryName || ""}
            onChange={(e) => updateState(e, country, setCountry)}
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
            value={country.nativeCountryName || ""}
            onChange={(e) => updateState(e, country, setCountry)}
            maxLength={100}
            required={true}
            placeholder={resource.country_native_name}
          />
        </label>
        <label className="col s12 m6">
          {resource.currency_code}
          <input
            type="text"
            id="currencyCode"
            name="currencyCode"
            value={country.currencyCode || ""}
            onChange={(e) => updateState(e, country, setCountry)}
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
            value={country.currencySymbol || ""}
            onChange={(e) => updateState(e, country, setCountry)}
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
            value={country.currencyDecimalDigits?.toString()}
            onChange={(e) => updateState(e, country, setCountry)}
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
            value={country.currencyPattern?.toString()}
            onChange={(e) => updateState(e, country, setCountry)}
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
            value={country.currencySample || ""}
            onChange={(e) => updateState(e, country, setCountry)}
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
