import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
Mail,
Phone,
MapPin,
ArrowUp,
Send,
} from 'lucide-react';

// Type definitions
interface NavLink {
label: string;
href: string;
}

interface SocialIcon {
icon: React.ReactNode;
href: string;
label: string;
}

interface ContactInfo {
icon: React.ReactNode;
label: string;
value: string;
}

// Footer Component
export default function Footer() {
const [email, setEmail] = useState('');
const [isSubmitted, setIsSubmitted] = useState(false);
const [showBackToTop, setShowBackToTop] = useState(false);

// Handle scroll for back-to-top button visibility
React.useEffect(() => {
    const handleScroll = () => {
        setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
}, []);

// Smooth scroll to top
const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Handle newsletter subscription
const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
        setIsSubmitted(true);
        setEmail('');
        setTimeout(() => setIsSubmitted(false), 3000);
    }
};

// Navigation links data
const navLinks: NavLink[] = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Traditions', href: '#traditions' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
];

// Social media icons data
const socialIcons: SocialIcon[] = [
    {
        icon: <Mail size={20} />,
        href: 'https://facebook.com',
        label: 'Facebook',
    },
    {
        icon: <Mail size={20} />,
        href: 'https://instagram.com',
        label: 'Instagram',
    },
    {
        icon: <Mail size={20} />,
        href: 'https://twitter.com',
        label: 'Twitter',
    },
    {
        icon: <Mail size={20} />,
        href: 'https://linkedin.com',
        label: 'LinkedIn',
    },
];

// Contact information data
const contactInfo: ContactInfo[] = [
    {
        icon: <Mail size={20} />,
        label: 'Email',
        value: 'info@pakistaniheritage.com',
    },
    { icon: <Phone size={20} />, label: 'Phone', value: '+92 (300) 1234567' },
    {
        icon: <MapPin size={20} />,
        label: 'Address',
        value: 'Islamabad, Pakistan',
    },
];

// Animation variants for Framer Motion
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, easing: 'easeOut' },
    },
};

const socialIconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5 },
    },
    hover: {
        scale: 1.2,
        rotate: 5,
        transition: { duration: 0.3 },
    },
};

return (
    <footer className="relative bg-linear-to-b from-slate-50 to-slate-100 pt-16 pb-8">
        {/* Decorative top border with Pakistani cultural pattern */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-600 via-green-500 to-emerald-600" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Main Footer Grid - Responsive layout */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
            >
                {/* Brand Section */}
                <motion.div variants={itemVariants} className="space-y-4">
                    <div className="font-chillax">
                        <h3 className="text-2xl font-bold text-emerald-700 mb-2">
                            روایت
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Exploring the rich tapestry of Pakistani traditions, culture, and
                            heritage through storytelling and celebration.
                        </p>
                    </div>
                </motion.div>

                {/* Quick Navigation */}
                <motion.nav variants={itemVariants} className="space-y-4">
                    <h4 className="font-chillax text-lg font-semibold text-slate-900">
                        Quick Links
                    </h4>
                    <ul className="space-y-2">
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    className="font-chillax text-slate-600 hover:text-emerald-600 transition-colors duration-300 text-sm underline-offset-2 hover:underline"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </motion.nav>

                {/* Contact Information */}
                <motion.div variants={itemVariants} className="space-y-4">
                    <h4 className="font-chillax text-lg font-semibold text-slate-900">
                        Contact Us
                    </h4>
                    <ul className="space-y-3">
                        {contactInfo.map((info) => (
                            <li key={info.label} className="flex items-start gap-3">
                                <span className="text-emerald-600 mt-1 shrink-0">
                                    {info.icon}
                                </span>
                                <div className="font-chillax text-sm">
                                    <p className="text-slate-500">{info.label}</p>
                                    <p className="text-slate-700 font-medium">{info.value}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Newsletter Subscription */}
                <motion.div variants={itemVariants} className="space-y-4">
                    <h4 className="font-chillax text-lg font-semibold text-slate-900">
                        Newsletter
                    </h4>
                    <p className="font-chillax text-sm text-slate-600">
                        Subscribe to receive updates about traditions and cultural events.
                    </p>
                    <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                        <motion.input
                            variants={itemVariants}
                            type="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="font-chillax w-full px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 text-sm"
                            aria-label="Email for newsletter subscription"
                        />
                        <motion.button
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={isSubmitted}
                            className="font-chillax w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                            aria-label="Subscribe to newsletter"
                        >
                            {isSubmitted ? (
                                <span>✓ Subscribed</span>
                            ) : (
                                <>
                                    Subscribe
                                    <Send size={16} />
                                </>
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            </motion.div>

            {/* Social Media Section */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex justify-center gap-6 py-8 border-y border-slate-200"
            >
                {socialIcons.map((social) => (
                    <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={socialIconVariants}
                        whileHover="hover"
                        className="text-slate-600 hover:text-emerald-600 transition-colors duration-300"
                        aria-label={`Follow us on ${social.label}`}
                    >
                        {social.icon}
                    </motion.a>
                ))}
            </motion.div>

            {/* Bottom Section */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4"
            >
                {/* Copyright Notice */}
                <motion.div variants={itemVariants} className="text-center md:text-left">
                    <p className="font-chillax text-sm text-slate-600">
                        &copy; {new Date().getFullYear()} Pakistani Heritage. All rights
                        reserved.
                    </p>
                </motion.div>

                {/* Back to Top Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: showBackToTop ? 1 : 0,
                        y: showBackToTop ? 0 : 20,
                        pointerEvents: showBackToTop ? 'auto' : 'none',
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={scrollToTop}
                    className="text-emerald-600 hover:text-emerald-700 transition-colors duration-300 flex items-center gap-2"
                    aria-label="Back to top"
                >
                    <span className="font-chillax text-sm font-medium">Back to Top</span>
                    <ArrowUp size={18} />
                </motion.button>
            </motion.div>
        </div>
    </footer>
);
}