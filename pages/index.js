import React from 'react';
import Head from 'next/head';
import MainLayout from '../src/layouts/MainLayout';
import HomeScreen from '../src/screens/HomeScreen';

const HomePage = () => {
    return (
        <>
            <Head>
                <title>Blockchain Voting System</title>
            </Head>
            <MainLayout>
                <HomeScreen />
            </MainLayout>
        </>

    )
}

export default HomePage;