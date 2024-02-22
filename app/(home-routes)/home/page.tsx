'use client'

import NavMenu from '../../components/NavMenu';
import SearchBar from '../../components/SearchBar';
import Students from '../../components/Students';
import Footer from '../../components/Footer';
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "../../api/auth/[...nextauth]/route"

export default async function page() {

    const session = await getServerSession(nextAuthOptions)
    
    
    return (
        <div className='flex flex-col'>
            <NavMenu />
            <div className='flex flex-col gap-4 px-2 mt-4'>
                <SearchBar />
                <Students />
            </div>
            <Footer />
        </div>
    );
}