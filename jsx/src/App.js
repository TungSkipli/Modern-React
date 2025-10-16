
import './App.css';
import Animal from './page/animal';
import TranslateProject from './page/translateProject';
import SearchImage from './page/searchImage';
import Navigation from './components/Navigation';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Book from './page/book';
import AccordionPage from './page/accordion';
import DropDownPage from './page/dropDownPage';
import ModalPage from './page/modalPage';

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
          <Route path="/accordion" element={<AccordionPage />} />
          <Route path="/dropDown" element={<DropDownPage />} />
          <Route path="/modal" element={<ModalPage />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
