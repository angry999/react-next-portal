import React from 'react';
import PropTypes from 'prop-types';
import Head from "next/head";
import Header from "../../Header/Header";

import styles from "../Layout.module.css";

function MainLayout({ children, title, description, keywords, hash, action }) {

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <title>{title} | Jalesh.com</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="version" content={hash} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#500E4B" />
      </Head>
      <Header action={action}/>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.any
};

export default MainLayout;
