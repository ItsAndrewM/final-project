import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const ListsContext = createContext();

//list provider and context to fetch all "community" lists  created by the sites users.  if anyone makes a list it will be added to a collection and retrieved from the database
//reducer state from UserContext is used to refetch whenver an item is removed/deleted
export const ListsProvider = ({children}) => {
    const [allLists, setAllLists] = useState([]);
    const {listState} = useContext(UserContext);

    useEffect(() => {
        fetch(`/users/lists`)
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            setAllLists(data.data)
            console.log(data.data)
        })
        .catch((error) => {
            return error;
        })
    }, [listState])

    return (
        <ListsContext.Provider value={{allLists}}>
            {children}
        </ListsContext.Provider>
    );
}