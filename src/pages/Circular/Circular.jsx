import React, { useState, useEffect } from "react";
import styled from "styled-components";
import EachPageHeading from "../../components/Common/EachPageHeading";
import Spinner from "../../components/Common/Spinner";
import { API_URL,header } from "../../utils/config";
import axios from "axios";
import ErrorBoundary from "../../components/Error/ErrorBoundary";
// import Pagination from "react-js-pagination";
import NewsTable from "../../components/Common/NewsTable";
import { MetaHead } from "../../components/Common/MetaHead.js";
import { SEO } from "../../utils/SEO";
import {
  english_year,
  english_month,
  nepali_year,
  nepali_month,
} from "../../lib/date_list.js";
import BikramSambatConverter from "../../lib/nepconverter";

const Circular = (props) => {
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
        type: "circular",
        language: engLang ? "english" : "nepali",
      },header)
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
      <CircularDiv>
        <EachPageHeading title={props.engLang ? "Circular" : "परिपत्रहरू"} />

        <div>
          <div className="float-right mb-2">
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
          </div>
          <NewsTable
            engLang={props.engLang}
            news={news}
            type="circular"
            page_title="परिपत्र"
          />
        </div>
      </CircularDiv>
    );
  };
  return (
    <div className="p-6">
      <MetaHead
        page_name={SEO.circular.page_name}
        description={SEO.circular.description}
        page_title={SEO.circular.page_title}
        keyword={SEO.circular.keyword}
        page_url={SEO.circular.page_url}
      />
      {content()}
    </div>
  );
};

export default Circular;

const CircularDiv = styled.div `
  padding: 17px;
`;