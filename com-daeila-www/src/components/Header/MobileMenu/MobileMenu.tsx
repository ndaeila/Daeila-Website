import React from 'react';
import Link from 'next/link';
import { AiOutlineClose } from 'react-icons/ai';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 text-white p-8 pt-16">
            <div className="absolute top-0 right-0 pt-4 pr-4">
                <AiOutlineClose className="cursor-pointer" onClick={onClose} />
            </div>
            <Link href="/" className="block mb-4">Home</Link>
            <Link href="/about" className="block mb-4">About Me</Link>
            <Link href="/projects" className="block mb-4">Projects</Link>
            <Link href="/contact" className="block mb-4">Contact</Link>
            <Link href="/blog" className="block mb-4">Blog</Link>
        </div>
    );
};

export default MobileMenu;