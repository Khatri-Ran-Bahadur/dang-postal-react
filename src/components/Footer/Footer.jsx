import React, { useState, useEffect } from "react";
import { FooterDiv } from "./Footer.syled";
import { API_URL, header } from "../../utils/config";
import ErrorBoundary from "../Error/ErrorBoundary";
import axios from "axios";
import Spinner from "../Common/Spinner";

const Footer = ({ engLang }) => {
  const [contactus, setContactus] = useState();
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadConact();
  }, []);

  const loadConact = () => {
    axios
      .get(`${API_URL}api/contact_us`, header)
      .then((res) => {
        setContactus(res.data);
        setLoader(false);
      })
      .catch((err) => {
        setError(true);
      });
  };

  const content = () => {
    if (loader) return <Spinner />;
    if (error) return <ErrorBoundary />;
    if (contactus) {
      return (
        <ul className="list-unstyled" style={color}>
          <li>
            {engLang
              ? "DISTRICT POSTAL OFFICE DANG"
              : "जिल्ला हुलाक कार्यालय दाङ"}
          </li>
          <li>{contactus.address}</li>
          <li className="c-phone">
            <a href="tel:०८८५२००११">
              {engLang ? "Phone" : "फोन"}: {contactus.phone}
            </a>
          </li>
          <li className="c-fax">
            {engLang ? "Fax" : "फ्याक्स"}: {contactus.fax}
          </li>
          <li className="c-audio">
            {engLang ? "Notice Board" : "नोटिस बोर्डः"} :{contactus.noticeBoard}
          </li>
          <li className="c-email">
            <a href="mailto: info@postalservice.gov.np">
              {engLang ? "Email" : "इमेल"} : {contactus.email}
            </a>
          </li>
          <li className="c-website">
            {engLang ? "Website" : "वेबसाइट"} : {contactus.website}
          </li>
        </ul>
      );
    }
  };
  const color = {
    color: "#fff",
  };

  return (
    <FooterDiv>
      <div className="container-fluid toppart">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-3">
            <div className="footer-c-title">
              <span>डाउनलोड</span>
            </div>
            <div className="clerfix"></div>
            <div className="f-content f-others">
              <ul className="list-unstyled">
                <li>
                  <a href="/department/underneath-org">संगठनात्मक ढाँचा</a>
                </li>
                <li>
                  <a href="/contact-us">सम्पर्क सूचि</a>
                </li>
                <li>
                  <a href="detail/postal-codes-of-nepal.html">
                    नेपालका हुलाक संकेतहरु
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <div className="footer-c-title">
              छिटो <span>लिङ्कहरू</span>{" "}
            </div>
            <div className="clerfix"></div>
            <div className="f-content f-others">
              <ul className="list-unstyled">
                <li>
                  <a href="detail/ems-services.html">ई.एम.एस. सेवा</a>
                </li>
                <li>
                  <a href="detail/general-post-box.html">
                    साधारण हुलाक मञ्जुषाा
                  </a>
                </li>
                <li>
                  <a href="detail/general-services.html">साधारण सेवाहरु</a>
                </li>
                <li>
                  <a href="detail/parcel.html">पार्सल</a>
                </li>
                <li>
                  <a href="detail/other-services.html">अन्य सेवाहरु</a>
                </li>
                <li>
                  <a href="detail/new--it-based-services.html">
                    New & IT Based Services
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <div className="footer-c-title">
              अन्य <span>लिङ्कहरू</span>{" "}
            </div>
            <div className="clerfix"></div>
            <div className="f-content f-others">
              <ul className="list-unstyled">
                <li>
                  <a href="http://mocit.gov.np/" target="_blank">
                    सञ्‍चार तथा सूचना प्रविधि मन्त्रालय
                  </a>
                </li>

                <li>
                  <a href="http://www.gpo.gov.np/" target="_blank">
                    गोश्वारा हुलाक कार्यालय
                  </a>
                </li>

                <li>
                  <a href="http://www.ptc.gov.np/" target="_blank">
                    हुलाक प्रशिक्षण केन्द्र
                  </a>
                </li>

                <li>
                  <a href="http://www.cmo.gov.np/" target="_blank">
                    केन्द्रिय धनादेश कार्यालय
                  </a>
                </li>

                <li>
                  <a href="http://www.psc.gov.np/" target="_blank">
                    लोक सेवा आयोग
                  </a>
                </li>

                <li>
                  <a href="http://www.upu.int/en.html" target="_blank">
                    विश्व हुलाक संघ
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <div className="footer-c-title">
              सम्पर्क <span>जानकारी</span>
            </div>
            <div className="clerfix"></div>
            <div className="f-content f-contact">{content()}</div>
          </div>
        </div>
      </div>

      <div className="copyright bottompart">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-5">
              <div className="">
                <span style={{ marginLeft: "20px" }}>
                  अन्तिम अद्यावधिक गरिएको मिति:{" "}
                  <span>
                    &#2408;&#2406;&#2413;&#2412;&#45;&#2407;&#2406;&#45;&#2407;&#2413;
                  </span>
                </span>
              </div>
            </div>
            <div className="col-12 col-md-7">
              <div className="c-c" style={{ textAlign: "right" }}>
                © Copyright 2020. नेपाल सरकार हुलाक सेवा विभाग दाङ All Right
                Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
      <input type="hidden" name="baseurl" id="baseurl" value="index.html" />
    </FooterDiv>
  );
};

export default Footer;
