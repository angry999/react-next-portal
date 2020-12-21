import React from 'react';
import PropTypes from 'prop-types';
import Link from "next/link";
import cx from "classnames";

import styles from "../../Layout.module.css";

function MainLayout({ children, title, description, keywords, hash, action }) {

  return (
    <div>
      <div className={styles.navbar}>
        <p className={styles.menu_item_header2}>RESERVATIONS</p>
        <Link href='/'>
          <p className={styles.menu_item} >
            Promotions
          </p>
        </Link>
        <Link href='/'>
          <p className={styles.menu_item_active} >
            FIT Booking
          </p>
        </Link>
        <Link href='/'>
          <p className={styles.menu_item} >
            Group Booking
          </p>
        </Link>
        <Link href='/'>
          <p className={styles.menu_item} >
            Manage Bookings
          </p>
        </Link>
        <Link href='/'>
          <p className={styles.menu_item} >
            Invoices
          </p>
        </Link>

        <p className={cx("mt-19", styles.menu_item_header)}>ACCOUNT</p>
        <Link href='/'>
          <p className={styles.menu_item} >
            User Management
          </p>
        </Link>
        <Link href='/'>
          <p className={styles.menu_item} >
            Account Preferences
          </p>
        </Link>

        <p className={cx("mt-16", styles.menu_item_header2)}>INTEGRATION</p>
        <Link href='/'>
          <p className={styles.menu_item} >
            Jalesh API
          </p>
        </Link>
      </div>
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.any
};

export default MainLayout;
