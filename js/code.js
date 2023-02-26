import {C2J2_PATH} from "./variables.js";

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

export function compute(element) {
    let html = "";
    let language = element.dataset.lang;
    let code = element.textContent;
    let existing_language = language && LANGUAGES.includes(language);
    if (existing_language) {
        if (!(element.dataset.hideHead === "true")) {
            html += `<div class="bd-rad-t-md pd-sm d-flex gap-sm algn-i-center bg-light-grey"><img src="${C2J2_PATH}/img/${ICONS[language][0]}.svg" alt="${ICONS[language][1]}" style="max-width: 40px; max-height: 40px;">`;
            if (element.dataset.name) {html += `<p class="fs-sm txt-black">${element.dataset.name}</p>`;}
            html += "</div>"
        }
    }
    let bd = "bd-rad-b-md";
    if (!existing_language || element.dataset.hideHead == "true") {bd = "bd-rad-md";}
    html += `<div class="${bd} pd-sm bg-dark-grey txt-w-break-breakall">`;
    if (element.id && element.dataset.allowCopy === "true") {
        html += `
            <img id="${element.id}-copy" class="float-right mg-l-xs" src="${C2J2_PATH}/img/copy-to-clipboard.svg" alt="Copier" style="max-width: 40px; max-height: 40px;">
            <p class="tool-tip bd-rad-sm pd-sm txt-w-space-nowrap bg-light-yellow txt-black" data-target="${element.id}-copy">Copier le code</p>
        `;
    }
    let lines = [];
    if (existing_language) {
        if (language == "html") {
            lines = [[]]
            let type = "";
            let color = "";
            for (let i of code) {
                if (i == "\n") {
                    lines.push([]);
                    color = "";
                }
                else if (type == "com") {
                    color = "dark-green";
                    if (i == ">") {
                        let value = lines[lines.length-1][lines[lines.length-1].length-1][0];
                        if (value.length >= 2 && value.slice(value.length-2, value.length) == "--") {
                            type = "out";
                        }
                    }
                }
                else if (i == " ") {
                    if (color == "") {color = "white";}
                    if (type == "tag") {type = "var";}
                }
                else if (i == "=") {
                    color = "white";
                    type = "equ";
                }
                else if (i == "\"") {
                    color = "orange";
                    if (type == "val") {type = "var";}
                    else {type = "val";}
                }
                else if ("<>/!-".includes(i)) {
                    if (type == "val") {color = "orange";}
                    else if (!("/!-".includes(i) && type != "spe")) {
                        color = "grey";
                        if (type == "tag") {type = "out";}
                        else {type = "spe";}
                    }
                    if (i == "-" && lines[lines.length-1].length != 0) {
                        let value = lines[lines.length-1][lines[lines.length-1].length-1][0];
                        if (value.length >= 3 && value.slice(value.length-3, value.length) == "<!-") {
                            color = "dark-green";
                            lines[lines.length-1][lines[lines.length-1].length-1][1] = color;
                            type = "com";
                        }
                    }
                }
                else {
                    if (type == "out") {color = "white";}
                    else if (type == "spe") {type = "tag";}
                    else if (type == "var") {color = "cyan";}
                    if (type == "tag") {color = "light-blue";}
                }
                if (color != "") {
                    if (lines[lines.length-1].length == 0 || color != lines[lines.length-1][lines[lines.length-1].length-1][1]) {lines[lines.length-1].push(["", color]);}
                    lines[lines.length-1][lines[lines.length-1].length-1][0] += i;
                }
            }
        }
    }
    else {
        lines = element.textContent.split("\n");
        for (let i = 0; i < lines.length; i++) {lines[i] = [[lines[i], "white"]];}
    }
    for (let i = 0; i < lines.length; i++) {
        let j = 0;
        while (j < lines[i].length-1) {
            if (lines[i][j][0].length == 0) {lines[i] = lines[i].slice(1);}
            else if (lines[i][j+1][1] == lines[i][j][1]) {
                lines[i][j][0] += lines[i][j+1][0];
                lines[i] = lines[i].slice(0, j+1)+lines[i].slice(j+2);
            }
            else {j++;}
        }
        if (lines[i].length != 0 && lines[i][lines[i].length-1][0].length == 0) {lines[i] = lines[i].slice(0, lines[i].length-1);}
    }
    let run = true;
    while (run) {
        let i = 0;
        let j = 0;
        while (run && i < lines[0].length) {
            if (lines[0][i][0][j] != " ") {run = false;}
            else {
                j++;
                if (j == lines[0][i][0].length) {
                    j = 0;
                    i++;
                }
            }
        }
        if (run) {lines.shift();}
    }
    run = true;
    while (run) {
        let i = 0;
        let j = 0;
        while (run && i < lines[lines.length-1].length) {
            if (lines[lines.length-1][i][0][j] != " ") {run = false;}
            else {
                j++;
                if (j == lines[lines.length-1][i][0].length) {
                    j = 0;
                    i++;
                }
            }
        }
        if (run) {lines.pop();}
    }
    if (lines.length != 0) {
        let min_spaces = 999;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].length != 0) {
                let nb_spaces = 0;
                let j = 0;
                while (j < lines[i][0][0].length && lines[i][0][0][j] == " ") {
                    nb_spaces++;
                    j++;
                }
                if (nb_spaces < min_spaces) {min_spaces = nb_spaces;}
            }
        }
        for (let i = 0; i < lines.length; i++) {
            if (i != 0) {html += "<br>";}
            if (lines[i].length != 0) {
                lines[i][0][0] = lines[i][0][0].slice(min_spaces);
                for (let j = 0; j < lines[i].length; j++) {
                    let k = 0;
                    while (k < lines[i][j][0].length) {
                        if (lines[i][j][0][k] == " ") {
                            let l = k+1;
                            while (l < lines[i][j][0].length && lines[i][j][0][l] == " ") {l++;}
                            l -= k;
                            if (l > 1) {
                                let spaces = "";
                                for (let m = 0; m < parseInt(l/2); m++) {spaces += " &nbsp;";}
                                if (l%2) {spaces += " ";}
                                lines[i][j][0] = lines[i][j][0].slice(0, k)+spaces+lines[i][j][0].slice(k+l);
                                k += l+parseInt(l/2)*5;
                            }
                            else {k++;}
                        }
                        else if (lines[i][j][0][k] in SPECIAL_CHARS) {
                            let special_char = SPECIAL_CHARS[lines[i][j][0][k]];
                            lines[i][j][0] = lines[i][j][0].slice(0, k)+"&"+special_char+";"+lines[i][j][0].slice(k+1)
                            k += special_char.length+2;
                        }
                        else {k++;}
                    }
                    if (lines[i][j][0].length != 0) {html += `<span class="fs-sm txt-${lines[i][j][1]}">${lines[i][j][0]}</span>`;}
                }
            }
        }
    }
    html += "</div>";
    element.innerHTML = html;
    if (element.id && element.dataset.allowCopy === "true") {
        let copy_button = document.getElementById(element.id+"-copy");
        copy_button.addEventListener("click", () => {
            navigator.clipboard.writeText(code);
            copy_button.nextElementSibling.classList.remove("bg-light-yellow");
            copy_button.nextElementSibling.classList.add("bg-light-green");
        });
        copy_button.addEventListener("mouseleave", () => {
            copy_button.nextElementSibling.classList.remove("bg-light-green");
            copy_button.nextElementSibling.classList.add("bg-light-yellow");
        });
    }
}

export function init(element) {
    for (let i of element.getElementsByClassName("code")) {compute(i);}
}