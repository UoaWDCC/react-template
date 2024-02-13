let apiUrl: string = import.meta.env.VITE_API_URL;

if (apiUrl.endsWith('/')) {
  apiUrl = apiUrl.slice(0, -1);
}

console.log(`apiUrl = ${apiUrl}`);

export default {
  apiUrl,
};
