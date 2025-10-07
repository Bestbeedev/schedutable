// app/signup/page.tsx
'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { GraduationCap, User, Settings, ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserTypeStep } from "@/components/user-type-step"
import { StudentForm } from "@/components/student-form"
import { TeacherForm } from "@/components/teacher-form"
import { AdminForm } from "@/components/admin-form"
import { Badge } from '@/components/ui/badge'
// Composants pour chaque étape

type Step = 'userType' | 'form'
type UserType = 'student' | 'teacher' | 'admin'

export default function Signup() {
    const [currentStep, setCurrentStep] = useState<Step>('userType')
    const [userType, setUserType] = useState<UserType>()

    const handleUserTypeSelect = (type: UserType) => {
        setUserType(type)
        setCurrentStep('form')
    }

    const handleBack = () => {
        setCurrentStep('userType')
        setUserType(undefined)
    }

    const getStepComponent = () => {
        switch (userType) {
            case 'student':
                return <StudentForm onBack={handleBack} />
            case 'teacher':
                return <TeacherForm onBack={handleBack} />
            case 'admin':
                return <AdminForm onBack={handleBack} />
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-900 flex items-center justify-center p-4">
            {/* Éléments décoratifs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/30 dark:bg-blue-800/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200/30 dark:bg-purple-800/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-6xl">

                <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-background/80 backdrop-blur-sm overflow-hidden">
                    {/* Header avec dégradé qui colle au début */}
                    <div className="relative -mt-8 bg-gradient-to-r from-blue-500 to-indigo-600 pt-8">
                        <CardHeader className="text-center pb-8 px-8">
                            <CardTitle className="text-2xl font-bold text-white">
                                {currentStep === 'userType' ? 'Créer un compte' : `Inscription ${getUserTypeLabel(userType)}`}
                            </CardTitle>
                            <CardDescription className="text-base text-white/90">
                                {currentStep === 'userType'
                                    ? 'Rejoignez Schedutable et simplifiez la gestion des emplois du temps'
                                    : `Remplissez vos informations ${getUserTypeLabel(userType, true)}`}
                            </CardDescription>
                        </CardHeader>
                    </div>

                    <CardContent className="pb-8 px-8 pt-8">
                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-foreground">
                                    Étape {currentStep === 'userType' ? '1' : '2'} sur 2
                                </span>
                                <Badge variant="outline" >
                                    {currentStep === 'userType' ? 'Profil' : 'Informations'}
                                </Badge>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: currentStep === 'userType' ? '50%' : '100%' }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full"
                                />
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {currentStep === 'userType' ? (
                                <motion.div
                                    key="userType"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <UserTypeStep onUserTypeSelect={handleUserTypeSelect} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    {getStepComponent()}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Footer */}
                        <div className="text-center mt-10 -mb-5 pt-6 border-t">
                            <p className="text-muted-foreground">
                                Déjà un compte ?{' '}
                                <Link
                                    href="/login"
                                    className="text-primary hover:underline  hover:text-primary/80 font-semibold transition-colors"
                                >
                                    Se connecter
                                </Link>
                            </p>
                            <p className="text-xs text-muted-foreground mt-4">
                                © 2024 Schedutable. Tous droits réservés.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function getUserTypeLabel(type?: UserType, lowercase = false): string {
    const labels = {
        student: 'Étudiant',
        teacher: 'Enseignant',
        admin: 'Administrateur'
    }
    const label = labels[type!] || ''
    return lowercase ? label.toLowerCase() : label
}
