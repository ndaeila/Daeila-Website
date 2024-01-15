import React, { useState } from 'react';
import Link from 'next/link'
import Image from 'next/image';

import { FaHome } from 'react-icons/fa'; // Import home icon from react-icons
import { MdMenu } from 'react-icons/md'; // Import menu icon from react-icons
import MobileMenu from './MobileMenu/MobileMenu';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navCSSStyles = {
        height: '80px',
    };

    return (
        <nav style={navCSSStyles} className="fixed top-0 left-0 w-full flex items-center z-10 px-4 font-black bg-silver-rust-950">
            {/* Mobile Home Icon */}
            <div className="flex flex-1 justify-start">
                <Link href="/">
                    <FaHome />
                </Link>
            </div>

            {/* Website Logo */}
            <div className="flex flex-1 justify-center items-center">
                <div className="w-3/4 flex justify-center">
                    <Link href="/">
                        <Image className="filter invert | invert-1"
                            src="/images/Bone-LogoTransparent.png" // Path to your logo image in the public folder
                            alt="Logo"
                            width={256}  // Adjust the size as needed
                            height={256}
                        />
                    </Link>
                </div>
            </div>


            {/* Right Section - Menu Icon and Links */}
            <div className="flex flex-1 justify-end items-center">
                <MdMenu className="md:hidden cursor-pointer" onClick={toggleMenu} />
                <div className="hidden md:flex flex-1 justify-end space-x-4">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/projects">Projects</Link>
                    <Link href="/contact">Contact</Link>
                    <Link href="/blog">Blog</Link>
                    <Link href="/resume">Resume</Link>
                </div>
            </div>

            <MobileMenu isOpen={isMenuOpen} onClose={toggleMenu} />
        </nav>
    );
};

export default NavBar;