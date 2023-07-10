import React, { useState, useEffect } from "react";
import styled from "styled-components";
import EachPageHeading from "../../components/Common/EachPageHeading";
import Spinner from "../../components/Common/Spinner";
import BikramSambatConverter from "../../lib/nepconverter";
import { ALL_MONTHS } from "../../lib/allMonths";
import { API_URL } from "../../utils/config";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import CollectionNewsListBox from "../../components/Common/CollectionNewsListBox";
import ErrorBoundary from "../../components/Error/ErrorBoundary";
import OfficeTable from "../../components/Common/OfficeTable";
import { MetaHead } from "../../components/Common/MetaHead.js";
import { english_year, nepali_year } from "../../lib/date_list.js";
import { SEO } from "../../utils/SEO";
const AreaOffice = (props) => {
  const engLang = props.engLang;
  const [offices, setOffices] = useState({});
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
      .get(`${API_URL}api/area_postal`)
      .then((res) => {
        setOffices(res.data);
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
      <AreaOfficeDiv>
        <EachPageHeading
          title={props.engLang ? "Area Offices" : "इलाका कार्यालयहरु"}
        />
        <Row className="p-6">
          <Col xs={12} md={8} lg={8}>
            <div className="float-left mr-3 pl-1">
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
            <OfficeTable
              engLang={props.engLang}
              news={offices}
              type="news"
              page_title="इलाका कार्यालयहरु"
              url="/office/area-office"
            />
          </Col>
          <Col>
            <CollectionNewsListBox
              type="News & Notice"
              engLang={props.engLang}
            />
          </Col>
        </Row>
      </AreaOfficeDiv>
    );
  };

  return (
    <div className="p-2">
      <MetaHead
        page_name={SEO.area_office.page_name}
        description={SEO.area_office.description}
        page_title={SEO.area_office.page_title}
        keyword={SEO.area_office.keyword}
        page_url={SEO.area_office.page_url}
      />
      {content()}
    </div>
  );
};

export default AreaOffice;

const AreaOfficeDiv = styled.div `
  padding-left: 17px;
`;