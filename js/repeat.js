export function compute(element) {
    let content = element.getElementsByClassName("repeat-model")[0];
    if (content) {
        let value_indices = [];
        let i = 0;
        let model = content.innerHTML;
        while (i < model.length-2) {
            if (model[i+2] == "$") {
                if (model[i+1] == "$") {
                    if (model[i] == "$") {
                        value_indices.push(i);
                        i++;
                    }
                    else {i++;}
                }
                else {i += 2;}
            }
            else {i += 3;}
        }
        let html = "";
        let items = element.getElementsByClassName("repeat-items")[0];
        if (items) {
            for (i of items.children) {
                let j = 0;
                let k = 0;
                while (k < value_indices.length && k < i.children.length) {
                    html += model.slice(j, value_indices[k])+i.children[k].textContent;
                    j = value_indices[k]+3;
                    k++;
                }
                if (j != 0) {html += model.slice(j);}
            }
        }
        element.innerHTML = html;
    }
}

export function init(element) {
    for (let i of element.getElementsByClassName("repeat")) {compute(i);}
}