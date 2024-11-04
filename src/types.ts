export interface Author {
    id: number,
    userName: string
}

export interface Post {
    id: number,
    author: Author,
    reviewPoint: number,
    bookTitle: string,
    header: string,
    content: string,
    postedAt: string
}