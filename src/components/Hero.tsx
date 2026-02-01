'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';


interface HeroProps {
    onExploreClick?: () => void;
    onLearnMoreClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExploreClick, onLearnMoreClick }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' as const },
        },
    };

    const buttonVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' as const },
        },
        hover: { scale: 1.05, transition: { duration: 0.3 } },
    };

    const scrollIndicatorVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay: 1.2, ease: 'easeOut' as const },
        },
    };

    const bounceVariants = {
        animate: {
            y: [0, 8, 0],
            transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const },
        },
    };

    const decorativeShapeVariants = {
        animate: {
            rotate: 360,
            transition: { duration: 20, repeat: Infinity, ease: 'linear' as const },
        },
    };

    return (
        <div className="relative w-full min-h-screen overflow-hidden bg-linear-to-br from-emerald-50 via-orange-50 to-red-50">
            {/* Animated Background Decorative Elements */}
            <motion.div
                className="absolute top-10 right-10 w-64 h-64 bg-linear-to-br from-emerald-400 to-emerald-600 rounded-full opacity-10 blur-3xl"
                variants={decorativeShapeVariants}
                animate="animate"
            />
            <motion.div
                className="absolute bottom-20 left-10 w-80 h-80 bg-linear-to-tr from-orange-400 to-red-500 rounded-full opacity-10 blur-3xl"
                variants={decorativeShapeVariants}
                animate="animate"
                style={{ animationDirection: 'reverse' }}
            />

            {/* Background Image with Parallax Effect */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><pattern id="pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse"><path d="M100,0 Q150,50 100,100 Q50,50 100,0" fill="none" stroke="%23059669" stroke-width="2" opacity="0.15"/><circle cx="50" cy="50" r="8" fill="%23ea580c" opacity="0.2"/><rect x="150" y="150" width="30" height="30" fill="%23dc2626" opacity="0.1" transform="rotate(45 165 165)"/></pattern></defs><rect width="1200" height="800" fill="none"/><rect width="1200" height="800" fill="url(%23pattern)"/></svg>')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 8, ease: 'easeOut' }}
            />

            {/* Content Container */}
            <div className="relative z-10 h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-4xl mx-auto text-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Main Headline */}
                    <motion.h1
                        className="font-chillax text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-gray-900 leading-tight"
                        variants={itemVariants}
                    >
                        Discover the <span className="bg-linear-to-r from-emerald-600 via-orange-500 to-red-600 bg-clip-text text-transparent">Soul of Pakistan</span>
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p
                        className="font-chillax text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed"
                        variants={itemVariants}
                    >
                        Experience the rich tapestry of traditions, vibrant festivals, and timeless cultural heritage that defines our beautiful nation
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
                        variants={itemVariants}
                    >
                        {/* Primary Button */}
                        <motion.button
                            className="px-8 sm:px-10 py-3 sm:py-4 bg-linear-to-r from-emerald-600 to-emerald-700 text-white font-chillax text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                            variants={buttonVariants}
                            whileHover="hover"
                            onClick={onExploreClick}
                        >
                            <span className="relative z-10">Explore Culture</span>
                            <motion.div
                                className="absolute inset-0 bg-linear-to-r from-emerald-700 to-emerald-800 -z-10"
                                initial={{ x: '100%' }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.button>

                        {/* Secondary Button */}
                        <motion.button
                            className="px-8 sm:px-10 py-3 sm:py-4 border-2 border-orange-600 text-orange-600 font-chillax text-base sm:text-lg font-semibold rounded-lg hover:bg-orange-50 transition-all duration-300"
                            variants={buttonVariants}
                            whileHover="hover"
                            onClick={onLearnMoreClick}
                        >
                            Learn More
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Down Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
                variants={scrollIndicatorVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={bounceVariants} animate="animate">
                    <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" strokeWidth={2.5} />
                </motion.div>
            </motion.div>

            {/* Cultural Accent Line */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-600 via-orange-500 to-red-600"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
            />
        </div>
    );
};

export default Hero;