import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import NewsListBox from "../NewsListBox/NewsListBox";
import styled from "styled-components";

const VericleTimeline = (props) => {
  let { data } = props;

  return (
    <VTDiv>
      <VerticalTimeline lineColor={"#ddd"}>
        <VerticalTimelineElement key="2067">
          {data.map((item, i) => {
            return (
              <NewsListBox
                image={
                  item.thumbnail
                    ? `${item.thumbnail}`
                    : `${require("../Header/assets/logo.png")}`
                }
                pill={false}
                date={item.nepali_date}
                noticetitle={item.title}
                type={props.type}
                key={i}
                slug={item.slug}
              />
            );
          })}
        </VerticalTimelineElement>
      </VerticalTimeline>
    </VTDiv>
  );
};

export default VericleTimeline;

const VTDiv = styled.div`
  .dataComponent-pill {
    /* Layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: 47px;

    background: #0a75b9 !important;
    color: #fff;
    /* padding: 3px 15px; */
    border-radius: 11px;
    line-height: 1;
    text-transform: uppercase;
    /* font-size: 12px; */
    margin-bottom: 0;
    height: 2em;
    position: relative;
    right: 22px;
  }
`;
