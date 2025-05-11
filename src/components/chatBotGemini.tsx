import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenAI } from "@google/genai";

const ChatBotGemini: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showOpenButton, setShowOpenButton] = useState(true);
    const [prompt, setPrompt] = useState("");
    const [responseText, setResponseText] = useState(""); // estado para la respuesta
    const delay = 300; // tiempo en milisegundos
    const ai = new GoogleGenAI({ apiKey: "AIzaSyAivSCMf6QTXOdXaii4y2m8uUVs76Qb5vk" });

    async function gemini() {
        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: prompt,
            });
            const result = response.text;
            console.log(result);
            setResponseText(result ?? ""); // actualiza la respuesta para mostrarla en el chat
        } catch (error: any) {
            console.error("Error al generar contenido:", error);
            alert("Error: has superado el límite de uso de la API. Intenta más tarde o revisa tu cuota en Google Cloud.");
        }
    }

    const handleClose = () => { // Función para controlar la aparición del boton de abrir el chat
        setIsOpen(false);
        setShowOpenButton(false);
        setTimeout(() => {
            setShowOpenButton(true);
        }, delay);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        gemini();
        setPrompt("");
    };

    return (
        <div className="chat-container">
            <AnimatePresence>
                {(!isOpen && showOpenButton) && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0 } }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        onClick={() => setIsOpen(true)}
                        className="open-button"
                    >
                        💬
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.3 }}
                        className="chat-box"
                    >
                        <div>
                            <strong id="chat-title">Chat - Preguntas Frecuentes</strong>
                            <button className="close-button" onClick={handleClose}>✖</button>
                        </div>
                        <div>
                            <p id="chat-message">{responseText}</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="text" 
                                name="user-prompt" 
                                id="chat-input" 
                                value={prompt} 
                                onChange={(e) => setPrompt(e.target.value)} 
                                required 
                                minLength={5} 
                            />
                            <button type="submit" id="send-message">ᯓ➤</button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
export default ChatBotGemini;