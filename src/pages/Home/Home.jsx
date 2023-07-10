import React, { useState, useEffect } from "react";
import { HomeStyled } from "./Home.styled";
import HomeCarousel from "./HomeCarousel";
import { Card, Row, Col, CardDeck, Button } from "react-bootstrap";
import EachPageHeading from "../../components/Common/EachPageHeading";
import HomePageNews from "../../components/NewsListBox/HomePageNews";
import Spinner from "../../components/Common/Spinner";
import { FormattedMessage } from "react-intl";
import Highlight from "./Highlight";
import ErrorBoundary from "../../components/Error/ErrorBoundary";
import { FacebookProvider, Page } from "react-facebook";
import { Content } from "../../components/Common/Content";
import { API_URL, APP_URL, APP_NAME, FB_ID } from "../../utils/config";
import axios from "axios";
import { MetaHead } from "../../components/Common/MetaHead.js";
import img1 from "./assets/okpostal.jpg";
import img2 from "./assets/postal-1.jpg";
import { SEO } from "../../utils/SEO";
import { useNavigate } from "react-router-dom";

var getNepaliNumber = require("get-nepali-number");

const Home = (props) => {
  // news state
  const [homepage, setHomepage] = useState();
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const navigate = new useNavigate();
  useEffect(() => {
    loadHomepage();
  }, [loader, error]);

  const loadHomepage = () => {
    axios
      .get(`${API_URL}api/homepage`)
      .then((res) => {
        setHomepage(res.data);
        setLoader(false);
      })
      .catch((err) => {
        setError(true);
      });
  };

  const newsandnotice = props.engLang ? "NOTICES" : "सूचना";
  const tendernotice = props.engLang ? "TENDER NOTICE" : "बोलपत्र";
  const circularnotice = props.engLang ? "CIRCULAR" : "परिपत्र";
  const right_to_info = props.engLang ? "Right To Information" : "सूचनाको हक";

  const content = () => {
    if (loader) return <Spinner />;
    if (homepage) {
      return (
        <div className="carousel-wrapper">
          <HomeCarousel sliders={homepage.sliders} engLang={props.engLang} />

          <Highlight engLang={props.engLang} highlights={homepage.highlights} />
          <div className="row p-4">
            <div className="col-md-9">
              <div className="row">
                <div style={{ float: "left" }} className="col-md-11">
                  <EachPageHeading
                    title={props.engLang ? "Our Servies" : "हाम्रा सेवाहरु"}
                  />
                </div>
                <div className="col-md-1">
                  <button
                    className="btn btn-sm primary"
                    onClick={() => navigate("/services")}
                    style={{ float: "right" }}
                  >
                    {props.engLang ? "All" : "सबै"}
                  </button>
                </div>
                <hr />
              </div>
              <div className="row" data-equalizer>
                {homepage.services
                  ? homepage.services.map((service, index) => (
                      <div className="col-md-4" key={service.id}>
                        <Card
                          key={service.id}
                          style={{ margin: "0" }}
                          data-equalizer-watch
                        >
                          <Card.Img
                            variant="top"
                            src={`${API_URL}${service.file}`}
                            style={{ height: "150px" }}
                          />
                          <Card.Body
                            style={{ minHeight: "150px", padding: "5px" }}
                          >
                            <Card.Title>
                              {props.engLang
                                ? service.title_english
                                  ? service.title_english
                                  : null
                                : service.title_nepali
                                ? service.title_nepali
                                : null}
                            </Card.Title>
                            <Card.Text>
                              <Content
                                dangerouslySetInnerHTML={{
                                  __html: `${
                                    props.engLang
                                      ? service.description_english
                                        ? service.description_english.substring(
                                            0,
                                            90
                                          ) + "..."
                                        : null
                                      : service.description_nepali
                                      ? service.description_nepali.substring(
                                          0,
                                          90
                                        ) + "..."
                                      : null
                                  }`,
                                }}
                              />
                            </Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <button
                              className="btn btn-primary btn-sm"
                              style={{ bottom: "0px" }}
                              onClick={() =>
                                navigate("/services/" + service.id)
                              }
                            >
                              Read More
                            </button>
                          </Card.Footer>
                        </Card>
                      </div>
                    ))
                  : "माफ गर्नुहोला! कुनै पनि डाटा भेटिएन"}
              </div>
              <br />
              <hr />
              <div className="row">
                <div className="col-md-4">
                  <HomePageNews
                    pill={true}
                    type="news"
                    pillText={newsandnotice}
                    data={homepage.news}
                    engLang={props.engLang}
                  />
                  <div className="readmore">
                    <Button
                      className="primary"
                      onClick={() => navigate("/media/notice")}
                    >
                      {props.engLang ? "View All" : "सबै हेर्नुहोस्"}
                    </Button>
                  </div>
                </div>
                <div className="col-md-4">
                  <HomePageNews
                    pill={true}
                    type="tenders"
                    pillText={tendernotice}
                    data={homepage.tenders}
                    engLang={props.engLang}
                  />

                  <div className="readmore">
                    <Button
                      className="primary "
                      onClick={() => navigate("/media/tender")}
                    >
                      {props.engLang ? "View All" : "सबै हेर्नुहोस्"}
                    </Button>
                  </div>
                </div>
                <div className="col-md-4">
                  <HomePageNews
                    pill={true}
                    type="circular"
                    pillText={circularnotice}
                    data={homepage.circular}
                    engLang={props.engLang}
                  />
                  <div className="readmore">
                    <Button
                      className="primary"
                      onClick={() => navigate("/media/circular")}
                    >
                      {props.engLang ? "View All" : "सबै हेर्नुहोस्"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              {homepage.staffs
                ? homepage.staffs.map((staff, index) => {
                    if (index < 2) {
                      return (
                        <div key={staff.id}>
                          <div className="card mb-4 p-2">
                            <img
                              src={`${API_URL}${staff.file}`}
                              style={{
                                height: "170px",
                                margin: "auto",
                                width: "170px",
                                borderRadius: "50%",
                              }}
                            />
                            <h4 className="mt-4">{staff.name}</h4>
                            <p style={{ margin: "5px" }} className="title">
                              {staff.designation}
                            </p>
                            <p style={{ margin: "0" }}>
                               {staff.working_office}
                            </p>
                            {staff.email ? (
                              <a
                                href={`mailto:${staff.email}`}
                                style={{ fontSize: "14px" }}
                              >
                                <i className="fa fa-envolope"></i> {staff.email}
                              </a>
                            ) : null}

                            <a
                              href={`tel:${staff.phone}`}
                              style={{ fontSize: "14px" }}
                            >
                              <i className="fa fa-phone"></i> {staff.phone}
                            </a>
                          </div>
                        </div>
                      );
                    }
                  })
                : "माफ गर्नुहोला! कुनै पनि डाटा भेटिएन"}
            </div>
          </div>
          <br />
          <div className="row home-last-section">
            <div className="col-md-4">
              <div className="card  m-0">
                <EachPageHeading
                  title={
                    <FormattedMessage
                      id="home.ourgallery"
                      defaultMessage="Our Gallery"
                    />
                  }
                />
                <img src={img1} style={{ height: "210px" }} />
              </div>
            </div>
            <div className="col-md-4">
              <div className="card m-0 left">
                <EachPageHeading
                  title={
                    <FormattedMessage
                      id="bottomnav.righttoinformation"
                      defaultMessage="Right To Information"
                    />
                  }
                />
                <div
                  style={{
                    height: "190px",
                    textAlign: "left",
                    paddingLeft: "13px",
                  }}
                >
                  {homepage.righttoinfos.map((right, index) => (
                    <a
                      href={`${API_URL}${right.file}`}
                      download
                      style={{ fontSize: "14px", color: "blue" }}
                      key={index}
                    >
                      <i className="fa fa-check"></i>{" "}
                      {props.engLang ? right.title_english : right.title_nepali}
                    </a>
                  ))}
                </div>
                <br />
              </div>
            </div>
            <div className="col-md-4  m-0">
              <div className="card">
                <EachPageHeading
                  title={
                    <FormattedMessage
                      id="home.ourfacebook"
                      defaultMessage="Our Facebook Page"
                    />
                  }
                />
                <FacebookProvider appId="369265357064581">
                  <Page
                    href="https://facebook.com/"
                    tabs="timeline"
                    height="210"
                  />
                  <div style={{ height: "210" }}>Facebook Page Here</div>
                </FacebookProvider>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <h1>No About Data</h1>;
    }
  };

  return (
    <HomeStyled>
      <MetaHead
        page_name={SEO.homepage.page_name}
        description={SEO.homepage.description}
        page_title={SEO.homepage.page_title}
        keyword={SEO.homepage.keyword}
        page_url={SEO.homepage.page_url}
      />
      {content()}
    </HomeStyled>
  );
};

export default Home;
