const colors = {
    "keywords"  : "dark-blue",
    "variables" : "cyan",
    "operators" : "white",
    "string"    : "orange",
    "integer"   : "dark-green",
    "undefined" : "red",
    "others"    : "grey",
};

const keywords = {
    "html" : [
        "link",
        "script",
    ],
}

function getSpan(class_name, type, value) {
    return `<span class="${class_name} txt-${colors[type]}">${value}</span>`;
}

export function init() {
    for (let i of document.getElementsByClassName("code")) {
        if (i.dataset.lang) {
            let type = null;
            let value = "";
            for (let j of i.textContent) {
            }
        }
    }
}