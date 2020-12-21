import React, { useState } from "react";
import cx from "classnames";
import Button from "../Button/Button";
import InputField from "../Form/InputField";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import PropTypes from 'prop-types';

import styles from "./SignUp.module.scss";

function PAN1View({
  children,
  theme,
  className,
  onNext,
  handleSdata,
  ...rest
}) {
  const [isSubmit, setIsSubmit] = useState(false)

  const { register, errors, handleSubmit, setError } = useForm({
    resolver: joiResolver(),
  });

  const handleChange = (e) => {
    handleSdata(e)
    if (e.target.value.length === 10)
      setIsSubmit(true)
    else
      setIsSubmit(false)
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
      <p className={cx(styles.rtitle)}>PAN</p>
      <p className={cx("mt-8 mb-4", styles.rdesc)}>Please enter your PAN</p>

      <InputField
        onChange={handleChange}
        className={cx(styles.inputField)}
        inputClassName={cx(styles.inputFieldInput)}
        placeholder="Enter 10-digit PAN"
        name="pan"
        lessSpace
        defaultValue={''}
        type={'text'}
        ref={register({ required: true })}
      />
      {isSubmit ?
        <Button
          className={cx(styles.rbtnEnable)}
          onClick={handleContinue}
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
    </div>
  )
}

PAN1View.propTypes = {
  className: PropTypes.string,
  onNext: PropTypes.func
};

export default PAN1View;
