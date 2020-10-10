import React from "react";
import { Article } from "./Article";

export const kangarooImage =
    "https://assets.cdn.moviepilot.de/files/2ecf4fb247c21ac174238716c8d4fa27e5bb3f112cee2f9c6da6199b3dc1/fill/1200/576/Header.jpg";

export const Kangaroo = () => {
    return (
        <Article
            title="The Kangaroo Chronicles"
            image={kangarooImage}
        >
            <h2>The Kangaroo from Across the Street</h2>

            <p>Ding Dong. It rings. I go to the door, open it and stand face to face a kangaroo. I blink, look behind me, look down the stairs, then up the stairs. I look straight ahead. The kangaroo is still there.</p>
            <p>"Hello," says the kangaroo, and without moving my head I look left, right, at the clock and finally at the kangaroo.</p>
            <p>"Hello", I say.</p>
            <p>"I've just moved in across the street, wanted to make some pancakes, and I noticed that I forgot to buy eggs ... " I nod, go to the kitchen and come back with two eggs.</p>
            <p>"Thank you very much", says the kangaroo and puts the eggs into his bag, I nod and it disappears behind the door opposite the flat. I tap the tip of my nose several times with my left index finger - and close the door - and soon the doorbell rings again. I immediately open the door, because I am still standing behind it.</p>
            <p>"Oh!", says the kangaroo in surprise. "That was quick. Uh ... I just realised I haven't got any salt either."</p>
            <p>I nod, go to the kitchen and come back with a salt shaker.</p>
            <p>"Thank you very much! Perhaps if you had a little more milk and flour... " I nod and go into the kitchen.The kangaroo takes everything, says thank you and leaves. Two minutes later the doorbell rings again. I open the door and offer the kangaroo a pan and oil.</p>
            <p>"Thank you", says the kangaroo, "good thinking! Perhaps if you had another whisk or a mixer..." I nod and go off.</p>
            <p>"And maybe a mixing bowl?", the kangaroo calls after me. Ten minutes later the doorbell rings again.</p>
            <p>"No stove ...", the kangaroo just says. I nod and clear the way.</p>
            <p>"Just turn right," I say. The kangaroo goes into the kitchen, and I follow him.It turns out to be so clumsy that I take over the pan.</p>

            < p > Excerpt from The Kangaroo Chronicles by Marc - Uwe Kling.</p >
        </Article >
    );
};