export function init() {
    for (let i of document.getElementsByClassName("popup")) {
        i.style.display = "none";
    }
    for (let i of document.getElementsByClassName("popup-trigger")) {
        let target = i.dataset.target;
        if (target) {
            let popup = document.getElementById(target);
            i.addEventListener("click", () => {
                popup.style.display = "";
                let animation = popup.dataset.anim;
                for (let j of popup.className.split(" ")) {if (j.slice(0, 4) == "anim") {popup.classList.remove(j);}}
                if (animation) {for (let j of animation.split(" ")) {popup.classList.add("anim-"+j);}}
            })
        }
    }
    for (let i of document.getElementsByClassName("popup-close")) {
        let target = i.dataset.target;
        if (target) {
            let popup = document.getElementById(target);
            i.addEventListener("click", () => {
                popup.style.display = "none";
                for (let j of popup.className.split(" ")) {if (j.slice(0, 4) == "anim") {popup.classList.remove(j);}}
            })
        }
    }
}