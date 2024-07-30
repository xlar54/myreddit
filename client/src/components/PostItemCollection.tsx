import React from "react";
import PostItem from "./PostItem";

interface Post {
    id : number;
    title: string;
    link: string;
    text: string;
    created_by: number;
    created_dtm: string;

}

interface PostItemCollectionProps {
    posts: Post[];
  }

const PostItemCollection : React.FC<PostItemCollectionProps> = ({posts}) => {

    return (
        <div className='post-item-collection'>
            {posts.map(post => (

                <PostItem key={post.id} id={post.id} title={post.title} created_by={post.created_by} link={""} text={""} created_dtm={post.created_dtm} />

            ))}
        </div> 
    )
    


}

export default PostItemCollection;