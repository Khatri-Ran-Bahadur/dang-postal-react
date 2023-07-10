import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { IntlProvider, FormattedMessage } from "react-intl";
import { createBrowserHistory } from "history";
// Styles
import "bootstrap/dist/css/bootstrap.min.css";
// Global Style
import "./App.scss";
import "moment/locale/ne";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import ContactUs from "./pages/ContactUs/ContactUs";
import Home from "./pages/Home/Home";
import PostalRates from "./pages/PostalRates/PostalRates";
import Activities from "./pages/Activities/Activities";
import Notice from "./pages/Notice/Notice";
import RightToInformation from "./pages/RightToInformation/RightToInformation";
import PressRelease from "./pages/PressRelease/PressRelease";
import News from "./pages/News/News";
import Tender from "./pages/Tender/Tender";
import Circular from "./pages/Circular/Circular";
import ActRegulation from "./pages/ActRegulation/ActRegulation";
import PolicyProgram from "./pages/PolicyProgram/PolicyProgram";
import AboutUs from "./pages/AboutUs/AboutUs";
import UnderneathOrg from "./pages/UnderneathOrg/UnderneathOrg";
import StaffDetails from "./pages/StaffDetails/StaffDetails";
import CitizenCharter from "./pages/CitizenCharter/CitizenCharter";
import EachService from "./pages/Services/EachService";
import AllServices from "./pages/Services/AllServices";
// import Publication from "./pages/Publication/Publication";
// import Gallery from "./pages/Gallery/Gallery";
import ScrollToTop from "./utils/ScrollToTop";
import keys from "./keys";
import messages from "./i18n/index";
import AdminRedirection from "./components/AdminRedirection/AdminRedirection";
import EachNews from "./pages/News/EachNews";
import EachCircular from "./pages/Circular/EachCircular";
import EachTender from "./pages/Tender/EachTender";
import AreaOffice from "./pages/Office/AreaOffice";
import AdditionalOffice from "./pages/Office/AdditionalOffice";

import "./lib/nepconverter";
// import SearchPage from "./pages/SearchPage/SearchPage";
import ErrorBoundary from "./components/Error/ErrorBoundary";

const history = createBrowserHistory();
const App = () => {
  const [engLang, setEngLang] = useState(true);
  const [toggleEye, setToggleEye] = useState(false);
  useEffect(() => {
    toggleEye
      ? (document.getElementById("body-baby").className = "eye-theme")
      : (document.getElementById("body-baby").className = "");
  }, [toggleEye]);

  return (
    <IntlProvider
      locale={engLang ? "en" : "ne"}
      messages={messages[engLang ? "en" : "ne"]}
    >
      <ErrorBoundary
        history={history}
        setEngLangUI={setEngLang}
        engLangUI={engLang}
        toggleEye={toggleEye}
        setToggleEye={setToggleEye}
      >
        <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
          <Header
            history={history}
            setEngLangUI={setEngLang}
            engLangUI={engLang}
            toggleEye={toggleEye}
            setToggleEye={setToggleEye}
          />
          <ScrollToTop history={history}>
            <Routes>
              <Route path="/" element={<Home engLang={engLang} />} />
              <Route
                path="/department/aboutus"
                element={<AboutUs engLang={engLang} />}
              />
              <Route
                path="/department/underneath-org"
                element={<UnderneathOrg engLang={engLang} />}
              />
              <Route
                path="/department/staffs"
                element={<StaffDetails engLang={engLang} />}
              />
              <Route
                path="/department/citizen-charter"
                element={<CitizenCharter engLang={engLang} />}
              />
              <Route
                path="/act-regulations"
                element={<ActRegulation engLang={engLang} />}
              />
              <Route
                path="/policy-program"
                element={<PolicyProgram engLang={engLang} />}
              />
              <Route
                path="/media/notice"
                element={<Notice engLang={engLang} />}
              />
              <Route
                path="/media/right-to-information"
                element={<RightToInformation engLang={engLang} />}
              />
              <Route path="/media/press-release" element={<PressRelease />} />
              <Route path="/media/news" element={<News engLang={engLang} />} />
              <Route
                path="/media/tender"
                element={<Tender engLang={engLang} />}
              />
              <Route
                path="/media/circular"
                element={<Circular engLang={engLang} />}
              />
              <Route
                path="/activities"
                element={<Activities engLang={engLang} />}
              />
              <Route
                path="/postal-rates"
                element={<PostalRates engLang={engLang} />}
              />
              <Route
                path="/contact-us"
                element={<ContactUs engLang={engLang} />}
              />
              <Route
                path="/media/circular/:slug"
                element={<EachCircular engLang={engLang} />}
              />
              <Route
                path="/services/:slug"
                element={<EachService engLang={engLang} />}
              />
              <Route
                path="/services"
                element={<AllServices engLang={engLang} />}
              />
              <Route path="/adminPanel" element={<AdminRedirection />} />
              <Route
                path="/media/news/:slug"
                element={<EachNews engLang={engLang} />}
              />
              <Route
                path="/media/notice/:slug"
                element={<EachNews engLang={engLang} />}
              />
              <Route
                path="/media/press/:slug"
                element={<EachNews engLang={engLang} />}
              />
              <Route
                path="/media/tender/:slug"
                element={<EachTender engLang={engLang} />}
              />
              <Route
                path="/office/area-office"
                element={<AreaOffice engLang={engLang} />}
              />
              <Route
                path="/office/additional-office"
                element={<AdditionalOffice engLang={engLang} />}
              />
              <Route
                path="/error"
                element={
                  <ErrorBoundary
                    history={history}
                    setEngLangUI={setEngLang}
                    engLangUI={engLang}
                    toggleEye={toggleEye}
                    setToggleEye={setToggleEye}
                  />
                }
              />
              <Route path="*" element={<Home engLang={engLang} />} />
            </Routes>
          </ScrollToTop>
          <Footer engLang={engLang} />
        </Router>
      </ErrorBoundary>
    </IntlProvider>
  );
};

export default App;
