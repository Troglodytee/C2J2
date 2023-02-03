function show(popup) {
    popup.style.display = "";
    let animation = popup.dataset.anim;
    if (animation) {
        for (let i of popup.className.split(" ")) {if (i.slice(0, 4) == "anim") {popup.classList.remove(i);}}
        if (animation) {for (let i of animation.split(" ")) {popup.classList.add("anim-"+i);}}
        let new_popup = popup.cloneNode(true);
        popup.parentNode.replaceChild(new_popup, popup);
        popup = new_popup;
    }
    popup.dataset.state = "show";
    return popup;
}

function hide(popup) {
    let animation = popup.dataset.anim;
    if (animation) {
        if (popup.className.includes("anim-reverse")) {popup.classList.remove("anim-reverse");}
        else {popup.classList.add("anim-reverse");}
        let new_popup = popup.cloneNode(true);
        popup.parentNode.replaceChild(new_popup, popup);
        popup = new_popup;
    }
    else {
        popup.style.display = "none";
        
    }
    popup.dataset.state = "hide";
    return popup;
}

export function update(element) {
    if (element.classList.contains("popup")) {element.style.display = "none";}
    if (element.classList.contains("popup-switch")) {
        let target = element.dataset.target;
        if (target) {
            let popup = document.getElementById(target);
            if (popup) {
                popup.dataset.state = "hide";
                element.addEventListener("click", () => {
                    if (popup.dataset.state == "hide") {popup = show(popup);}
                    else {popup = hide(popup);}
                });
            }
        }
    }
    if (element.classList.contains("popup-trigger")) {
        let target = element.dataset.target;
        if (target) {
            let popup = document.getElementById(target);
            if (popup) {
                popup.dataset.state = "hide";
                element.addEventListener("click", () => {popup = show(popup);});
            }
        }
    }
    if (element.classList.contains("popup-close")) {
        let target = element.dataset.target;
        if (target) {
            let popup = document.getElementById(target);
            if (popup) {
                popup.dataset.state = "hide";
                element.addEventListener("click", () => {popup = hide(popup);});
            }
        }
    }
}

export function init(element) {
    for (let i of element.getElementsByClassName("popup")) {update(i);}
    for (let i of element.getElementsByClassName("popup-switch")) {update(i);}
    for (let i of element.getElementsByClassName("popup-trigger")) {update(i);}
    for (let i of element.getElementsByClassName("popup-close")) {update(i);}
}