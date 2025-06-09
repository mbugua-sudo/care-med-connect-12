
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './pages/CategoryPage';
import SearchResults from './pages/SearchResults';
import ShopByCondition from './pages/ShopByCondition';
import ConditionPage from './pages/ConditionPage';
import PersonalCarePage from './pages/PersonalCarePage';
import OffersPage from './pages/OffersPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import StockDashboard from './pages/StockDashboard';
import ContentEditor from './pages/ContentEditor';
import NotFound from './pages/NotFound';
import { Toaster } from '@/components/ui/sonner';
import './App.css';
import { PrescriptionUpload } from './components/PrescriptionUpload';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/condition" element={<ShopByCondition />} />
          <Route path="/condition/:condition" element={<ConditionPage />} />
          <Route path="/personal-care" element={<PersonalCarePage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<StockDashboard />} />
          <Route path="/content-editor" element={<ContentEditor />} />
          <Route path="/shop-by-condition" element={<ShopByCondition />} />
          <Route path="/prescription-upload" element={<PrescriptionUpload/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
