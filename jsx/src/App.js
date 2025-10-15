
import './App.css';
import Animal from './page/animal';
import TranslateProject from './page/translateProject';
import SearchImage from './page/searchImage';
import Navigation from './components/Navigation';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Book from './page/book';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        
        <Routes>
          <Route path="/" element={<Navigate to="/translate" replace />} />
          <Route path="/translate" element={<TranslateProject />} />
          <Route path="/animals" element={<Animal />} />
          <Route path="/search-image" element={<SearchImage />} />
          <Route path="/book" element={<Book />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
