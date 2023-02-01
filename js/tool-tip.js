export function compute(element) {
    element.style.display = "none";
    element.style.position = "absolute";
    let target = element.dataset.target;
    if (target) {
        let target_element = document.getElementById(target);
        if (target_element) {
            if (element.dataset.type == "follow") {
                target_element.addEventListener("mousemove", (event) => {
                    element.style.display = "";
                    let tip_rect = element.getBoundingClientRect();
                    element.style.top = event.clientY-tip_rect.height+window.scrollY+"px";
                    element.style.left = event.clientX+window.scrollX+"px";
                });
            }
            else {
                target_element.addEventListener("mouseenter", () => {
                    element.style.display = "";
                    let target_rect = target_element.getBoundingClientRect();
                    let tip_rect = element.getBoundingClientRect();
                    let x = target_rect.left+target_rect.width;
                    if (x < 0) {x = 0;}
                    else if (x+tip_rect.width > window.innerWidth) {x = window.innerWidth-tip_rect.width;}
                    let y = target_rect.top-tip_rect.height;
                    if (y < 0) {y = 0;}
                    else if (y+tip_rect.height > window.innerHeight) {y = window.innerHeight-tip_rect.height;}
                    element.style.top = y+window.scrollY+"px";
                    element.style.left = x+window.scrollX+"px";
                });
            }
            target_element.addEventListener("mouseleave", () => {element.style.display = "none";})
        }
    }
}

export function init(element) {
    for (let i of element.getElementsByClassName("tool-tip")) {compute(i);}
}