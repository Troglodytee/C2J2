import {C2J2_PATH} from "./variables.js";

const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const SPECIAL_CHARS = {
    "\"" : "quot",
    "'"  : "apos",
    "¨"  : "uml",
    "•"  : "bull",
    "§"  : "sect",
    "&"  : "amp",
    "€"  : "euro",
    "£"  : "pound",
    "<"  : "lt",
    ">"  : "gt",
};
const LANGUAGES = [
    "html",
];
const ICONS = {
    "html" : ["html-5", "HTML 5 logo"]
}

function getSpan(color, value) {
    return `<span class="fs-sm txt-${color}">${value}</span>`;
}

export function init() {
    for (let i of document.getElementsByClassName("code")) {
        let html = "";
        let language = i.dataset.lang;
        if (language && LANGUAGES.includes(language)) {
            if (!(i.dataset.hideHead == "true")) {
                html += `<div class="bd-rad-t-md pd-md d-flex gap-sm algn-i-center bg-light-grey"><img src="${C2J2_PATH}/img/${ICONS[language][0]}.svg" alt="${ICONS[language][1]}" style="width: 40px">`;
                if (i.dataset.name) {html += `<p class="fs-sm txt-black">${i.dataset.name}</p>`;}
                html += "</div>"
            }
            let list = [];
            if (language == "html") {
                let type = "out";
                let value = "";
                for (let j of i.textContent) {
                    switch (type) {
                        case "out":
                            if (j == "<") {
                                list.push(["white", value]);
                                type = "sin";
                                value = j;
                            }
                            else {value += j;}
                            break;
                        case "sin":
                            if (j == "!") {
                                type = "cin";
                                value += j;
                            }
                            else if (j == "/" && value == "<") {value += j;}
                            else if (j == " " || ALPHA.includes(j)) {
                                list.push(["grey", value]);
                                type = "tag";
                                value = j;
                            }
                            else {
                                list.push(["red", value[0]], ["white", value.slice(1)]);
                                if (j != "<") {type = "out";}
                                value = j;
                            }
                            break;
                        case "tag":
                            if (j == " ") {
                                list.push(["light-blue", value]);
                                type = "in";
                                value = j;
                            }
                            else if (j == ">") {
                                list.push(["light-blue", value], ["grey", j]);
                                type = "out";
                                value = "";
                            }
                            else {value += j;}
                            break;
                        case "in":
                            if (j == ">") {
                                list.push(["white", value], ["grey", j]);
                                type = "out";
                                value = "";
                            }
                            else if (j == " ") {value += j;}
                            else {
                                list.push(["white", value]);
                                if (j == "-" || ALPHA.includes(j)) {type = "attr";}
                                else {type = "err";}
                                value = j;
                            }
                            break;
                        case "attr":
                            if (j == " " || j == "=") {
                                list.push(["cyan", value]);
                                type = "equ";
                                value = j;
                            }
                            else if (j == ">") {
                                list.push(["cyan", value], ["grey", j]);
                                type = "out";
                                value = "";
                            }
                            else if (j == "-" || ALPHA.includes(j)) {value += j;}
                            else {
                                list.push(["cyan", value]);
                                type = "err";
                                value = j;
                            }
                            break;
                        case "equ":
                            if (j == " " || j == "=" && !value.includes("=")) {value += j;}
                            else {
                                list.push(["white", value]);
                                if (j == '"' && value.includes("=")) {type = "str1";}
                                else if (j == "'" && value.includes("=")) {type = "str2";}
                                else {type = "err";}
                                value = j;
                            }
                            break;
                        case "str1":
                            value += j;
                            if (j == '"' && !(value.length > 1 && value[value.length-2] == "\\")) {
                                list.push(["orange", value]);
                                type = "in";
                                value = "";
                            }
                            break;
                        case "str2":
                            value += j;
                            if (j == "'" && !(value.length > 1 && value[value.length-2] == "\\")) {
                                list.push(["orange", value]);
                                type = "in";
                                value = "";
                            }
                            break;
                        case "err":
                            if (j == " ") {
                                list.push(["red", value]);
                                type = "in";
                                value = j;
                            }
                            else if (j == ">") {
                                list.push(["red", value], ["grey", j]);
                                type = "out";
                                value = j;
                            }
                            else {value += j;}
                            break;
                        case "cin":
                            value += j;
                            if (value == "<!--") {
                                list.push(["dark-green", value]);
                                type = "com";
                                value = "";
                            }
                            else if (!("<!--".includes(value))) {
                                list.push(["red", value[0]]);
                                if (j == "<") {
                                    list.push(["white", value].slice(1, value.length-1));
                                    type = "sin";
                                    value = j;
                                }
                                else {
                                    list.push(["white", value.slice(1)]);
                                    type = "out";
                                    value = "";
                                }
                            }
                            break;
                        case "com":
                            if (j == "-") {
                                list.push(["dark-green", value]);
                                type = "cout";
                                value = j;
                            }
                            else {value += j;}
                            break;
                        case "cout":
                            value += j;
                            if (value == "-->") {
                                list.push(["dark-green", value]);
                                type = "out";
                                value = "";
                            }
                            else if (!("-->".includes(value))) {
                                if (j == "-") {
                                    list.push(["dark-green", value[0]]);
                                    value = value.slice(1);
                                }
                                else {
                                    list.push(["dark-green", value]);
                                    type = "com"
                                    value = "";
                                }
                            }
                            break;
                    }
                }
                let bd = "bd-rad-b-md";
                if (i.dataset.hideHead == "true") {bd = "bd-rad-md";}
                html += `<div class="code-content ${bd} pd-md bg-dark-grey txt-w-break-breakall">`;
                if (list.length != 0) {
                    let value = "";
                    for (let j = 0; j < list.length; j++) {
                        value += list[j][1];
                        if (value.length != 0 && (j == list.length-1 || list[j][0] != list[j+1][0])) {
                            let k = 0;
                            while (k < value.length) {
                                if (value[k] == "\n") {
                                    value = value.slice(0, k)+"<br>"+value.slice(k+1);
                                    k += 4;
                                }
                                else if (value[k] in SPECIAL_CHARS) {
                                    value = value.slice(0, k)+"&"+SPECIAL_CHARS[value[k]]+";"+value.slice(k+1);
                                    k += SPECIAL_CHARS[value[k]].length+2;
                                }
                                else {k++;}
                            }
                            html += getSpan(list[j][0], value);
                            value = "";
                        }
                    }
                }
                html += "</div>";
            }
        }
        i.innerHTML = html;
    }
}