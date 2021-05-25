// https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module/api-overview

import { LogoLink, NavLinks, NavLink, PrimaryLink } from "components/headers/light.js";
import tw from "twin.macro";
import logoImageSrc from "images/logo-drupal.png";
import axios from 'axios';
import _ from 'lodash';
import jsona from 'jsona';

// axios.defaults.headers = {
//   'Cache-Control': 'no-cache',
//   'Pragma': 'no-cache',
//   'Expires': '0',
// };

const dataFormatter = new jsona();

const getRandomColor = () => {
  return Math.floor(Math.random() * 16777215).toString(16);
}

const buttonRoundedCss = tw`rounded-full`;

export const drupalLogoLink = (
  <LogoLink href="/drupal">
    <img src={logoImageSrc} alt="Logo" />
      Drupal Demo
  </LogoLink>
);

export const drupalNavLinks = [
  // <NavLinks key={1}>
  //   <NavLink href="/drupal">Blog</NavLink>
  // </NavLinks>,
  <NavLinks key={2}>
    <NavLink href="/login" tw="lg:ml-12!">
      Login
      </NavLink>
    <PrimaryLink css={buttonRoundedCss} href="/signup">
      Sign Up
      </PrimaryLink>
  </NavLinks>
];
export const fetchTagsFromArticle = (article) => {
  const tags = [];
  article && article.field_tags && article.field_tags.map((item) => {
    tags.push(item.name)
  })
  return tags;
}

export const fetchImage = async (imageId) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://tcsacqcloudode2.prod.acquia-sites.com/en/jsonapi/media/image/${imageId}/field_media_image`, { crossdomain: true })
      .then(function (response) {
        // handle success
        console.log("fetchImage", response.data);
        const formatedData = dataFormatter.deserialize(response.data);
        console.log("fetchImage", formatedData);
        resolve(`https://tcsacqcloudode2.prod.acquia-sites.com${formatedData.uri.url}`)
      })
      .catch(function (error) {
        // handle error
        console.log("fetchImage", error);
        reject(error)
      })
  })
}

export const convertDrupalArticle_OLD = (data) => {
  const output = [];
  // "https://via.placeholder.com/150/" + getRandomColor() + "?text=Dummy Image"
  data && data.map(async (item, index) => {
    // const articleImage = await fetchImage(item.field_media_image.id);
    // console.log("***** articleImage",articleImage)
    const newItem = {
      id: item.id,
      imageSrc: item.imageSrc || "https://picsum.photos/id/" + (Math.floor(Math.random() * 1000)) + "/600/400/?grayscale&blur=2",
      category: fetchTagsFromArticle(item).join(" , "),
      date: item.changed || "",
      title: item.title || "",
      author: (item.uid && item.uid.display_name) || "",
      description: item.body.summary || "",
      fulldescription: item.body.processed || "",
      url: "/drupal/" + item.id,
      featured: index == 0
    }
    output.push(newItem)
    console.log(output)
  });
  return output;
}

export const convertDrupalArticle = (data) => {
  const output = [];
  data && data.map(async (item, index) => {
    let imageSrc = item.field_media_image;
    if (imageSrc) { 
      var startIndex = imageSrc.indexOf("src=\"")
      var subStr = imageSrc.substring(startIndex+5)
      imageSrc = subStr.substring(0, subStr.indexOf("\""))
      imageSrc = 'https://tcsacqcloudode2.prod.acquia-sites.com'+imageSrc;
    }
    const newItem = {
      id: item.uuid,
      imageSrc: imageSrc || "https://picsum.photos/id/" + (Math.floor(Math.random() * 1000)) + "/600/400/?grayscale&blur=2",
      category: item.field_tags || "",
      date: item.changed || "",
      title: item.title || "",
      author: item.name || "",
      description: item.body_1 || "",
      fulldescription: item.body || "",
      url: "/drupal/" + item.uuid,
      featured: index == 0
    }
    output.push(newItem)
  });
  return output;
}

export const fetchDrupalAllArticles = async () => {
  return new Promise((resolve, reject) => {
    const sortStr = "sort=-changed"
    const includeStr = "include=uid,field_tags,field_media_image"
    // axios.get(`https://tcsacqcloudode2.prod.acquia-sites.com/en/jsonapi/node/article?${includeStr}&${sortStr}`, { crossdomain: true })
    axios.get(`https://tcsacqcloudode2.prod.acquia-sites.com/en/articles/api?_format=json`, { crossdomain: true })
      .then(function (response) {
        // handle success
        console.log("fetchDrupalAllArticles", response.data);
        // const formatedData = dataFormatter.deserialize(response.data);
        // console.log("fetchDrupalAllArticles",formatedData);      
        const convertedData = convertDrupalArticle(response.data);
        console.log("fetchDrupalAllArticles", convertedData)
        resolve(convertedData)
      })
      .catch(function (error) {
        // handle error
        console.log("fetchDrupalAllArticles", error);
        reject(error)
      })
  });
}

export const fetchDrupalArticle = async (id) => {
  return new Promise((resolve, reject) => {
    const sortStr = "sort=-changed"
    const includeStr = "include=uid,field_tags,field_media_image"
    // axios.get(`https://tcsacqcloudode2.prod.acquia-sites.com/en/jsonapi/node/article/${id}?${includeStr}&${sortStr}`, { crossdomain: true })    
    axios.get(`https://tcsacqcloudode2.prod.acquia-sites.com/en/articles/api/${id}?_format=json`, { crossdomain: true })
      .then(function (response) {
        // handle success
        console.log("fetchDrupalArticle", response.data);
        // const formatedData = dataFormatter.deserialize(response.data);
        // console.log("fetchDrupalArticle", formatedData);
        const convertedData = convertDrupalArticle(response.data);
        console.log("fetchDrupalArticle", convertedData)
        resolve(convertedData[0])
      })
      .catch(function (error) {
        // handle error
        console.log("fetchDrupalArticle", error);
        reject(error)
      })
  });
}