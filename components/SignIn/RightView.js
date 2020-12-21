import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import cx from "classnames";
import Button from "../Button/Button";
import PhoneField from "../Form/PhoneField";
import OTPField from "../Form/OTPField";
import RadioField from "../Form/RadioField";
// import { useSnackbar } from 'notistack';
import { login } from '../../actions/accountActions';

import styles from "./SignIn.module.scss";

function RightView({
  handleSubmitSuccess,
  ...rest
}) {

  const dispatch = useDispatch();
  const [otpBtnName, setOtpBtnName] = useState('Send OTP')
  const [otp, setOtp] = useState(0)
  const [isSubmit, setIsSubmit] = useState(false)
  const [phone, setPhone] = useState(null)
  const [password, setPassword] = useState(null)
  const [checkIcon, setCheckIcon] = useState(false)
  const [errors, setErrors] = useState(null)
  const [radioOptions, setRadioOptions] = useState([
    { value: "password", label: "Password" }
  ])

  useEffect(() => {
    if (checkIcon) {
      setRadioOptions([
        { value: "password", label: "Password" },
        { value: "otp", label: "OTP" },
      ])
    } else {
      setRadioOptions([
        { value: "password", label: "Password" }
      ])
    }
  }, [checkIcon]);

  // validation for continue
  useEffect(() => {
    if (checkIcon) {
      if (otp === 0 && password) {
        setIsSubmit(true)
      } else if (otp === 2 && password.length > 3) {
        setIsSubmit(true)
      } else {
        setIsSubmit(false)
      }
    } else {
      setIsSubmit(false)
    }
  }, [password, checkIcon, otp]);

  const handleChangePhone = (e) => {
    setErrors(null)
    if (e.target.value.split(" ")[1].length > 6)
      setCheckIcon(true)
    else
      setCheckIcon(false)
    setPhone(e.target.value)
  }

  const handleChangePassword = (e) => {
    setErrors(null)
    setPassword(e.target.value)
    if (phone && password)
      setIsSubmit(true)
  }

  const handleOtpChange = (value) => {
    setErrors(null)
    if (value === 'otp') {
      setOtp(1)
      setOtpBtnName('Send OTP')
      setPassword('')

    } else if (value === 'password') {
      setOtp(0)
      setOtpBtnName('')
      setPassword('')

    } else {
      setOtp(2)
      setOtpBtnName('Re-send OTP')
      setPassword('')
    }
    console.log(value, isSubmit)
  }

  const handleSubmit = async () => {
    if (phone && password) {
      try {
        setErrors(null)
        console.log('start')
        setIsSubmit(false);
        await dispatch(login(phone, password));
        console.log('success')
        handleSubmitSuccess();

      } catch (error) {
        const message = (error.response && error.response.data.message) || 'Something went wrong';
        setErrors(true)
        console.log('error===>', error, message)
        setIsSubmit(true);
      }
    }
    else {
      console.log('Please enter your phone number and password')
    }
  }

  return (
    <div
      className={cx(styles.rcontainer)}
      {...rest}
    >
      <p className={cx(styles.rtitle)}>Sign in</p>
      <PhoneField
        name="phone"
        placeholder="Enter mobile number"
        defaultValue={''}
        onChange={handleChangePhone}
        lessSpace
        className={cx("mt-8", styles.phonefield)}
        checkIcon={checkIcon}
      // error={errors && "Please enter a correct phone number"}
      />
      <div className="mt-12"></div>

      <div className="flex">
        <RadioField
          name={`radio_password`}
          defaultValue={'password'}
          options={radioOptions}
          horizontal
          lessSpace
          inverseError
          handleOtpChange={handleOtpChange}
        />
        {otp > 0 &&
          <button className={cx("ml-8", styles.otpbtn)} onClick={e => handleOtpChange('sent')}>{otpBtnName}</button>
        }
      </div>
      {otp !== 1 &&
        <OTPField
          name="password"
          placeholder="Enter password or OTP"
          onChange={handleChangePassword}
          lessSpace
          className={cx("mt-4", styles.phonefield)}
          defaultValue={""}
        // error={errors && "Please enter a correct password or OTP"}
        />
      }
      {errors && (
        <div className="pb-1">
          <small
            className={cx(
              "absolute text-xs", "text-j-orange"
            )}
          >
            {"Please check your Phone and "}{otp === 0 ? "Password" : "OTP"}
          </small>
        </div>
      )}
      {isSubmit ?
        <Button
          className={cx(styles.rbtnEnable)}
          onClick={handleSubmit}
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

export default RightView;
