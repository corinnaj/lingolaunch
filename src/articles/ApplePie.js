import React from "react";
import { Article } from "./Article";
import { T } from "../PartialTranslationParagraph";

export const ApplePie = () => {
  return (
    <Article title="Apple Pie">
      Apple Pie Ingredients:
      <ul>
        <li> 120 g soft butter</li>
        <li>120 g sugar</li>
        <li>2 tbsp. vanilla extract</li>
        <li>1 pinch of salt</li>
        <li>3 eggs</li>
        <li>200g flour</li>
        <li>1 tsp baking powder</li>
        <li>4 - 5 sour apples (about 600 g)</li>
        <li>2 tbsp. sugar</li>
      </ul>
      Method: Preheat the oven to 180 degrees. Grease mould and dust with flour.
      Cream eggs, butter, sugar, vanilla extract and salt. Add flour and baking
      powder and mix everything to a smooth dough. Peel the apples, remove the
      core, cut into quarters and score lengthwise on the back. Pour the dough
      into the tin, place the apples in a circle on top, sprinkle with 2 tbsp.
      sugar and bake in the oven for approx. 40 minutes until golden brown.
      After baking, leave to stand in the form for a few minutes, then remove
      and allow to cool. To serve, dust with icing sugar and serve with whipped
      cream if desired.
    </Article>
  );
};
