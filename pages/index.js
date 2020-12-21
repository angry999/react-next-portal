import React, { useEffect } from "react";
// import { gql, useQuery } from "@apollo/client";
import Layout from "../components/Layout/MainLayout";
import SignIn from "../components/SignIn";
import { useSelector } from 'react-redux';
import Router from "next/router";

const Home = ({ hash }) => {
  const account = useSelector((state) => state.account);

  useEffect(() => {
    if (account.user) {
      Router.push('/portal')
    }
  }, []);

  // if (!account.user)
  //   return <p className="text-center mt-64">Loading...</p>;

  return (
    <Layout title="Jalesh Agent Portal" hash={hash} action={'signup'}>
      <main className="bg-auto">
        <SignIn />
      </main>
    </Layout>
  );
};

Home.getInitialProps = () => ({ hash: (process.env.GIT_HASH || "").trim() });

export default Home;
