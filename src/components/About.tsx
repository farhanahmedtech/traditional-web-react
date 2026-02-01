import { motion } from 'framer-motion';
import type { FC } from 'react';

interface AboutSectionProps {
    title?: string;
    subtitle?: string;
    description?: string;
    imageUrl?: string;
}

const About: FC<AboutSectionProps> = ({
    title = "About Pakistani Heritage",
    subtitle = "Preserving Traditions, Celebrating Culture",
    description = "Pakistan's rich cultural tapestry is woven with centuries of traditions, art, and craftsmanship. From the intricate designs of traditional textiles to the timeless beauty of architectural marvels, our heritage reflects the diversity and resilience of our people. We celebrate these traditions and bring them to the modern world.",
    imageUrl = "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=400&fit=crop",
}) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
    };

    return (
        <section className="min-h-screen bg-linear-to-br from-stone-50 to-amber-50 py-16 px-4 sm:px-6 lg:px-8">
            <motion.div
                className="max-w-6xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {/* Header Section */}
                <div className="mb-12 lg:mb-16">
                    <motion.h2
                        variants={itemVariants}
                        className="font-chillax text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-900 mb-3 tracking-tight"
                    >
                        {title}
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="font-chillax text-xl sm:text-2xl text-amber-700 font-semibold"
                    >
                        {subtitle}
                    </motion.p>
                    <motion.div
                        variants={itemVariants}
                        className="h-1 w-20 bg-linear-to-r from-amber-600 to-orange-500 rounded-full mt-4"
                    />
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Text Content */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <p className="font-chillax text-base sm:text-lg text-stone-700 leading-relaxed">
                            {description}
                        </p>

                        {/* Features List */}
                        <motion.div
                            variants={containerVariants}
                            className="space-y-4 pt-4"
                        >
                            {[
                                "Authentic Traditional Craftsmanship",
                                "Cultural Preservation & Education",
                                "Community-Driven Initiatives",
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="flex items-start gap-4"
                                >
                                    <div className="w-6 h-6 rounded-full bg-amber-600 shrink-0 flex items-center justify-center mt-1">
                                        <span className="text-white text-sm font-bold">✓</span>
                                    </div>
                                    <span className="font-chillax text-stone-700 text-base sm:text-lg">
                                        {feature}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* CTA Button */}
                        <motion.button
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="font-chillax mt-8 px-8 py-3 bg-linear-to-r from-amber-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow duration-300"
                        >
                            Learn More
                        </motion.button>
                    </motion.div>

                    {/* Image Section */}
                    <motion.div
                        variants={imageVariants}
                        className="relative h-80 sm:h-96 lg:h-full min-h-96 rounded-xl overflow-hidden shadow-2xl"
                    >
                        <img
                            src={imageUrl}
                            alt="Pakistani Cultural Heritage"
                            className="w-full h-full object-cover"
                        />
                        <motion.div
                            className="absolute inset-0 bg-linear-to-t from-amber-900/40 to-transparent"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        />
                    </motion.div>
                </div>

                {/* Stats Section */}
                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 lg:mt-20"
                >
                    {[
                        { number: "500+", label: "Artisans" },
                        { number: "1000+", label: "Traditions" },
                        { number: "50+", label: "Regions" },
                        { number: "10K+", label: "Community Members" },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-white/80 backdrop-blur-sm rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow"
                        >
                            <p className="font-chillax text-2xl sm:text-3xl font-bold text-amber-600 mb-2">
                                {stat.number}
                            </p>
                            <p className="font-chillax text-stone-600 text-sm sm:text-base">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default About;