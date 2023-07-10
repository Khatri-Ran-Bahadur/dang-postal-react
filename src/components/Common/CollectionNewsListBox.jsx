import React, { Fragment, useState, useEffect } from "react";
import NewsListBox from "../NewsListBox/NewsListBox";
import Spinner from "./Spinner";
import EachPageHeading from "./EachPageHeading";
import ErrorBoundary from "../Error/ErrorBoundary";
import { API_URL, header } from "../../utils/config";
import axios from "axios";

const CollectionNewsListBox = (props) => {
  const { engLang } = props;

  let urlType = "news";

  const [news, setNews] = useState();
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadLatestNews();
  }, []);

  const loadLatestNews = () => {
    axios
      .get(`${API_URL}api/latest_notice`, header)
      .then((res) => {
        setNews(res.data);
        setLoader(false);
      })
      .catch((err) => {
        setError(true);
      });
  };

  const content = () => {
    if (loader) return <Spinner />;
    if (error) return <ErrorBoundary />;
    if (news) {
      return news.map((item, index) => {
        let url = item.file ? `${API_URL}${item.file}` : "#";
        return (
          <NewsListBox
            noticetitle={engLang ? item.title_english : item.title_nepali}
            date={item.nepali_date}
            pill={true}
            engLang={props.engLang}
            slug={item.slug}
            type={urlType}
            file={url}
            key={index}
            created_at={item.created_at}
          />
        );
      });
    } else {
      return <h1>No Data</h1>;
    }
  };

  return (
    <Fragment>
      <EachPageHeading
        title={props.engLang ? props.type : "समाचार तथा सूचना"}
      />
      {content()}
    </Fragment>
  );
};

export default CollectionNewsListBox;
