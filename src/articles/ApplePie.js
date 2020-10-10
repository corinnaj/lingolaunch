import React from "react";
import { Article } from "./Article";
import { T } from "../PartialTranslationParagraph";

export const applePieImage = "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/95DA8238-D11B-4F63-84CC-4AFD648E3704/Derivates/7E0F300B-A162-4100-BA16-26DF2613BC76.jpg";

export const ApplePie = () => {
    return (
        <Article title="Apple Pie" image={applePieImage}>
            <T w="Apfel" /> Pie Ingredients:
            <ul>
                <li> 120 g soft butter</li>
                <li>120 g sugar</li>
                <li>2 tbsp. vanilla extract</li>
                <li>
                    1 pinch of <T w="Salz" />
                </li>
                <li>
                    3 <T w="Eier" />
                </li>
                <li>200g flour</li>
                <li>1 tsp baking powder</li>
                <li>4 - 5 sour apples (about 600 g)</li>
                <li>2 tbsp. sugar</li>
            </ul>
      Method: Preheat the oven to 180 degrees. Grease mould and dust with flour.
      Cream <T w="Eier" />, butter, sugar, vanilla extract and <T w="Salz" />.
      Add flour and baking powder and mix everything to a smooth dough. Peel the
      apples, remove the core, cut into quarters and score lengthwise on the
      back. Pour the dough into the tin, place the apples in a <T w="Kreis" />{" "}
      on top, sprinkle with 2 tbsp. sugar and bake in the oven for approx. 40
      minutes until golden <T w="braun" />.
            <T w="Nach" /> baking, leave to stand in the form for a few minutes, then
      remove and allow to cool. To serve, dust with icing sugar and serve with
      whipped cream <T w="falls" /> desired.
        </Article>
    );
};
