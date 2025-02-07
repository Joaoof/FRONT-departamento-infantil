// app/cadastro/page.tsx
"use client"

import { Illustration } from "@/app/components/llustration"
import { RegistrationForm } from "@/app/components/RegistrationForm"
import NavBar from "../navbar/page"

export default function CadastroPage() {
    return (
        <div className="min-h-screen bg-white flex">
            <link rel="icon" href="/favicon.jpg" />
            <NavBar onLoginClick={function (): void {
                throw new Error("Function not implemented.")
            }} />
            <Illustration />
            <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
                <RegistrationForm />
            </div>
        </div>
    )
}