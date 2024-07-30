import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PostItemCollection from './PostItemCollection';
import { getPosts } from '../services/posts'
import { Post } from '../interfaces'

const HomeContent: React.FC = () => {

  const [data, setData] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getData = useCallback(async() => {

      try {
        const result = await getPosts();
        setData(result);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);  // This ensures effect only runs once

  const memoizedata = useMemo(() => data, [data]);


  return (
    <div>
      <h1>Welcome MyReddit</h1>
      <div>
        <PostItemCollection posts={memoizedata} />
      </div>
    </div>
  );
};

export default HomeContent;
export {};