import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.svg'

const Header = ({ is_home_page }) => {
    return (
        <>
            <header>
                <nav className="px-4 lg:px-6 py-2.5 my-6">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <Link to="/" className="flex items-center">
                            <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Tech Jobs" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap">Tech Jobs</span>
                        </Link>
                        <Link to={`${is_home_page ? "/create/job" : "/"}`} className={`block bg-blue-600 rounded py-2 text-md text-white hover:bg-blue-400 ${is_home_page ? "px-2" : "px-6"}`}>{is_home_page ? "Create Job" : "Jobs"}</Link>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header