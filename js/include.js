import * as carousel from "./carousel.js";
import * as code from "./code.js";
import * as drop_menu from "./drop-menu.js";
import * as graph from "./graph.js";
import * as repeat from "./repeat.js";
import * as popup from "./popup.js";
import * as tool_tip from "./tool-tip.js";
import * as tree from "./tree.js";

for (let i of document.getElementsByClassName("c2j2-init")) {
    repeat.init(i);
    carousel.init(i);
    code.init(i);
    drop_menu.init(i);
    graph.init(i);
    popup.init(i);
    tool_tip.init(i);
    tree.init(i);
}