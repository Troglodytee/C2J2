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

export function compute(element) {
    let html = "";
    let language = element.dataset.lang;
    if (language && LANGUAGES.includes(language)) {
        if (!(element.dataset.hideHead == "true")) {
            html += `<div class="bd-rad-t-md pd-md d-flex gap-sm algn-i-center bg-light-grey"><img src="${C2J2_PATH}/img/${ICONS[language][0]}.svg" alt="${ICONS[language][1]}" style="width: 40px">`;
            if (element.dataset.name) {html += `<p class="fs-sm txt-black">${element.dataset.name}</p>`;}
            html += "</div>"
        }
        let list = [];
        if (language == "html") {
            let type = "out";
            let value = "";
            for (let i of element.textContent) {
                switch (type) {
                    case "out":
                        if (i == "<") {
                            list.push(["white", value]);
                            type = "sin";
                            value = i;
                        }
                        else {value += i;}
                        break;
                    case "sin":
                        if (i == "!") {
                            type = "cin";
                            value += i;
                        }
                        else if (i == "/" && value == "<") {value += i;}
                        else if (i == " " || ALPHA.includes(i)) {
                            list.push(["grey", value]);
                            type = "tag";
                            value = i;
                        }
                        else {
                            list.push(["red", value[0]], ["white", value.slice(1)]);
                            if (i != "<") {type = "out";}
                            value = i;
                        }
                        break;
                    case "tag":
                        if (i == " ") {
                            list.push(["light-blue", value]);
                            type = "in";
                            value = i;
                        }
                        else if (i == ">") {
                            list.push(["light-blue", value], ["grey", i]);
                            type = "out";
                            value = "";
                        }
                        else {value += i;}
                        break;
                    case "in":
                        if (i == ">") {
                            list.push(["white", value], ["grey", i]);
                            type = "out";
                            value = "";
                        }
                        else if (i == " ") {value += i;}
                        else {
                            list.push(["white", value]);
                            if (i == "-" || ALPHA.includes(i)) {type = "attr";}
                            else {type = "err";}
                            value = i;
                        }
                        break;
                    case "attr":
                        if (i == " " || i == "=") {
                            list.push(["cyan", value]);
                            type = "equ";
                            value = i;
                        }
                        else if (i == ">") {
                            list.push(["cyan", value], ["grey", i]);
                            type = "out";
                            value = "";
                        }
                        else if (i == "-" || ALPHA.includes(i)) {value += i;}
                        else {
                            list.push(["cyan", value]);
                            type = "err";
                            value = i;
                        }
                        break;
                    case "equ":
                        if (i == " " || i == "=" && !value.includes("=")) {value += i;}
                        else {
                            list.push(["white", value]);
                            if (i == '"' && value.includes("=")) {type = "str1";}
                            else if (i == "'" && value.includes("=")) {type = "str2";}
                            else {type = "err";}
                            value = i;
                        }
                        break;
                    case "str1":
                        value += i;
                        if (i == '"' && !(value.length > 1 && value[value.length-2] == "\\")) {
                            list.push(["orange", value]);
                            type = "in";
                            value = "";
                        }
                        break;
                    case "str2":
                        value += i;
                        if (i == "'" && !(value.length > 1 && value[value.length-2] == "\\")) {
                            list.push(["orange", value]);
                            type = "in";
                            value = "";
                        }
                        break;
                    case "err":
                        if (i == " ") {
                            list.push(["red", value]);
                            type = "in";
                            value = i;
                        }
                        else if (i == ">") {
                            list.push(["red", value], ["grey", i]);
                            type = "out";
                            value = i;
                        }
                        else {value += i;}
                        break;
                    case "cin":
                        value += i;
                        if (value == "<!--") {
                            list.push(["dark-green", value]);
                            type = "com";
                            value = "";
                        }
                        else if (!("<!--".includes(value))) {
                            list.push(["red", value[0]]);
                            if (i == "<") {
                                list.push(["white", value].slice(1, value.length-1));
                                type = "sin";
                                value = i;
                            }
                            else {
                                list.push(["white", value.slice(1)]);
                                type = "out";
                                value = "";
                            }
                        }
                        break;
                    case "com":
                        if (i == "-") {
                            list.push(["dark-green", value]);
                            type = "cout";
                            value = i;
                        }
                        else {value += i;}
                        break;
                    case "cout":
                        value += i;
                        if (value == "-->") {
                            list.push(["dark-green", value]);
                            type = "out";
                            value = "";
                        }
                        else if (!("-->".includes(value))) {
                            if (i == "-") {
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
            if (element.dataset.hideHead == "true") {bd = "bd-rad-md";}
            html += `<div class="code-content ${bd} pd-md bg-dark-grey txt-w-break-breakall">`;
            if (list.length != 0) {
                let value = "";
                for (let i = 0; i < list.length; i++) {
                    value += list[i][1];
                    if (value.length != 0 && (i == list.length-1 || list[i][0] != list[i+1][0])) {
                        let j = 0;
                        while (j < value.length) {
                            if (value[j] == "\n") {
                                value = value.slice(0, j)+"<br>"+value.slice(j+1);
                                j += 4;
                            }
                            else if (value[j] in SPECIAL_CHARS) {
                                value = value.slice(0, j)+"&"+SPECIAL_CHARS[value[j]]+";"+value.slice(j+1);
                                j += SPECIAL_CHARS[value[j]].length+2;
                            }
                            else {j++;}
                        }
                        html += getSpan(list[i][0], value);
                        value = "";
                    }
                }
            }
            html += "</div>";
        }
    }
    element.innerHTML = html;
}

export function init(element) {
    for (let i of element.getElementsByClassName("code")) {compute(i);}
}