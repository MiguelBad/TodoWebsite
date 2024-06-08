// import { ConstructionSharp } from '@mui/icons-material';
import { Edit, EditTwoTone } from '@mui/icons-material';
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

    const newTodoAdded = (todoTitle, todoDescription) => {
        if (todoTitle !== "" && todoList.filter(title => title[0] === todoTitle).length === 0) {
            setTodoList([...todoList, [todoTitle, todoDescription === "" ? null : todoDescription]])
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
                <li key={index}>
                    <h2>{todo[0]}</h2>
                    <p>{todo[1]}</p>
                    <EditTodo currentTodo={todo}/>
                </li>
            )}
        </ul>
    )
}

function AddNewTodo({ newTodoData }) {
    const [addTodoInput, setAddTodoInput] = useState('')
    const [addTodoDescriptionInput, setAddTodoDescriptionInput] = useState('')

    const addToddoButtonClicked = () => {
        newTodoData(addTodoInput, addTodoDescriptionInput) 
    }

    return (
        <section className='add-todo-section'>
            <input 
                value={addTodoInput}
                onChange={(event) => setAddTodoInput(event.target.value)}
                placeholder='Todo Title'
            />
            <textarea
                value={addTodoDescriptionInput}
                onChange={(event) => setAddTodoDescriptionInput(event.target.value)}
                placeholder='Add description (optional)...'
            />
            <button onClick={addToddoButtonClicked}>Add Todo</button>
        </section>
    );
}

function EditTodo({ currentTodo }) {
    const [editCurrentTodo, setEditCurrentTodo] = useState("")
    const [editCurrentTodoDescription, setEditCurrentTodoDescription] = useState("")

    const 

    return (
        <section className='edit-section'>
            <input
                value = {currentTodo[0]}
                onChange = {(event) => setEditCurrentTodo(event.target.value)} 
            />
            <input
                value = {currentTodo[1] === null ? "" : currentTodo[1]}
                onChange = {(event) => setEditCurrentTodoDescription(event.target.value)} 
            />
            <button>Edit</button>
        </section>
    )
}

export default TodoApp;
