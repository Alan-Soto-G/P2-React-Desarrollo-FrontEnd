import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenAI } from "@google/genai";
import Lottie from "lottie-react";
import avatarAnimation from '../assets/Avatar-animation.json';

const ChatBotGemini: React.FC = () => { // .FC incica que retorna un jsx
    const [isOpen, setIsOpen] = useState(false); // Estado para abrir y cerrar el chat
    const [showOpenButton, setShowOpenButton] = useState(true); // Estado para controlar la visibilidad del botón de abrir el chat
    const [prompt, setPrompt] = useState(""); // Estado para el prompt del chat
    const [responseText, setResponseText] = useState(""); // Estado para la respuesta
    const delay = 300; // Retraso para la aparicion del boton "chat" cuando se cierra |tiempo en milisegundos|
    const ai = new GoogleGenAI({ apiKey: "AIzaSyAivSCMf6QTXOdXaii4y2m8uUVs76Qb5vk" }); // Instancia de la clase GoogleGenAI con la API key
    const avatarRef = useRef<any>(null); // Referenia al elemento del avatar

    useEffect(() => {
        window.speechSynthesis.getVoices(); // Al cargar la componente precarga las voces
    }, []);

    async function gemini() { // Funcion que genera respuestas para el chat
        try {
            const response = await ai.models.generateContent({ // Elige el modelo y envía el prompt
                model: "gemini-2.0-flash",
                contents: prompt,
            });
            const result = response.text;
            console.log(result);
            speak(result ?? ""); // Inicia el habla
            setResponseText(result ?? "");
        } catch (error: any) {
            console.error("Error al generar contenido:", error);
            alert("Error: Posiblemente se a superado el límite de uso de la API.");
        }
    }

    const speak = (text: string) => { // Función para hablar
        const utterance = new SpeechSynthesisUtterance(text); // Crea una nueva instancia de SpeechSynthesisUtterance
        utterance.lang = "es-ES"; // Idioma que va a usar

        utterance.onstart = () => { // Cuando comiencea hablar
            avatarRef.current?.play(); // Empieza la animación
        };

        utterance.onend = () => { // Cuando termina de hablar
            avatarRef.current?.stop(); // Para la animación
        };

        window.speechSynthesis.cancel(); // Detiene la voz anterior si aún habla
        window.speechSynthesis.speak(utterance); // Habla
    };

    const handleClose = () => { // Función para controlar la aparición del boton de abrir el chat
        setIsOpen(false); // Cierra el chat
        setShowOpenButton(false); // Oculta el botón de abrir el chat
        setTimeout(() => { // Espera el delay para mostrar el boton "chat" nuevamente
            setShowOpenButton(true);
        }, delay);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { // Función para manejar el envío del formulario
        e.preventDefault(); // Para que la página no se recargue al enviar el formulario
        gemini(); // Llama a la función gemini para la generación de la respuesta
        setPrompt(""); // Limpia la casilla del input
    };

    return (
        <div className="chat-container">
            <AnimatePresence> {/* Animación para mostrar y ocultar el chat*/}
                {(!isOpen && showOpenButton) && ( // Si el chat está cerrado y el botón de abrir el chat está visible
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }} // Animación inicial
                        animate={{ opacity: 1, scale: 1 }} // Animación al aparecer
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0 } }} // Animación al cerrar
                        transition={{ duration: 0.3, ease: "easeOut" }} // Animación de la transición
                        onClick={() => setIsOpen(true)} // Evento para abrir el chat
                        className="open-button"
                    >
                        💬
                    </motion.button> // Botón de abrir el chat
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && ( // Si el chat está abierto
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
                            <Lottie // Animación del avatar
                                lottieRef={avatarRef}
                                animationData={avatarAnimation}
                                loop
                                autoplay={false}
                                className="avatar"
                            />
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