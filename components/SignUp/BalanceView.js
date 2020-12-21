import React, { useState, useEffect } from "react";
import cx from "classnames";
import Button from "../Button/Button";
import InputField from "../Form/InputField";
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';
import styles from "./SignUp.module.scss";
import RadioField from "../Form/RadioField";
import SelectField from "../Form/SelectField";
import UPIPaymentForm from "../Booking/payment/UPIPaymentForm";
import CardPaymentForm from "../Booking/payment/CardPaymentForm";

import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { cvv, date } from "../../utils/validations";

function BalanceView({
  children,
  theme,
  className,
  onNext,
  handleSdata,
  sdata,
  ...rest
}) {

  const [isSubmit, setIsSubmit] = useState(false)
  const [balanceInfo, setBalanceInfo] = useState({
    amount: null,
    paytype: 'bank',
    activeBank: null,
    otherBank: 'Or select another bank',
    payCredit: null,
    payUpi: null,
    upi: null,
    date: null,
    cvv: null,
    cardNumber: null
  })
  const [type, setType] = useState("text");
  const [schema, setSchema] = useState(Joi.object({}));

  const netbanks = [
    { name: 'hdfc', logo: '/images/banks/hdfc.png' },
    { name: 'icici', logo: '/images/banks/icici.png' },
    { name: 'axis', logo: '/images/banks/axis.png' },
    { name: 'kotak', logo: '/images/banks/kotak.png' }]

  useEffect(() => {
    if (Number(balanceInfo.amount) >= 50000) {
      if (balanceInfo.paytype === 'bank') {
        if (balanceInfo.activeBank || balanceInfo.otherBank !== 'Or select another bank') {
          setIsSubmit(true)
        } else {
          setIsSubmit(false)
        }
      }
      else if (balanceInfo.paytype === 'upi') {
        if (balanceInfo.upi) {
          setIsSubmit(true)
        } else {
          setIsSubmit(false)
        }
      }
      else if (balanceInfo.paytype === 'credit') {
        if (balanceInfo.date && balanceInfo.cvv && balanceInfo.cardNumber) {
          setIsSubmit(true)
        } else {
          setIsSubmit(false)
        }
      }
    } else {
      setIsSubmit(false)
    }
  }, [balanceInfo])

  let { register, errors, handleSubmit, setError, getValues } = useForm({
    resolver: joiResolver(schema),
  });

  const handleContinue = () => {
    if (isSubmit)
      onNext()
  }

  const handleChange = (e) => {
    setBalanceInfo({ ...balanceInfo, amount: e.target.value })
  }

  const handleChangeRadio = (e) => {
    if (e === 'upi') {
      setSchema(Joi.object({
        upi: Joi.string().min(5).required(),
      }))
    } else if (e === 'credit') {
      const joiObject = {};
      joiObject[`cardNumber`] = Joi.string().creditCard().required();
      joiObject[`date`] = date;
      joiObject[`cvv`] = cvv;
      setSchema(Joi.object(joiObject))

    } else {
      setSchema(Joi.object({}))
    }
    setBalanceInfo({
      ...balanceInfo, paytype: e, activeBank: null, otherBank: 'Or select another bank',
      payCredit: null, payUpi: null
    })
  }

  const handleClickImg = (bankname) => {
    setBalanceInfo({ ...balanceInfo, activeBank: bankname, otherBank: 'Or select another bank' })
  }

  const handleChangeOtherBank = (e) => {
    setBalanceInfo({ ...balanceInfo, activeBank: null, otherBank: e.target.value })
  }

  const handlePaymentCredit = () => {
    setBalanceInfo({ ...balanceInfo, payCredit: true })
  }

  const handlePaymentUpi = () => {
    setBalanceInfo({ ...balanceInfo, payUpi: true })
  }

  const handleUPIChange = (e) => {
    setBalanceInfo({ ...balanceInfo, upi: e.target.value })
  }

  const handleChangeCard = (e) => {
    setBalanceInfo({ ...balanceInfo, cardNumber: e.target.value })
  }

  const handleChangeCvv = (e) => {
    setBalanceInfo({ ...balanceInfo, cvv: e.target.value })
  }

  const handleChangeExp = (e) => {
    setBalanceInfo({ ...balanceInfo, date: e.target.value })
  }

  return (
    <div
      className={cx(styles.rcontainer)}
      {...rest}
    >
      <p className={cx(styles.rtitle)}>Top Up Your Jalesh Balance</p>
      <p className={cx("mt-8 mb-4", styles.step2TopP)}>You must use your Jalesh Balance to pay for bookings</p>

      <p className={cx("mt-8 mb-4", styles.bankP)}>Enter amount to deposit to your Jalesh Balance</p>
      <div className="flex">
        <InputField
          icon="fal fa-rupee-sign"
          onChange={handleChange}
          className={cx(styles.inputField)}
          inputClassName={cx(styles.inputFieldInput)}
          placeholder=""
          name="amount"
          lessSpace
          defaultValue={''}
          type={'number'}
        />
        <p className={cx(styles.balanceInr)}>Min. ₹ 50,000</p>
      </div>

      <p className={cx("mt-6 mb-2", styles.bankP)}>Choose a payment method</p>
      <div className="flex mt-10 mb-10">
        <RadioField
          name={`radio_pay`}
          defaultValue={balanceInfo.paytype}
          className={cx(styles.radioLabel)}
          options={[
            { value: "credit", label: "Credit / debit card" },
            { value: "bank", label: "Net banking" },
            { value: "upi", label: "UPI" },
          ]}
          horizontal
          lessSpace
          inverseError
          handleOtpChange={handleChangeRadio}
        />
      </div>
      {balanceInfo.paytype === 'bank' ?
        <>
          <form onSubmit={handleSubmit(handleContinue)}>
            <div className="flex mt-10 mb-8">
              {netbanks.map((bank) => (
                <div key={bank.name} className="block text-center mr-9" onClick={() => handleClickImg(bank.name)}>
                  <div className={balanceInfo.activeBank === bank.name ? cx(styles.balanceImgDivActive) : ""}>
                    <img className={balanceInfo.activeBank === bank.name ? cx(styles.balanceImgActive) : cx(styles.balanceImg)} src={bank.logo} />
                  </div>
                  <p className={cx("mt-3", styles.balancep)}>{bank.name}</p>
                </div>
              ))
              }
            </div>
            <SelectField
              name={``}
              withIcon
              lessSpace
              defaultValue={balanceInfo.otherBank}
              className={cx(styles.inputField)}
              dropIcon={true}
              inputClassName={cx(styles.inputFieldInput)}
              handleChangeSelect={handleChangeOtherBank}
            >
              <option value="Or select another bank">
                Or select another bank
              </option>
              {netbanks.map((bank) => (
                <option key={bank.name} value={'other ' + bank.name}>other {bank.name}</option>
              ))}
            </SelectField>
            {isSubmit ?
              <Button
                className={cx(styles.rbtnEnable)}
              >
                Continue
        </Button>
              :
              <Button
                className={cx(styles.rbtnDisable)}
                disabled
              >
                Continue
        </Button>}
          </form>
        </>
        :
        balanceInfo.paytype === 'upi' ?
          <form onSubmit={handleSubmit(handleContinue)}>
            <InputField
              placeholder="Enter your UPI ID Eg:abc123@upi"
              name="upi"
              lessSpace
              className={cx(styles.inputField)}
              inputClassName={cx(styles.inputFieldInput)}
              ref={register({ required: true })}
              error={errors && errors.upi && "Please enter a correct UPI ID"}
              onChange={handleUPIChange}
            />
            {isSubmit ?
              <Button
                className={cx(styles.rbtnEnable)}
              >
                Continue
        </Button>
              :
              <Button
                className={cx(styles.rbtnDisable)}
                disabled
              >
                Continue
        </Button>}
          </form>
          :
          <form onSubmit={handleSubmit(handleContinue)}>
            <div style={{ width: '500px' }}>
              <InputField
                placeholder="Card number"
                name="cardNumber"
                lessSpace
                className={cx(styles.cardinputField)}
                inputClassName={cx(styles.inputFieldInput)}
                ref={register({ required: true })}
                error={
                  errors && errors.cardNumber && "Please enter a valid card number"
                }
                onChange={handleChangeCard}
              />
              <div className="flex">
                <div className="flex-grow mr-6">
                  <InputField
                    type={type}
                    onFocus={() => setType("month")}
                    onBlur={() => setType("text")}
                    placeholder="Expiry"
                    name="date"
                    lessSpace
                    className={cx(styles.cardinputField)}
                    inputClassName={cx(styles.inputFieldInput)}
                    ref={register({ required: true })}
                    error={
                      errors && errors.date && "Please enter a valid expiry date"
                    }
                    onChange={handleChangeExp}
                  />
                </div>
                <InputField
                  style={{ width: '120px' }}
                  placeholder="CVV"
                  name="cvv"
                  maxLength="3"
                  lessSpace
                  noClear
                  className={cx(styles.cardinputField)}
                  inputClassName={cx(styles.inputFieldInput)}
                  ref={register({ required: true })}
                  error={errors && errors.cvv && "Please check the CVV"}
                  onChange={handleChangeCvv}
                />
              </div>
            </div>
            {isSubmit ?
              <Button
                className={cx(styles.rbtnEnable)}
              >
                Continue
        </Button>
              :
              <Button
                className={cx(styles.rbtnDisable)}
                disabled
              >
                Continue
        </Button>}
          </form>
      }

    </div>
  )
}

BalanceView.propTypes = {
  className: PropTypes.string,
  onNext: PropTypes.func
};

export default BalanceView;
