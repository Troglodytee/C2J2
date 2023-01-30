export function init() {
    let carousels = document.getElementsByClassName("carousel");
    for (let i of carousels) {
        let carousel = i.getElementsByClassName("carousel-content")[0];
        let content = carousel.children;
        if (content) {
            let view = 1;
            if (i.dataset.view) {view = parseInt(i.dataset.view);}
            if (view < 1) {view = 1;}
            let jump = 1;
            if (i.dataset.jump) {jump = parseInt(i.dataset.jump);}
            if (jump < 1) {jump = 1;}
            jump %= content.length;
            for (let j = view; j < content.length; j++) {content[j].style.display = "none";}
            let previous_button = i.getElementsByClassName("carousel-previous")[0];
            if (previous_button) {previous_button.addEventListener("click", () => {
                for (let j = 0; j < jump; j++) {
                    let element_in = content[content.length-1].cloneNode(true);
                    content[content.length-1].remove();
                    element_in.style.display = "";
                    carousel.prepend(element_in);
                    content[view].style.display = "none";
                }
            })}
            let next_button = i.getElementsByClassName("carousel-next")[0];
            if (next_button) {next_button.addEventListener("click", () => {
                for (let j = 0; j < jump; j++) {
                    content[view].style.display = "";
                    let element_out = content[0];
                    let element = element_out.cloneNode(true);
                    element_out.remove();
                    element.style.display = "none";
                    carousel.append(element);
                }
            })}
        }
    }
}