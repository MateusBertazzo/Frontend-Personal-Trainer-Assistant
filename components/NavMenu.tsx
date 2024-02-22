import Image from "next/image";
import { MdAccountCircle } from "react-icons/md";


function NavMenu() {
    return (
        
        <nav className="w-screen h-16 border-b-2 flex justify-between px-2 py-2">
            <Image 
            src="/logo.png" 
            alt="logo" 
            width={80} 
            height={100}
            />
            <div className="flex gap-1 items-center">
                <p>Nome</p>
                <MdAccountCircle size={30} />
            </div>
        </nav>
    );
}

export default NavMenu;