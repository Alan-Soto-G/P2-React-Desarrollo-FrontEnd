import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';

interface SidebarProps {
    onToggle: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle }) => {
    const [hidden, setHidden] = useState(false);
    const location = useLocation();

    // Function to handle toggle
    const handleToggle = () => {
        const newHiddenState = !hidden;
        setHidden(newHiddenState);
        // Call the parent's onToggle function with the new state
        onToggle(newHiddenState);
    };

    const menuItems = [
        { path: '/conductores', icon: '👨‍✈️', label: 'Conductores' },
        { path: '/motocicletas', icon: '🏍️', label: 'Motocicletas' },
        { path: '/ordenes', icon: '📋', label: 'Órdenes' },
        { path: '/productos', icon: '🍔', label: 'Productos' },
        { path: '/restaurantes', icon: '🍽️', label: 'Restaurantes' },
        { path: '/clientes', icon: '👥', label: 'Clientes' },
        { path: '/direcciones', icon: '📍', label: 'Direcciones' },
        { path: '/menus', icon: '📜', label: 'Menús' },
        { path: '/turnos', icon: '🕒', label: 'Turnos' },
        { path: '/infracciones', icon: '🚫', label: 'Infracciones' },
        { path: '/inconvenientes', icon: '⚠️', label: 'Inconvenientes' },
        { path: '/mapa', icon: '🗺️', label: 'Mapa' },
        
    ];

    return (
        <>
            {/* Botón hamburguesa que aparece cuando el sidebar está oculto */}
            {hidden && (
                <div className="hamburger-button" onClick={handleToggle}>
                    <div className="hamburger-line"></div>
                    <div className="hamburger-line"></div>
                    <div className="hamburger-line"></div>
                </div>
            )}

            <div className={`sidebar ${hidden ? 'hidden' : ''}`}>
                <div className="toggle-button" onClick={handleToggle}>
                    ✖
                </div>

                <div className="sidebar-header">
                    <Link to="/home" className="sidebar-logo">
                    </Link>
                    <h3 className="sidebar-title">¡Lo que tenemos para ofrecerte!:</h3>
                </div>

                <div className="sidebar-menu">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            <span className="item-icon">{item.icon}</span>
                            <span className="item-label">{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Sidebar;