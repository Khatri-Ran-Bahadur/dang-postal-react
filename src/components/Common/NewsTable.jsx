import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { ReactComponent as Pdf } from "../../assets/images/pdf.svg";
import { ReactComponent as Download } from "../../assets/images/download.svg";
import { API_URL, APP_URL, APP_NAME, FB_ID } from "../../utils/config";
import Image from "../../utils/assets/logo.png";
import BikramSambatConverter from "../../lib/nepconverter";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import $ from "jquery";
import "./style.css";

var getNepaliNumber = require("get-nepali-number");

const NewsTable = ({ engLang, news, type }) => {
  useEffect(() => {
    if (news) {
      $(document).ready(function () {
        $(".table").DataTable();
      });
    }
  }, []);

  const bsConvertor = new BikramSambatConverter();

  return (
    <div>
      <table
        className="table table-striped table-bordered table-hover responsive "
        id="myTable"
      >
        <thead>
          <tr>
            <th>{engLang ? "S.N" : "सि.न."}</th>
            <th>{engLang ? "Title" : "शिर्षक"}</th>
            <th>{engLang ? "Download" : "डाउनलोड"}</th>
            <th>{engLang ? "Date" : "मिति"}</th>
          </tr>
        </thead>
        <tbody>
          {news && news.length > 0
            ? news.map((item, index) => {
                var date = bsConvertor.ConvertInNepaliYMD(item.nepali_date);
                var myNepalidate =
                  date["year"] + "-" + date["nmonth"] + "-" + date["date"];
                return (
                  <tr key={index}>
                    <td>{engLang ? ++index : getNepaliNumber(++index)}</td>
                    <td>{engLang ? item.title_english : item.title_nepali}</td>
                    <td>
                      <a href={`${API_URL}${item.file}`} download>
                        <Download width={40} height={40} className="mr-1" />
                        <span style={{ fontSize: "12px" }}>download</span>
                      </a>
                    </td>
                    <td>
                      {engLang ? (
                        <Moment format="YYYY-MM-DD">{item.created_at}</Moment>
                      ) : (
                        myNepalidate
                      )}
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default NewsTable;
