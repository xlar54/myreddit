import React from 'react';
import { PostItemProps } from '../interfaces';

const PostItem : React.FC<PostItemProps> = ( {id, title, created_by, created_dtm}) => {
    return (

        <div className='post-item' key={id}>
            <h2>{title}</h2>
            <p>created by {created_by} on {created_dtm}</p>
        </div>

    )
}

export default PostItem;

