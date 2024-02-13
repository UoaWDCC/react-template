import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';

// Create a client
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/:name',
    element: <Home />,
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
