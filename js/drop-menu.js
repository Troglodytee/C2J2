function isInRect(rect, x, y) {
    return rect.x <= x && x < rect.x+rect.width && rect.y <= y && y < rect.y+rect.height;
}

function dropMenuOpen(trigger, content, side, anchor) {
    content.dataset.open = "true";
    content.style.display = "";
    let trigger_rect = trigger.getBoundingClientRect();
    let content_rect = content.getBoundingClientRect();
    if (side == "top") {content.style.top = trigger_rect.top-trigger_rect.height-content_rect.height+window.scrollY+"px";}
    else if (side == "bottom") {content.style.top = trigger_rect.top+trigger_rect.height+window.scrollY+"px";}
    else if (side == "left") {content.style.left = trigger_rect.left-trigger_rect.width-content_rect.width+window.scrollX+"px";}
    else if (side == "right") {content.style.left = trigger_rect.left+trigger_rect.width+window.scrollX+"px";}
    if (side == "top" || side == "bottom") {
        if (anchor == "start") {content.style.left = trigger_rect.left+window.scrollX+"px";}
        else if (anchor == "center") {content.style.left = trigger_rect.left+(trigger_rect.width-content_rect.width)/2+window.scrollX+"px";}
        else if (anchor == "end") {content.style.left = trigger_rect.left+trigger_rect.width-content_rect.width+window.scrollX+"px";}
    }
    else {
        if (anchor == "start") {content.style.top = trigger_rect.top+window.scrollY+"px";}
        else if (anchor == "center") {content.style.top = trigger_rect.top+(trigger_rect.height-content_rect.height)/2+window.scrollY+"px";}
        else if (anchor == "end") {content.style.top = trigger_rect.top+trigger_rect.height-content_rect.height+window.scrollY+"px";}
    }
}

function dropMenuClose(content) {
    content.dataset.open = "false";
    content.style.display = "none";
}

export function compute(element) {
    let content = element.getElementsByClassName("drop-menu-content")[0];
    if (content) {
        content.style.display = "none";
        content.style.position = "absolute";
        content.dataset.open = "false";
        let trigger = element.getElementsByClassName("drop-menu-trigger")[0];
        if (trigger) {
            let side = "bottom";
            if (element.dataset.side) {side = element.dataset.side;}
            let anchor = "start";
            if (element.dataset.anchor) {anchor = element.dataset.anchor;}
            let mode = "click";
            if (element.dataset.mode) {mode = element.dataset.mode;}
            if (mode == "click") {
                trigger.addEventListener("click", () => {
                    if (content.dataset.open == "false") {dropMenuOpen(trigger, content, side, anchor);}
                    else {dropMenuClose(content);}
                });
            }
            else if (mode == "hover") {
                trigger.addEventListener("mouseenter", () => {dropMenuOpen(trigger, content, side, anchor);});
                trigger.addEventListener("mouseleave", (event) => {
                    if (!isInRect(content.getBoundingClientRect(), event.clientX, event.clientY)) {dropMenuClose(content);}
                });
                content.addEventListener("mouseleave", (event) => {
                    if (!isInRect(trigger.getBoundingClientRect(), event.clientX, event.clientY)) {dropMenuClose(content);}
                });
            }
        }
    }
}

export function init(element) {
    for (let i of element.getElementsByClassName("drop-menu")) {compute(i);}
    window.addEventListener("click", (event) => {
        let x = event.clientX;
        let y = event.clientY;
        for (let i of element.getElementsByClassName("drop-menu")) {
            if (!isInRect(i.getBoundingClientRect(), x, y)) {
                let content = i.getElementsByClassName("drop-menu-content")[0];
                if (content && !isInRect(content.getBoundingClientRect(), x, y)) {dropMenuClose(content);}
            }
        }
    });
}