import React from "react";
import EachPageHeading from "../Common/EachPageHeading";
import { NewsListBoxDiv } from "./NewsListBox.styled";
import { Media, Badge, Row, Col } from "react-bootstrap";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils/config";
import BikramSambatConverter from "../../lib/nepconverter";


const NewsListBox = ({
  readmore,
  pill,
  image,
  title,
  pillText,
  engLang,
  noticetitle,
  date,
  created_at,
  slug,
  file,
  type,
}) => {
  const bsConvertor = new BikramSambatConverter();
  var date1 = bsConvertor.ConvertInNepaliYMD(date);
  var myNepalidate = date1['year'] + "-" + date1['nmonth'] + "-" + date1['date'];
  return (
    <NewsListBoxDiv>
      {title && <EachPageHeading title={pillText} />}
      <a href={file} download>
        <Media className="news-generic-media">
         

          <Media.Body>
            <Row>
              {date && (
                <Col>
                  <div className="date">{engLang?  <Moment format="YYYY-MMMM-DD">
                    {created_at}
                </Moment>:myNepalidate}</div>
                </Col>
              )}
              {pill && (
                <Col>
                  <Badge pill variant="primary" className="news-generic-badge">
                    {pillText}
                  </Badge>
                </Col>
              )}
            </Row>
            <span className="news-excerpt">{noticetitle}</span>

            {readmore && (
              <div className="read-more">
                {engLang ? "Read More" : "सबै हेर्नुहोस्"}
              </div>
            )}
          </Media.Body>
        </Media>
      </a>
    </NewsListBoxDiv>
  );
};

export default NewsListBox;