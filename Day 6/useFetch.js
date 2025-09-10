// fetchData.js
export async function getData() {
  const url = 'https://jsonplaceholder.typicode.com/posts?_limit=10';
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch posts. Please try again.');
  }

  const data = await response.json();
  return data;
}
