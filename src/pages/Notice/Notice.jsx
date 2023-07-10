import React, { useState, useEffect } from "react";
import styled from "styled-components";
import EachPageHeading from "../../components/Common/EachPageHeading";
import VericleTimeline from "../../components/Common/VericleTimeline";
// import Pagination from "react-js-pagination";
import { API_URL } from "../../utils/config";
import axios from "axios";
import ErrorBoundary from "../../components/Error/ErrorBoundary";
import Spinner from "../../components/Common/Spinner";
import NewsTable from "../../components/Common/NewsTable";
import { MetaHead } from "../../components/Common/MetaHead.js";
import { SEO } from "../../utils/SEO";
import { Col, Row } from "react-bootstrap";
import CollectionNewsListBox from "../../components/Common/CollectionNewsListBox";

import {
  english_year,
  english_month,
  nepali_year,
  nepali_month,
} from "../../lib/date_list.js";
import BikramSambatConverter from "../../lib/nepconverter";

const Notices = (props) => {
  const engLang = props.engLang;
  const [news, setNews] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);

  const bsConvertor = new BikramSambatConverter();
  const today = new Date();
  const bs_date = bsConvertor.AD_to_BS_ENG(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );

  const currentYear = engLang ? today.getFullYear() : bs_date["year"];
  const yearList = engLang ? english_year : nepali_year;
  const [year, setYear] = useState(currentYear);

  useEffect(() => {
    loadNewsByDateMonth(year);
  }, []);

  const loadNewsByDateMonth = (year) => {
    setLoader(true);
    axios
      .post(`${API_URL}api/media_center`, {
        year: year,
        type: "notice",
        language: engLang ? "english" : "nepali",
      })
      .then((res) => {
        setNews(res.data);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const yearHandler = (name) => (e) => {
    setYear(e.target.value);
    loadNewsByDateMonth(e.target.value);
  };

  const content = () => {
    if (loader) return <Spinner />;
    if (error) return <ErrorBoundary />;
    return (
      <NoticeDiv>
        <EachPageHeading title={props.engLang ? "Notice" : "सूचना"} />
        <Row className="p-6">
          <Col xs={12} md={8} lg={8}>
            <div className="float-left mr-3">
              <select
                className="form-control"
                defaultValue={year}
                onChange={yearHandler("year")}
              >
                {yearList.map((item, i) => {
                  return (
                    <option value={item.key} key={i}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <NewsTable
              engLang={props.engLang}
              news={news}
              type="notice"
              page_title="सूचना"
              url="/media/notice"
            />
          </Col>
          <Col>
            <CollectionNewsListBox
              type="News & Notice"
              engLang={props.engLang}
            />
          </Col>
        </Row>
      </NoticeDiv>
    );
  };
  return (
    <div className="p-6">
      <MetaHead
        page_name={SEO.notice.page_name}
        description={SEO.notice.description}
        page_title={SEO.notice.page_title}
        keyword={SEO.notice.keyword}
        page_url={SEO.notice.page_url}
      />
      {content()}
    </div>
  );
};

export default Notices;
const NoticeDiv = styled.div`
  padding: 17px;
`;
