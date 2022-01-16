import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render as renderTestLibrary, screen } from '@testing-library/react';
import { Router } from "react-router-dom";
import { createMemoryHistory } from 'history';
import App from "../App";
import userEvent from "@testing-library/user-event";
import { Provider } from 'react-redux';
import store from '../store';

const history = createMemoryHistory()

const render = component => renderTestLibrary(
   <Router history={history}>
      <Provider store={store}>
         {component}
      </Provider>
   </Router>
)

describe('<App /> component', () => {
   test('full app rendering/navigating', () => {
      render(<App />)
      // verify page content for expected route
      // often you'd use a data-testid or role query, but this is also possible
      expect(screen.getByText(/Descubre todos los países del mundo/i)).toBeInTheDocument()

      const leftClick = { button: 0 }
      userEvent.click(screen.getByText(/Empezar a explorar/i), leftClick)

      // check that the content changed to the new page
      expect(screen.getByText(/Continentes/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/Buscar país.../i)).toBeInTheDocument()
   })

});

