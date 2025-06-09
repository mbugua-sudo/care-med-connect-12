
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import ConditionPage from "./pages/ConditionPage";
import ShopByCondition from "./pages/ShopByCondition";
import OffersPage from "./pages/OffersPage";
import PersonalCarePage from "./pages/PersonalCarePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import StockDashboard from "./pages/StockDashboard";
import ContentEditor from "./pages/ContentEditor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/condition/:condition" element={<ConditionPage />} />
          <Route path="/shop-by-condition" element={<ShopByCondition />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/personal-care" element={<PersonalCarePage />} />
          <Route path="/dashboard" element={<StockDashboard />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
