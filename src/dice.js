// @flow
import React from "react";

export default function roll(num: String): number {
    return Math.floor(Math.random() * (parseInt(num)) + 1);
}

// function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
// }