import { useEffect, useState } from 'react';
import './index.css';
import './Main.js';

function TodoApp() {
    const [theme, setTheme] = useState('Dark')
    const [themeLoded, setThemeLoaded] = useState(false)

    useEffect(() => {
        const savedThemePreference = JSON.parse(localStorage.getItem('theme')) || 'Dark'
        setThemeLoaded(true)
        setTheme(savedThemePreference)
    }, [])
    
    useEffect(() => {
       themeLoded && localStorage.setItem('theme', JSON.stringify( theme ))
    }, [theme, themeLoded])


    const changeTheme = () => {
        const newTheme = theme === 'Dark' ? 'Light' : 'Dark'
        setTheme(newTheme)
        document.documentElement.setAttribute('data-theme', newTheme)
    }

    

    return (
        <nav className='side-navigation'>
            <section className='top-navigation-part'>
                <section className='menu-hamburger-container'>
                    <h1 className='menu-title'>Menu</h1>
                    <div className='hamburger-menu'>
                        <div className='top-hamburger'></div>
                        <div className='middle-hamburger'></div>
                        <div className='bottom-hamburger'></div>
                    </div>
                </section>
                <section className='profile-container'>
                    <p className='introduction'>Hello,</p>
                    <h2 className='username'>User Name</h2>
                </section>
                <hr />
                <section className='todo-category-container'>
                    <h2 className='todo-category-heading'>Todo List</h2>
                    <ul className='todo-category-list'>
                        <li className='todo-category'>Todo Title Sample</li>
                    </ul>
                    <p className='add-new-todo'>+ Add New</p>
                </section>
            </section>
            <section className='bottom-navigation-part'>
                <button
                    className='themeButton'
                    onClick={() => changeTheme()}
                >
                    {theme} Mode
                </button>
                <p>Settings</p>
            </section>
        </nav>
    );
}

export default TodoApp;
