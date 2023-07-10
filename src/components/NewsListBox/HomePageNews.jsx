import React from "react";
import NewsListBox from "./NewsListBox";

const HomePageNews = ({ pill, pillText, data, engLang, type }) => {
  return (
    <div>
      {data.map((item, index) => (
        <NewsListBox
          type={type}
          slug={item.slug}
          key={type + index}
          image={false}
          engLang={engLang}
          title={index === 0 ? true : false}
          pill={pill}
          pillText={pillText}
          noticetitle={engLang ? item.title_english : item.title_english}
          date={item.nepali_date}
        />
      ))}
    </div>
  );
};

export default HomePageNews;
