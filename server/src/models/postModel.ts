export interface Post {
    id : number;
    title : string;
    link : string;
    text : string;
    created_by : number;
    created_dtm : Date;
}

export interface NewPost {
    title : string;
    link : string;
    text : string;
    created_by : number;
    created_dtm : Date;
}