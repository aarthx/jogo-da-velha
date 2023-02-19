import Modal from "./modal.js";

export default class Jogo {
  constructor(espacos, wrapper) {
    this.wrapper = document.querySelector(wrapper);
    this.espacos = document.querySelectorAll(espacos);
    this.turno = 0;

    this.colocaSimbolo = this.colocaSimbolo.bind(this);
  }

  verificaResultado() {
    let casas = [...this.espacos];
    let simboloCasas = [];
    casas.forEach((item) => {
      let img = item.firstChild;
      if (img === null) {
        img = null;
      }
      simboloCasas.push(img);
    });

    const linhasVencedoras = [
      [0, 4, 8],
      [2, 4, 6],
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    linhasVencedoras.forEach((item) => {
      if (
        simboloCasas[item[0]] !== null &&
        simboloCasas[item[1]] !== null &&
        simboloCasas[item[2]] !== null
      ) {
        if (
          simboloCasas[item[0]].currentSrc ===
            simboloCasas[item[1]].currentSrc &&
          simboloCasas[item[0]].currentSrc === simboloCasas[item[2]].currentSrc
        ) {
          this.srcResposta = simboloCasas[item[0]].currentSrc;
          return this.mostraResultado();
        }
      }
    });

    if (!simboloCasas.includes(null) && !this.srcResposta) {
      this.resposta = "Empatou!!! Deu velha!";
      this.mostraResultado();
    }
  }

  mostraResultado() {
    const modal = new Modal(undefined, undefined, ".modal-container");
    const caixaModal = document.querySelector(".modal");
    const textoModal = document.querySelector(".texto-modal");
    const buttonFechar = document.querySelector(".fechar");
    buttonFechar.addEventListener("click", function () {
      location.reload();
    });

    if (this.srcResposta) {
      const simboloVencedor = document.createElement("img");
      simboloVencedor.src = this.srcResposta;
      caixaModal.appendChild(simboloVencedor);
    } else if (this.resposta) {
      textoModal.innerHTML = this.resposta;
    }

    modal.toggleModal();
  }

  mostraTurno() {
    const vez = document.createElement("p");
    vez.innerText = "Vez de:";
    vez.classList.add("turno");
    vez.appendChild(this.criarSimbolo());
    this.turno = this.turno ? 0 : 1;
    this.wrapper.appendChild(vez);
    return vez;
  }

  quemJoga() {
    const simboloArray = ["xis.png", "bolinha.png"];
    let atual = simboloArray[this.turno];
    return atual;
  }

  criarSimbolo() {
    const simbolo = document.createElement("img");
    simbolo.src = `./css/img/${this.quemJoga(0)}`;
    simbolo.style.pointerEvents = "none";
    this.turno = this.turno ? 0 : 1;
    return simbolo;
  }

  colocaSimbolo(event) {
    if (event.target.children.length === 0) {
      const risco = this.criarSimbolo();
      event.target.appendChild(risco);
      this.wrapper.removeChild(this.wrapper.lastChild);
      this.mostraTurno();
      this.verificaResultado();
    }
  }

  addEventoGrade() {
    this.espacos.forEach((item) => {
      item.addEventListener("click", this.colocaSimbolo);
    });
  }

  init() {
    if (this.wrapper && this.espacos.length) {
      this.addEventoGrade();
      this.mostraTurno();
    }

    return this;
  }
}
