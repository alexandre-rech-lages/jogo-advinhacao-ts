import { JogoAdvinhacao } from "./jogo-advinhacao.js";
import { ResultadoChuteEnum } from "./resultado-chute.js";

export class JogoAdvinhacaoTela {
  btnVerificarChute: HTMLButtonElement;
  btnNovoJogo: HTMLButtonElement;
  labelMensagemFinal: HTMLLabelElement;
  inputNivelDificuldade: HTMLSelectElement;
  inputNumeroChute: HTMLInputElement;
  jogo: JogoAdvinhacao;

  constructor() {
    this.btnVerificarChute = document.getElementById("btnVerificarChute") as HTMLButtonElement;
    this.btnNovoJogo = document.getElementById("btnNovoJogo") as HTMLButtonElement;
    this.labelMensagemFinal = document.getElementById("labelMensagemFinal") as HTMLLabelElement;
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
      this.labelMensagemFinal.textContent = "Chute inválido";
      return;
    }

    const resultadoChute = this.jogo.Chutar(numeroChute) ;

    if (resultadoChute == ResultadoChuteEnum.acertou) {
      this.labelMensagemFinal.classList.add("cor-acertou"); 
    } else if (resultadoChute == ResultadoChuteEnum.perdeu) {
      this.labelMensagemFinal.classList.add("cor-perdeu"); 
    }
    else{
      this.labelMensagemFinal.classList.remove("cor-acertou"); 
      this.labelMensagemFinal.classList.remove("cor-perdeu"); 
    }

    this.labelMensagemFinal.textContent = this.jogo.mensagem;
  }

  novoJogo(nivelDificuldade : string): void {
    this.jogo = new JogoAdvinhacao(nivelDificuldade);
    this.inputNumeroChute.value = "";
    this.labelMensagemFinal.textContent = "";
  }
}