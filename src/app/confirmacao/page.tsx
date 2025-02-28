"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Heart, Book } from 'lucide-react';
import confetti from 'canvas-confetti';

const biblicalVerses = [
    { verse: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.", reference: "João 3:16" },
    { verse: "O Senhor é o meu pastor, nada me faltará.", reference: "Salmos 23:1" },
    { verse: "Tudo posso naquele que me fortalece.", reference: "Filipenses 4:13" },
    { verse: "Porque eu bem sei os planos que tenho para vós, diz o Senhor; planos de paz, e não de mal, para vos dar um futuro e uma esperança.", reference: "Jeremias 29:11" },
    { verse: "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.", reference: "Mateus 11:28" }
];

export default function ConfirmacaoPage() {
    const [currentVerseIndex, setCurrentVerseIndex] = useState(0);

    useEffect(() => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        const interval = setInterval(() => {
            setCurrentVerseIndex((prevIndex) => (prevIndex + 1) % biblicalVerses.length);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl w-full space-y-8"
            >
                <Card className="backdrop-blur-sm bg-white/50">
                    <CardHeader>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
                        >
                            <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
                        </motion.div>
                        <CardTitle className="text-3xl font-bold text-center mt-4">
                            Bem-vindo à nossa comunidade!
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-6">
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="text-xl text-gray-600"
                        >
                            Seu cadastro foi concluído com sucesso. Estamos felizes em tê-lo conosco!
                        </motion.p>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentVerseIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white/70 p-6 rounded-lg shadow-lg"
                            >
                                <Book className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                                <p className="text-lg font-serif italic mb-2">
                                    "{biblicalVerses[currentVerseIndex].verse}"
                                </p>
                                <p className="text-sm text-gray-600">
                                    - {biblicalVerses[currentVerseIndex].reference}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                        >
                            <Button
                                className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                <Heart className="w-5 h-5 mr-2" />
                                Explorar a Comunidade
                            </Button>
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}