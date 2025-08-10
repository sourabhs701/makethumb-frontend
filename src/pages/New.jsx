import React from 'react';
import { Header } from '@/components/layout/Header';
import Import_Git_Repository from '@/Sections/Import_Git_Repository';


const New = () => {

    return (
        <div className="min-h-screen">
            <Header />
            <Import_Git_Repository />
        </div>
    )
}

export default New;