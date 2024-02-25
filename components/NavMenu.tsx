import Image from "next/image";
import { MdAccountCircle } from "react-icons/md";
import { useSession } from "next-auth/react";
import DecodedToken from "../app/utils/token/decodedToken";

function NavMenu() {
    const { data: session } = useSession();

    if (!session) {
        return null;
    }

    const token = DecodedToken(session.response)

    return (
        <nav className="w-screen h-24 border-b-2 flex justify-between items-center px-3 py-1">
            <Image 
            src="/logo.png" 
            alt="logo" 
            width={100} 
            height={100}
            />
            <div className="flex gap-2 items-center">
                <p className="font-bold text-xl">{token?.username}</p>
                <MdAccountCircle size={48} />
            </div>
        </nav>
    );
}

export default NavMenu;