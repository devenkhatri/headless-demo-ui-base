import React from "react";
import { useParams } from 'react-router-dom';
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import { SectionHeading } from "components/misc/Headings";
import _ from "lodash";
import axios from 'axios';
import { drupalLogoLink, drupalNavLinks, convertDrupalArticle } from 'pages/Drupal/DataAdaption';

const HeadingRow = tw.div`flex`;
const Heading = tw(SectionHeading)`text-gray-900 mb-10`;
const Link = tw.a`uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose after:content after:block after:border-b-2 after:border-primary-500 after:w-8`;
const Image = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-64 w-full bg-cover bg-center rounded-t-lg`}
`;
const Text = styled.div`
  ${tw`text-lg  text-gray-800`}
  p {
    ${tw`mt-2 leading-loose`}
  }
  h1 {
    ${tw`text-3xl font-bold mt-10`}
  }
  h2 {
    ${tw`text-2xl font-bold mt-8`}
  }
  h3 {
    ${tw`text-xl font-bold mt-6`}
  }
  ul {
    ${tw`list-disc list-inside`}
    li {
      ${tw`ml-2 mb-3`}
      p {
        ${tw`mt-0 inline leading-normal`}
      }
    }
  }
`;
export default () => {
  const { id } = useParams()

  const [detailRecord, setDetailRecord] = React.useState();
  
  React.useEffect(()=>{
    axios.get('https://dg-cors-anywhere.herokuapp.com/https://tcsacqcloudode1.prod.acquia-sites.com/jsonapi/node/article', { crossdomain: true })
    .then(function (response) {
      // handle success
      console.log(response.data.data);
      const convertedData = convertDrupalArticle(response.data.data);
      console.log(convertedData)
      const detailRecords = _.filter(convertedData, item => item.id == id);
      console.log(detailRecords)
      if(detailRecords.length>0) setDetailRecord(detailRecords[0])      
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  },[]);
  return (
    <AnimationRevealPage>
      <Header pageTitle={'Drupal Headless Demo'} links={drupalNavLinks} logoLink={drupalLogoLink} />
      <Container>
        <ContentWithPaddingXl>
          <Link href={'.'}>&lt;&lt; Back</Link>
          <HeadingRow>
            <Heading>{detailRecord && detailRecord.title}</Heading>
          </HeadingRow>
          <Image imageSrc={detailRecord && detailRecord.imageSrc} />
          <Text>
            <div dangerouslySetInnerHTML={{__html: detailRecord && detailRecord.fulldescription}} />
          </Text>
        </ContentWithPaddingXl>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};
