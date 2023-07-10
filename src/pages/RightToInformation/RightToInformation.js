import React, { useState, useEffect } from "react";
import { RightToInformationSection } from "./RightToInformation.styled";
import EachPageHeading from "../../components/Common/EachPageHeading";
import { Col, Row } from "react-bootstrap";
import Spinner from "../../components/Common/Spinner";
import RightToInformationFile from "../../components/Common/RightToInformationFile";
import CollectionNewsListBox from "../../components/Common/CollectionNewsListBox";
import { API_URL, header, APP_NAME, FB_ID } from "../../utils/config";
import ErrorBoundary from "../../components/Error/ErrorBoundary";
import axios from "axios";
// import Pagination from "react-js-pagination";
import { MetaHead } from "../../components/Common/MetaHead.js";
import { SEO } from "../../utils/SEO";

const RightToInformation = (props) => {
  const [rightToInfo, setRightToInfo] = useState();
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadRightToInfo();
  }, []);

  const loadRightToInfo = () => {
    axios
      .get(`${API_URL}api/right_to_info`, header)
      .then((res) => {
        setRightToInfo(res.data);
        setLoader(false);
      })
      .catch((err) => {
        setError(true);
      });
  };

  const content = () => {
    if (loader) return <Spinner />;
    if (error) return <ErrorBoundary />;
    return (
      <RightToInformationFile
        data={rightToInfo}
        engLang={props.engLang}
        type="press"
      />
    );
  };

  return (
    <RightToInformationSection>
      <Row className="p-6">
        <Col xs={12} md={8} lg={8}>
          <EachPageHeading
            title={props.engLang ? "Right To Information" : "सूचनाको-हक"}
          />
          <p className="lead">
            {props.engLang
              ? "Details Published as per the Section 5 of the Right to Information Act, 2064 and Rule 3 of the Right to Information Rules, 2065."
              : "सूचनाको हक सम्बन्धी ऐन, २०६४ को दफा ५ को उप दफा ३ र नियमावलीको नियम ३ बमोजिम ३/३ महिनामा सार्वजनिक गर्नुपर्ने विवरणहरु |"}
          </p>
          <MetaHead
            page_name={SEO.right_to_information.page_name}
            description={SEO.right_to_information.description}
            page_title={SEO.right_to_information.page_title}
            keyword={SEO.right_to_information.keyword}
            page_url={SEO.right_to_information.page_url}
          />

          {content()}
        </Col>
        <Col>
          <CollectionNewsListBox type="News & Notice" engLang={props.engLang} />
        </Col>
      </Row>
    </RightToInformationSection>
  );
};

export default RightToInformation;
