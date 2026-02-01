import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

'use client';


// TypeScript interfaces for type safety and scalability
interface TraditionCard {
    id: number;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    category: string;
    icon: string;
}

interface AnimationVariants {
    hidden: object;
    visible: object;
    [key: string]: any;
}

// Tradition data - easily scalable to add more items
const TRADITIONS: TraditionCard[] = [
    {
        id: 1,
        title: 'Eid Celebrations',
        description: 'Islamic festivals celebrated with joy, family gatherings, and traditional feasts.',
        longDescription:
            'Eid is celebrated twice yearly with elaborate preparations, new clothes, prayers, and family reunions. It represents unity and devotion in Pakistani culture.',
        image: 'https://birthdayking.pk/wp-content/uploads/2025/02/12345.png',
        category: 'Religious',
        icon: '🌙',
    },
    {
        id: 2,
        title: 'Truck Art',
        description: 'Vibrant hand-painted designs on trucks, a unique Pakistani artistic tradition.',
        longDescription:
            'Truck art is an iconic Pakistani tradition featuring intricate designs, calligraphy, and bright colors that reflect the creativity of local artisans.',
        image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500&h=500&fit=crop',
        category: 'Art',
        icon: '🎨',
    },
    {
        id: 3,
        title: 'Wedding Ceremonies',
        description: 'Multi-day celebrations featuring music, dance, and traditional rituals.',
        longDescription:
            'Pakistani weddings span several days with Mehndi, Baraat, and Walima ceremonies, showcasing rich traditions and family bonding.',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=500&fit=crop',
        category: 'Celebration',
        icon: '💍',
    },
    {
        id: 4,
        title: 'Qawwali Music',
        description: 'Devotional music form that transcends spiritual and emotional boundaries.',
        longDescription:
            'Qawwali is a form of Sufi devotional music that has captivated audiences for centuries with its powerful lyrics and melodic arrangements.',
        image: 'https://www.warwickartscentre.co.uk/images/custom/1b/9a73e862b415219ffb9a36d065ac89/w880/q80/images/uploads/1b9a73e862b415219ffb9a36d065ac89.JPG',
        category: 'Music',
        icon: '🎵',
    },
    {
        id: 5,
        title: 'Embroidery Crafts',
        description: 'Intricate handmade embroidery with cultural motifs and traditional patterns.',
        longDescription:
            'Pakistani embroidery is renowned worldwide for its detailed patterns and vibrant threads, representing centuries of artistic heritage.',
        image: 'https://a.storyblok.com/f/165154/1280x720/c9045c00ec/hero-image_1280x720.jpg',
        category: 'Craft',
        icon: '🧵',
    },
    {
        id: 6,
        title: 'Sufi Dances',
        description: 'Spiritual movements and traditional dances rooted in Islamic mysticism.',
        longDescription:
            'Sufi dances, including the famous whirling dervish traditions, are performed as spiritual practices connecting devotees to the divine.',
        image: 'https://livesinasia.com/wp-content/uploads/2020/01/Ph_Whirling_Dervishes_at_Hodjapasha.jpg',
        category: 'Performance',
        icon: '💫',
    },
];

// Animation variants for Framer Motion - reusable throughout component
const containerVariants: AnimationVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: AnimationVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};

const headingVariants: AnimationVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: 'easeOut',
        },
    },
};

// Individual Tradition Card Component
const TraditionCardComponent: React.FC<{
    tradition: TraditionCard;
    index: number;
}> = ({ tradition }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="group h-full"
        >
            <div className="h-full bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl border border-amber-100">
                {/* Card Image Container */}
                <div className="relative overflow-hidden h-48 bg-linear-to-br from-amber-50 to-orange-50">
                    <motion.img
                        src={tradition.image}
                        alt={tradition.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-3 right-3 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {tradition.category}
                    </div>
                    {/* Icon Overlay */}
                    <div className="absolute top-3 left-3 text-3xl bg-white bg-opacity-90 rounded-full w-12 h-12 flex items-center justify-center">
                        {tradition.icon}
                    </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                    <h3 className="font-chillax text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {tradition.title}
                    </h3>
                    <p className="font-chillax text-sm text-gray-600 mb-4 line-clamp-2">
                        {tradition.description}
                    </p>

                    {/* Expandable Description */}
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                            opacity: isExpanded ? 1 : 0,
                            height: isExpanded ? 'auto' : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="mb-4 overflow-hidden"
                    >
                        <p className="font-chillax text-xs text-gray-500 mt-2 pt-2 border-t border-gray-200">
                            {tradition.longDescription}
                        </p>
                    </motion.div>

                    {/* Read More Button */}
                    <motion.button
                        onClick={() => setIsExpanded(!isExpanded)}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="font-chillax inline-flex items-center text-amber-700 font-semibold hover:text-amber-900 transition-colors text-sm"
                    >
                        {isExpanded ? 'Show Less' : 'Read More'}
                        <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

// Main Traditions Section Component
export default function TraditionsSection(): React.ReactElement {

    return (
        <section className="relative w-full py-16 md:py-24 overflow-hidden">
            {/* Background with cultural inspiration */}
            <div className="absolute inset-0 bg-linear-to-b from-amber-50 via-orange-50 to-white">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl"></div>
                </div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Heading with Animation */}
                <motion.div
                    variants={headingVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="text-center mb-12 md:mb-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="inline-block mb-4"
                    >
                        <span className="text-4xl">🇵🇰</span>
                    </motion.div>
                    <h2 className="font-chillax text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Our Traditions
                    </h2>
                    <p className="font-chillax text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Discover the vibrant tapestry of Pakistani culture, celebrations, and timeless traditions
                        that connect generations and embody our rich heritage.
                    </p>
                </motion.div>

                {/* Cards Grid - Responsive layout */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12"
                >
                    {TRADITIONS.map((tradition, index) => (
                        <TraditionCardComponent
                            key={tradition.id}
                            tradition={tradition}
                            index={index}
                        />
                    ))}
                </motion.div>

                {/* CTA Button Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <motion.button
                        whileHover={{
                            scale: 1.05,
                            boxShadow: '0 20px 40px rgba(217, 119, 6, 0.3)',
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="font-chillax px-8 py-4 bg-linear-to-r from-amber-600 to-orange-600 text-white font-bold rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-amber-300"
                    >
                        Explore More Traditions
                        <span className="ml-2">→</span>
                    </motion.button>
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute top-10 right-10 text-6xl opacity-10 pointer-events-none"
            >
                🎨
            </motion.div>
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute bottom-10 left-10 text-6xl opacity-10 pointer-events-none"
            >
                🎵
            </motion.div>
        </section>
    );
}