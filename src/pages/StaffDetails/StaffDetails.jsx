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
import "bootstrap/dist/css/bootstrap.min.css";
import { Tabs } from "@yazanaabed/react-tabs";
import AllStaffDetails from "./AllStaffDetails";
import AtiriktaStaffDetails from "./AtiriktaStaffDetails";
import DakStaffDetails from "./DakStaffDetails";
import DistrictStaffDetails from "./DistrictStaffDetails";

const StaffDetails = ({ engLang }) => {
  return (
    <StaffDetailsDiv>
      <Tabs
        activeTab={{
          id: "all",
        }}
      >
        <Tabs.Tab
          id="all"
          title={
            <Fragment>
              <h6>{engLang ? "All Staff" : "सबै कर्मचारी"} </h6>
            </Fragment>
          }
        >
          <div style={{ padding: 10 }}>
            <AllStaffDetails />
          </div>
        </Tabs.Tab>
        <Tabs.Tab
          id="district_staff"
          title={
            <Fragment>
              <h6>{engLang ? "District Staff" : "जिल्ला कर्मचारी"} </h6>
            </Fragment>
          }
        >
          <div style={{ padding: 10 }}>
            <DistrictStaffDetails />
          </div>
        </Tabs.Tab>
        <Tabs.Tab
          id="dak_staff"
          title={
            <Fragment>
              <h6>{engLang ? "Locality Staff" : "ईलाका कर्मचारी"} </h6>
            </Fragment>
          }
        >
          <div style={{ padding: 10 }}>
            <DakStaffDetails />
          </div>
        </Tabs.Tab>

        <Tabs.Tab
          id="atirikta_staff"
          title={
            <Fragment>
              <h6>{engLang ? "Atirikta Details" : "अतिरिक्त कर्मचारी"} </h6>
            </Fragment>
          }
        >
          <div style={{ padding: 10 }}>
            <AtiriktaStaffDetails />
          </div>
        </Tabs.Tab>
      </Tabs>

      <MetaHead
        page_name={SEO.staff.page_name}
        description={SEO.staff.description}
        page_title={SEO.staff.page_title}
        keyword={SEO.staff.keyword}
        page_url={SEO.staff.page_url}
      />
    </StaffDetailsDiv>
  );
};

export default StaffDetails;

const StaffDetailsDiv = styled.div`
  padding: 17px;
  .paginate_button {
    padding: 5px;
  }
`;
