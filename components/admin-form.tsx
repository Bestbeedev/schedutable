'use client'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, Lock, Mail, Building, User } from 'lucide-react'
import { Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

const adminSchema = z.object({
    email: z.string().email('Email invalide'),
    username: z.string().min(3, 'Le nom d\'utilisateur doit avoir au moins 3 caractères'),
    password: z.string().min(8, 'Le mot de passe doit avoir au moins 8 caractères'),
    confirmPassword: z.string(),
    universityName: z.string().min(2, 'Le nom de l\'université doit avoir au moins 2 caractères'),
    universityCode: z.string().min(2, 'Le code doit avoir au moins 2 caractères'),
    address: z.string().min(5, 'L\'adresse doit avoir au moins 5 caractères'),
    phone: z.string().min(8, 'Numéro de téléphone invalide')
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
})

type AdminFormData = z.infer<typeof adminSchema>

interface AdminFormProps {
    onBack: () => void
}

export function AdminForm({ onBack }: AdminFormProps) {
    const [showPassword, setShowPassword] = React.useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

    const form = useForm<AdminFormData>({
        resolver: zodResolver(adminSchema)
    })

    const onSubmit = (data: AdminFormData) => {
        console.log('Admin registration:', data)
        // Handle admin registration
    }

    return (
        <div className="space-y-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="votre@email.com"
                                className="pl-10"
                                {...form.register('email')}
                            />
                        </div>
                        {form.formState.errors.email && (
                            <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="username">Nom d'utilisateur</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                id="username"
                                placeholder="votre_nom_utilisateur"
                                className="pl-10"
                                {...form.register('username')}
                            />
                        </div>
                        {form.formState.errors.username && (
                            <p className="text-red-500 text-sm">{form.formState.errors.username.message}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="universityName">Nom de l'université</Label>
                        <div className="relative">
                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                id="universityName"
                                placeholder="Nom officiel de l'établissement"
                                className="pl-10"
                                {...form.register('universityName')}
                            />
                        </div>
                        {form.formState.errors.universityName && (
                            <p className="text-red-500 text-sm">{form.formState.errors.universityName.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="universityCode">Code de l'université</Label>
                        <Input
                            id="universityCode"
                            placeholder="Ex: UPA1, SORBONNE"
                            {...form.register('universityCode')}
                        />
                        {form.formState.errors.universityCode && (
                            <p className="text-red-500 text-sm">{form.formState.errors.universityCode.message}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="+33 1 23 45 67 89"
                                className="pl-10"
                                {...form.register('phone')}
                            />
                        </div>
                        {form.formState.errors.phone && (
                            <p className="text-red-500 text-sm">{form.formState.errors.phone.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Adresse</Label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                id="address"
                                placeholder="Adresse complète de l'établissement"
                                className="pl-10"
                                {...form.register('address')}
                            />
                        </div>
                        {form.formState.errors.address && (
                            <p className="text-red-500 text-sm">{form.formState.errors.address.message}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="password">Mot de passe</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                className="pl-10 pr-10"
                                {...form.register('password')}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {form.formState.errors.password && (
                            <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                className="pl-10 pr-10"
                                {...form.register('confirmPassword')}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {form.formState.errors.confirmPassword && (
                            <p className="text-red-500 text-sm">{form.formState.errors.confirmPassword.message}</p>
                        )}
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <Button
                        type="button"
                        variant="default"
                        onClick={onBack}
                        className="flex-1"
                    >
                        Retour
                    </Button>
                    <Button type="submit"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        size="lg">
                        Créer mon compte administrateur
                    </Button>
                </div>
            </form>
        </div>
    )
}
