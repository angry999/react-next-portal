import React, { useState, useEffect } from "react";
// import { gql, useQuery } from "@apollo/client";
import Layout from "../components/Layout/MainLayout";
import SignIn from "../components/SignIn";

const Home = ({ hash }) => {

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
