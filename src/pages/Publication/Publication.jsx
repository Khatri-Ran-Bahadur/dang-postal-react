import React from "react";
import styled from "styled-components";
import EachPageHeading from "../../components/Common/EachPageHeading";
import { MetaHead } from "../../components/Common/MetaHead.js";
import { SEO } from "../../utils/SEO";

const Publication = () => {
  return (
    <PublicationDiv>
      <EachPageHeading title="Publication" />
      <MetaHead
        page_name={SEO.area_office.page_name}
        description={SEO.area_office.description}
        page_title={SEO.area_office.page_title}
        keyword={SEO.area_office.keyword}
        page_url={SEO.area_office.page_url}
      />
    </PublicationDiv>
  );
};

export default Publication;

const PublicationDiv = styled.div `
  padding: 17px;
`;