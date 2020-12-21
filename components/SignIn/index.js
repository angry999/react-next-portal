import React from "react";
import cx from "classnames";
import LeftView from "./LeftView";
import RightView from "./RightView";
import styles from "./SignIn.module.scss";
import { useRouter } from 'next/router'
import Router from "next/router";

function SignIn({
  children,
  theme,
  className,
  ...rest
}) {
  
  const handleSubmitSuccess = () => {
    console.log('go to dashboard')
    // const router = useRouter()
    Router.push("/portal")

    // goTo(router, "/portal")
  };

  return (
    <div
      className={cx(styles.container)}
      {...rest}
    >
      <div className={cx(styles.containerItem)}>
        <LeftView />
      </div>
      <div className={cx(styles.containerItem)}>
        <RightView handleSubmitSuccess={handleSubmitSuccess} />
      </div>
    </div>
  )
}

export default SignIn;
