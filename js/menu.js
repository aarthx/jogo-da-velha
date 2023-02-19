import Jogo from "./jogo.js";

export default class Menu {
  constructor(iniciar, corpo) {
    this.iniciar = document.querySelector(iniciar);
    this.corpo = document.querySelector(corpo);

    this.carregarJogo = this.carregarJogo.bind(this);
  }

  carregarJogo() {
    fetch("./jogo.html")
      .then((response) => response.text())
      .then((response) => {
        this.corpo.innerHTML = response;
      })
      .then((response) => {
        const jogo = new Jogo(".ul-jogo li", ".wrapper");
        jogo.init();
      });
  }

  addEventoIniciar() {
    this.iniciar.addEventListener("click", this.carregarJogo);
  }

  init() {
    if (this.iniciar && this.corpo) {
      this.addEventoIniciar();
    }
    return this;
  }
}
