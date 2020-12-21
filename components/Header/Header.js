import React from "react";
import cx from "classnames";
import Link from "next/link";
import { logout } from '../../actions/accountActions';
import Button from "../Button/Button";
import Router from "next/router";
import { useDispatch, useSelector } from 'react-redux';

import styles from "./Header.module.css";

const Header = ({ children, style, className, action, fname, lname }) => {

  const dispatch = useDispatch();

  const handleLogout = async () => {
    console.log('sign out')
    try {
      await dispatch(logout());
      Router.push('/')
    } catch (error) {
      console.log('Unable to logout')
    }
  };

  return (
    <>
      <header className={cx(styles.container, className)} style={style}>
        <div className="flex px-7 justify-between w-full">
          <div className="flex">
            <div className={cx(styles.logo, "cursor-pointer")}>
              <Link href="/">
                <img src="/images/logo.png" />
              </Link>
            </div>
            <p className={cx(styles.title)}>Jalesh Agent Portal</p>
          </div>
          <div className="flex">
            <div className={cx(styles.ncontainer)}>
              <p className={cx(styles.fname)}>{fname}</p>
              <p className={cx(styles.lname)}>{lname}</p>
            </div>
            {action === 'signout' ?
              <Button
                className={cx(styles.signOut)}
                onClick={handleLogout}
              >
                sign out
              </Button> :
              (action === 'signup' ?
                <Link href="/signup"><span className={cx(styles.signUp)}>sign up</span></Link>
                :
                <Link href="/"><span className={cx(styles.signUp)}>sign in</span></Link>)
            }
          </div>
        </div>
        {children && (
          <div className="flex px-7 justify-center w-full flex-grow">
            {children}
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
