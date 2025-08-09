import { QueryClientProvider } from "react-query";
import { queryClient } from "./config/request";
import AppRoutes from "./routes";
import { validateEnv } from "./utils/env";

function App() {
  validateEnv();

  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  );
}

export default App;
