import React from "react";
import { Link } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Landing from "../screens/LandingPage";

configure({ adapter: new Adapter() });

describe("El componente <Landing />", () => {
   let wrapper;
   beforeEach(() => {
      wrapper = shallow(<Landing />);
   });

   test("debería renderizar un <Link />", () => {
      expect(wrapper.find(Link)).toHaveLength(1);
   });
   test('El link debería contener el texto "Empezar a explorar" y redirigir a la ruta principal "/countries".', () => {

      expect(wrapper.find(Link).at(0).prop("to")).toEqual("/countries");

      expect(wrapper.find(Link).at(0).text()).toEqual("Empezar a explorar");
   });
});