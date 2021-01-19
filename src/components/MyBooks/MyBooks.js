import { useState } from "react";
import { useHistory } from "react-router-dom";

import { Table } from "../../UIElements";
import { useFetchUserBooks } from "../../hooks";
import { removeBook } from "../../api/users";

import "./styles.scss";

const blockName = "my-books-wrapper";

const myBooksHeaders = [
    { field: 'id', display: 'Id'},
    { field: 'ISBN', display: 'ISBN'},
    { field: 'title', display: 'Title'},
]

const MyBooks = () => {
    const [tab, setTab] = useState('MY_BOOKS');
    const [deletedItem, setDeletedItem] = useState(null);
    const [orderedBook, setOrderedBook] = useState(false);
    const history = useHistory();
    const user = history.location.state.user;
    const [myBooks, isLoadingMyBooks, setMyBooks] = useFetchUserBooks('MY_BOOKS', user);
    const [allBooks, isLoadingAllBooks, setAllBooks] = useFetchUserBooks('ALL_BOOKS');

    const handleLogOut = () => {
        history.push('/')
    }

    const handleClickTab = tab => {
        setTab(tab);
    }

    const handleReturnBook = async id => {
        setDeletedItem(id);
        const removedBook = await removeBook(id);
        setDeletedItem(null);
        const book = myBooks.find(book => book.id === removedBook);
        const newBooks = myBooks.filter(book => book.id !== removedBook);
        setMyBooks(state => ({ ...state, data: newBooks }));
        setAllBooks(state => ({ ...state, data: [...state.data, book ]}));
    }

    const handleOrderBook = id => {
        const orderedBook = allBooks.find(book => book.id === id);
        const newAllBooks = allBooks.filter(book => book.id !== id);
        setMyBooks(state => ({
            ...state,
            data: [...state.data, orderedBook],
        }));
        setAllBooks(state => ({
            ...state,
            data: newAllBooks,
        }))
        setTab('MY_BOOKS');
        setOrderedBook(true);

        setTimeout(() => setOrderedBook(false), 2000);
    }

    return (
        <div className={blockName}>
            <h1>Welcome {user} <span onClick={handleLogOut}>Logout</span></h1>
            {(isLoadingAllBooks || isLoadingMyBooks) && <span>Fetching books</span>}
            {!isLoadingMyBooks && !isLoadingMyBooks && (
                <div className={`${blockName}__tabs ${blockName}__${tab}`}>
                    <span onClick={() => handleClickTab('MY_BOOKS')}>My Books</span>
                    <span onClick={() => handleClickTab('ALL_BOOKS')}>All Books</span>
                </div>
            )}
            <div className={`${blockName}__content`}>
                {tab === 'MY_BOOKS' && (
                    <Table data={myBooks} headers={myBooksHeaders} action="Return book" onClickAction={handleReturnBook} deletingItem={deletedItem}/>
                )}

                {tab === 'ALL_BOOKS' && (
                    <Table data={allBooks} headers={myBooksHeaders} action="Order" onClickAction={handleOrderBook} />
                )}
            </div>
            {orderedBook && <p>Book ordered</p>}
        </div>
    )
}

export default MyBooks;