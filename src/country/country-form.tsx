import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react"
import { clone, isEmpty, isSuccessful, makeDiff, onBack, updateState } from "react-hook-core"
import { useNavigate, useParams } from "react-router-dom"
import { alertError, alertSuccess, alertWarning, confirm } from "ui-alert"
import { hideLoading, showLoading } from "ui-loading"
import { addError, formatText, initForm, registerEvents, requiredOnBlur, showFormError, validateForm } from "ui-plus"
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
  const [initialCountry, setInitialCountry] = useState<Country>()
  const [country, setCountry] = useState<Country>(createCountry())
  const onChange = (e: ChangeEvent<HTMLInputElement>) => updateState(e, country, setCountry)

  const { id } = useParams()
  const newMode = !id
  useEffect(() => {
    initForm(refForm?.current, registerEvents)
    if (id) {
      showLoading()
      getCountryService()
        .load(id)
        .then((country) => {
          if (!country) {
            alertError(resource.error_404, () => navigate(-1))
          } else {
            setInitialCountry(clone(country))
            setCountry(country)
          }
        })
        .catch(handleError)
        .finally(hideLoading)
    }
  }, [id, newMode, canWrite]) // eslint-disable-line react-hooks/exhaustive-deps

  const back = (e: MouseEvent<HTMLButtonElement>) => onBack(e, navigate, confirm, resource, country, initialCountry)

  const save = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const valid = validateForm(refForm?.current, getLocale())
    if (valid) {
      const service = getCountryService()
      if (newMode) {
        confirm(resource.msg_confirm_save, () => {
          showLoading()
          service
            .create(country)
            .then((res) => {
              if (Array.isArray(res)) {
                showFormError(refForm?.current, res)
              } else if (isSuccessful(res)) {
                alertSuccess(resource.msg_save_success, () => navigate(-1))
              } else {
                const msg = formatText(resource.error_duplicated, resource.country_code)
                addError(refForm?.current, "countryCode", msg)
              }
            })
            .catch(handleError)
            .finally(hideLoading)
        })
      } else {
        const diff = makeDiff(country, initialCountry, ["countryCode"])
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

  return (
    !canWrite ? (<form id="countryForm" name="countryForm" className="form" ref={refForm}>
      <header>
        <h2>{resource.country}</h2>
      </header>
      <div>
        <dl className="data-list row">
          <dt className="col s6 m3 xl2">{resource.country_code}</dt>
          <dd className="col s6 m3 xl4">{country.countryCode}</dd>
          <dt className="col s6 m3 xl2">{resource.country_name}</dt>
          <dd className="col s6 m3 xl4">{country.countryName}</dd>
          <dt className="col s6 m3 xl2">{resource.country_native_name}</dt>
          <dd className="col s6 m3 xl4">{country.nativeCountryName}</dd>
          <dt className="col s6 m3 xl2">{resource.date_format}</dt>
          <dd className="col s6 m3 xl4">{country.dateFormat}</dd>
          <hr />
          <dt className="col s6 m3 xl2">{resource.decimal_separator}</dt>
          <dd className="col s6 m3 xl4">{country.decimalSeparator}</dd>
          <dt className="col s6 m3 xl2">{resource.group_separator}</dt>
          <dd className="col s6 m3 xl4">{country.groupSeparator}</dd>
          <hr />
          <dt className="col s6 m3 xl2">{resource.currency_code}</dt>
          <dd className="col s6 m3 xl4">{country.currencyCode}</dd>
          <dt className="col s6 m3 xl2">{resource.currency_symbol}</dt>
          <dd className="col s6 m3 xl4">{country.currencySymbol}</dd>
          <dt className="col s6 m3 xl2">{resource.currency_decimal_digits}</dt>
          <dd className="col s6 m3 xl4">{country.currencyDecimalDigits}</dd>
          <dt className="col s6 m3 xl2">{resource.currency_pattern}</dt>
          <dd className="col s6 m3 xl4">{country.currencyPattern}</dd>
          <dt className="col s6 m3 xl2">{resource.currency_sample}</dt>
          <dd className="col s6 m3 xl4">{country.currencySample}</dd>
          <dt className="col s6 m3 xl2">{resource.status}</dt>
          <dd className="col s6 m3 xl4">{country.status === "A" ? resource.active : resource.inactive}</dd>
        </dl>
      </div>
      <footer>
        <button type="submit" id="btnClose" name="btnClose" onClick={back}>
          {resource.close}
        </button>
      </footer>
    </form>) : (<form id="countryForm" name="countryForm" className="form" ref={refForm}>
      <header>
        <button type="button" id="btnBack" name="btnBack" className="btn-back" onClick={back} />
        <h2>{resource.country}</h2>
      </header>
      <div className="row">
        <label className="col s12 m6">
          {resource.country_code}
          <input
            type="text"
            id="countryCode"
            name="countryCode"
            value={country.countryCode}
            readOnly={!newMode}
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
            value={country.countryName}
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
            value={country.nativeCountryName}
            onChange={onChange}
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
            value={country.dateFormat}
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
            value={country.decimalSeparator}
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
            value={country.groupSeparator}
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
            value={country.currencyCode}
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
            value={country.currencySymbol}
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
            className="text-right"
            data-type="int"
            value={country.currencyDecimalDigits?.toString()}
            onChange={onChange}
            maxLength={1}
            min={0}
            max={3}
            placeholder={resource.currency_decimal_digits}
          />
        </label>
        <label className="col s12 m6">
          {resource.currency_pattern}
          <input
            type="tel"
            id="currencyPattern"
            name="currencyPattern"
            className="text-right"
            data-type="int"
            value={country.currencyPattern?.toString()}
            onChange={onChange}
            onBlur={requiredOnBlur}
            maxLength={1}
            min={0}
            max={3}
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
            value={country.currencySample}
            onChange={onChange}
            onBlur={requiredOnBlur}
            maxLength={16}
            required={true}
            placeholder={resource.currency_sample}
          />
        </label>
        <label className="col s12 m6">
          {resource.status}
          <div className="radio-group">
            <label>
              <input type="radio" id="active" name="status" onChange={onChange} value={Status.Active} checked={country.status === Status.Active} />
              {resource.active}
            </label>
            <label>
              <input type="radio" id="inactive" name="status" onChange={onChange} value={Status.Inactive} checked={country.status === Status.Inactive} />
              {resource.inactive}
            </label>
          </div>
        </label>
      </div>
      <footer>
        <button type="submit" id="btnSave" name="btnSave" onClick={save}>
          {resource.save}
        </button>
      </footer>
    </form>)
  )
}
