import React from "react";
import { Article } from "./Article";

export const germanImage =
  "https://www.expatrio.com/sites/default/files/styles/header_image/public/2019-11/german_culture_traditions_people_customs_and_facts.jpg?itok=_yeaOYXR";

export const Characteristics = () => {
  return (
    <Article
      title="What are the charac&shy;teristics of German people?"
      image={germanImage}
    >
      <p>
        It is true that many Germans tend to place punctuality as a high
        priority. Hence the global observation that German trains often run
        perfectly punctual. German people tend to be thrifty, be sensible, and
        respect one another’s privacy, and they typically respect the structure
        and laws of society to an above-average degree. There is no place that
        this sense of ‘order’ is more apparent than in German business culture.
      </p>

      <p>
        Traditionally, German people tie a lot of importance to notions of
        family and community. Regarding the latter, this is partially where the
        well-known ‘rule-following’ and orderly nature of the German people
        comes from: if everyone in the community follows the rules and does
        things the right way, the neighborhood/town/city/country will be a nice
        place for all residents to live, hence why many might seem like
        sticklers when it comes to correct recycling and late-night noise - they
        take it seriously for the sake of everyone.
      </p>
    </Article>
  );
};
