// pages/index.js
'use client'
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Composants réutilisables
const SectionWrapper = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.section>
    );
};

const Icon = ({ name, className = "" }: { name: string; className?: string }) => {
    const icons = {
        sun: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
        moon: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
        ),
        calendar: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        notification: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
        ),
        sync: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
        ),
        mobile: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
        ),
        team: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        analytics: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        security: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        offline: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
            </svg>
        ),
        filter: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
        )
    };

    return icons[name] || null;
};

export default function Home() {
    const [darkMode, setDarkMode] = useState(false);
    const [mounted, setMounted] = useState(false);
    const heroRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        if (localStorage.theme === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        if (newDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 overflow-x-hidden">
            <Head>
                <title>Schedutable - Gestion Intelligente des Emplois du Temps</title>
                <meta name="description" content="Plateforme moderne de gestion d'emploi du temps pour établissements d'enseignement" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Header Moderne */}
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50"
            >
                <div className="container mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center space-x-3"
                        >
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-sm">ST</span>
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
                                Schedutable
                            </span>
                        </motion.div>

                        {/* Navigation Desktop */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {['Fonctionnalités', 'Avantages', 'Témoignages', 'Tarifs'].map((item) => (
                                <motion.a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
                                    whileHover={{ y: -2 }}
                                >
                                    {item}
                                </motion.a>
                            ))}
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center space-x-4">
                            <motion.button
                                onClick={toggleDarkMode}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                                {darkMode ? (
                                    <Icon name="sun" className="w-5 h-5" />
                                ) : (
                                    <Icon name="moon" className="w-5 h-5" />
                                )}
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Essai Gratuit
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Hero Section Repensée */}
            <section ref={heroRef} className="min-h-screen flex items-center justify-center relative pt-20 pb-20">
                {/* Background avec éléments décoratifs */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 dark:bg-blue-900 rounded-full opacity-20 blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-200 dark:bg-purple-900 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-200 dark:bg-indigo-900 rounded-full opacity-10 blur-3xl animate-pulse delay-500"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            className="lg:w-1/2 text-center lg:text-left"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center px-4 py-2 mt-6 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-8"
                            >
                                <Icon name="notification" className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
                                <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                                    Plateforme tout-en-un pour les établissements
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-4xl sm:text-5xl flex flex-wrap lg:text-5xl font-bold mb-6 leading-tight"
                            >
                                <span className="text-gray-900 dark:text-white">Gestion d'emploi du temps <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    universitaire intelligente et simple
                                </span></span>

                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="text-lg  text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl"
                            >
                                Schedutable révolutionne la gestion des emplois du temps avec une plateforme moderne,
                                intuitive et collaborative pour administrateurs, enseignants et étudiants.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                            >
                                <motion.button
                                    onClick={() => router.push('/signup')}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                                >
                                    Commencer gratuitement
                                    <Icon name="calendar" className="w-5 h-5 ml-2" />
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    Voir la démo
                                </motion.button>
                            </motion.div>

                            {/* Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className="grid grid-cols-3 gap-8 mt-12 max-w-md mx-auto lg:mx-0"
                            >
                                {[
                                    { number: '50+', label: 'Établissements' },
                                    { number: '75k+', label: 'Utilisateurs' },
                                    { number: '98%', label: 'Satisfaction' }
                                ].map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        className="text-center"
                                    >
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {stat.number}
                                        </div>
                                        <div className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Visual */}
                        <motion.div
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="lg:w-1/2 relative max-lg:w-full max-lg:px-2"
                        >
                            <div className="relative mt-3">
                                {/* Carte principale avec glassmorphism */}
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl  rounded-2xl p-6 shadow-2xl border border-white/20 dark:border-gray-700/30"
                                >
                                    {/* En-tête de l'app */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                                <span className="text-white font-bold text-xs">ST</span>
                                            </div>
                                            <span className="font-semibold text-gray-900 dark:text-white">Schedutable</span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <div className="w-3 h-3 rounded-full bg-red-300"></div>
                                            <div className="w-3 h-3 rounded-full bg-orange-300"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-300"></div>
                                        </div>
                                    </div>

                                    {/* Navigation */}
                                    <div className="flex space-x-4 mb-6">
                                        {['Aujourd\'hui', 'Semaine', 'Mois'].map((tab, index) => (
                                            <button
                                                key={tab}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${index === 0
                                                        ? 'bg-blue-500 text-white'
                                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                                    }`}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Grille de calendrier simplifiée */}
                                    <div className="bg-gray-50/50 dark:bg-gray-700/50 rounded-xl p-4 mb-4">
                                        <div className="grid grid-cols-7 gap-1 mb-2">
                                            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => (
                                                <div key={index} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2">
                                                    {day}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-7 gap-1">
                                            {Array.from({ length: 28 }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`h-8 flex items-center justify-center rounded-lg text-sm ${i === 15
                                                            ? 'bg-blue-500 text-white'
                                                            : i >= 12 && i <= 18
                                                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                                                : 'text-gray-600 dark:text-gray-400'
                                                        }`}
                                                >
                                                    {i + 1}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Liste des cours */}
                                    <div className="space-y-3">
                                        {[
                                            { time: '09:00', course: 'Algorithmique', salle: 'A12', color: 'blue' },
                                            { time: '11:00', course: 'Base de données', salle: 'B07', color: 'green' },
                                            { time: '14:00', course: 'Web Development', salle: 'C04', color: 'yellow' }
                                        ].map((item, index) => (
                                            <motion.div
                                                key={index}
                                                whileHover={{ x: 5 }}
                                                className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600"
                                            >
                                                <div className={`w-2 h-8 bg-${item.color}-500 rounded-full mr-3`}></div>
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                                                        {item.course}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                                        {item.time} • Salle {item.salle}
                                                    </div>
                                                </div>
                                                <Icon name="notification" className="w-4 h-4 text-gray-400" />
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Éléments décoratifs flottants */}
                                <motion.div
                                    animate={{ y: [-10, 10, -10] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-4 -left-4 w-20 h-20 bg-blue-500/10 rounded-2xl backdrop-blur-sm border border-blue-500/20"
                                />
                                <motion.div
                                    animate={{ y: [10, -10, 10] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute -bottom-6 -right-6 w-24 h-24 bg-purple-500/10 rounded-2xl backdrop-blur-sm border border-purple-500/20"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section Fonctionnalités */}
            <SectionWrapper className="py-20 bg-gray-50/50 dark:bg-gray-800/30">
                <div className="container mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            Fonctionnalités{' '}
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                principales
                            </span>
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Découvrez les outils puissants qui font de Schedutable la solution idéale pour votre établissement
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: 'calendar',
                                title: 'Gestion intuitive',
                                description: 'Créez et modifiez les emplois du temps en quelques clics avec notre interface drag-and-drop'
                            },
                            {
                                icon: 'notification',
                                title: 'Notifications temps réel',
                                description: 'Alertes instantanées pour les étudiants et enseignants lors des modifications'
                            },
                            {
                                icon: 'sync',
                                title: 'Synchronisation',
                                description: 'Mises à jour en temps réel sur tous les appareils connectés'
                            },
                            {
                                icon: 'mobile',
                                title: 'Application mobile',
                                description: 'Accédez à votre emploi du temps où que vous soyez avec notre PWA optimisée'
                            },
                            {
                                icon: 'team',
                                title: 'Gestion des rôles',
                                description: 'Différents niveaux d accès pour administrateurs, enseignants et étudiants'
                            },
                            {
                                icon: 'offline',
                                title: 'Mode hors ligne',
                                description: 'Consultez votre emploi du temps même sans connexion internet'
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                                    <Icon name={feature.icon} className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </SectionWrapper>

            {/* Section Avantages */}
            <SectionWrapper className="py-20">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                            >
                                Pourquoi choisir{' '}
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Schedutable
                                </span>
                                ?
                            </motion.h2>

                            <div className="space-y-6">
                                {[
                                    {
                                        icon: 'analytics',
                                        title: 'Gain de temps significatif',
                                        description: 'Réduisez le temps de gestion des emplois du temps de plus de 70%'
                                    },
                                    {
                                        icon: 'security',
                                        title: 'Sécurité des données',
                                        description: 'Vos données sont chiffrées et conformes au RGPD'
                                    },
                                    {
                                        icon: 'filter',
                                        title: 'Filtres avancés',
                                        description: 'Recherchez et filtrez par filière, professeur, salle ou semaine'
                                    }
                                ].map((advantage, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-start space-x-4"
                                    >
                                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Icon name={advantage.icon} className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                                {advantage.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {advantage.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="relative"
                        >
                            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                                <h3 className="text-2xl font-bold mb-4">Chiffres clés</h3>
                                <div className="space-y-4">
                                    {[
                                        { label: 'Temps de gestion réduit', value: '-70%' },
                                        { label: 'Erreurs de planning', value: '-90%' },
                                        { label: 'Satisfaction des utilisateurs', value: '98%' },
                                        { label: 'Universités partenaires', value: '50+' }
                                    ].map((stat, index) => (
                                        <div key={index} className="flex justify-between items-center py-2 border-b border-white/20">
                                            <span>{stat.label}</span>
                                            <span className="font-bold text-lg">{stat.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </SectionWrapper>

            {/* CTA Section */}
            <SectionWrapper className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="container mx-auto px-4 sm:px-6 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
                    >
                        Prêt à révolutionner votre établissement ?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
                    >
                        Rejoignez les établissements qui ont transformé leur gestion des emplois du temps avec Schedutable
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Essai gratuit 30 jours
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300"
                        >
                            Demander une démo
                        </motion.button>
                    </motion.div>
                </div>
            </SectionWrapper>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">ST</span>
                                </div>
                                <span className="text-xl font-bold">Schedutable</span>
                            </div>
                            <p className="text-gray-400 text-sm">
                                La plateforme moderne de gestion des emplois du temps pour établissements d'enseignement.
                            </p>
                        </div>

                        {[
                            {
                                title: 'Produit',
                                links: ['Fonctionnalités', 'Tarifs', 'API', 'Documentation']
                            },
                            {
                                title: 'Entreprise',
                                links: ['À propos', 'Blog', 'Carrières', 'Contact']
                            },
                            {
                                title: 'Légal',
                                links: ['Confidentialité', 'Conditions', 'RGPD', 'Mentions']
                            }
                        ].map((column, index) => (
                            <div key={index}>
                                <h3 className="font-semibold mb-4">{column.title}</h3>
                                <ul className="space-y-2">
                                    {column.links.map((link) => (
                                        <li key={link}>
                                            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                        <p>© {new Date().getFullYear()} Schedutable. Tous droits réservés.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
