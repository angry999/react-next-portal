import React, { useState, useEffect } from "react";
import cx from "classnames";
import Button from "../Button/Button";
import InputField from "../Form/InputField";
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';
import styles from "./SignUp.module.scss";

import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  banknumber,
  rebanknumber
} from "../../utils/validations";

function BankView({
  children,
  theme,
  className,
  onNext,
  handleSdata,
  ...rest
}) {

  const [isSubmit, setIsSubmit] = useState(false)
  const [bankInfo, setBankInfo] = useState({
    bankname: null,
    ifsc: null,
    banknumber: null,
    rebanknumber: null
  })

  useEffect(() => {
    if (bankInfo.bankname && bankInfo.ifsc && bankInfo.banknumber && bankInfo.rebanknumber
      && (bankInfo.banknumber.length === bankInfo.rebanknumber.length))
      setIsSubmit(true)
    else
      setIsSubmit(false)
  }, [bankInfo])

  const joiObject = {};
  joiObject[`banknumber`] = banknumber;
  joiObject[`rebanknumber`] = rebanknumber;
  const { register, errors, handleSubmit, setError } = useForm({
    resolver: joiResolver(Joi.object(joiObject)),
  });

  const handleChange = (e) => {
    setBankInfo({ ...bankInfo, [e.target.name]: e.target.value })
    if (e.target.name !== 'rebanknumber')
      handleSdata(e)
  }

  const handleContinue = () => {
    if (isSubmit)
      onNext()
  }

  return (
    <div
      className={cx(styles.rcontainer)}
      {...rest}
    >
      <form onSubmit={handleSubmit(handleContinue)} >

        <p className={cx(styles.rtitle)}>Your Bank Details</p>
        <p className={cx("mt-8 mb-4", styles.step2TopP)}>Add a bank account to withdraw funds</p>

        <p className={cx("mt-10 mb-4", styles.bankP)}>Name on account</p>
        <InputField
          onChange={handleChange}
          className={cx(styles.inputField)}
          inputClassName={cx(styles.inputFieldInput)}
          placeholder="Full name on bank account"
          name="bankname"
          lessSpace
          defaultValue={''}
          type={'text'}
          // ref={register({ required: true })}
        />

        <p className={cx("mt-10 mb-2", styles.bankP)}>IFSC</p>
        <InputField
          onChange={handleChange}
          className={cx(styles.inputField)}
          inputClassName={cx(styles.inputFieldInput)}
          placeholder="Enter IFSC"
          name="ifsc"
          lessSpace
          defaultValue={''}
          type={'text'}
          // ref={register({ required: true })}
        />

        <p className={cx("mt-10 mb-2", styles.bankP)}>Account number</p>
        <InputField
          onChange={handleChange}
          className={cx(styles.inputField)}
          inputClassName={cx(styles.inputFieldInput)}
          placeholder="Enter bank account number"
          name="banknumber"
          lessSpace
          defaultValue={''}
          type={'text'}
          ref={register({ required: true })}
          error={errors && errors.banknumber && "Please enter the correct account number"}
        />

        <p className={cx("mt-10 mb-2", styles.bankP)}>Confirm account number</p>
        <InputField
          onChange={handleChange}
          className={cx(styles.inputField)}
          inputClassName={cx(styles.inputFieldInput)}
          placeholder="Confirm bank account number"
          name="rebanknumber"
          lessSpace
          defaultValue={''}
          type={'text'}
          ref={register({ required: true })}
          error={errors && errors.rebanknumber && "Account number does not match"}
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
        </Button>
        }
      </form>
    </div>
  )
}

BankView.propTypes = {
  className: PropTypes.string,
  onNext: PropTypes.func
};

export default BankView;
