import { IoMdAddCircle } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";
import { MdExitToApp } from "react-icons/md";


function Footer() {
    return (
        <footer className="bg-[var(--orange)] w-60 flex items-center justify-between text-white rounded-full px-6 py-3 self-center bottom-6 fixed">
            <GoHomeFill className='text-4xl' />
            <IoMdAddCircle className='text-4xl' />
            <MdExitToApp className='text-4xl' />
        </footer>
    );
}

export default Footer;