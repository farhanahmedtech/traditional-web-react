import React, { useState, useRef } from 'react';
import { motion, easeInOut } from 'framer-motion';
import { ChevronRight, X } from 'lucide-react';

'use client';


// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface GalleryImage {
    id: string;
    src: string;
    alt: string;
    caption: string;
    category: 'festivals' | 'traditions' | 'art' | 'architecture';
}

interface LightboxState {
    isOpen: boolean;
    imageId: string | null;
}

// ============================================================================
// GALLERY DATA - CULTURALLY INSPIRED
// ============================================================================

const GALLERY_IMAGES: GalleryImage[] = [
    {
        id: '1',
        src: 'https://sindhcraftstore.com/wp-content/uploads/2022/03/Sindh-handmade-bag-embriodered-bag.jpg.webp',
        alt: 'Traditional Pakistani Embroidery',
        caption: 'Intricate Truck Art',
        category: 'art',
    },
    {
        id: '2',
        src: 'https://thumbs.dreamstime.com/b/beautiful-landscape-hunza-valley-spring-season-northern-area-pakistan-67741485.jpg',
        alt: 'Hunza Valley Landscape',
        caption: 'Northern Beauty',
        category: 'traditions',
    },
    {
        id: '3',
        src: 'https://www.akbaraslam.com/cdn/shop/files/2C5A3889_1_1200x.jpg?v=1761311309',
        alt: 'Pakistani Traditional Dress',
        caption: 'Heritage Fashion',
        category: 'traditions',
    },
    {
        id: '4',
        src: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/5b/00/fa/badshahi-mosque-lahore.jpg?w=900&h=-1&s=1',
        alt: 'Badshahi Mosque',
        caption: 'Architectural Grandeur',
        category: 'architecture',
    },
    {
        id: '5',
        src: 'https://lareeadda.com/wp-content/uploads/2023/04/Eid-Blog-V2-1.webp',
        alt: 'Eid Celebration',
        caption: 'Festival of Lights',
        category: 'festivals',
    },
    {
        id: '6',
        src: 'https://www.soulceramics.com/cdn/shop/articles/traditional-pottery-technique_1024x.jpg?v=1714624422',
        alt: 'Traditional Pottery',
        caption: 'Artisan Craft',
        category: 'art',
    },
    {
        id: '7',
        src: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Shandur-Polo-Festivals_kahtours.jpg',
        alt: 'Shandur Polo Festival',
        caption: 'Ancient Sports',
        category: 'festivals',
    },
    {
        id: '8',
        src: 'https://www.jasminetours.com/wp-content/uploads/2023/11/K2_Mount_Godwin_Austen_Chogori_Savage_Mountain-1-1.jpg',
        alt: 'K2 Mountain Peak',
        caption: 'Majestic Peaks',
        category: 'architecture',
    },
];

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: easeInOut,
        },
    },
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
            duration: 0.5,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: easeInOut,
        },
    },
};

const headingVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.7,
            ease: easeInOut,
        },
    },
};

const ctaVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.5,
            duration: 0.6,
        },
    },
    hover: {
        scale: 1.05,
        transition: { duration: 0.3 },
    },
};

// ============================================================================
// LIGHTBOX COMPONENT
// ============================================================================

interface LightboxProps {
    image: GalleryImage | null;
    isOpen: boolean;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({
    image,
    isOpen,
    onClose,
    onNext,
    onPrev,
}) => {
    if (!isOpen || !image) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors z-10"
                    aria-label="Close lightbox"
                >
                    <X size={32} />
                </button>

                {/* Image Container */}
                <div className="relative overflow-hidden rounded-lg bg-black">
                    <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-auto max-h-[80vh] object-cover"
                    />

                    {/* Caption Overlay */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 to-transparent p-6"
                    >
                        <h3 className="font-chillax text-2xl font-bold text-white mb-2">
                            {image.caption}
                        </h3>
                        <p className="text-gray-300 text-sm">{image.alt}</p>
                    </motion.div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={onPrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
                        aria-label="Previous image"
                    >
                        <ChevronRight size={24} className="rotate-180" />
                    </button>
                    <button
                        onClick={onNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
                        aria-label="Next image"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

// ============================================================================
// GALLERY CARD COMPONENT
// ============================================================================

interface GalleryCardProps {
    image: GalleryImage;
    onImageClick: (image: GalleryImage) => void;
    index: number;
}

const GalleryCard: React.FC<GalleryCardProps> = ({
    image,
    onImageClick,
}) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    return (
        <motion.div
            variants={itemVariants}
            className="group cursor-pointer h-full"
            onClick={() => onImageClick(image)}
        >
            <div
                className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl
                transition-shadow duration-300 h-full bg-gray-100"
            >
                {/* Lazy Loaded Image */}
                <div className="relative w-full aspect-square overflow-hidden">
                    <motion.img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        onLoad={() => setIsImageLoaded(true)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isImageLoaded ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    />

                    {/* Overlay Gradient - Entrance Animation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-linear-to-b from-black/0 via-black/20 to-black/80"
                    />

                    {/* Caption Overlay */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-0 left-0 right-0 p-4 text-white"
                    >
                        <h3 className="font-chillax text-lg font-bold mb-1">
                            {image.caption}
                        </h3>
                        <p className="text-gray-200 text-sm capitalize">{image.category}</p>
                    </motion.div>

                    {/* Skeleton Loader - Shows while image loads */}
                    {!isImageLoaded && (
                        <div className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
                    )}
                </div>
            </div>
        </motion.div>
    );
};

// ============================================================================
// MAIN GALLERY COMPONENT
// ============================================================================

const Gallery: React.FC = () => {
    const [lightbox, setLightbox] = useState<LightboxState>({
        isOpen: false,
        imageId: null,
    });
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    // Intersection Observer for scroll-triggered animations
    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Lightbox handlers
    const handleImageClick = (image: GalleryImage) => {
        setLightbox({ isOpen: true, imageId: image.id });
    };

    const handleCloseLightbox = () => {
        setLightbox({ isOpen: false, imageId: null });
    };

    const handleNextImage = () => {
        const currentIndex = GALLERY_IMAGES.findIndex(
            (img) => img.id === lightbox.imageId
        );
        const nextIndex = (currentIndex + 1) % GALLERY_IMAGES.length;
        setLightbox({ isOpen: true, imageId: GALLERY_IMAGES[nextIndex].id });
    };

    const handlePrevImage = () => {
        const currentIndex = GALLERY_IMAGES.findIndex(
            (img) => img.id === lightbox.imageId
        );
        const prevIndex =
            currentIndex === 0 ? GALLERY_IMAGES.length - 1 : currentIndex - 1;
        setLightbox({ isOpen: true, imageId: GALLERY_IMAGES[prevIndex].id });
    };

    const currentImage =
        GALLERY_IMAGES.find((img) => img.id === lightbox.imageId) || null;

    return (
        <section
            ref={sectionRef}
            className="py-16 md:py-24 bg-linear-to-br from-amber-50 via-orange-50 to-rose-50 
            relative overflow-hidden"
        >
            {/* Decorative Background Element */}
            <div
                className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-amber-200/20 to-orange-200/20
                rounded-full blur-3xl -z-10 pointer-events-none"
            />
            <div
                className="absolute bottom-0 left-0 w-96 h-96 bg-linear-to-br from-rose-200/20 to-pink-200/20
                rounded-full blur-3xl -z-10 pointer-events-none"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Heading */}
                <motion.div
                    variants={headingVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="mb-8 md:mb-12"
                >
                    <h2
                        className="font-chillax text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900
                        mb-4 leading-tight"
                    >
                        Our Gallery
                    </h2>
                    <div className="w-16 h-1 bg-linear-to-r from-amber-500 to-orange-500 rounded-full" />
                </motion.div>

                {/* Section Description */}
                <motion.p
                    variants={sectionVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="text-gray-700 text-lg max-w-3xl mb-12 md:mb-16 leading-relaxed"
                >
                    Explore the vibrant tapestry of Pakistani culture through stunning
                    photography. From ancient traditions and majestic architecture to
                    colorful festivals and exquisite artistry, discover the rich heritage
                    that defines our nation.
                </motion.p>

                {/* Gallery Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 md:mb-16"
                >
                    {GALLERY_IMAGES.map((image, index) => (
                        <GalleryCard
                            key={image.id}
                            image={image}
                            onImageClick={handleImageClick}
                            index={index}
                        />
                    ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    variants={ctaVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="flex justify-center"
                >
                    <motion.button
                        whileHover="hover"
                        variants={ctaVariants}
                        className="font-chillax font-bold px-8 py-3 md:px-10 md:py-4 text-lg
                        bg-linear-to-r from-amber-500 to-orange-500 text-white rounded-full
                        shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2
                        focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                        onClick={() => {
                            // Scroll to gallery or navigate to full gallery page
                            window.scrollTo({ top: sectionRef.current?.offsetTop, behavior: 'smooth' });
                        }}
                    >
                        View More
                        <ChevronRight size={20} />
                    </motion.button>
                </motion.div>
            </div>

            {/* Lightbox Modal */}
            <Lightbox
                image={currentImage}
                isOpen={lightbox.isOpen}
                onClose={handleCloseLightbox}
                onNext={handleNextImage}
                onPrev={handlePrevImage}
            />
        </section>
    );
};

export default Gallery;