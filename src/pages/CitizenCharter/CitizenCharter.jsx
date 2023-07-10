import React, { useState, useEffect } from "react";
import styled from "styled-components";
import EachPageHeading from "../../components/Common/EachPageHeading";
import Spinner from "../../components/Common/Spinner";
import { Row, Col } from "react-bootstrap";
import "./style.css";
import CollectionNewsListBox from "../../components/Common/CollectionNewsListBox";
import { API_URL, header } from "../../utils/config";
import ErrorBoundary from "../../components/Error/ErrorBoundary";
import axios from "axios";
import { MetaHead } from "../../components/Common/MetaHead.js";
import { Content } from "../../components/Common/Content";
import { SEO } from "../../utils/SEO";
const CitizenCharter = ({ engLang }) => {
  const [citizencharter, setCitizenCharter] = useState();
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    citizenCharter();
  }, []);

  const citizenCharter = () => {
    axios
      .get(`${API_URL}api/citizen_charter`, header)
      .then((res) => {
        setCitizenCharter(res.data);
        setLoader(false);
      })
      .catch((err) => {
        setError(true);
      });
  };

  const content = () => {
    if (loader) return <Spinner />;
    if (error) return <ErrorBoundary />;
    if (citizencharter) {
      return (
        <div>
          {citizencharter.file ? (
            <a href={`${API_URL}${citizencharter.file}`} download>
              {engLang ? "Download File" : "फाईल डाउनलोड  गर्नुहोस "}
            </a>
          ) : (
            ""
          )}

          {citizencharter.file ? (
            <img src={`${API_URL}${citizencharter.file}`} width="100%" />
          ) : (
            ""
          )}
          <div className="resposive-table">
            <Content
              style={{ align: "justify-content" }}
              dangerouslySetInnerHTML={{
                __html: `${
                  engLang
                    ? citizencharter.description_english
                    : citizencharter.description_nepali
                }`,
              }}
            ></Content>
          </div>
        </div>
      );
    } else {
      return (
        <h1>{engLang ? "Data does not found" : "कुनै पनि डाटा भेटिएन "}</h1>
      );
    }
  };

  const title = engLang ? "CITIZEN CHARTER" : "नागरिक बडापत्र";

  return (
    <CitizenCharterDiv>
      <Row>
        <Col xs={12} md={12} lg={12}>
          <EachPageHeading title={title} />
          <MetaHead
            page_name={SEO.citizen.page_name}
            description={SEO.citizen.description}
            page_title={SEO.citizen.page_title}
            keyword={SEO.citizen.keyword}
            page_url={SEO.citizen.page_url}
          />
          {content()}
        </Col>
      </Row>
    </CitizenCharterDiv>
  );
};

export default CitizenCharter;

const CitizenCharterDiv = styled.div `
  padding: 17px;
  .lead-header {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    font-weight: bold;
  }

  @media screen and (max-width: 600px) {
    .resposive-table {
      overflow-x: auto;
    }
  }
  table {
    border-collapse: collapse;
    border: 1px solid #f1f1f1;
    width: 100%;
    overflow-x: auto;
  }

  th,
  td {
    text-align: left;
    padding: 8px;
    border: 1px solid #f1f1f1;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;