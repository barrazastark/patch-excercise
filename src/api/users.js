
const booksOfUsers = {
    user1: [
        {
            id: 3,
            ISBN: '123456',
            title: 'Lion King',
        }
    ],
    user2: [
        {
            id: 4,
            ISBN: '789456',
            title: 'Other book'
        }
    ],
    user3: [],
}


export const getMyBooks = user => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(booksOfUsers[user]);
        },2000);

    });
}

export const removeBook = book => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(book);
        },2000);

    });
}