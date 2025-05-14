import "../styles/chatBot.css"
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenAI } from "@google/genai";
import Lottie from "lottie-react";
import avatarAnimation from "../assets/Avatar-animation.json";
import Prompt from "../assets/prompt.json";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // Buena práctica para manejar la api key
const ai = new GoogleGenAI({ apiKey: apiKey }); // Instancia de la clase GoogleGenAI con la API key

const ChatBotGemini: React.FC = () => {
    // .FC incica que retorna un jsx
    const [isOpen, setIsOpen] = useState(false); // Estado para abrir y cerrar el chat
    const [showOpenButton, setShowOpenButton] = useState(true); // Estado para controlar la visibilidad del botón de abrir el chat
    const [prompt, setPrompt] = useState(""); // Estado para el prompt del chat
    const [chatHistory, setChatHistory] = useState<string[]>([]);
    const [savedHistory, setSavedHistory] = useState("");
    const delay = 300; // Retraso para la aparicion del boton "chat" cuando se cierra |tiempo en milisegundos|
    const avatarRef = useRef<any>(null); // Referenia al elemento del avatar
    const preDefinedPrompt = JSON.stringify(Prompt); // Prompt pre definido con indicaciones
    localStorage.getItem("history"); // Creación del item history

    useEffect(() => {
        window.speechSynthesis.getVoices(); // Al cargar la componente precarga las voces
    }, []);

    async function gemini() {
        // Funcion que genera respuestas para el chat
        try {
            const response = await ai.models.generateContent({
                // Elige el modelo y envía el prompt con una estructura correcta y entendible por el modelo
                model: "gemini-2.0-flash",
                contents: [
                    {
                        role: "user",
                        parts: [{ text: preDefinedPrompt }],
                    },
                    {
                        role: "user",
                        parts: [{ text: `Aquí está la pregunta del usuario: ${prompt}` }],
                    },
                    {
                        role: "user",
                        parts: [{ text: `Historial del chat: ${savedHistory}` }],
                    },
                ],
            });

            const result = response.text;
            speak(result ?? ""); // Inicia el habla

            setChatHistory((prev) => {
                const newHistory = [...prev, `Tú: ${prompt}`, `Asistente: ${result}`]; // Lo nuevo que se va a guardar junto a lo previo
                localStorage.setItem("history", JSON.stringify(newHistory)); // Guarda lo nuevo en el LocalStorage
                return newHistory; // Cambia el valor de chatHistory (actualiza el historial)
            });

        } catch (error: any) {
            console.error("Error al generar contenido:", error);
            alert("Error: Posiblemente se a superado el límite de uso de la API.");
        }
    }

    const speak = (text: string) => {
        // Función para hablar
        const utterance = new SpeechSynthesisUtterance(text); // Crea una nueva instancia de SpeechSynthesisUtterance
        utterance.lang = "es-ES"; // Idioma que va a usar

        utterance.onstart = () => {
            // Cuando comiencea hablar
            avatarRef.current?.play(); // Empieza la animación
        };

        utterance.onend = () => {
            // Cuando termina de hablar
            avatarRef.current?.stop(); // Para la animación
        };

        window.speechSynthesis.cancel(); // Detiene la voz anterior si aún habla
        window.speechSynthesis.speak(utterance); // Habla
    };

    const handleClose = () => {
        // Función para controlar la aparición del boton de abrir el chat
        setIsOpen(false); // Cierra el chat
        setShowOpenButton(false); // Oculta el botón de abrir el chat
        setTimeout(() => {
            // Espera el delay para mostrar el boton "chat" nuevamente
            setShowOpenButton(true);
        }, delay);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // Función para manejar el envío del formulario
        e.preventDefault(); // Para que la página no se recargue al enviar el formulario
        gemini(); // Llama a la función gemini para la generación de la respuesta
        setPrompt(""); // Limpia la casilla del input
    };

    useEffect(() => {
        const historyFromStorage = localStorage.getItem("history"); // Intenta obtener el historial guardado bajo la clave "history" en localStorage
        if (historyFromStorage) { // Si se encontró historial, lo guarda en el estado savedHistory (como cadena) que luego se envía a la API
            setSavedHistory(historyFromStorage);
            setChatHistory(JSON.parse(historyFromStorage)); // También lo convierte de string a array y lo asigna al estado chatHistory,
                                                            // para que se muestre visualmente en la interfaz del chat
        }
    }, []);

    return (
        <div className="chat-container">
            <AnimatePresence>
                {/* Animación para mostrar y ocultar el chat*/}
                {!isOpen &&
                    showOpenButton && ( // Si el chat está cerrado y el botón de abrir el chat está visible
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
                            <button className="close-button" onClick={handleClose}>
                                ✖
                            </button>
                            <button className="refresh-button" onClick={() => {localStorage.setItem("history", ""); setChatHistory([]);}}>
                                ↻
                            </button>
                        </div>
                        <div>
                            <Lottie // Animación del avatar
                                lottieRef={avatarRef}
                                animationData={avatarAnimation}
                                loop
                                autoplay={false}
                                className="avatar"
                            />
                            <div className="chat-history-box">
                                {chatHistory.map((entry, index) => (
                                    <p key={index} className="chat-entry">
                                        {entry}
                                    </p>
                                ))}
                            </div>
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
                            <button type="submit" id="send-message">
                                ᯓ➤
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
export default ChatBotGemini;