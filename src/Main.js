import { ConstructionSharp } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import './index.css';

function TodoApp() {
    const [todoList, setTodoList] = useState([])
    const [savedTodoListLoaded, setSavedTodoListLoaded] = useState(false) 

    useEffect(() => {
        const savedTodoList = JSON.parse(localStorage.getItem('savedTodoList')) || [];
        setTodoList(savedTodoList)
        setSavedTodoListLoaded(true)
    }, [])

    useEffect(() => {
        savedTodoListLoaded === true && localStorage.setItem('savedTodoList', JSON.stringify(todoList))
    }, [todoList, savedTodoListLoaded])

    const newTodoAdded = (data) => {
        if (data !== "" && !todoList.includes(data)) {
            setTodoList([...todoList, data])
        }
    }

    return (
        <main className='main-content'>
            <h1 className='todo-title'>Todo Title Sample</h1>
            <TodoList todoList={todoList} />
            <AddNewTodo newTodoData={newTodoAdded} />
        </main>
    );
}

function TodoList ({ todoList }) {
    return (
        <ul>
            {todoList.map((todo, index) => 
                <li key={index}>{todo}</li>
            )}
        </ul>
    )
}

function AddNewTodo({ newTodoData }) {
    const [addTodoInput, setAddTodoInput] = useState('')

    const addToddoButtonClicked = () => {
        newTodoData(addTodoInput) 
    }

    return (
        <div>
            <input 
                value={addTodoInput}
                onChange={(event) => setAddTodoInput(event.target.value)}
            />
            <button onClick={addToddoButtonClicked}>Add Todo</button>
        </div>
    );
}



export default TodoApp;
