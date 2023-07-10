import React, { Fragment } from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { Content } from "../../components/Common/Content";
import BikramSambatConverter from "../../lib/nepconverter";
var getNepaliNumber = require('get-nepali-number');

const Highlight = ({ engLang, highlights }) => {
  var date;
  var myNepalidate;
  var j = 0;
  var title="";
  const bsConvertor = new BikramSambatConverter();
  let text = "";
  highlights.map((item, i) => {

    date = bsConvertor.ConvertInNepaliYMD(item.date);
    myNepalidate = date['year'] + "-" + date['nmonth'] + "-" + date['date'];
    date = engLang ? bsConvertor.convertNepToEng(item.date) : myNepalidate;
    date= "<span style='color:red'>" + date + "</span>-";
    j = engLang ? (i + 1) : getNepaliNumber(i + 1);
    title=engLang?item.title_english:item.title_nepali;
     text =text +" (" + j + ")" + date + title;
      return text;
  });

  return (
    <HighlightDiv>
      <Row className="highlight-row">
        <Col xs={12} md={3} md={3} className="highlight">
          <span>
            <FormattedMessage id="home.highlight" defaultMessage="Highlight" />
          </span>
        </Col>
        <Col>
          <div className="actual-highlight">
            <marquee style={{ marqueeSpeed: "fast" }}>
              <Highttext text={text} />
            </marquee>
          </div>
        </Col>
      </Row>
    </HighlightDiv>
  );
};

const Highttext = ({ text }) => (
  <Fragment>
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
      }}
    >
      <span className="text" className="highlight-hover">
        <Content
          dangerouslySetInnerHTML={{
            __html: `${text}`,
          }}
        ></Content>
      </span>
    </div>
  </Fragment>
);

export default Highlight;

const HighlightDiv = styled.div `
  margin-top: 2px;
  .highlight-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
    border: 1px #94949436 solid;
  }
  .highlight {
    background: #080d37;
    color: white;
    height: 3em;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-transform: uppercase;
  }
  .date {
    margin-left: 15px;
    color: red;
    font-weight: bold;
    margin-right: 10px;
  }
  .actual-highlight {
    height: 100%;

    display: flex;
    justify-content: start;
    align-items: center;
  }
`;