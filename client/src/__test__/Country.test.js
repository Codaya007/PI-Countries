import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render as renderTestLibrary, screen } from '@testing-library/react';
import { Router } from "react-router-dom";
import { createMemoryHistory } from 'history';
import Country from "../components/Country";
import { Provider } from 'react-redux';
import store from '../store';
import { Link } from "react-router-dom";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, shallow } from "enzyme";

const history = createMemoryHistory({ initialEntries: ['/'] })

const country = {
   id: "ecu",
   imagen_bandera: "",
   nombre: "Ecuador",
   continente: "South America"
};

configure({ adapter: new Adapter() });

const render = async (component) => renderTestLibrary(
   <Router location={history.location} navigator={history}>
      <Provider store={store}>
         {component}
      </Provider >
   </Router>
)

describe('El componente <Country />', () => {
   let wrapper;
   beforeEach(() => {
      wrapper = shallow(<Country country={country} />);
   });

   test('debería renderizar el contenido del país pasado por props', () => {
      render(<Country country={country} />)
      expect(screen.getByText(/Ecuador/i)).toBeInTheDocument()
      expect(screen.getByText(/South America/i)).toBeInTheDocument()
   })

   test("debería renderizar dos componentes <Link />", () => {
      expect(wrapper.find(Link)).toHaveLength(2);
   });

   test('El primer link debería contener redirigir a la ruta "/countries/ecu".', () => {

      expect(wrapper.find(Link).at(0).prop("to")).toEqual("/countries/ecu");
   });

   test('El segundo link debería contener el texto "Ver más" y redirigir a la ruta "/countries/ecu".', () => {

      expect(wrapper.find(Link).at(1).prop("to")).toEqual("/countries/ecu");

      expect(wrapper.find(Link).at(1).text()).toEqual("Ver más");
   });

});