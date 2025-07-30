import React from 'react';
import { Header } from '@/components/Header';
import Hero from '@/components/Hero';
import Community from '@/components/Community';

const Home = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <Hero />
            {/* <Community /> */}
        </div>
    )
}

export default Home;