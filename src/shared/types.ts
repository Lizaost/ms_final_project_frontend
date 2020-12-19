export interface Post {
    id: number;
    title: string;
    text: string;
    published_at: string;
    author_id: number;
}

export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password_hash: string;
    status: string;
    registered_at: string;
}

export interface Comment {
    id: string;
    author_id: number;
    post_id: number;
    text : string;
    published_at: string;
}
