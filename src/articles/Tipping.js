import React from "react";
import { Article } from "./Article";

export const tippingImage = 
    "https://ais.badische-zeitung.de/piece/09/3a/f6/13/154859027-h-720.jpg";

export const Tipping = () => {
    return (
      <Article
        title="Tipping &amp; Etiquette"
        image={tippingImage}
      >
        <p>Service and VAT are included in the menu price in restaurants, bars, etc. all over Germany. 
            Still, it is typical to "round up" the amount to some more-or-less round figure. A rule of 
            thumb is to add 5-10%, generally ending with a full Euro amount.</p>
  
        <p><em>Caveat:</em> it is not typical to be given a check, then leave your money on the table. 
        You have to tell the amount including tip you want to pay before you pay (via cash or credit card)</p>

        <p><em>How to pay:</em> Typically, the waiter/waitress always comes to you and tells you your 
        total. You then tell him/her how much you will pay, i.e. the amount you owe plus any "rounding 
        up" -- for example, the waiter / waitress might say "€7.60;" you hand him/her a €10 note and say 
        "9 Euros." S/he then will give you €1 in change.</p>
      </Article>
    );
  };
  