import { QueryClient, QueryClientProvider } from "react-query";
import { Register } from "./pages/Register/Register";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Register />
    </QueryClientProvider>
  );
}

export default App;
