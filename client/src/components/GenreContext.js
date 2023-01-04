import { createContext, useEffect, useState } from "react";

export const GenreContext = createContext();

//context page that fetch's genres from the backend and provides them through the sites index
export const GenreProvider = ({children}) => {
    const [genres, setGenres] = useState();

    useEffect(() => {
        fetch(`${process.env.FILMLABS_URL}/movies/genre`)
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            setGenres(data.data);
        })
        .catch((error) => {
            return error;
        })
    }, [])

    return (
        <GenreContext.Provider value={{genres}}>
            {children}
        </GenreContext.Provider>
    );
};