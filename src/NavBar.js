import './index.css';
import './Main.js';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function TodoApp() {
    return (
        <nav className='side-navigation'>
            <h1 className='website-title'>Todo App</h1>
            <section className='profile-container'>
                <p className='introduction'>Hello,</p>
                <div className='profile-pic-name-container'>
                    <div className='profile-picture'>
                        <AccountBoxIcon />
                    </div>
                    <h2 className='username'>User Name</h2>
                </div>
            </section>
            <section className='todo-list-container'>
                <h2 className='todo-list-heading'>Todo List</h2>
                <ul className='todo-list'>
                    <li className='todo'>Todo Title Sample</li>
                </ul>
            </section>
        </nav>
    );
}

export default TodoApp;
