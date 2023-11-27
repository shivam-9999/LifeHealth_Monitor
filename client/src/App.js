import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import routes from './routes';

//
function App() {

  return (
    <BrowserRouter basename="/client">
      <Routes>
        { routes.map((route) => (
          <Route
            key={route.path} 
            path={route.path}
            element={route.element}
          />
        )) }

        <Route
          path="*"
          element={<div>404</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}
//
export default App;
