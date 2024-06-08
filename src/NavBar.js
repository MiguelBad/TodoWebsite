import './index.css';
import './Main.js';

function TodoApp() {
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
                <section className='todo-list-container'>
                    <h2 className='todo-list-heading'>Todo List</h2>
                    <ul className='todo-list'>
                        <li className='todo'>Todo Title Sample</li>
                    </ul>
                    <p className='add-new-todo'>+ Add New</p>
                </section>
            </section>
            <section className='bottom-navigation-part'>
                <p>Light Mode</p>
                <p>Settings</p>
            </section>
        </nav>
    );
}

export default TodoApp;
