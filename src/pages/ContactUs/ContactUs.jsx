import React, { useState, useEffect } from "react";
import { Card, Col, Row, Media } from "react-bootstrap";
import { MdPhone, MdEmail } from "react-icons/md";
import { FaFax, FaPhoneVolume } from "react-icons/fa";
import { IoMdGlobe } from "react-icons/io";
import { ContactDiv } from "./Contact.styled";
import ContactForm from "./ContactForm";
import { ReactComponent as Fb } from "./assets/facebook.svg";
import { ReactComponent as Tweet } from "./assets/twitter.svg";
import { ReactComponent as Toll } from "./assets/toll.svg";
import EachPageHeading from "../../components/Common/EachPageHeading";
import Spinner from "../../components/Common/Spinner";
import GoogleMap from "./GoogleMap";
import { API_URL, APP_URL, header, APP_NAME, FB_ID } from "../../utils/config";
import ErrorBoundary from "../../components/Error/ErrorBoundary";
import axios from "axios";
import { MetaHead } from "../../components/Common/MetaHead.js";
import { SEO } from "../../utils/SEO";

const ContactUs = ({ engLang }) => {
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
        <Row>
          <Col xs={12} md={6} lg={6}>
            <Card className="contact-card">
              <Card.Body>
                <Card.Title className="title">
                  {engLang
                    ? "DISTRICT POSTAL OFFICE SALYLAN"
                    : "जिल्ला हुलाक कार्यालय दाङ"}
                </Card.Title>
                <Card.Text>{contactus.address}</Card.Text>
                <div>
                  <div className="details">
                    <MdPhone size="18px" />
                    <span>
                      {engLang ? "Phone" : "फोन"}: {contactus.phone}
                    </span>
                  </div>
                  <div className="details">
                    <FaFax size="18px" />
                    <span>
                      {engLang ? "Fax" : "फ्याक्स"}: {contactus.fax}
                    </span>
                  </div>
                  <div className="details">
                    <MdEmail size="18px" />
                    <span>
                      {engLang ? "Email" : "इमेल"} : {contactus.email}
                    </span>
                  </div>
                  <div className="details">
                    <IoMdGlobe size="18px" />
                    <span>
                      {engLang ? "Website" : "वेबसाइट"} : {contactus.website}{" "}
                    </span>
                  </div>
                  <div className="details">
                    <FaPhoneVolume size="18px" />
                    <span>
                      {engLang ? "Notice Board" : "नोटिस बोर्डः"} :
                      {contactus.notice_board}
                    </span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col className="social-wrapper">
            <div className="social">
              <Media className="social-media">
                <Fb width={50} height={50} className="mr-3" />
                <a href={contactus.facebook} target="_blank">
                  <Media.Body>
                    <div>{engLang ? "Facebook" : "फेसबुक"}</div>
                    <span>@nplpost</span>
                  </Media.Body>
                </a>
              </Media>
              <Media className="social-media">
                <Tweet width={50} height={50} className="mr-3" />
                <a href={contactus.twitter} target="_blank">
                  <Media.Body>
                    <div>{engLang ? "Twitter" : "ट्वीटर"}</div>
                    <span>@Nepal_Post</span>
                  </Media.Body>
                </a>
              </Media>
              <Media className="social-media">
                <Toll width={50} height={50} className="mr-3" />
                <Media.Body>
                  <div>{engLang ? "Toll Free" : "टोल फ्रीस"}</div>
                  <span>{contactus.troll_free}</span>
                </Media.Body>
              </Media>
            </div>
          </Col>
        </Row>
      );
    }
  };

  let title = engLang ? "Contact Us" : "सम्पर्क";
  return (
    <ContactDiv>
      <EachPageHeading title={title} />
      <MetaHead
        page_name={SEO.contact_us.page_name}
        description={SEO.contact_us.description}
        page_title={SEO.contact_us.page_title}
        keyword={SEO.contact_us.keyword}
        page_url={SEO.contact_us.page_url}
      />

      {content()}
      <Row>
        <Card className="map-card" style={{ width: "100%", margin: "5px" }}>
          <div>
            <GoogleMap />
          </div>
        </Card>
      </Row>
      <Row>
        <Col>
          <ContactForm />
        </Col>
      </Row>
    </ContactDiv>
  );
};

export default ContactUs;
