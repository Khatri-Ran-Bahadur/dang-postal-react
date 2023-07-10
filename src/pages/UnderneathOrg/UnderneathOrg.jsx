import React, { useState, useEffect } from "react";
import styled from "styled-components";
import EachPageHeading from "../../components/Common/EachPageHeading";
import { Row, Col } from "react-bootstrap";
import { Content } from "../../components/Common/Content";
import Spinner from "../../components/Common/Spinner";
import CollectionNewsListBox from "../../components/Common/CollectionNewsListBox";
import { API_URL, header } from "../../utils/config";
import { MetaHead } from "../../components/Common/MetaHead.js";

import ErrorBoundary from "../../components/Error/ErrorBoundary";
import axios from "axios";
import { SEO } from "../../utils/SEO";

const UnderneathOrg = ({ engLang }) => {
  const [underneath, setUnderneath] = useState();
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadUnderneath();
  }, []);

  const loadUnderneath = () => {
    axios
      .get(`${API_URL}api/underneath`, header)
      .then((res) => {
        setUnderneath(res.data);
        setLoader(false);
      })
      .catch((err) => {
        setError(true);
      });
  };

  const content = () => {
    if (loader) return <Spinner />;
    if (error) return <ErrorBoundary />;
    if (underneath) {
      return (
        <div>
          {underneath.file ? (
            <div class="d-flex">
              <a class="" href={`${API_URL}${underneath.file}`} download>
                {engLang ? "Download File" : "फाईल डाउनलोड  गर्नुहोस "}
              </a>
            </div>
          ) : (
            ""
          )}

          {underneath.file ? (
            <img src={`${API_URL}${underneath.file}`} width="100%" />
          ) : (
            ""
          )}
          <br />
          <br />
          <Content
            style={{ align: "justify-content" }}
            dangerouslySetInnerHTML={{
              __html: `${
                engLang
                  ? underneath.description_english
                  : underneath.description_nepali
              }`,
            }}
          ></Content>
        </div>
      );
    } else {
      return (
        <h1>{engLang ? "Data does not found" : "कुनै पनि डाटा भेटिएन "}</h1>
      );
    }
  };

  return (
    <UnderneathOrgDiv>
      <Row className="p-2">
        <Col xs={12} md={8} lg={8}>
          <EachPageHeading
            title={
              engLang
                ? "UNDERNEATH ORGANIZATIONS"
                : "कार्यालय अन्तर्गतका निकायहरू "
            }
          />
          <MetaHead
            page_name={SEO.underneath.page_name}
            description={SEO.underneath.description}
            page_title={SEO.underneath.page_title}
            keyword={SEO.underneath.keyword}
            page_url={SEO.underneath.page_url}
          />

          {content()}
        </Col>

        <Col>
          <CollectionNewsListBox type="News & Notice" engLang={engLang} />
        </Col>
      </Row>
    </UnderneathOrgDiv>
  );
};

export default UnderneathOrg;

const UnderneathOrgDiv = styled.div `
  padding: 17px;
`;