import React from 'react';

interface PostItemProps {
    id : number;
    title: string;
    link: string;
    text: string;
    created_by: number;
    created_dtm: string;

}

const PostItem : React.FC<PostItemProps> = ( {id, title, created_by, created_dtm}) => {
    return (

        <div className='post-item' key={id}>
            <h2>{title}</h2>
            <p>created by {created_by} on {created_dtm}</p>
        </div>

    )
}

export default PostItem;

