import React, { useEffect } from "react";
import Moment from "react-moment";
import { ReactComponent as Download } from "../../assets/images/download.svg";
import { API_URL } from "../../utils/config";
import BikramSambatConverter from "../../lib/nepconverter";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import $ from "jquery";
import './style.css';

var getNepaliNumber = require("get-nepali-number");

const OfficeTable = ({ engLang, news, type }) => {
  useEffect(() => {
    if (news) {
      $(document).ready(function() {
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
            <th>{engLang ? "Postal Name" : "हुलाकको नाम"}</th>
            <th>{engLang ? "Associated Person" : "सम्वन्धित व्यक्ति"}</th>
            <th>{engLang ? "Phone" : "फोन नं."}</th>
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
                    <td>{engLang ? ++index : ++index}</td>
                    <td>{engLang ? item.title_english : item.title_nepali}</td>
                    <td>
                      {engLang ? item.associate_person : item.associate_person}
                    </td>
                    <td>{engLang ? item.phone : item.phone}</td>
                  </tr>
                );
              })
            : ""}
        </tbody>
      </table>
    </div>
  );
};

export default OfficeTable;