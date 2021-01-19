const harcodedBooks = [
    {
        id: 1,
        ISBN: '123456789',
        title: 'Game of thrones',
    },
    {
        id: 2,
        ISBN: '54678987',
        title: 'A different book',
    }
];

const harcodedOverdueBooks = [
    {
        id: 1,
        book: 'A differetn book',
        user: 'user 1',
    }
];


export const getRegisteredBooks = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(harcodedBooks)
        }, 2000);
    })
};

export const getOverDueBooks = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(harcodedOverdueBooks);
        }, 2000);
    });
}

export const deleteItem = id => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(id);
        }, 2000);
    })
}

export const addBook = book => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ ...book, id: Math.floor(Math.random() * 99 )});
        }, 2000)
    })
}