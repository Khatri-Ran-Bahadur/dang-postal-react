import React, { useState, useEffect } from "react";
import { Card, Row, Col, CardDeck, Button } from "react-bootstrap";
import styled from "styled-components";
import EachPageHeading from "../../components/Common/EachPageHeading";
import { Content } from "../../components/Common/Content";
import Spinner from "../../components/Common/Spinner";
import CollectionNewsListBox from "../../components/Common/CollectionNewsListBox";
import { API_URL, header } from "../../utils/config";
import ErrorBoundary from "../../components/Error/ErrorBoundary";
import axios from "axios";
import { MetaHead } from "../../components/Common/MetaHead.js";
import { SEO } from "../../utils/SEO";
import { useNavigate } from "react-router-dom";

const AllServices = (props) => {
  let engLang = props.engLang;

  const [services, setServices] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const navigate = new useNavigate();
  useEffect(() => {
    loadService();
  }, []);

  const loadService = () => {
    axios
      .get(`${API_URL}api/services`, header)
      .then((res) => {
        setServices(res.data);
        setLoader(false);
      })
      .catch((err) => {
        setError(true);
      });
  };

  const content = () => {
    if (loader) return <Spinner />;
    if (error) return <ErrorBoundary />;
    if (services) {
      return services.map((service, index) => (
        <Col
          md={4}
          key={index}
          style={{ marginBottom: "10px" }}
          data-equalizer-watch
        >
          <Card style={{ margin: "0" }}>
            <Card.Img
              variant="top"
              src={`${API_URL}${service.file}`}
              style={{ height: "150px" }}
            />
            <Card.Body style={{ minHeight: "210px" }}>
              <Card.Title>
                {engLang ? service.title_english : service.title_nepali}
              </Card.Title>
              <div>
                <Content
                  dangerouslySetInnerHTML={{
                    __html: `${
                      engLang
                        ? service.description_english.substring(0, 100) + "..."
                        : service.description_nepali.substring(0, 100) + "..."
                    }`,
                  }}
                />
              </div>
              <div>
                <Button
                  className="primary"
                  onClick={() => navigate("/services/" + service.id)}
                >
                  Read More
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ));
    } else {
      return <h1>No About Data</h1>;
    }
  };

  const title = engLang ? "All Services" : "सबै सेवाहरु";
  return (
    <AllServicesDiv>
      <Row>
        <Col xs={12} md={8} lg={8}>
          <EachPageHeading title={title} />
          <MetaHead
            page_name={SEO.service.page_name}
            description={SEO.service.description}
            page_title={SEO.service.page_title}
            keyword={SEO.service.keyword}
            page_url={SEO.service.page_url}
          />

          <Row>
            <CardDeck data-equalizer>{content()}</CardDeck>
          </Row>
        </Col>

        <Col xs={12} md={4} lg={4}>
          <CollectionNewsListBox type="News & Notice" engLang={engLang} />
        </Col>
      </Row>
    </AllServicesDiv>
  );
};

export default AllServices;

const AllServicesDiv = styled.div`
  padding: 20px;
`;
