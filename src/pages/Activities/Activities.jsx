import React, { useState, useEffect } from "react";
import { ActivitiesDiv } from "./Activities.styled";
import EachPageHeading from "../../components/Common/EachPageHeading";
import { Col, Row } from "react-bootstrap";
import ActivitiesTable from "../../components/Common/ActivitiesTable";
import Spinner from "../../components/Common/Spinner";
import CollectionNewsListBox from "../../components/Common/CollectionNewsListBox";
import { API_URL, header } from "../../utils/config";
import ErrorBoundary from "../../components/Error/ErrorBoundary";
import axios from "axios";
import { MetaHead } from "../../components/Common/MetaHead.js";
import { SEO } from "../../utils/SEO";

const Activity = (props) => {
  const [activity, setActivity] = useState();
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadActivity();
  }, []);

  const loadActivity = () => {
    axios
      .get(`${API_URL}api/activities`, header)
      .then((res) => {
        setActivity(res.data);
        setLoader(false);
      })
      .catch((err) => {
        setError(true);
      });
  };

  const content = () => {
    if (loader) return <Spinner />;
    if (error) return <ErrorBoundary />;
    return <ActivitiesTable data={activity} engLang={props.engLang} />;
  };

  return (
    <ActivitiesDiv>
      <Row>
        <Col xs={12} md={8} lg={8}>
          <EachPageHeading
            title={props.engLang ? "Postal Rates" : "क्रियाकलापहरु"}
          />
          <p className="lead">
            {props.engLang
              ? "Download the attachments."
              : "फाईल डाउनलोड  गर्नुहोस "}
          </p>
          <MetaHead
            page_name={SEO.activities.page_name}
            description={SEO.activities.description}
            page_title={SEO.activities.page_title}
            keyword={SEO.activities.keyword}
            page_url={SEO.activities.page_url}
          />

          {content()}
        </Col>
        <Col>
          <CollectionNewsListBox type="News & Notice" engLang={props.engLang} />
        </Col>
      </Row>
    </ActivitiesDiv>
  );
};

export default Activity;