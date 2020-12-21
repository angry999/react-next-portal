import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import cx from "classnames";
import Button from "../Button/Button";
import PropTypes from 'prop-types';
import Link from "next/link";
import styles from "./SignUp.module.scss";
import Router from "next/router";
import { login, register } from '../../actions/accountActions';

function AllSetView({
  children,
  theme,
  className,
  onComplete,
  sdata,
  ...rest
}) {

  const dispatch = useDispatch();

  // demo login
  const handleSubmit = async () => {
    try {
      // await dispatch(register(sdata));
      await dispatch(login('+91 1234567', '1234'));
      Router.push("/portal")

    } catch (error) {
      const message = (error.response && error.response.data.message) || 'Something went wrong';
      console.log('error===>', error, message)
    }
  }

  return (
    <div
      className={cx("text-center", styles.rcontainer, styles.ml300)}
      {...rest}
    >
      <p className={cx("text-center mt-32", styles.completetitle)}>You are all set!</p>
      <Link href='/portal'>
        <div>
          <Button
            className={cx(styles.btnComplete)}
            onClick={handleSubmit}
          >
            Access Your Dashboard
          </Button>
        </div>
      </Link>

    </div>
  )
}

AllSetView.propTypes = {
  className: PropTypes.string
};

export default AllSetView;
