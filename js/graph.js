export function compute(element) {
    let type = "bar";
    if (element.dataset.type) {type = element.dataset.type;}
    let hover = element.id && element.dataset.showHover == "true";
    let total = 0;
    let min = -1;
    let max = -1;
    let values = element.getElementsByClassName("graph-value");
    for (let i of values) {
        let value;
        if (i.dataset.value) {
            value = parseInt(i.dataset.value);
            total += value;
        }
        else {
            value = 1;
            i.dataset.value = "1";
            total += 1;
        }
        if (min == -1 || value < min) {min = value;}
        if (max == -1 || value > max) {max = value;}
    }
    if (element.dataset.order == "true") {
        for (let i = 0; i < values.length; i++) {
            let next_min = max;
            let found = false;
            for (let j of [...values].slice(0, values.length-i)) {
                let value = parseInt(j.dataset.value);
                if (found) {
                    if (value < next_min) {next_min = value;}
                }
                else {
                    if (value == min) {
                        element.append(j);
                        found = true;
                    }
                    else if (value < next_min) {next_min = value;}
                }
            }
            min = next_min;
        }
    }
    else if (element.dataset.order == "reverse") {
        for (let i = 0; i < values.length; i++) {
            let next_max = min;
            let found = false;
            for (let j of [...values].slice(0, values.length-i)) {
                let value = parseInt(j.dataset.value);
                if (found) {
                    if (value > next_max) {next_max = value;}
                }
                else {
                    if (value == max) {
                        element.append(j);
                        found = true;
                    }
                    else if (value > next_max) {next_max = value;}
                }
            }
            max = next_max;
        }
    }
    if (type == "bar") {
        let height = "10";
        if (element.dataset.height) {height = element.dataset.height;}
        element.style.height = height+"px";
        element.style.display = "flex";
        let n = 1;
        for (let i of values) {
            i.style.height = height+"px";
            i.style.width = parseInt(i.dataset.value)/total*100+"%";
            if (hover) {
                i.id = element.id+"-"+n;
                let tool_tip = document.createElement("div");
                tool_tip.className = "tool-tip bd-rad-sm pd-sm txt-w-space-nowrap bg-light-yellow d-flex gap-xs";
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
    }
}

export function init(element) {
    for (let i of element.getElementsByClassName("graph")) {compute(i);}
}