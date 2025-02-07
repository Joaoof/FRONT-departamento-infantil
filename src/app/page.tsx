// app/cadastro/page.tsx
"use client"

import { Illustration } from "@/app/components/llustration"
import { RegistrationForm } from "@/app/components/RegistrationForm"
import { Button } from "@/components/ui/button"
import Image from "next/image"


export default function CadastroPage() {
  function toggleLoginModal(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
    throw new Error("Function not implemented.")
  }

  return (
    <div>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Image
                src="/IGREJA VERBO DA VIDA Logo PNG Vector (CDR) Free Download.jpg"
                alt="Logo"
                width={40}
                height={40}
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-semibold text-gray-900">Verbo da Vida</span>
            </div>
            <div className="flex items-center">
              <Button onClick={toggleLoginModal} className="ml-4 bg-purple-800">
                Login
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <div className="min-h-screen bg-white flex">
        <link rel="icon" href="/favicon.jpg" />
        <Illustration />
        <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-blue-100">
          <RegistrationForm />
        </div>
      </div>
    </div>
  )
}