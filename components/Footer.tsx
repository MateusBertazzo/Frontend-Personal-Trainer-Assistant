import { IoMdAddCircle } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";
import { MdExitToApp } from "react-icons/md";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


function Footer() {

    const router = useRouter();

    async function handleLogout() {
        await signOut({
            redirect: false,
        });

        router.replace('/');
    }

    return (
        <footer className="bg-[var(--orange)] w-60 flex items-center justify-between text-white rounded-full px-6 py-3 self-center bottom-1 fixed">
            <GoHomeFill className='text-4xl cursor-pointer hover:bg-orange-400 transition-all duration-500 ease-in-out font-bold' />
            <IoMdAddCircle className='text-4xl cursor-pointer hover:bg-orange-400 transition-all duration-500 ease-in-out font-bold' />
            <MdExitToApp className='text-4xl cursor-pointer hover:bg-orange-400 transition-all duration-500 ease-in-out font-bold' onClick={handleLogout}/>
        </footer>
    );
}

export default Footer;