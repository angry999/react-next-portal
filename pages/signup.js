import React, { useState, useEffect } from "react";
// import { gql, useQuery } from "@apollo/client";
import Layout from "../components/Layout/MainLayout";
import SignUp from "../components/SignUp";


const Home = ({ hash }) => {

  return (
    <Layout title="Jalesh Agent Portal" hash={hash} action={'signin'}>
      <main className="bg-auto">
        <SignUp />
      </main>
    </Layout>
  );
};

Home.getInitialProps = () => ({ hash: (process.env.GIT_HASH || "").trim() });

export default Home;
