import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react"
import { clone, Error, formatText, isEmpty, isSuccessful, makeDiff, onBack, updateState } from "react-hook-core"
import { useNavigate, useParams } from "react-router-dom"
import { alertError, alertSuccess, alertWarning, confirm } from "ui-alert"
import { hideLoading, showLoading } from "ui-loading"
import { addError, initForm, registerEvents, requiredOnBlur, showFormError, validateForm } from "ui-plus"
import { getLocale, handleError, hasPermission, Permission, Status, useResource } from "uione"
import { Currency, getCurrencyService } from "./service"

const createCurrency = (): Currency => {
  const currency = {} as Currency
  currency.decimalDigits = 2
  currency.status = Status.Active
  return currency
}

export const CurrencyForm = () => {
  const canWrite = hasPermission(Permission.write, 1)

  const resource = useResource()
  const navigate = useNavigate()
  const refForm = useRef<HTMLFormElement>(null)
  const [error500, setError500] = useState(false)
  const [initialCurrency, setInitialCurrency] = useState<Currency>()
  const [currency, setCurrency] = useState<Currency>(createCurrency())
  const onChange = (e: ChangeEvent<HTMLInputElement>) => updateState(e, currency, setCurrency)

  const service = getCurrencyService()
  const { id } = useParams()
  const newMode = !id
  useEffect(() => {
    initForm(refForm?.current, registerEvents)
    if (id) {
      showLoading()
      service
        .load(id)
        .then((currency) => {
          if (currency) {
            setInitialCurrency(clone(currency))
            setCurrency(currency)
          }
        })
        .catch(err => setError500(true))
        .finally(hideLoading)
    }
  }, [id, newMode, canWrite]) // eslint-disable-line react-hooks/exhaustive-deps

  const back = (e: MouseEvent<HTMLElement>) => onBack(e, navigate, confirm, resource, currency, initialCurrency)

  const save = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const valid = validateForm(refForm?.current, getLocale())
    if (valid) {

      if (newMode) {
        confirm(resource.msg_confirm_save, () => {
          showLoading()
          service
            .create(currency)
            .then((res) => {
              if (Array.isArray(res)) {
                showFormError(refForm?.current, res)
              } else if (isSuccessful(res)) {
                alertSuccess(resource.msg_save_success, () => navigate(-1))
              } else {
                const msg = formatText(resource.error_duplicated, resource.currency_code)
                addError(refForm?.current, "code", msg)
              }
            })
            .catch(handleError)
            .finally(hideLoading)
        })
      } else {
        const diff = makeDiff(currency, initialCurrency, ["code"])
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
    error500 || (!newMode && !initialCurrency) ? <Error title={errorTitle} message={errorMessage} back={back} /> : !canWrite ? (
      <form id="currencyForm" name="currencyForm" className="form" ref={refForm}>
        <header>
          <h2>{resource.currency}</h2>
        </header>
        <div>
          <dl className="data-list row">
            <dt className="col s6 l3 xl2">{resource.currency_code}</dt>
            <dd className="col s6 l9 xl10">{currency.code}</dd>
            <dt className="col s6 l3 xl2">{resource.currency_symbol}</dt>
            <dd className="col s6 l9 xl10">{currency.symbol}</dd>
            <dt className="col s6 l3 xl2">{resource.currency_decimal_digits}</dt>
            <dd className="col s6 l9 xl10">{currency.decimalDigits}</dd>
            <dt className="col s6 l3 xl2">{resource.status}</dt>
            <dd className="col s6 l9 xl10">{currency.status === "A" ? resource.active : resource.inactive}</dd>
          </dl>
        </div>
        <footer>
          <button type="submit" id="btnClose" name="btnClose" onClick={back}>
            {resource.close}
          </button>
        </footer>
      </form>
    ) : (
      <form id="currencyForm" name="currencyForm" className="form" ref={refForm}>
        <header>
          <button type="button" id="btnBack" name="btnBack" className="btn-back" onClick={back} />
          <h2>{resource.currency}</h2>
        </header>
        <div className="row">
          <label className="col s12 m6">
            {resource.currency_code}
            <input
              type="text"
              id="code"
              name="code"
              value={currency.code}
              readOnly={!newMode}
              onChange={onChange}
              maxLength={3}
              required={true}
              placeholder={resource.currency_code}
            />
          </label>
          <label className="col s12 m6">
            {resource.currency_symbol}
            <input
              type="text"
              id="symbol"
              name="symbol"
              value={currency.symbol}
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
              id="decimalDigits"
              name="decimalDigits"
              className="text-right"
              data-type="int"
              value={currency.decimalDigits?.toString()}
              onChange={onChange}
              maxLength={1}
              min={0}
              max={3}
              placeholder={resource.currency_decimal_digits}
            />
          </label>
          <label className="col s12 m6">
            {resource.status}
            <div className="radio-group">
              <label>
                <input type="radio" id="active" name="status" onChange={onChange} value={Status.Active} checked={currency.status === Status.Active} />
                {resource.active}
              </label>
              <label>
                <input type="radio" id="inactive" name="status" onChange={onChange} value={Status.Inactive} checked={currency.status === Status.Inactive} />
                {resource.inactive}
              </label>
            </div>
          </label>
        </div>
        <footer>
          <button type="button" id="btnSave" name="btnSave" onClick={save}>
            {resource.save}
          </button>
        </footer>
      </form>)
  )
}
