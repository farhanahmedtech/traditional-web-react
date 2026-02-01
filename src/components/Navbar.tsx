import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

'use client';


interface NavItem {
    label: string;
    href: string;
    id: string;
}

const navItems: NavItem[] = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Traditions', href: '#traditions', id: 'traditions' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'Contact', href: '#contact', id: 'contact' },
];

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeItem, setActiveItem] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleNavClick = (id: string) => {
        setActiveItem(id);
        setIsOpen(false);
    };

    return (
        <nav 
            className={`fixed top-0 navbar-font left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? 'bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 shadow-lg backdrop-blur-md'
                : 'bg-gradient-to-r from-amber-900/80 via-amber-800/80 to-amber-900/80 backdrop-blur-sm'
                }`}
            role="navigation"
            aria-label="Main navigation"
        >
            {/* Decorative Pattern Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-orange-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
            </div>

            {/* Islamic Geometric Pattern SVG */}
            <svg
                className="absolute inset-0 w-full h-full opacity-5 pointer-events-none"
                viewBox="0 0 1200 80"
                preserveAspectRatio="none"
            >
                <defs>
                    <pattern id="geometric" x="0" y="0" width="100" height="80" patternUnits="userSpaceOnUse">
                        <path d="M0,40 L25,20 L50,40 L25,60 Z" fill="currentColor" />
                        <path d="M50,40 L75,20 L100,40 L75,60 Z" fill="currentColor" />
                    </pattern>
                </defs>
                <rect width="1200" height="80" fill="url(#geometric)" />
            </svg>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0 group cursor-pointer">
                        <a
                            href="#"
                            className="flex items-center space-x-2 transition-transform duration-300 group-hover:scale-105"
                            aria-label="Pakistan Heritage Home"
                        >
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-lg">ᴘ</span>
                            </div>
                            <span
                                className="hidden sm:block text-xl font-bold text-amber-50 bg-gradient-to-r from-amber-50 to-orange-200 bg-clip-text text-transparent"
                            >
                                Miraaś
                            </span>
                        </a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                href={item.href}
                                onClick={() => handleNavClick(item.id)}
                                className="relative px-3 py-2 text-amber-50 transition-colors duration-300 group"
                                role="menuitem"
                            >
                                {item.label}
                                <span
                                    className={`absolute bottom-1 left-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-400 transition-all duration-300 ${activeItem === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                                        }`}
                                ></span>
                            </a>
                        ))}
                    </div>

                    {/* CTA Button & Hamburger */}
                    <div className="flex items-center space-x-4">
                        <button
                            className="hidden sm:inline-flex px-6 py-2 bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                            aria-label="Explore our traditions"
                        >
                            Explore
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMenu}
                            className="md:hidden p-2 rounded-lg hover:bg-amber-700/50 transition-colors duration-200"
                            aria-label={isOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isOpen}
                        >
                            {isOpen ? (
                                <X className="w-6 h-6 text-amber-50" />
                            ) : (
                                <Menu className="w-6 h-6 text-amber-50" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="px-2 pt-2 pb-4 space-y-1 bg-amber-950/50 backdrop-blur-sm rounded-b-lg border-t border-amber-700/30">
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                href={item.href}
                                onClick={() => handleNavClick(item.id)}
                                className={`block px-4 py-3 rounded-lg transition-all duration-200 ${activeItem === item.id
                                    ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white'
                                    : 'text-amber-50 hover:bg-amber-700/50'
                                    }`}
                                role="menuitem"
                            >
                                {item.label}
                            </a>
                        ))}
                        <button
                            className="w-full mt-4 px-6 py-2 bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-semibold rounded-lg transition-all duration-300"
                        >
                            Explore
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;