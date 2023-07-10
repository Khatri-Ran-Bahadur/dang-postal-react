import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { ReactComponent as Download } from "../../assets/images/download.svg";
import { API_URL, header } from "../../utils/config";
import BikramSambatConverter from "../../lib/nepconverter";
import Moment from "react-moment";
import "datatables.net-dt/js/dataTables.dataTables";
import $ from "jquery";
import "./style.css";

var getNepaliNumber = require("get-nepali-number");

const RightToInformationFile = ({ data, engLang }) => {
  useEffect(() => {
    if (data) {
      $(document).ready(function () {
        $(".table").DataTable();
      });
    }
  }, []);
  const bsConvertor = new BikramSambatConverter();

  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>{engLang ? "S.N." : "सि.नं."}</th>
            <th>{engLang ? "Title" : "शिर्षक"}</th>
            <th>{engLang ? "Time Period" : "समय अवधि"}</th>
            <th>{engLang ? "Download" : "डाउनलोड"}</th>
          </tr>
        </thead>
        <tbody>
          {data
            ? data.map((item, index) => {
                var date1 = bsConvertor.ConvertInNepaliYMD(item.nepali_date);
                var date2 = bsConvertor.ConvertInNepaliYMD(item.last_date);
                var myNepalidate1 =
                  date1["year"] + "-" + date1["nmonth"] + "-" + date1["date"];
                var myNepalidate2 =
                  date2["year"] + "-" + date2["nmonth"] + "-" + date2["date"];
                return (
                  <tr key={index}>
                    <td>
                      <span style={{ fontSize: "12px" }}>
                        {engLang ? ++index : getNepaliNumber(++index)}
                      </span>
                    </td>
                    <td>{engLang ? item.title_english : item.title_nepali}</td>
                    <td>
                      {engLang
                        ? bsConvertor.convertNepToEng(item.nepali_date)
                        : myNepalidate1}
                      /
                      {engLang
                        ? bsConvertor.convertNepToEng(item.last_date)
                        : myNepalidate2}
                    </td>
                    <td>
                      <a href={`${API_URL} ${item.file}`} download>
                        <Download width={40} height={40} className="mr-1" />
                        <span style={{ fontSize: "12px" }}></span>
                      </a>
                    </td>
                  </tr>
                );
              })
            : ""}
        </tbody>
      </Table>
    </div>
  );
};

export default RightToInformationFile;
