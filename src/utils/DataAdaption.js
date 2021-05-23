import { LogoLink, NavLinks, NavLink, PrimaryLink } from "components/headers/light.js";
import tw from "twin.macro";
import logoImageSrc from "images/logo.svg";

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

export const convertDrupalArticle = (input) => {
    const output = [];
    input && input.map((item, index) => {
        const newItem = {
            id: item.id,
            imageSrc: item.attributes.postImage || "https://via.placeholder.com/150/" + getRandomColor() + "?text=Dummy Image",
            category: item.attributes.title || "",
            date: item.attributes.changed || "",
            title: item.attributes.title || "",
            description: item.attributes.body.summary || "",            
            fulldescription: item.attributes.body.value || "",            
            url: "/drupal/"+item.id,
            featured: index == 0
        }
        output.push(newItem)
    });
    return output;
}