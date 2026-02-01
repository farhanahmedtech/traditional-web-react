import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

'use client';


interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

export default function Contact() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // Animation variants
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
            transition: { duration: 0.6, easeOut: 'easeOut' },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5 },
        },
        hover: {
            y: -8,
            boxShadow: '0 20px 40px rgba(192, 132, 82, 0.15)',
            transition: { duration: 0.3 },
        },
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
        if (!formData.message.trim()) newErrors.message = 'Message is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error for this field on change
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        // Mock API call - Replace with actual backend integration
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            // Simulate successful submission
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } catch (error) {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email',
            value: 'contact@pakculture.com',
            href: 'mailto:contact@pakculture.com',
        },
        {
            icon: Phone,
            title: 'Phone',
            value: '+92 (21) 1234-5678',
            href: 'tel:+922112345678',
        },
        {
            icon: MapPin,
            title: 'Address',
            value: 'Karachi, Pakistan',
            href: '#',
        },
    ];

    return (
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-amber-50 via-white to-orange-50 overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-10 right-10 w-72 h-72 bg-amber-300 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-72 h-72 bg-orange-300 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-chillax text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-900 mb-4">
                        Get in Touch
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We'd love to hear from you. Reach out with your questions, feedback, or collaboration
                        ideas. Our team is here to help bring Pakistani cultural stories to life.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    {/* Contact Info Cards */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="lg:col-span-1 space-y-6"
                    >
                        {contactInfo.map((info, index) => {
                            const Icon = info.icon;
                            return (
                                <motion.a
                                    key={index}
                                    href={info.href}
                                    variants={cardVariants}
                                    whileHover="hover"
                                    className="group p-6 bg-white rounded-lg border border-amber-200 cursor-pointer transition-all"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors">
                                            <Icon className="w-6 h-6 text-amber-700" />
                                        </div>
                                        <div>
                                            <h3 className="font-chillax font-semibold text-gray-900 mb-1">
                                                {info.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm group-hover:text-amber-700 transition-colors">
                                                {info.value}
                                            </p>
                                        </div>
                                    </div>
                                </motion.a>
                            );
                        })}

                        {/* Social Links CTA */}
                        <motion.div
                            variants={cardVariants}
                            className="p-6 bg-linear-to-br from-amber-600 to-orange-600 rounded-lg text-white"
                        >
                            <h3 className="font-chillax font-semibold mb-3">Follow Us</h3>
                            <div className="flex gap-3">
                                {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map((social) => (
                                    <motion.button
                                        key={social}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
                                        aria-label={social}
                                    >
                                        <span className="text-xs font-bold">{social[0]}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name Field */}
                            <motion.div variants={itemVariants} className="space-y-2">
                                <label htmlFor="name" className="font-chillax block font-semibold text-gray-900">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                        errors.name
                                            ? 'border-red-400 focus:ring-red-300'
                                            : 'border-amber-200 focus:border-amber-400 focus:ring-amber-100'
                                    }`}
                                    aria-invalid={!!errors.name}
                                    aria-describedby={errors.name ? 'name-error' : undefined}
                                />
                                {errors.name && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        id="name-error"
                                        className="text-red-600 text-sm flex items-center gap-1"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.name}
                                    </motion.p>
                                )}
                            </motion.div>

                            {/* Email Field */}
                            <motion.div variants={itemVariants} className="space-y-2">
                                <label htmlFor="email" className="font-chillax block font-semibold text-gray-900">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                        errors.email
                                            ? 'border-red-400 focus:ring-red-300'
                                            : 'border-amber-200 focus:border-amber-400 focus:ring-amber-100'
                                    }`}
                                    aria-invalid={!!errors.email}
                                    aria-describedby={errors.email ? 'email-error' : undefined}
                                />
                                {errors.email && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        id="email-error"
                                        className="text-red-600 text-sm flex items-center gap-1"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.email}
                                    </motion.p>
                                )}
                            </motion.div>

                            {/* Subject Field */}
                            <motion.div variants={itemVariants} className="space-y-2">
                                <label htmlFor="subject" className="font-chillax block font-semibold text-gray-900">
                                    Subject
                                </label>
                                <input
                                    id="subject"
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="What is this about?"
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                        errors.subject
                                            ? 'border-red-400 focus:ring-red-300'
                                            : 'border-amber-200 focus:border-amber-400 focus:ring-amber-100'
                                    }`}
                                    aria-invalid={!!errors.subject}
                                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                                />
                                {errors.subject && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        id="subject-error"
                                        className="text-red-600 text-sm flex items-center gap-1"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.subject}
                                    </motion.p>
                                )}
                            </motion.div>

                            {/* Message Field */}
                            <motion.div variants={itemVariants} className="space-y-2">
                                <label htmlFor="message" className="font-chillax block font-semibold text-gray-900">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us more about your inquiry..."
                                    rows={5}
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 resize-none ${
                                        errors.message
                                            ? 'border-red-400 focus:ring-red-300'
                                            : 'border-amber-200 focus:border-amber-400 focus:ring-amber-100'
                                    }`}
                                    aria-invalid={!!errors.message}
                                    aria-describedby={errors.message ? 'message-error' : undefined}
                                />
                                {errors.message && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        id="message-error"
                                        className="text-red-600 text-sm flex items-center gap-1"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.message}
                                    </motion.p>
                                )}
                            </motion.div>

                            {/* Status Messages */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: submitStatus !== 'idle' ? 1 : 0 }}
                                className="p-4 rounded-lg flex items-center gap-3"
                            >
                                {submitStatus === 'success' && (
                                    <>
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <span className="text-green-700 font-medium">
                                            Message sent successfully! We'll get back to you soon.
                                        </span>
                                    </>
                                )}
                                {submitStatus === 'error' && (
                                    <>
                                        <AlertCircle className="w-5 h-5 text-red-600" />
                                        <span className="text-red-700 font-medium">
                                            Error sending message. Please try again.
                                        </span>
                                    </>
                                )}
                            </motion.div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full font-chillax font-semibold py-3 px-6 bg-linear-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:shadow-lg disabled:opacity-75 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 group"
                            >
                                {isSubmitting ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                        />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <motion.div
                                            className="group-hover:translate-x-1 transition-transform"
                                        >
                                            <Send className="w-5 h-5" />
                                        </motion.div>
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>

                {/* Map Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="mt-16"
                >
                    <h3 className="font-chillax text-2xl font-bold text-center text-amber-900 mb-8">
                        Visit Us
                    </h3>
                    <div className="rounded-lg overflow-hidden shadow-lg border border-amber-200 h-80">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.2584444149744!2d67.0099378!3d24.8607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651199ff%3A0x9cf92f402576dcc!2sKarachi%2C%20Sindh!5e0!3m2!1sen!2spk!4v1234567890"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Pakistan Location Map"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}