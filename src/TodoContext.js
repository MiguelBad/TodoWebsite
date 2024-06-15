import { createContext, useContext, useState } from 'react';

const CurrentCategoryContext = createContext(null)
const SetSelectedCategoryContext = createContext(null)

function CurrentCategory ({ children }) {
    const [currentCategory, setCurrentCategory] = useState(null);

    return (
        <CurrentCategoryContext.Provider value={currentCategory}>
            <SetSelectedCategoryContext.Provider value={setCurrentCategory}>
                { children }
            </SetSelectedCategoryContext.Provider>
        </CurrentCategoryContext.Provider>
    )
}

function useCurrentCategoryContext() {
   return useContext(CurrentCategoryContext) 
}

function useSetSelectedCategoryContext() {
   return useContext(SetSelectedCategoryContext) 
}

export { CurrentCategory, useCurrentCategoryContext, useSetSelectedCategoryContext };
