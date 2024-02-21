import { IoSearch } from "react-icons/io5";


function SearchBar() {
    return (
        <div className="relative flex items-center">
            <IoSearch size={28} className="absolute left-2 text-gray-400" />
            <input
            type="text"
            className="w-full h-10 border border-gray-300 rounded-full bg-gray-200 pl-10 outline-none"
            />
        </div>
        
    );
}

export default SearchBar;