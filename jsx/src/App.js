
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
import TablePage from './page/tablePage';
import SortListPage from './page/sortListPage';
import CounterPage from './page/counterPage';
import UserPage from './page/userPage';
import { UserProvider } from './contexts/UserContext';
import MapPage from './page/mapPage';
import SeasonPage from './page/seasonPage';
import Youtube from './page/youtube';
import YoutubeDetailPage from './page/youtubeDetailPage';

function App() {
  return (
    <UserProvider>
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
            <Route path="/table" element={<TablePage />} />
            <Route path="/sort-list" element={<SortListPage />} />
            <Route path="/counter" element={<CounterPage />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/season" element={<SeasonPage />} />
            <Route path="/youtube" element={<Youtube />} />
            <Route path="/youtube/:videoId" element={<YoutubeDetailPage />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
