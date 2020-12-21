import React, { useState, useEffect } from "react";
import cx from "classnames";
import Button from "../Button/Button";
import InputField from "../Form/InputField";
import PhoneField from "../Form/PhoneField";
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';
import styles from "./SignUp.module.scss";

import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  name,
  phone,
  email
} from "../../utils/validations";

function ContactView({
  children,
  theme,
  className,
  onNext,
  handleSdata,
  handlePhone,
  ...rest
}) {

  const [contact, setContact] = useState({
    email: null,
    phone: null,
    name: null
  })
  const [isSubmit, setIsSubmit] = useState(false)
  const [checkIcon, setCheckIcon] = useState(false)

  useEffect(() => {
    if (contact.email && contact.name && contact.phone && checkIcon) {
      setIsSubmit(true)
    } else {
      setIsSubmit(false)
    }
  }, [contact]);

  const joiObject = {};
  joiObject[`name`] = name;
  joiObject[`phone`] = phone;
  joiObject[`email`] = email;
  // console.log(joiObject)

  const { register, errors, handleSubmit, setError } = useForm({
    resolver: joiResolver(Joi.object(joiObject)),
  });

  const handleChange = (e) => {
    handleSdata(e)
    setContact({ ...contact, [e.target.name]: e.target.value })
    if (e.target.name === 'phone' || e.target.name === undefined) {
      setContact({ ...contact, phone: e.target.value })
      handlePhone(e.target.value)
      if (e.target.value.split(" ")[1].length > 6)
        setCheckIcon(true)
      else
        setCheckIcon(false)
    }
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
        <p className={cx(styles.rtitle)}>Contact Information</p>
        <p className={cx("mt-8 mb-4", styles.rdesc)}>Preferred mobile for communication</p>
        <PhoneField
          onChange={handleChange}
          placeholder="Enter mobile number"
          name="phone"
          defaultValue={''}
          ref={register({ required: true })}
          lessSpace
          className={cx("mt-8", styles.phonefield)}
          checkIcon={checkIcon}
          error={errors && errors.phone && "Please enter a correct phone number"}
        />

        <p className={cx("mt-8 mb-4", styles.rdesc)}>Preferred email</p>
        <InputField
          icon="fal fa-envelope"
          onChange={handleChange}
          className={cx(styles.inputField)}
          inputClassName={cx(styles.inputFieldInput)}
          placeholder="Enter your valid email address"
          name="email"
          lessSpace
          defaultValue={''}
          type={'email'}
          ref={register({ required: true })}
          error={errors && errors.email && "Please enter your email"}
        />

        <p className={cx("mt-8 mb-4", styles.rdesc)}>Contact person</p>
        <InputField
          icon="fal fa-user"
          onChange={handleChange}
          className={cx(styles.inputField)}
          inputClassName={cx(styles.inputFieldInput)}
          placeholder="Enter your full name"
          name="name"
          lessSpace
          defaultValue={''}
          type={'text'}
          ref={register({ required: true })}
          error={errors && errors.name && "Please enter your name"}
        />
        {isSubmit ?
          <Button
            className={cx(styles.rbtnEnable)}
          // onClick={handleContinue}
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

ContactView.propTypes = {
  className: PropTypes.string,
  onNext: PropTypes.func
};

export default ContactView;
