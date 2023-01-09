import { createContext, useEffect, useReducer, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

//use context for the user which includes reviews and list items
export const UserContext = createContext();

//intitial state for the movie reviews made
const initialState = {
    movie: null,
    author: null,
    author_details: null,
    content: null,
    created_at: null,
}

//intitial state for list items
const initialListState = {
    movie: null,
    author: null,
    author_details: null,
    created_at: null,
    list_name: null
}

//reducer for whenever a movie is added/removed or a list movie is added or removed
//because nothing is stored in context except for current reviews and lists, everything is refetched and the reducer is used only to retrigger a fetch
const reducer = (state, action) => {
    switch (action.type) {
        case "review-added": {
            return {
                ...state,
                movie: state.movie,
                author: state.author,
                author_details: state.author_details,
                content: state.content,
                created_at: state.created_at,
            }
        }
        case "add-to-list": {
            return {
                ...state,
                movie: state.movie,
                author: state.author,
                author_details: state.author_details,
                created_at: state.created_at,
                list_name: state.list_name
            }
        }
        default: throw new Error(`unrecognized action ${state.type}`)
    }
}

export const UserProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState();
    const [userReviews, setUserReviews] = useState([]);
    const [userLists, setUserLists] = useState([]);
    const [userListsKeys, setUserListsKeys] = useState([]);
    const {user, isAuthenticated, isLoading} = useAuth0();

    const [state, dispatch] = useReducer(reducer, initialState);
    const [listState, listDispatch] = useReducer(reducer, initialListState);

    //functions to handle a new review
    const receiveNewReview = (data) => {
        console.log(data)
        dispatch({
            type: 'review-added',
            ...data
        })
    }
    //function to handle a new lsit item
    const receiveNewList = (data) => {
        console.log(data)
        listDispatch({
            type: 'add-to-list',
            ...data
        })
    }

    //fetch is triggered whenever anything is added to state for either lists or reviews and when the user is logged in
    useEffect(() => {
        if (isAuthenticated === true) {
            Promise.all([
                fetch(`${process.env.REACT_APP_FILMLABS_URL}/users/${user.email}/review`),
                fetch(`${process.env.REACT_APP_FILMLABS_URL}/users/${user.email}/lists`),
            ])
            .then(([data, dataLists]) => {
                return Promise.all([data.json(), dataLists.json()]);
            })
            .then(([data, dataLists]) => {
                setUserReviews(data.data)
                setUserLists(dataLists.data)
                setUserListsKeys(Object.keys(dataLists.data.lists));
            })
            .catch((error) => {
                return error
            })
        }
    }, [isLoading, state, listState])

    return (
        <UserContext.Provider value={{userReviews, userLists, userListsKeys, state, listState, action: {receiveNewReview, receiveNewList}}}>
            {children}
        </UserContext.Provider>
    );
}