import Menu from "./menu.js";
import Modal from "./modal.js";

const menu = new Menu("button.jogar", "body");
menu.init();

const modal = new Modal(".sobre", ".fechar", ".modal-container");
modal.init();
