import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CountryDetail from './screens/CountryDetail';
import Error404 from './screens/Error404';
import FormActivity from './screens/FormActivity';
import Countries from './screens/Countries';
import { useEffect } from 'react';
import { connect } from "react-redux";
import { getAllCountries, getContinents, paginateCountries } from "./actions";
import { bindActionCreators } from "redux";
import LandingPage from './screens/LandingPage';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App({ getAllCountries, getContinents, countries, paginateCountries }) {

  useEffect(() => {
    getAllCountries();
    getContinents();
  }, [getAllCountries, getContinents]);

  useEffect(() => {
    paginateCountries();
  }, [countries, paginateCountries]);

  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/'>
          <Route index element={<LandingPage />} />
          <Route path='countries'>
            <Route index element={<Countries />} />
            <Route path=':id' element={<CountryDetail />} />
          </Route>
          <Route path='activities'>
            <Route path='create' element={<FormActivity />} />
          </Route>
        </Route>
        <Route path='*' element={<Error404 content="La página que buscas no existe" />} />
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { countries: state.countriesFiltered };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getAllCountries, getContinents, paginateCountries }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
