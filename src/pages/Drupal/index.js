import React, { useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import Blog from "components/blogs/GridWithFeaturedPostAndLoadMore.js";
import axios from 'axios';
import { drupalLogoLink, drupalNavLinks, convertDrupalArticle } from 'utils/DataAdaption';

export default () => {
  const [postData, setPostData] = React.useState([]);

  React.useEffect(()=>{
    axios.get('https://dg-cors-anywhere.herokuapp.com/http://tcsacqcloudode1.prod.acquia-sites.com/jsonapi/node/article', { crossdomain: true })
    .then(function (response) {
      // handle success
      console.log(response.data.data);
      const convertedData = convertDrupalArticle(response.data.data);
      setPostData(convertedData)
      console.log(convertedData)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  },[]);

  return (
    <AnimationRevealPage>
      <Header links={drupalNavLinks} logoLink={drupalLogoLink} />
      <Blog posts={postData} />
      <Footer />
    </AnimationRevealPage>
  );
};