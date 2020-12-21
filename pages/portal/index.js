import React, { useState, useEffect } from "react";
// import { gql, useQuery } from "@apollo/client";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import styles from "./dashboard.module.scss";
import { useSelector } from 'react-redux';
import Router from "next/router";
import LoadingIcon from "../../components/Loading/LoadingIcon";


function Dashboard({ hash }) {
    const account = useSelector((state) => state.account);
    useEffect(() => {
        if (!account.user) {
            Router.push('/login')
        }
    }, []);

    if (!account.user)
        return <div className="mt-64"><LoadingIcon /></div>

    return (
        <DashboardLayout title="Jalesh Agent Portal" hash={hash} action={'signout'} fname={"Shivam Dubey"} lname={"ShivaM TRAVELS"}>
            <div className={styles.pcontainer}>
                <p className={styles.ptitle}>FIT Booking</p>
                <p className={styles.pitem}>Choose by cruise route</p>
                <p className={styles.pitem} style={{ marginTop: '40px' }}>Choose by calendar</p>
            </div>
        </DashboardLayout>
    );
};

Dashboard.getInitialProps = () => ({ hash: (process.env.GIT_HASH || "").trim() });

export default Dashboard;
