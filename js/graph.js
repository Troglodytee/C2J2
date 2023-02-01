export function compute(element) {
    let type = "bar";
    if (element.dataset.type) {type = element.dataset.type;}
    let hover = element.dataset.showHover == "true";
    if (type == "bar") {
        let height = "10";
        if (element.dataset.height) {height = element.dataset.height;}
        element.style.height = height+"px";
        element.style.display = "flex";
        let total = 0;
        let values = element.getElementsByClassName("graph-value");
        for (let i of values) {
            if (i.dataset.value) {total += parseInt(i.dataset.value);}
            else {
                i.dataset.value = "1";
                total += 1;
            }
        }
        let n = 1;
        for (let i of values) {
            i.style.height = height+"px";
            i.style.width = parseInt(i.dataset.value)/total*100+"%";
            if (i.dataset.color) {i.style.backgroundColor = `var(--${i.dataset.color})`;}
            if (hover) {
                i.id = element.id+"-"+n;
                let tool_tip = document.createElement("div");
                tool_tip.className = "tool-tip pd-sm bd-rad-sm bg-light-yellow d-flex gap-xs";
                tool_tip.dataset.type = "follow";
                tool_tip.dataset.target = element.id+"-"+n;
                if (i.dataset.name) {
                    let name = document.createElement("span");
                    name.className = "fs-sm txt-black";
                    name.textContent = i.dataset.name+" :";
                    tool_tip.append(name);
                }
                let value = document.createElement("span");
                value.className = "fs-sm txt-black";
                value.textContent = i.dataset.value;
                tool_tip.append(value);
                element.append(tool_tip);
            }
            n++;
        }
        element.firstElementChild.classList.add("bd-rad-l-md");
        if (hover) {element.children[n-2].classList.add("bd-rad-r-md");}
        else {element.lastElementChild.classList.add("bd-rad-r-md");}
    }
}

export function init(element) {
    for (let i of element.getElementsByClassName("graph")) {compute(i);}
}