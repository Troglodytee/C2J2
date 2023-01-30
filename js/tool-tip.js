export function init() {
    for (let i of document.getElementsByClassName("tool-tip")) {
        i.style.display = "none";
        i.style.position = "absolute";
        let target = i.dataset.target;
        if (target) {
            let target_element = document.getElementById(target);
            if (target) {
                target_element.addEventListener("mouseenter", () => {
                    i.style.display = "";
                    let target_rect = target_element.getBoundingClientRect();
                    let tip_rect = i.getBoundingClientRect();
                    let x = target_rect.x+target_rect.width+window.scrollX;
                    if (x < 0) {x = 0;}
                    else if (x+tip_rect.width > window.innerWidth) {x = window.innerWidth-tip_rect.width;}
                    let y = target_rect.y-tip_rect.height+window.scrollY;
                    if (y < 0) {y = 0;}
                    else if (y+tip_rect.height > window.innerHeight) {y = window.innerHeight-tip_rect.height;}
                    i.style.top = y+"px";
                    i.style.left = x+"px";
                })
                target_element.addEventListener("mouseleave", () => {i.style.display = "none";})
            }
        }
    }
}