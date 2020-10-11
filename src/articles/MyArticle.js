
import React from "react";
import { Article } from "./Article";

const myImage = "https://www.dw.com/image/51827358_303.jpg";

export const MyArticle = () => {
    return (
        <Article title="My Content" image={myImage} >
            <p>
                {localStorage.getItem("myArticle") || ""}
            </p>
        </Article >
    );
};