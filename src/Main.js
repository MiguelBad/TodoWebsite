// import { ConstructionSharp } from '@mui/icons-material';
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

    const changeCurrentTodo = (todoTitle, todoDescription, oldTodo) => {
        if (todoTitle !== "" ) {
            if (oldTodo === todoTitle || todoList.filter(title => title[0] === todoTitle).length === 0 ) {
                const index = todoList.findIndex(item => item[0] === oldTodo);
                const newList = [...todoList]
                newList[index] = [todoTitle, todoDescription]
                setTodoList(newList)
            }
        }
    }

    return (
        <main className='main-content'>
            <h1 className='todo-title'>Todo Title Sample</h1>
            <TodoList todoList={todoList} editedInfo={changeCurrentTodo} />
            <AddNewTodo newTodoData={newTodoAdded} />
        </main>
    );
}

function TodoList ({ todoList, editedInfo }) {
    const passEditedInfo = (todoTitle, todoDescription, oldTodo) => {
        editedInfo(todoTitle, todoDescription, oldTodo)
    }

    return (
        <ul>
            {todoList.map((todo, index) => 
                <li key={index}>
                    <h2>{todo[0]}</h2>
                    <p>{todo[1]}</p>
                    <EditTodo currentTodo={todo} editedInfo={passEditedInfo}/>
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

function EditTodo({ currentTodo, editedInfo }) {
    const [oldTodo, setOldTodo] = useState("")
    const [editCurrentTodo, setEditCurrentTodo] = useState("")
    const [editCurrentTodoDescription, setEditCurrentTodoDescription] = useState("")

    useEffect(() => {
        setEditCurrentTodo(currentTodo[0])
        setEditCurrentTodoDescription(currentTodo[1] || "")
        setOldTodo(currentTodo[0])
    }, [currentTodo])

    const changeCurrentTodo = () => {
        editedInfo(editCurrentTodo, editCurrentTodoDescription, oldTodo) 
    }

    return (
        <section className='edit-section'>
            <input
                value = {editCurrentTodo}
                onChange = {(event) => setEditCurrentTodo(event.target.value)} 
            />
            <input
                value = {editCurrentTodoDescription}
                onChange = {(event) => setEditCurrentTodoDescription(event.target.value)} 
            />
            <button onClick={changeCurrentTodo}>Edit</button>
        </section>
    )
}

export default TodoApp;
