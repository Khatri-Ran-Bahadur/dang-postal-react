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

const PolicyProgram = ({ engLang }) => {
  const [policy_program, setPolicyProgram] = useState();
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadPolicyProgram();
  }, [loader, error]);

  const loadPolicyProgram = () => {
    axios
      .get(`${API_URL}api/policy_program`, header)
      .then((res) => {
        setPolicyProgram(res.data);
        setLoader(false);
      })
      .catch((err) => {
        setError(true);
      });
  };

  const content = () => {
    if (loader) return <Spinner />;
    if (error) return <ErrorBoundary />;
    if (policy_program) {
      return (
        <div>
          <Content
            dangerouslySetInnerHTML={{
              __html: `${
                engLang
                  ? policy_program.description_english
                    ? policy_program.description_english
                    : policy_program.description_nepali
                  : policy_program.description_nepali
              }`,
            }}
          ></Content>
          <a href={`${API_URL}${policy_program.file}`} download>
            Download
          </a>
        </div>
      );
    } else {
      return <h1>No About Data</h1>;
    }
  };

  const title = engLang ? "Policy Program" : "नीति तथा कार्यक्रम";
  return (
    <PolicyProgramDiv>
      <Row>
        <Col xs={12} md={8} lg={8}>
          <EachPageHeading title={title} />
          <MetaHead
            page_name={SEO.policy_program.page_name}
            description={SEO.policy_program.description}
            page_title={SEO.policy_program.page_title}
            keyword={SEO.policy_program.keyword}
            page_url={SEO.policy_program.page_url}
          />

          {content()}
        </Col>

        <Col>
          <CollectionNewsListBox type="News & Notice" engLang={engLang} />
        </Col>
      </Row>
    </PolicyProgramDiv>
  );
};

export default PolicyProgram;

const PolicyProgramDiv = styled.div `
  padding: 17px;
`;