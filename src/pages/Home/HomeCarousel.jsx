import React from "react";
import { Carousel } from "react-bootstrap";
import { API_URL } from "../../utils/config";

const HomeCarousel = ({ sliders, engLang }) => {
  return (
    <Carousel key="100">
      {sliders.map((slider, i) => (
        <Carousel.Item key={i}>
          <img
            style={{
              objectFit: "cover",
              width: "100%",
              height: "435px",
              maxWidth: "100%",
            }}
            src={`${API_URL}${slider.image}`}
            alt={slider.title}
          />
          <Carousel.Caption
            style={{
              background: "rgba(8, 13, 55, 0.35)",
              left: "0",
              width: "47%",
              paddingLeft: "2%",
              bottom: "1%",
              paddingTop: "10px",
              paddingBottom: "10px",
              paddingRight: "4%",
              textAlign: "Justify",
              minHeight: "59px",
            }}
          >
            <h3>{engLang ? slider.english_title : slider.nepali_title}</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: `${
                  engLang
                    ? slider.english_description
                    : slider.nepali_description
                }`,
              }}
            ></p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HomeCarousel;