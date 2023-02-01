export function compute(element) {
    let content = element.getElementsByClassName("tree-content")[0];
    if (content) {
        let title = element.getElementsByClassName("tree-title")[0];
        if (title) {
            content.dataset.open = "true";
            title.addEventListener("click", () => {
                if (content.dataset.open == "false") {
                    content.dataset.open = "true";
                    content.style.display = "";
                }
                else {
                    content.dataset.open = "false";
                    content.style.display = "none";
                }
            })
        }
    }
}

export function init(element) {
    for (let i of element.getElementsByClassName("tree")) {compute(i);}
}