import React, { useState, useEffect } from "react";
import { PostalRatesSection } from "./PostalRates.styled";
import EachPageHeading from "../../components/Common/EachPageHeading";
import { Col, Row } from "react-bootstrap";
import FileAndDownloadTable from "../../components/Common/FileAndDownloadTable";
import Spinner from "../../components/Common/Spinner";
import CollectionNewsListBox from "../../components/Common/CollectionNewsListBox";
import { API_URL, header } from "../../utils/config";
import ErrorBoundary from "../../components/Error/ErrorBoundary";
import axios from "axios";
import { MetaHead } from "../../components/Common/MetaHead.js";
import { SEO } from "../../utils/SEO";

const PostalRates = (props) => {
  const [postalRates, setPostalRates] = useState();
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadPostalRates();
  }, []);

  const loadPostalRates = () => {
    axios
      .get(`${API_URL}api/postal_rates`, header)
      .then((res) => {
        setPostalRates(res.data);
        setLoader(false);
      })
      .catch((err) => {
        setError(true);
      });
  };

  const content = () => {
    if (loader) return <Spinner />;
    if (error) return <ErrorBoundary />;
    return <FileAndDownloadTable data={postalRates} engLang={props.engLang} />;
  };

  return (
    <PostalRatesSection>
      <Row>
        <Col xs={12} md={8} lg={8}>
          <EachPageHeading
            title={props.engLang ? "Postal Rates" : "हुलाक दर"}
          />
          <p className="lead">
            {props.engLang
              ? "Download the attachments."
              : "फाईल डाउनलोड  गर्नुहोस "}
          </p>
          <MetaHead
            page_name={SEO.postal_rates.page_name}
            description={SEO.postal_rates.description}
            page_title={SEO.postal_rates.page_title}
            keyword={SEO.postal_rates.keyword}
            page_url={SEO.postal_rates.page_url}
          />

          {content()}
        </Col>
        <Col>
          <CollectionNewsListBox type="News & Notice" engLang={props.engLang} />
        </Col>
      </Row>
    </PostalRatesSection>
  );
};

export default PostalRates;