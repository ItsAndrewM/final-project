import { createContext, useEffect, useState } from "react";

export const MoviesContext = createContext();

//this context collects popular, upcoming and toprated movies that are auto updated on the backend
//these categories come in a list of 20 movies and are displayed as 5 at a time
export const MoviesProvider = ({children}) => {
    const [popular, setPopular] = useState();
    const [upcoming, setUpcoming] = useState();
    const [topRated, setTopRated] = useState();

    useEffect(() => {
        Promise.all([
            fetch('/movies/upcoming'),
            fetch('/movies/top_rated'),
            fetch('/movies/popular'),
        ])
        .then(([resUpcoming, resTopRated, resPopular]) => {
            return Promise.all([resUpcoming.json(), resTopRated.json(), resPopular.json()])
        })
        .then(([dataUpcoming, dataTopRated, dataPopular]) => {
            setUpcoming(dataUpcoming.data);
            setTopRated(dataTopRated.data);
            setPopular(dataPopular.data);
        })
        .catch((error) => {
            return error;
        })
    }, [])

    return (
        <MoviesContext.Provider value={{upcoming, popular, topRated}}>
            {children}
        </MoviesContext.Provider>
    );
};