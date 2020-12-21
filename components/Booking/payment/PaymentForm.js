import React from "react";
import cx from "classnames";
import Button from "../../Button/Button";
import LoadingIcon from "../../Loading/LoadingIcon";
import styles from "../../SignUp//SignUp.module.scss";

const PaymentForm = ({
  children,
  buttonText = "Make Payment",
  submitted,
  btnEnable,
  className,
  ...rest
}) => (
    <form className={cx("pt-2 pb-4", className)} {...rest}>
      {children}
      {btnEnable ? <Button
        className={cx("mt-6", styles.rbtnEnable)}
        disabled={submitted}
      >
        {buttonText}
      </Button> : <Button
        className={cx("mt-6", styles.rbtnEnable)}
        disabled={submitted}
      >
          {buttonText}
        </Button>}
      {/* <Button
        style={{
          height: '60px',
          width: '300px',
          fontSize: '24px',
          fontFamily: "Montserrat",
          fontWeight: 400
        }}
        className={cx("mt-6",styles.rbtnEnable)}
        disabled={submitted} 
      >
        {submitted ? <LoadingIcon /> : buttonText}
      </Button> */}
    </form>
  );

export default PaymentForm;
