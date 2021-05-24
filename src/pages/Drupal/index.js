import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import Blog from "components/blogs/GridWithFeaturedPostAndLoadMore.js";
import { drupalLogoLink, drupalNavLinks, fetchDrupalAllArticles } from 'pages/Drupal/DataAdaption';

export default () => {
  const [postData, setPostData] = React.useState([]);

  React.useEffect(async ()=>{
    fetchDrupalAllArticles().then((allArticles)=>{
      setPostData(allArticles)
    })    
  },[]);

  return (
    <AnimationRevealPage>
      <Header pageTitle={'Drupal Headless Demo'} links={drupalNavLinks} logoLink={drupalLogoLink} />
      <Blog posts={postData} />
      <Footer />
    </AnimationRevealPage>
  );
};
