
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar';
import { useState } from 'react';

const Navbar = () => {

    const [showSearchBar, setShowSearchBar] = useState(false);

    return (
        <div className=' bg-lighter-bg flex sticky top-0 left-0 justify-center z-10'>
            <header className='flex  w-full justify-between max-w-7xl
                               flex-col sm:flex-row
                               gap-4
                               px-4 sm:px-8 
                               py-4 sm:py-6'>
                <div className="flex">
                    <Link to="/">
                        <h1 className={`font-bold font-heading
                                        text-3xl lg:text-4xl`}
                        >Modern Misery</h1>
                    </Link>
                </div>
                <SearchBar setSmallScreenVisibility={setShowSearchBar}
                    smallScreenVisibility={showSearchBar}></SearchBar>
            </header>
        </div >
    )
}

export default Navbar;