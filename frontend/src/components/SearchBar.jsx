
import { BsSearch } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { useRef, useEffect } from "react";

const SearchBar = ({ setSmallScreenVisibility, smallScreenVisibility }) => {
    const navigate = useNavigate();
    const searchRef = useRef(null);

    // Call this function when enter key is clicked in search bar
    const handleEnter = (event) => {
        if (event.key === "Enter") {
            navigate(`/entry/${searchRef.current.value}`);
            searchRef.current.value = "";
        }
    }

    // Show search bar in small screen and set the focus on it
    const handleSearchClick = () => {
        setSmallScreenVisibility(true);
        searchRef.current.focus();
    }

    useEffect(() => {
        searchRef.current.focus();
    }, [smallScreenVisibility])

    return (
        <div className={`flex items-center justify-start rounded-xl
                        bg-text overflow-hidden 
                        w-full sm:w-80
                        px-4 
                        py-2
                        gap-4`}
            onClick={handleSearchClick}>
            <BsSearch className="fill-secondary
                                 text-lg flex-shrink-0 hover:cursor-text
                                 " />
            <input type="text"
                ref={searchRef}
                placeholder="Search Your Entry"
                onKeyDown={handleEnter}
                className={`outline-none
                            w-auto
                            max-w-[25ch]
                            block`} />
        </div>
    )
}

export default SearchBar