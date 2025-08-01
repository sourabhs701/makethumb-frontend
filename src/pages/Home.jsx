import React from 'react';
import { Header } from '@/components/layout/Header';
import Community from '@/Sections/Community';
import DeploySection from '@/Sections/DeploySection';

const Home = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <DeploySection />
            {/* <Community /> */}
        </div>
    )
}

export default Home;