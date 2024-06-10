import { forwardRef, useEffect, useRef, useState } from 'react';
import './index.css';

function TodoApp() {
    const [todoList, setTodoList] = useState([])
    const [savedTodoListLoaded, setSavedTodoListLoaded] = useState(false) 
    const [completedTodo, setCompletedTodo] = useState([]) 
    const [savedCompletededTodoLoaded, setSavedCompletededTodoLoaded] = useState(false) 

    useEffect(() => {
        const savedTodoList = JSON.parse(localStorage.getItem('savedTodoList')) || [];
        setTodoList(savedTodoList)
        setSavedTodoListLoaded(true)
    }, [])

    useEffect(() => {
        savedTodoListLoaded === true && localStorage.setItem('savedTodoList', JSON.stringify(todoList))
    }, [todoList, savedTodoListLoaded])

    useEffect(() => {
        const savedCompletededTodo = JSON.parse(localStorage.getItem('savedCompletededTodo')) || []
        setCompletedTodo(savedCompletededTodo)
        setSavedCompletededTodoLoaded(true)
    }, [])

    useEffect(() => {
        savedCompletededTodoLoaded === true && localStorage.setItem('savedCompletededTodo', JSON.stringify(completedTodo))
    }, [completedTodo, savedCompletededTodoLoaded])

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

    const completeCurrentTodo = (todo) => {
        if (!completedTodo.includes(todo[0])) {
            setCompletedTodo([...completedTodo, todo[0]])
        } else {
            const index = completedTodo.indexOf(todo[0])
            const newList = [...completedTodo]
            newList.splice(index, 1)
            setCompletedTodo(newList)
        }
    }

    return (
        <main className='main-content'>
            <h1 className='todo-category-title'>Todo Title Sample</h1>
            <TodoList todoList={todoList} 
                editedInfo={changeCurrentTodo} 
                removedInfo={removeCurrentTodo} 
                completeInfo={completeCurrentTodo}
                completedTodo={completedTodo}
            />
            <AddNewTodo newTodoData={newTodoAdded} />
        </main>
    );
}

function TodoList ({ todoList, editedInfo, removedInfo, completeInfo, completedTodo }) {
    // const passEditedInfo = (todoTitle, todoDescription, oldTodo) => {
    //     editedInfo(todoTitle, todoDescription, oldTodo)
    // }

    //    // const [oldTodo, setOldTodo] = useState("")
    //
    // useEffect(() => {
    //     setEditCurrentTodo(currentTodo[0])
    //     setEditCurrentTodoDescription(currentTodo[1] || "")
    //     setOldTodo(currentTodo[0])
    // }, [currentTodo])
    //
    const [editedTitle, setEditedTitle] = useState("")
    const [editedDescription, setEditedDescription] = useState("")
    const [todoBeingEdited,  setTodoBeingEdited] = useState([])

    const todoInfoElement = useRef([])
    const todoEditElement = useRef([])
    const editButton = useRef([])

    const toggleEditToCurrentTodo = (todo, isEditing, index) => { 
        if (todoBeingEdited[0] === undefined) {
            todoInfoElement.current[index].style.display = 'none'
            todoEditElement.current[index].style.display = 'block'
            setTodoBeingEdited([todo[0], index])
        } else if (todoBeingEdited[0] === todo[0]) {
            todoInfoElement.current[index].style.display = 'block'
            todoEditElement.current[index].style.display = 'none'
            setTodoBeingEdited([])
        } else {
            todoInfoElement.current[todoBeingEdited[1]].style.display = 'block'
            todoEditElement.current[todoBeingEdited[1]].style.display = 'none'
            todoInfoElement.current[index].style.display = 'none'
            todoEditElement.current[index].style.display = 'block'
            setTodoBeingEdited([todo[0], index])
        }
    }

    const changeCurrentTodo = () => {
        console.log('yay')
        // editedinfo(editcurrenttodo, editcurrenttododescription, oldtodo) 
    }

    const passedDeleteInfo = (todo) => {
        removedInfo(todo)
    }

    const passedCompleteInfo = (todo) => {
        completeInfo(todo)
    }

    return (
        <ul>
            {todoList.map((todo, index) => 
                <li 
                    style= {{ backgroundColor : 
                     completedTodo.filter(item => item === todo[0]).length === 1 
                        ? 'var(--secondary)'
                        : 'var(--accent)'
                    }}
                    className='todo'
                    key={index}
                >
                    <div className='todo-container'>
                        <div className='todo-information-or-input'>
                            <section 
                                ref={(element) => (todoInfoElement.current[index] = element)}
                                style={{ display: 'block' }}
                                className='todo-information'
                            >
                                <h2 className='todo-title'>{todo[0]}</h2>
                                <p className='todo-description'>{todo[1]}</p>
                            </section>
                            <section 
                                ref={(element) => (todoEditElement.current[index] = element)}
                                style={{ display: 'none' }}
                                className='edit-todo-input'
                            >
                                <input
                                    onChange = {(event) => setEditedTitle(event.target.value)} 
                                />
                                <input
                                    onChange = {(event) => setEditedDescription(event.target.value)} 
                                />
                                <button onClick = {changeCurrentTodo}>Change</button>
                            </section>
                        </div>
                        <section className='edit-remove-container'>
                            <EditTodo 
                                ref={(element) => (editButton.current[index] = element) }
                                currentTodo={todo} 
                                editTodo={toggleEditToCurrentTodo}
                                index={index}
                            />
                            <RemoveTodo todoToDelete={passedDeleteInfo} todo={todo}/>
                            <CompleteTodo todoToComplete={passedCompleteInfo} todo={todo}/>
                        </section>
                    </div>
                </li>
            )}
        </ul>
    )
}

function AddNewTodo({ newTodoData }) {
    const [addTodoInput, setAddTodoInput] = useState('')
    const [addTodoDescriptionInput, setAddTodoDescriptionInput] = useState('')
    const todoTextarea = useRef(null)

    useEffect(() => {
        todoTextarea.current.style.height = 'auto'
        todoTextarea.current.style.height = todoTextarea.current.scrollHeight + 'px'
    }, [addTodoDescriptionInput])
        
    const todoDescriptionChanged = (event) => {
        setAddTodoInput(event.target.value)
        todoTextarea.current.style.height = 'auto'
        todoTextarea.current.style.height = todoTextarea.current.scrollHeight + 'px'
    }

    const addToddoButtonClicked = () => {
        newTodoData(addTodoInput, addTodoDescriptionInput) 
        setAddTodoInput('')
        setAddTodoDescriptionInput('')
    }

    return (
        <section className='add-todo-section'>
            <div className='add-todo-container'>
                <input 
                    value={addTodoInput}
                    onChange={(event) => todoDescriptionChanged(event)}
                    placeholder='Todo Title'
                    className='add-todo-title'
                />
                <textarea
                    value={addTodoDescriptionInput}
                    onChange={(event) => setAddTodoDescriptionInput(event.target.value)}
                    placeholder='Add description (optional)...'
                    className='add-todo-description'
                    ref={todoTextarea}
                />
                <button 
                    onClick={addToddoButtonClicked}
                    className='add-todo-button'
                >Add Todo</button>
            </div>
        </section>
    );
}

const EditTodo = forwardRef(function EditTodo(props, ref) {
    const [enableEditing, setEnableEditing] = useState(false)

    const showEditInput = () => {
        enableEditing ? setEnableEditing(false) : setEnableEditing(true)
        props.editTodo(props.currentTodo, enableEditing, props.index)
    }

    return (
        <section className='edit-section'>
            <button 
                onClick = {showEditInput}
                ref = {ref}
            >
                { enableEditing ? 'Cancel' : 'Edit' }
            </button>
        </section>
    )
})

function RemoveTodo ({ todo, todoToDelete }) {
    const removeTodo = () => {
        todoToDelete(todo)  
    }

    return (
        <button onClick={removeTodo}>Remove</button> 
    )
}


function CompleteTodo ({ todo, todoToComplete }) {
    const removeTodo = () => {
        todoToComplete(todo)  
    }

    return (
        <button onClick={removeTodo}>Complete</button> 
    )
}

export default TodoApp;
