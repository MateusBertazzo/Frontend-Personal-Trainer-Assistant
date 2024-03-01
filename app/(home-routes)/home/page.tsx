'use client'

import NavMenu from '../../../components/NavMenu';
import SearchBar from '../../../components/SearchBar';
import Students from '../../../components/Students';
import Footer from '../../../components/Footer';

export default function Home() {
    return (
        <div className='flex flex-col bg-gray-200'>
            <NavMenu />
            <div className='flex flex-col gap-4 px-2 mt-2'>
                <SearchBar />
                <Students />
            </div>
            <Footer />
        </div>
    );
}