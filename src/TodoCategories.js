import { useEffect, useState } from 'react';
import './index.css';

function TodoCategories () {
    const [todoCategory, setTodoCategory] = useState([])
    const [savedCategoriesLoaded, setSavedCategoriesLoaded] = useState(false)
    const [isAddingCategory, setIsAddingCategory] = useState(false)
    const [addCategoryInput, setAddCategoryInput] = useState('')

    useEffect(() => {
        const savedCategories = JSON.parse(localStorage.getItem('savedCategories')) || []
        setSavedCategoriesLoaded(true)
        setTodoCategory(savedCategories)
    }, [])

    useEffect(() => {
        savedCategoriesLoaded && localStorage.setItem('savedCategories', JSON.stringify(todoCategory))
    }, [todoCategory, savedCategoriesLoaded])

    const addCategoryToggle = () => {
        const nextAddingState = !isAddingCategory
        setIsAddingCategory(nextAddingState)
    }

    const addNewCategory = () => {
        if (addCategoryInput !== '' && todoCategory.filter(items => items === addCategoryInput).length === 0){
            setTodoCategory([...todoCategory, addCategoryInput])
            setAddCategoryInput('')
        }
    }

    return (
        <section className='todo-category-container'>
            <h2 className='todo-category-heading'>Todo List</h2>
            { todoCategory.length === 0 ? (
                <p>You currently have no todo...</p>
            ) : (
                <ul className='todo-category-list'>
                    { todoCategory.map((category, index) => 
                        <li
                            key={index}
                            className='todo-category'
                        >{category}</li>
                    )}
                </ul>
            )}
            { isAddingCategory ? (
                <>
                    <input onChange={(event) => setAddCategoryInput(event.target.value)}/>
                    <section className='add-new-category-options'>
                        <button onClick={addNewCategory}>Add</button>
                        <button onClick={addCategoryToggle}>Cancel</button>
                    </section>
                </>
            ) : (
                <>
                    <button
                        className='add-new-category'
                        onClick={addCategoryToggle}
                    >
                        + Add New
                    </button>
                </>
            )}
        </section>
    )
}

export default TodoCategories;
