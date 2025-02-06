// app/cadastro/page.tsx
"use client"

import { Illustration } from "@/components/Illustration"
import { RegistrationForm } from "@/components/RegistrationForm"

export default function CadastroPage() {
    return (
        <div className="min-h-screen bg-white flex">
            <Illustration />
            <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
                <RegistrationForm />
            </div>
        </div>
    )
}