// import { ConstructionSharp } from '@mui/icons-material';
import { Remove, RemoveModeratorRounded } from '@mui/icons-material';
import userEvent from '@testing-library/user-event';
import { useEffect, useRef, useState } from 'react';
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

    const removeCurrentTodo = (todo) => {
        const index = todoList.findIndex(item => item[0] === todo[0])
        const newList = [...todoList]
        newList.splice(index, 1)
        setTodoList(newList)
    }

    return (
        <main className='main-content'>
            <h1 className='todo-title'>Todo Title Sample</h1>
            <TodoList todoList={todoList} editedInfo={changeCurrentTodo} removedInfo={removeCurrentTodo}/>
            <AddNewTodo newTodoData={newTodoAdded} />
        </main>
    );
}

function TodoList ({ todoList, editedInfo, removedInfo }) {
    const passEditedInfo = (todoTitle, todoDescription, oldTodo) => {
        editedInfo(todoTitle, todoDescription, oldTodo)
    }

    const passedDeleteInfo = (todo) => {
        removedInfo(todo)
    }

    return (
        <ul>
            {todoList.map((todo, index) => 
                <li key={index}>
                    <h2>{todo[0]}</h2>
                    <p>{todo[1]}</p>
                    <section className='edit-remove-container'>
                        <EditTodo currentTodo={todo} editedInfo={passEditedInfo}/>
                        <RemoveTodo todoToDelete={passedDeleteInfo} todo={todo}/>
                    </section>
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
        setAddTodoInput('')
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
    const editInput = useRef(null)
    const editButton = useRef(null)

    useEffect(() => {
        setEditCurrentTodo(currentTodo[0])
        setEditCurrentTodoDescription(currentTodo[1] || "")
        setOldTodo(currentTodo[0])
    }, [currentTodo])

    const changeCurrentTodo = () => {
        editedInfo(editCurrentTodo, editCurrentTodoDescription, oldTodo) 
    }

    const showEditInput = () => {
        editInput.current.style.display = 'block'
        editButton.current.style.display = 'none'
    }

    const cancelEdit = () => {
        editInput.current.style.display = 'none'
        editButton.current.style.display = 'block'
    }

    return (
        <section className='edit-section'>
            <div 
                ref={editInput} 
                style={{ display: 'none' }}
            >
                <input
                    value = {editCurrentTodo}
                    onChange = {(event) => setEditCurrentTodo(event.target.value)} 
                />
                <input
                    value = {editCurrentTodoDescription}
                    onChange = {(event) => setEditCurrentTodoDescription(event.target.value)} 
                />
                <button onClick = {changeCurrentTodo}>Change</button>
                <button onClick = {cancelEdit}>Cancel</button>
            </div>
            <button 
                onClick = {showEditInput}
                ref = {editButton}
                style = {{ display: 'block' }}
            >
                Edit
            </button>
        </section>
    )
}

function RemoveTodo ({ todo, todoToDelete }) {
    const removeTodo = () => {
        todoToDelete(todo)  
    }

    return (
        <button onClick={removeTodo}>Remove</button> 
    )
}

export default TodoApp;
