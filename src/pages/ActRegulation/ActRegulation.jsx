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

const ActRegulation = ({ engLang }) => {
  const [actregulation, setActRegulation] = useState();
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadActAndRegulation();
  }, []);

  const loadActAndRegulation = () => {
    axios
      .get(`${API_URL}api/act_and_regulation`, header)
      .then((res) => {
        setActRegulation(res.data);
        setLoader(false);
      })
      .catch((err) => {
        setError(true);
      });
  };
  console.log(actregulation);
  const title = engLang ? "Act and Regulation" : "ऐन तथा नियमावलीहरु";

  const content = () => {
    if (loader) return <Spinner />;
    if (error) return <ErrorBoundary />;
    if (actregulation) {
      return (
        <div>
          <Content
            dangerouslySetInnerHTML={{
              __html: `${
                engLang
                  ? actregulation.description_english
                  : actregulation.description_nepali
              }`,
            }}
          ></Content>
        </div>
      );
    } else {
      return (
        <h1>
          {engLang
            ? "No act and regulation data found"
            : "कुनै पनि डाटा भेटिएन "}
        </h1>
      );
    }
  };

  return (
    <ActRegulationDiv>
      <MetaHead
        page_name={SEO.act_regulation.page_name}
        description={SEO.act_regulation.description}
        page_title={SEO.act_regulation.page_title}
        keyword={SEO.act_regulation.keyword}
        page_url={SEO.act_regulation.page_url}
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
    </ActRegulationDiv>
  );
};

export default ActRegulation;

const ActRegulationDiv = styled.div`
  padding: 10px;
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
