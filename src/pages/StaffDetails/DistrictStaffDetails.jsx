import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import EachPageHeading from "../../components/Common/EachPageHeading";
import Spinner from "../../components/Common/Spinner";
import { Table } from "react-bootstrap";
import { API_URL, header } from "../../utils/config";
import ErrorBoundary from "../../components/Error/ErrorBoundary";
import axios from "axios";
import { MetaHead } from "../../components/Common/MetaHead.js";
import "datatables.net-dt/js/dataTables.dataTables";
import $ from "jquery";
import { SEO } from "../../utils/SEO";
import 'bootstrap/dist/css/bootstrap.min.css';

var getNepaliNumber = require("get-nepali-number");

const DistrictStaffDetails = ({ engLang }) => {
    const [staffs, setStaffs] = useState({});
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        loadStaff();
    }, []);

    const loadStaff = () => {
        axios
            .get(`${API_URL}api/staffs/district`, header)
            .then((res) => {
                setStaffs(res.data);
                setLoader(false);
            })
            .catch((err) => {
                setError(true);
            });
    };
    const content = () => {
        if (loader) return <Spinner />;
        if (error) return <ErrorBoundary />;

        if (staffs) {
            $(document).ready(function() {
                $(".table").DataTable();
            });
            return staffs.map((staff, i) => (
                <tr key={i}>
          <td>{++i}</td>
          <td>{staff.name}</td>
          <td>
            {staff.designation}
          </td>
          <td>{staff.email}</td>
          <td>{staff.phone}</td>
          <td>
            <img
              style={{ height: "80px" }}
              src={`${API_URL}${staff.file}`}
              alt={staff.name}
            />
          </td>
        </tr>
            ));
        }
    };

    return (
        <DistrictStaffDetailsDiv> 
         <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>{engLang ? "S.No." : "सि.न."}</th>
                <th>{engLang ? "Staff Name" : "कर्मचारीको नाम"}</th>
                <th>{engLang ? "Designation" : "पद"}</th>
                <th>{engLang ? "Email" : "इमेल"}</th>
                <th>{engLang ? "Office No." : "कार्यलय फोन."}</th>
                <th>{engLang ? "Photo" : "फोटो"}</th>
              </tr>
            </thead>
            <tbody>{content()}</tbody>
          </Table>
      
    </DistrictStaffDetailsDiv>
    );
};

export default DistrictStaffDetails;

const DistrictStaffDetailsDiv = styled.div `
  padding: 17px;
  .paginate_button {
    padding:5px;
  }
`;