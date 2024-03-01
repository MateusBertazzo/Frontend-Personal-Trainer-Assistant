import Image from "next/image";
import { MdAlternateEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { MdAddCircle } from "react-icons/md";


export default function Detail() {
    return (
        <div className="flex flex-col justify-center items-center bg-gray-200 gap-2">
            <Image 
                src="/students.jpeg"
                alt="foto aluno"
                width={200}
                height={200}
                className="rounded-xl py-4"
            />

            {/*Informações do Aluno */}
            <div className="flex flex-col shadow-md bg-white w-48 gap-2 rounded-md px-2 py-2 ">
                <div className="flex flex-col">
                    <h1 className="font-bold text-orange-600">José, 27 anos</h1>
                    <span className="text-gray-400 text-xs mb-1">Aluno desde 00/00/00</span>
                </div>
                
                <p className="flex items-center gap-1 font-semibold text-sm">
                    <span>
                            <MdAlternateEmail className="text-orange-600"/>
                    </span>
                    Mateus@gmail.com
                </p>

                <p className="flex items-center gap-1 font-semibold text-sm"> 
                    <span>
                        <FaWhatsapp className="text-orange-600"/>
                    </span>
                    55 90102-0304
                </p>
            </div>

            <div className="flex flex-col shadow-md bg-white w-48 gap-2 rounded-md px-2 py-2  ">
                <h2 className="font-semibold">Objetivos</h2>

                <div className="flex gap-2">
                    <span className="self-center px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-orange-600 text-white">Estética</span>
                    <span className="self-center px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-orange-600 text-white">Saúde</span>
                    <MdAddCircle size={24} className="rounded-full"/>
                </div>
            </div>
        </div>
    );
}