import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Moment from "react-moment";
import { ReactComponent as Pdf } from "../../assets/images/pdf.svg";
import { ReactComponent as Download } from "../../assets/images/download.svg";
import { API_URL } from "../../utils/config";
import BikramSambatConverter from "../../lib/nepconverter";
import "datatables.net-dt/js/dataTables.dataTables";
import $ from "jquery";
import './style.css';

const FileAndDownloadTable = ({ header, data, engLang, activity }) => {
  useEffect(() => {
    if (data) {
      $(document).ready(function() {
        $(".table").DataTable();
      });
    }
  }, []);
  const bsConvertor = new BikramSambatConverter();
  return (
    <div>
      {header && <h4 style={{ textAlign: "center" }}>{header}</h4>}
      <table
        className="table table-striped table-bordered table-hover responsive "
        id="myTable"
      >
        <thead>
          <tr>
            <th>{engLang ? "File" : "फाईल"}</th>
            <th>{engLang ? "Description" : "विवरण"}</th>
            <th>{engLang ? "Download" : "डाउनलोड"}</th>
            <th>{engLang ? "Date" : "मिति "}</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0
            ? data.map((item, index) => {
                var date = bsConvertor.ConvertInNepaliYMD(item.nepali_date);
                var myNepalidate =
                  date["year"] + "-" + date["nmonth"] + "-" + date["date"];
                return (
                  <tr key={index}>
                    <td>{engLang ? item.title_english : item.title_nepali}</td>

                    <td>
                      {engLang
                        ? item.english_description
                        : item.nepali_description}
                    </td>
                    <td>
                      <a href={`${API_URL}${item.file}`} download>
                        <Download width={40} height={40} className="mr-1" />
                        <span style={{ fontSize: "12px" }}>
                          {item.title}.pdf
                        </span>
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
            : ""}
        </tbody>
      </table>
    </div>
  );
};

export default FileAndDownloadTable;