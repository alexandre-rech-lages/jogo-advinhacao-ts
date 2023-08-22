import { JogoAdvinhacao } from "./jogo-advinhacao.js";

export class JogoAdvinhacaoTela {
  btnVerificarChute: HTMLButtonElement;
  btnNovoJogo: HTMLButtonElement;
  labelMensagem: HTMLLabelElement;
  inputNivelDificuldade: HTMLSelectElement;
  inputNumeroChute: HTMLInputElement;
  jogo: JogoAdvinhacao;

  constructor() {
    this.btnVerificarChute = document.getElementById("btnVerificarChute") as HTMLButtonElement;
    this.btnNovoJogo = document.getElementById("btnNovoJogo") as HTMLButtonElement;
    this.labelMensagem = document.getElementById("labelMensagem") as HTMLLabelElement;
    this.inputNivelDificuldade = document.getElementById("nivelDificuldade") as HTMLSelectElement;
    this.inputNumeroChute = document.getElementById("inputNumeroChute") as HTMLInputElement;

    this.jogo = new JogoAdvinhacao(this.obtemDificuldade());

    this.registrarEventos();
  }

  obtemDificuldade(): string {
    let indice: number = this.inputNivelDificuldade.selectedIndex;
    return this.inputNivelDificuldade.options[indice].value;
  }

  registrarEventos(): void {
    this.btnVerificarChute.addEventListener("click", () => {
      this.verificarChute();
    });

    this.btnNovoJogo.addEventListener("click", () => {
      const selectedValue = this.obtemDificuldade();
      this.novoJogo(selectedValue);
    });

    this.inputNivelDificuldade.addEventListener("change", (event) => {
      const selectedValue = (event.target as HTMLSelectElement).value;      
      this.novoJogo(selectedValue);
    });
  }

  verificarChute(): void {
    const numeroChute: number = parseInt(this.inputNumeroChute.value);

    if (isNaN(numeroChute)) {
      this.labelMensagem.textContent = "Chute inválido";
      return;
    }

    this.labelMensagem.textContent = this.jogo.Chutar(numeroChute);
  }

  novoJogo(nivelDificuldade : string): void {
    this.jogo = new JogoAdvinhacao(nivelDificuldade);
    this.inputNumeroChute.value = "";
    this.labelMensagem.textContent = "";
  }
}