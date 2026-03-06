import { Result } from "onecore"
import React, { useEffect, useRef, useState } from "react"
import { clone, goBack, isEmptyObject, isSuccessful, makeDiff, OnClick, updateState } from "react-hook-core"
import { useNavigate, useParams } from "react-router-dom"
import { alertError, alertSuccess, alertWarning, confirm } from "ui-alert"
import { hideLoading, showLoading } from "ui-loading"
import { initForm, registerEvents, requiredOnBlur, setReadOnly, showFormError, validateForm } from "ui-plus"
import { getLocale, handleError, hasPermission, Permission, Status, useResource } from "uione"
import { Currency, getCurrencyService } from "./service"

const createCurrency = (): Currency => {
  const currency = {} as Currency
  currency.status = Status.Active
  return currency
}

export const CurrencyForm = () => {
  const canWrite = hasPermission(Permission.write, 1)
  const resource = useResource()
  const navigate = useNavigate()
  const refForm = useRef<HTMLFormElement>(null)
  const [initialCurrency, setInitialCurrency] = useState<Currency>(createCurrency())
  const [currency, setCurrency] = useState<Currency>(createCurrency())
  const { id } = useParams()
  const newMode = !id
  useEffect(() => {
    initForm(refForm?.current, registerEvents)
    if (!id) {
      const currency = createCurrency()
      setInitialCurrency(clone(currency))
      setCurrency(currency)
    } else {
      showLoading()
      getCurrencyService()
        .load(id)
        .then((currency) => {
          if (!currency) {
            alertError(resource.error_404, () => navigate(-1))
          } else {
            setInitialCurrency(clone(currency))
            setCurrency(currency)
            if (!canWrite) {
              setReadOnly(refForm?.current)
            }
          }
        })
        .catch(handleError)
        .finally(hideLoading)
    }
  }, [id, newMode, canWrite]) // eslint-disable-line react-hooks/exhaustive-deps

  const back = (e: OnClick) => goBack(navigate, confirm, resource, initialCurrency, currency)

  const save = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault()
    const valid = validateForm(refForm?.current, getLocale())
    if (valid) {
      const service = getCurrencyService()
      if (!newMode) {
        const diff = makeDiff(initialCurrency, currency, ["currencyId"])
        if (isEmptyObject(diff)) {
          return alertWarning(resource.msg_no_change)
        }
        confirm(resource.msg_confirm_save, () => {
          showLoading()
          service
            .patch(currency)
            .then((res) => afterSaved(res))
            .catch(handleError)
            .finally(hideLoading)
        })
      } else {
        confirm(resource.msg_confirm_save, () => {
          showLoading()
          service
            .create(currency)
            .then((res) => afterSaved(res))
            .catch(handleError)
            .finally(hideLoading)
        })
      }
    }
  }
  const afterSaved = (res: Result<Currency>) => {
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
    <form id="currencyForm" name="currencyForm" className="form" model-name="currency" ref={refForm as any}>
      <header className="view-header">
        <button type="button" id="btnBack" name="btnBack" className="btn-back" onClick={back} />
        <h2 className="view-title">{resource.currency}</h2>
      </header>
      <div className="row">
        <label className="col s12 m6">
          {resource.currency_code}
          <input
            type="text"
            id="code"
            name="code"
            className="form-control"
            value={currency.code}
            readOnly={!newMode}
            onChange={(e) => updateState(e, currency, setCurrency)}
            maxLength={20}
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
            className="form-control"
            value={currency.symbol}
            onChange={(e) => updateState(e, currency, setCurrency)}
            onBlur={requiredOnBlur}
            maxLength={40}
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
            data-type="integer"
            value={currency.decimalDigits?.toString()}
            onChange={(e) => updateState(e, currency, setCurrency)}
            maxLength={1}
            placeholder={resource.currency_decimal_digits}
          />
        </label>
        <div className="col s12 m6 radio-section">
          {resource.status}
          <div className="radio-group">
            <label>
              <input type="radio" id="active" name="status" onChange={(e) => updateState(e, currency, setCurrency)} value={Status.Active} checked={currency.status === Status.Active} />
              {resource.yes}
            </label>
            <label>
              <input type="radio" id="inactive" name="status" onChange={(e) => updateState(e, currency, setCurrency)} value={Status.Inactive} checked={currency.status === Status.Inactive} />
              {resource.no}
            </label>
          </div>
        </div>
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
