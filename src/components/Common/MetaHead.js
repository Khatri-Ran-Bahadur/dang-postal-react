    import React from 'react';
    import { Helmet } from 'react-helmet';
    import { APP_URL, header, APP_NAME, FB_ID } from "../../utils/config";
    import Image from "../../utils/assets/logo.png";


    const MetaHead = ({ page_name, description, page_title, page_url, keywords }) => {

      return (
        <Helmet>
                <title>{page_title} | {APP_NAME}</title>
          <meta
            name="description"
            content={description}
          />
          <meta
            name="keywords"
            content={keywords}
          />
          <meta name="author" content={`salyan postal service | ${APP_NAME}`} />
          <meta name="copyright" content="salyan-postal-service.com.np" />
          <meta name="application-name" content={APP_NAME} />

          <meta property="og:type" content="website" />
          <meta
            name="og:title"
            property="og:title"
            content={page_title}
          />
          <meta
            name="og:description"
            property="og:description"
            content={description}
          />
          <meta property="og:site_name" content={APP_NAME} />
          <meta property="og:url" content={`${APP_URL}${page_url}`} />
          <meta name="twitter:card" content="summary" />
          <meta
            name="twitter:title"
            content={page_title}
          />
          <meta
            name="twitter:description"
            content={description}
          />
          <meta name="twitter:site" content={APP_NAME} />
          <meta name="twitter:creator" content={APP_NAME} />
          <link rel="icon" type="image/png" href="/static/images/favicon.ico" />
          <link rel="apple-touch-icon" href="/static/images/favicon.ico" />
          <link rel="stylesheet" href="" />
          <meta property="og:image" content={`${APP_URL}${Image}`} />
          <meta name="twitter:image" content={`${APP_URL}${Image}`} />
          <link rel="canonical" href={`${APP_URL}${page_url}`} />
          <meta property="fb:app_id" content={FB_ID} />
            </Helmet>
      );
    };

    export { MetaHead };