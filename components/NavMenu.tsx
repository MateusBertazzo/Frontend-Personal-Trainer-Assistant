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
        <nav className="w-screen h-16 border-b-2 flex justify-between px-2 py-2">
            <Image 
            src="/logo.png" 
            alt="logo" 
            width={80} 
            height={100}
            />
            <div className="flex gap-1 items-center">
                <p>{token?.username}</p>
                <MdAccountCircle size={30} />
            </div>
        </nav>
    );
}

export default NavMenu;