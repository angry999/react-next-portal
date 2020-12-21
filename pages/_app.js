import React from "react";
import { ApolloProvider } from "@apollo/client";
import { PageTransition } from "next-page-transitions";
import apolloClient from "../store/ApolloClient";
import Auth from '../components/Auth';
import { Provider } from 'react-redux';
import { configureStore } from '../store';
import '../mock';

import "../styles/globals.scss";


function MyApp({ Component, pageProps, router }) {

  const store = configureStore();

  return (
    <PageTransition timeout={300} classNames="page-transition">
      <ApolloProvider client={apolloClient} key={router.route}>
        <Provider store={store}>
          <Auth>
            <Component {...pageProps} />
          </Auth>
        </Provider>
      </ApolloProvider>
    </PageTransition>
  );
}

export default MyApp;
