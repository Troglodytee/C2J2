import * as Carousel from "./carousel.js";
import * as Code from "./code.js";
import * as DropMenu from "./drop-menu.js";
import * as Graph from "./graph.js";
import * as Repeat from "./repeat.js";
import * as Popup from "./popup.js";
import * as ToolTip from "./tool-tip.js";
import * as Tree from "./tree.js";

for (let i of document.getElementsByClassName("c2j2-init")) {
    Repeat.init(i);
    Carousel.init(i);
    Code.init(i);
    DropMenu.init(i);
    Graph.init(i);
    Popup.init(i);
    ToolTip.init(i);
    Tree.init(i);
}