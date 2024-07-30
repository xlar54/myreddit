export const getPosts = async () => {
    const response = await fetch('http://localhost:3001/api/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  
    if (!response.ok) {
      throw new Error('getPosts failed');
    }
  
    return response.json();
  };