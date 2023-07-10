import React, { useState, useEffect } from "react";
import styled from "styled-components";
import EachPageHeading from "../../components/Common/EachPageHeading";
import { Row, Col, Button } from "react-bootstrap";
import { Content } from "../../components/Common/Content";
import Spinner from "../../components/Common/Spinner";
import CollectionNewsListBox from "../../components/Common/CollectionNewsListBox";
import ErrorBoundary from "../../components/Error/ErrorBoundary";
import { API_URL, header } from "../../utils/config";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EachService = (props) => {
  const { slug } = useParams();
  const engLang = props.engLang;
  const [service, setService] = useState();
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const navigate = new useNavigate();
  useEffect(() => {
    loadLatestNews();
  }, []);

  const loadLatestNews = () => {
    axios
      .get(`${API_URL}api/service/` + slug, header)
      .then((res) => {
        setService(res.data);
        setLoader(false);
      })
      .catch((err) => {
        setError(true);
      });
  };

  const content = () => {
    if (loader) return <Spinner />;
    if (error) return <ErrorBoundary />;
    if (service) {
      return (
        <div>
          <EachPageHeading
            title={props.engLang ? service.title_english : service.title_nepali}
          />
          <img
            src={`${API_URL}${service.file}`}
            className="img-thumbnail"
            width="100%"
            style={{ maxHeight: "450px" }}
          />
          <br />
          <div>
            <Content
              dangerouslySetInnerHTML={{
                __html: `${
                  engLang
                    ? service.description_english
                    : service.description_nepali
                }`,
              }}
            ></Content>
          </div>
          <br />
          <br />
          <Button variant="secondary" onClick={() => navigate("/services")}>
            {props.engLang ? "See All Servies" : "सबै सेवाहरु हेर्नु होस् "}
          </Button>
        </div>
      );
    } else {
      return <h1>No Data</h1>;
    }
  };

  return (
    <EachServiceDiv>
      <Row>
        <Col xs={12} md={8} lg={8}>
          {content()}
        </Col>

        <Col xs={12} md={4} lg={4}>
          <CollectionNewsListBox type="service & Notice" engLang={engLang} />
        </Col>
      </Row>
    </EachServiceDiv>
  );
};

export default EachService;

const EachServiceDiv = styled.div`
  padding: 17px;
`;
