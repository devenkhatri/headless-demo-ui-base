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
import HashLoader from "react-spinners/HashLoader";
import { drupalLogoLink, drupalNavLinks, fetchDrupalArticle } from 'pages/Drupal/DataAdaption';

const HeadingRow = tw.div`flex`;
const Heading = tw(SectionHeading)`text-gray-900 mb-10`;
const Link = tw.a`uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose after:content after:block after:border-b-2 after:border-primary-500 after:w-8`;
const Image = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-64 w-full bg-cover bg-center rounded-t-lg`}
`;
const Category = tw.div`uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose after:content after:block after:border-b-2 after:border-primary-500 after:w-8`;
const Author = tw.div`mt-4 uppercase text-gray-600 font-semibold text-xs`;
const CreationDate = tw.div`mb-4 uppercase text-gray-600 italic font-semibold text-xs`;
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

  const [loading, setLoading] = React.useState(true);
  const [detailRecord, setDetailRecord] = React.useState();
  
  React.useEffect(()=>{
    fetchDrupalArticle(id).then((article)=>{
      setDetailRecord(article)
      setLoading(false);
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
          <HashLoader loading={loading} />
          <Image imageSrc={detailRecord && detailRecord.imageSrc} />
          {detailRecord && detailRecord.author &&
            <Author>By - {detailRecord.author}</Author>
          }
          <CreationDate>{detailRecord && detailRecord.date}</CreationDate>
          <Category>{detailRecord && detailRecord.category}</Category>
          <Text>
            <div dangerouslySetInnerHTML={{__html: detailRecord && detailRecord.fulldescription}} />
          </Text>
        </ContentWithPaddingXl>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};
