'use client'

import NavMenu from '../components/NavMenu';
import getTokenAndDecode from '../utils/localStorage/getLocalStorage';
import SearchBar from '../components/SearchBar';
import Students from '../components/Students';
import Footer from '../components/Footer';

export default function page() {
    const tokenDecoded = getTokenAndDecode();
    
    return (
        <div className='flex flex-col'>
            <NavMenu token={tokenDecoded}/>
            <div className='flex flex-col gap-4 px-2 mt-4'>
                <SearchBar />
                <Students />
            </div>
            <Footer />
        </div>
    );
}