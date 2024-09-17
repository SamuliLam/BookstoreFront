import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.classList.add(savedTheme);
            setDarkMode(savedTheme === 'dark');
        } else {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (systemPrefersDark) {
                document.documentElement.classList.add('dark');
                setDarkMode(true);
            }
        }
    }, []);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
        >
            {darkMode ? 'Light' : 'Dark'}
        </button>
    );
};

export default ThemeToggle;
