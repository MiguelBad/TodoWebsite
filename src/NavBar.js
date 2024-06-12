import { LightMode } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useEffect, useState } from 'react';
import './index.css';
import './Main.js';

function TodoApp() {
    const [theme, setTheme] = useState('Dark')
    const [themeLoded, setThemeLoaded] = useState(false)
    const [menuState, setMenuState] = useState(true)

    useEffect(() => {
        const savedThemePreference = JSON.parse(localStorage.getItem('theme')) || 'Dark'
        setThemeLoaded(true)
        setTheme(savedThemePreference)
        document.documentElement.setAttribute('data-theme', savedThemePreference)
    }, [])
    
    useEffect(() => {
       themeLoded && localStorage.setItem('theme', JSON.stringify( theme ))
    }, [theme, themeLoded])

    const changeTheme = () => {
        const newTheme = theme === 'Dark' ? 'Light' : 'Dark'
        setTheme(newTheme)
        document.documentElement.setAttribute('data-theme', newTheme)
    }

    const toggleBurger = () => {
        const newMenuState = menuState ? false : true
        setMenuState(newMenuState)
    }

    return (
        <nav
            className= {menuState ? 'side-navigation' : 'side-navigation hidden'}
        >
            { menuState ? (
                <>
                    <section className='top-navigation-part'>
                        <section className='menu-hamburger-container'>
                            <h1 className='menu-title'>Menu</h1>
                            <div
                                onClick={toggleBurger}
                                className='hamburger-menu'
                            >
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
                </>
            ) : (
                <>
                    <section className='top-navigation-part'>
                        <section
                            className='menu-hamburger-container hidden'
                            onClick={toggleBurger}
                        >
                            <div className='hamburger-menu hidden'>
                                <div className='top-hamburger'></div>
                                <div className='middle-hamburger'></div>
                                <div className='bottom-hamburger'></div>
                            </div>
                        </section>
                    </section>
                    <section className='bottom-navigation-part hidden'>
                        <button
                            className='themeButton'
                            onClick={() => changeTheme()}
                        >
                            <LightMode />
                        </button>
                        <SettingsIcon />
                    </section>
                </>
            )}
        </nav>
    );
}

export default TodoApp;
