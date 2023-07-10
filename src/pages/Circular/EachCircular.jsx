import React, { useState, useEffect } from "react";
import Spinner from "../../components/Common/Spinner";
import { Row, Col } from "react-bootstrap";
import EachPageHeading from "../../components/Common/EachPageHeading";
import styled from "styled-components";
import CollectionNewsListBox from "../../components/Common/CollectionNewsListBox";
import ErrorBoundary from "../../components/Error/ErrorBoundary";
import { API_URL, header } from "../../utils/config";
import axios from "axios";
import { useParams } from "react-router-dom";

const EachCircular = (props) => {
  const { slug } = useParams();
  const engLang = props.engLang;

  const [news, setNews] = useState();
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadLatestNews();
  }, [slug]);

  const loadLatestNews = () => {
    axios
      .get(`${API_URL}api/news_notice/` + slug, header)
      .then((res) => {
        setNews(res.data);
        setLoader(false);
      })
      .catch((err) => {
        setError(true);
      });
  };

  const content = () => {
    if (loader) return <Spinner />;
    if (error) return <ErrorBoundary />;
    if (news) {
      return (
        <Row>
          <Col xs={12} md={8} lg={8}>
            <EachPageHeading title={news.title} />
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html: news.description_nepali,
                }}
              ></div>
            </div>
          </Col>
          <Col>
            <CollectionNewsListBox
              type="News & Notice"
              engLang={props.engLang}
            />
          </Col>
        </Row>
      );
    } else {
      return <h1>No Data</h1>;
    }
  };

  return <EachCircularDiv>{content()}</EachCircularDiv>;
};

export default EachCircular;

const EachCircularDiv = styled.div`
  padding: 10px;
`;
