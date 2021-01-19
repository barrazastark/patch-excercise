import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Table, Modal } from "../../UIElements";

import { getRegisteredBooks, getOverDueBooks, deleteItem, addBook } from "../../api/management"

import "./styles.scss";

const booksHeaders = [
    { field: 'id', display: 'id' },
    { field: 'ISBN', display: 'ISBN' },
    { field: 'title', display: 'Title' },
];

const overdueHeaders = [
    { field: 'id', display: 'id'},
    { field: 'book', display: 'Booked book'},
    { field: 'user', display: 'User owner'}
]

const blockName = "mangement-wrapper";

const Management = () => {
    const history = useHistory();
    const [state, setState] = useState({
        isLoading: true,
        isAddingBook: false,
        books: [],
        view: 'books',
        headers: booksHeaders,
        deleteItem: null,
        showModal: false,
        newBook: {
            ISBN: '',
            title: ''
        },
    });
    
    useEffect(() => {
        const getBooks = async () => {
            const books = await getRegisteredBooks();
            setState(state => ({ ...state, isLoading: false, books }));
        }
        getBooks();
    }, []);

    

    const handleToggleModal = () => {
        setState(state => ({ ...state, showModal: !state.showModal }));
    }

    const handleClickView = async () => {
        setState(state => ({ 
            ...state,
            deletingItem: null,
            isLoading: true,
            books: []
        }));
        const isBookView = state.view === 'books';
        const data = isBookView ? await getOverDueBooks() : await getRegisteredBooks();
       
        setState(state => ({
            ...state,
            isLoading: false,
            books: data,
            view: isBookView ? 'overdue' : 'books',
            headers: isBookView ? overdueHeaders : booksHeaders,
        }))
    }

    const handleClickAction = async id => {
        setState(state => ({ ...state, deletingItem: id }));
        const removedItem = await deleteItem(id);
        const newBooks = state.books.filter(book => book.id !== removedItem);
        setState(state => ({ ...state, deletingItem: null, books: newBooks }));
    }

    const handleOnChange = e => {
        setState(state => ({
            ...state,
            newBook: {
                ...state.newBook,
                [e.target.name]: e.target.value,
            }
        }))
    }
    
    const handleClickAddBook = async () => {
        const { newBook } = state;
        setState(state => ({ 
            ...state, 
            newBook: { ISBN: '', title: ''}, 
            showModal: false,
            isAddingBook: true,
        }));
        const addedBook = await addBook(newBook);
        setState(state => ({
            ...state,
            isAddingBook: false,
            books: [...state.books, addedBook],
        }))
    }

    const handleLogOut = () => {
        history.push('/')
    }
    
    const { books, isLoading, view, headers, deletingItem, showModal, newBook: { ISBN, title }, isAddingBook } = state;
    const isBooks = view === 'books';
    const viewBooks = isBooks ? 'overdue' : 'registered';
    const listTitle = isBooks ? 'Registered' : 'Overdue';
    const action = isBooks ? 'Delete' : '';
    
    return (
        <div className={blockName}>
            <h1>Welcome admin <span onClick={handleLogOut}>Logout</span></h1>
            {isBooks && <Button onClick={handleToggleModal}>Register a new book</Button>}
            <Button onClick={handleClickView}>{`View ${viewBooks} books`}</Button>
            {isLoading && <h3>Fetching books</h3>}
            {!isLoading && <h3>{listTitle} Books</h3>}
            {books.length > 0 && (
                <Table headers={headers} data={books} action={action} onClickAction={handleClickAction} deletingItem={deletingItem}/>
            )}
            {isAddingBook && <p>Adding new book...</p>}

            {books.length === 0 && isBooks && !isLoading && <p>No registered books found</p>}
            <Modal header="New book" show={showModal} onClose={handleToggleModal} onAccept={handleClickAddBook} isValid={Boolean(ISBN && title)}>
                <>
                    <label>
                        <span>ISBN: </span>
                        <input type="text" name="ISBN" value={ISBN} onChange={handleOnChange} />
                    </label>
                    {'    '}
                    <label>
                        <span>Title: </span>
                        <input type="text" name="title" value={title} onChange={handleOnChange} />
                    </label>
                </>
            </Modal>
        </div>
    )
}

export default Management;