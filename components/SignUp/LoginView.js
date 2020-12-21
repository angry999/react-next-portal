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
  password as pwd,
  repassword as repwd
} from "../../utils/validations";

function LoginView({
  children,
  theme,
  className,
  onNext,
  handleSdata,
  sdata,
  ...rest
}) {
  const [password, setPassword] = useState(null)
  const [repassword, setRepassword] = useState(null)
  const [isSubmit, setIsSubmit] = useState(false)

  useEffect(() => {
    if (password && repassword && password.length > 7 && repassword.length === password.length) {
      setIsSubmit(true)
    } else {
      setIsSubmit(false)
    }
  }, [password, repassword]);

  useEffect(() => {
   console.log(errors)
  }, [errors])

  const joiObject = {};
  joiObject[`password`] = pwd;
  joiObject[`repassword`] = repwd;
  const { register, errors, handleSubmit, setError } = useForm({
    resolver: joiResolver(Joi.object(joiObject)),
  });

  const handleChange = (e) => {
    if (e.target.name === 'password') {
      setPassword(e.target.value)
      handleSdata(e)
    }
    else
      setRepassword(e.target.value)
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

        <p className={cx(styles.rtitle)}>Login Credentials</p>
        <p className={cx("mt-8 mb-4", styles.rdesc)}>{sdata.name}</p>
        <div className={cx(styles.step2Note)}>
          <p className={cx(styles.loginNoteP)}>{sdata.phone}</p>
          <p className={cx(styles.loginNotePs, "pt-2 pb-2")}>OR </p>
          <p className={cx(styles.loginNoteP)}>{sdata.email}</p>
        </div>

        <p className={cx("mt-14 mb-4", styles.rdesc)}>Create a password (min 8 characters)</p>
        <InputField
          icon="fal fa-lock-alt"
          onChange={handleChange}
          className={cx(styles.inputField)}
          inputClassName={cx(styles.inputFieldInput)}
          placeholder="New password"
          name="password"
          lessSpace
          defaultValue={''}
          type={'password'}
          ref={register({ required: true })}
          error={errors && errors.password && "Please enter the correct password"}
        />

        <p className={cx("mt-8 mb-4", styles.rdesc)}>Confirm your password</p>
        <InputField
          icon="fal fa-lock-alt"
          onChange={handleChange}
          className={cx(styles.inputField)}
          inputClassName={cx(styles.inputFieldInput)}
          placeholder="Confirm password"
          name="repassword"
          lessSpace
          defaultValue={''}
          type={'password'}
          ref={register({ required: true })}
          error={errors && errors.repassword && "Password does not match"}
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

LoginView.propTypes = {
  className: PropTypes.string,
  onNext: PropTypes.func
};

export default LoginView;
