import React from "react";
import { Article } from "./Article";

export const spaetzleImage =
  "https://img.chefkoch-cdn.de/rezepte/1062121211526182/bilder/668460/crop-960x540/schnelle-kaesespaetzle.jpg";

export const Spaetzle = () => {
  return (
    <Article title="Spätzle" image={spaetzleImage}>
      Ingredients for the dough:
      <ul>
        <li>250 g flour</li>
        <li>3 big eggs</li>
        <li>125 ml water</li>
        <li>2 pinches of salt</li>
        <li>2 pinches of nutmeg</li>
      </ul>
      Other ingredients:
      <ul>
        <li>100 ml sour cream</li>
        <li>100 ml cream</li>
        <li>100 g grating cheese</li>
        <li>1 big onion</li>
        <li>1 pinch salt</li>
        <li>1 pinch nutmeg</li>
        <li>1 pinch pepper</li>
      </ul>
      Method:
      <ul>
        <li key={1}>
          Weigh the flour and form a small hollow in the middle where the two eggs are beaten. 
          Add salt, nutmeg, water and stir vigorously with a wooden spoon until there are no 
          more lumps of flour and the dough slowly drips from the same (very sticky matter).
        </li>
        <li key={2}>
          Meanwhile, bring a large pot of salted water to a boil, scrape the spaetzle in it 
          and dice half of the onion, cut the other half into rings and fry in butter until 
          translucent.
        </li>
        <li key={3}>
          For scraping, moisten the (wooden) board, hold it diagonally over the pot, spread 
          the dough finger-thick and scrape small, approx. 0.5 cm thick strips into the pot 
          with the scraper, which is also wet.
        </li>
        <li key={4}>
          As soon as the spaetzle are floating on top in the boiling water, skim off. If you 
          would like to use the spaetzle as a side dish for meat dishes, we recommend that 
          you toss them briefly in a pan with butter: done.
        </li>
        <li key={5}>
          May they become cheese noodles, then mix the noodles in a casserole dish with the 
          diced onions, sour and sweet cream and the grated cheese, season with salt, nutmeg 
          and pepper, sprinkle some grated cheese on top, place the onion rings on top, heat 
          in the oven at approx. 200 °C convection oven with top heat for approx. 10 minutes 
          until the cheese has melted nicely and a light crust is formed.
        </li>
      </ul>
    </Article>
  );
};
