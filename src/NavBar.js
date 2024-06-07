import './index.css';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function TodoApp() {
    return (
        <nav>
            <div>
                <AccountBoxIcon />
                <div>
                    <p>Hello</p>
                    <h1>User</h1>
                </div>
            </div>
            <h2>Todo List</h2>
            <ul>
                <li>Test</li>
            </ul>
        </nav>
    );
}

export default TodoApp;
