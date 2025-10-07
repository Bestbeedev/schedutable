'use client'

import * as React from 'react'
import { User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Mail, Lock, Building } from 'lucide-react'

const studentSchema = z.object({
    email: z.email('Email invalide'),
    username: z.string().min(3, 'Le nom d\'utilisateur doit avoir au moins 3 caractères'),
    password: z.string().min(8, 'Le mot de passe doit avoir au moins 8 caractères'),
    confirmPassword: z.string(),
    university: z.string().min(1, 'Veuillez sélectionner une université'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
})

type StudentFormData = z.infer<typeof studentSchema>

interface StudentFormProps {
    onBack: () => void
}

export function StudentForm({ onBack }: StudentFormProps) {
    const [showPassword, setShowPassword] = React.useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

    const form = useForm<StudentFormData>({
        resolver: zodResolver(studentSchema)
    })

    const onSubmit = (data: StudentFormData) => {
        console.log('Student registration:', data)
        // Handle student registration
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

                <div className="space-y-2">
                    <Label htmlFor="university">Université</Label>
                    <Select onValueChange={(value) => form.setValue('university', value)}>
                        <SelectTrigger className="w-full"   >
                            <SelectValue placeholder="Sélectionnez votre université" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="univ-paris-1">Université Paris 1 Panthéon-Sorbonne</SelectItem>
                            <SelectItem value="univ-paris-2">Université Paris 2 Panthéon-Assas</SelectItem>
                            <SelectItem value="sorbonne-univ">Sorbonne Université</SelectItem>
                            <SelectItem value="univ-lyon-1">Université Claude Bernard Lyon 1</SelectItem>
                            <SelectItem value="univ-lille">Université de Lille</SelectItem>
                        </SelectContent>
                    </Select>
                    {form.formState.errors.university && (
                        <p className="text-red-500 text-sm">{form.formState.errors.university.message}</p>
                    )}
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
                        Créer mon compte étudiant
                    </Button>
                </div>
            </form>
        </div>
    )
}
