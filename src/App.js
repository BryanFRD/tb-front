import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BaseScreen from './screen/BaseScreen';
import LoadingScreen from './screen/LoadingScreen';
import HomeScreen from './screen/HomeScreen';

const AuthorDetailsScreen = lazy(() => import('./screen/AuthorDetailsScreen'));
const BookDetailsScreen = lazy(() => import('./screen/BookDetailsScreen'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BaseScreen />}>
          <Route index element={<HomeScreen />}/>
          <Route path='author/:id' element={
            <Suspense fallback={<LoadingScreen />}>
              <AuthorDetailsScreen />
            </Suspense>
          }/>
          <Route path='book/:id' element={
            <Suspense fallback={<LoadingScreen />}>
              <BookDetailsScreen />
            </Suspense>
          }/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
