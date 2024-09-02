import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Todos from './Components/Todos';

// Create a client
const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  );
}

export default App;
