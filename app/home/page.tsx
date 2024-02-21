'use client'

import NavMenu from '../components/NavMenu';
import getTokenAndDecode from '../utils/localStorage/getLocalStorage';
import SearchBar from '../components/SearchBar';
import Students from '../components/Students';

export default function page() {
    const tokenDecoded = getTokenAndDecode();
    
    return (
        <div>
            <NavMenu token={tokenDecoded}/>
            <div className='flex flex-col gap-4 px-2 mt-4'>
                <SearchBar />
                <Students />
            </div>
        </div>
    );
}