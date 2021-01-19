import { useState, useEffect } from "react";

import { getRegisteredBooks } from "./api/management";
import { getMyBooks } from "./api/users";

export const useFetchUserBooks = (model, user) => {
    const [state, setState] = useState({ data: [], isLoading: true });

    useEffect(() => {
        let mounted = true;

        const getBooks = async () => {
            const books = model === 'MY_BOOKS' ? await getMyBooks(user) : await getRegisteredBooks();
            if(mounted){
                setState(state => ({
                    ...state,
                    data: books,
                    isLoading: false,
                }))
            }
        }
        getBooks();

        return () => {
            mounted = false;
        }

    }, [user, model]);

    return [state.data, state.isLoading, setState];
}