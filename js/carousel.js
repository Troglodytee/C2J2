export function compute(element) {
    let content = element.getElementsByClassName("carousel-content")[0];
    if (content) {
        let items = content.children;
        let view = 1;
        if (element.dataset.view) {view = parseInt(element.dataset.view);}
        if (view < 1) {view = 1;}
        let jump = 1;
        if (element.dataset.jump) {jump = parseInt(element.dataset.jump);}
        if (jump < 1) {jump = 1;}
        jump %= items.length;
        for (let i = view; i < items.length; i++) {items[i].style.display = "none";}
        let previous_button = element.getElementsByClassName("carousel-previous")[0];
        if (previous_button) {previous_button.addEventListener("click", () => {
            for (let i = 0; i < jump; i++) {
                let element_in = items[items.length-1].cloneNode(true);
                items[items.length-1].remove();
                element_in.style.display = "";
                content.prepend(element_in);
                items[view].style.display = "none";
            }
        })}
        let next_button = element.getElementsByClassName("carousel-next")[0];
        if (next_button) {next_button.addEventListener("click", () => {
            for (let i = 0; i < jump; i++) {
                items[view].style.display = "";
                let element_out = items[0];
                let element = element_out.cloneNode(true);
                element_out.remove();
                element.style.display = "none";
                content.append(element);
            }
        })}
    }
}

export function init(element) {
    for (let i of element.getElementsByClassName("carousel")) {compute(i);}
}