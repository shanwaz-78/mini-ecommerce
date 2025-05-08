import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AppRoutes } from "./routes/index.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="p-6">
            <AppRoutes />
          </main>
        </div>
      </QueryClientProvider>
    </Router>
  );
};

export default App;
