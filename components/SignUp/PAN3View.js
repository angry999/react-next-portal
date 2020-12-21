import React, { useState, useEffect } from "react";
import cx from "classnames";
import Button from "../Button/Button";
import InputField from "../Form/InputField";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import PropTypes from 'prop-types';

import styles from "./SignUp.module.scss";

function PAN3View({
  children,
  theme,
  className,
  onNext,
  handleSdata,
  ...rest
}) {
  const [gst, setGst] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)

  useEffect(() => {
    if (isChecked === true || (!isChecked && gst.length === 10)) {
      setIsSubmit(true)
    } else {
      setIsSubmit(false)
    }
  }, [isChecked, gst]);

  const handleChange = (e) => {
    setGst(e.target.value)
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
      <p className={cx(styles.rtitle)}>GST Information</p>
      <div className="mt-8 mb-4 flex">
        <input
          type="checkbox"
          className={cx(styles.pan3Check)}
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <p className={cx(styles.step2TopP)}>I do not have a GSTIN</p>
      </div>

      {!isChecked &&
        <>
          <p className={cx("mt-8 mb-4", styles.rdesc)}>Please enter your GSTIN</p>
          <InputField
            onChange={handleChange}
            className={cx(styles.inputField)}
            inputClassName={cx(styles.inputFieldInput)}
            placeholder="Enter 10-digit PAN"
            name="gst"
            lessSpace
            defaultValue={''}
            type={'number'}
          />
        </>
      }
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

PAN3View.propTypes = {
  className: PropTypes.string,
  onNext: PropTypes.func
};

export default PAN3View;
