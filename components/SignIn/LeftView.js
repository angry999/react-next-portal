import React from "react";
import cx from "classnames";
import Button from "../Button/Button";
import Link from "next/link";
import styles from "./SignIn.module.scss";

function LeftView({
  children,
  theme,
  className,
  ...rest
}) { 

  return (
    <div
      className={cx(styles.lcontainer)}
      {...rest}
    >
      <p className={cx(styles.ltitle)}>Earn amazing commissions!</p>
      <p className={cx(styles.ldescription)}>Sign up to become an agent for India’s only premium cruise line</p>

      <Link href='/signup'>
        <div>
          <Button className={cx(styles.lbtn)}>Sign Up</Button>
        </div>
      </Link>

    </div>
  )

}

export default LeftView;
