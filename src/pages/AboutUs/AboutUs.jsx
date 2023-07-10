import React, { useState, useEffect } from "react";
import styled from "styled-components";
import EachPageHeading from "../../components/Common/EachPageHeading";
import { Row, Col } from "react-bootstrap";
import { Content } from "../../components/Common/Content";
import Spinner from "../../components/Common/Spinner";
import CollectionNewsListBox from "../../components/Common/CollectionNewsListBox";
import { API_URL, header } from "../../utils/config";
import ErrorBoundary from "../../components/Error/ErrorBoundary";
import axios from "axios";
import { MetaHead } from "../../components/Common/MetaHead.js";
import { SEO } from "../../utils/SEO";
const AboutUs = ({ engLang }) => {
  const [about, setAbout] = useState();
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadAbout();
  }, []);

  const loadAbout = () => {
    axios
      .get(`${API_URL}api/about`, header)
      .then((res) => {
        setAbout(res.data);
        setLoader(false);
      })
      .catch((err) => {
        setError(true);
      });
  };

  const title = engLang ?
    "Introduction to Postal Service" :
    "हुलाक सेवा को लागी परिचय";

  const content = () => {
    if (loader) return <Spinner />;
    if (error) return <ErrorBoundary />;
    if (about) {
      return (
        <div>
          <Content
            dangerouslySetInnerHTML={{
              __html: `${
                engLang ? about.description_english : about.description_nepali
              }`,
            }}
          ></Content>
        </div>
      );
    } else {
      return <h1>{engLang ? "No About Data" : "कुनै पनि डाटा भेटिएन "}</h1>;
    }
  };

  return (
    <AboutUsDiv>
      <MetaHead
        page_name={SEO.about.page_name}
        description={SEO.about.description}
        page_title={SEO.about.page_title}
        keyword={SEO.about.keyword}
        page_url={SEO.about.page_url}
      />
      <Row>
        <Col xs={12} md={8} lg={8}>
          <EachPageHeading title={title} />
          {content()}
        </Col>
        <Col xs={12} md={4} lg={4}>
          <CollectionNewsListBox type="News & Notice" engLang={engLang} />
        </Col>
      </Row>
    </AboutUsDiv>
  );
};

export default AboutUs;

const AboutUsDiv = styled.div `
  padding: 17px;
`;