'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, User, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"


interface UserTypeStepProps {
    onUserTypeSelect: (type: 'student' | 'teacher' | 'admin') => void
}

export function UserTypeStep({ onUserTypeSelect }: UserTypeStepProps) {
    const userTypes = [
        {
            value: 'student',
            label: 'Étudiant',
            description: 'Consulter mon emploi du temps et recevoir des notifications',
            icon: <GraduationCap className="w-6 h-6" />,
            color: 'blue'
        },
        {
            value: 'teacher',
            label: 'Enseignant',
            description: 'Gérer mes cours et communiquer avec les étudiants',
            icon: <User className="w-6 h-6" />,
            color: 'purple'
        },
        {
            value: 'admin',
            label: 'Administrateur',
            description: 'Gérer l\'établissement et les emplois du temps',
            icon: <Settings className="w-6 h-6" />,
            color: 'orange'
        }
    ]

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                    Sélectionnez votre profil
                </h3>
                <p className="text-muted-foreground">
                    Choisissez comment vous allez utiliser Schedutable
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {userTypes.map((type, index) => (
                    <motion.button
                        key={type.value}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onUserTypeSelect(type.value as any)}
                        className={`p-8 rounded-xl border-2 text-left transition-all duration-200 bg-card hover:shadow-lg ${type.color === 'blue'
                                ? 'hover:border-blue-500/50'
                                : type.color === 'purple'
                                    ? 'hover:border-purple-500/50'
                                    : 'hover:border-orange-500/50'
                            } border-border`}
                    >
                        <div className="space-y-4">
                            <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${type.color === 'blue'
                                    ? 'bg-blue-500 text-white'
                                    : type.color === 'purple'
                                        ? 'bg-purple-500 text-white'
                                        : 'bg-orange-500 text-white'
                                }`}>
                                {type.icon}
                            </div>

                            <div>
                                <h4 className="font-semibold text-lg text-foreground mb-2">
                                    {type.label}
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {type.description}
                                </p>
                            </div>

                            <div className={`w-6 h-6 rounded-full border-2 ${type.color === 'blue'
                                    ? 'border-blue-500'
                                    : type.color === 'purple'
                                        ? 'border-purple-500'
                                        : 'border-orange-500'
                                } flex items-center justify-center`}>
                                <div className={`w-2 h-2 rounded-full ${type.color === 'blue'
                                        ? 'bg-blue-500'
                                        : type.color === 'purple'
                                            ? 'bg-purple-500'
                                            : 'bg-orange-500'
                                    }`} />
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    )
}
