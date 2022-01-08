import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CountryDetail from './screens/CountryDetail';
import Error404 from './screens/Error404';
import FormActivity from './screens/FormActivity';
import Countries from './screens/Countries';
import { useEffect } from 'react';
import { connect } from "react-redux";
import { getAllCountries, getContinents } from "./actions";
import { bindActionCreators } from "redux";
import LandingPage from './screens/LandingPage';

function App({ getAllCountries, getContinents }) {

  useEffect(() => {
    getAllCountries();
    getContinents();
  }, []);

  return (
    <div className="App">
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
        <Route path='*' element={<Error404 />} />
      </Routes>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getAllCountries, getContinents }, dispatch);
};

export default connect(null, mapDispatchToProps)(App);
