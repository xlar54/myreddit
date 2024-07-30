import React from 'react';
import { PostItemProps } from '../interfaces';

const PostItem : React.FC<PostItemProps> = ( {id, title, created_by, created_dtm}) => {

    const formattedDate = new Date(created_dtm).toLocaleString();

    return (

        <div className='post-item' key={id}>
            <h2>{title}</h2>
            <p>created by {created_by} on {formattedDate}</p>
        </div>

    )
}

export default PostItem;

