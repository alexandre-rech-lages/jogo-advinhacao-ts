import { JogoAdvinhacao } from "./jogo-advinhacao.js";
import { ResultadoChuteEnum } from "./resultado-chute.js";

export class JogoAdvinhacaoTela {
  btnVerificarChute: HTMLButtonElement;
  btnNovoJogo: HTMLButtonElement;
  labelMensagemFinal: HTMLLabelElement;
  pnlTeclado: HTMLDivElement; 
  inputNivelDificuldade: HTMLSelectElement;
  inputNumeroChute: HTMLInputElement;
  jogo: JogoAdvinhacao;
  

  constructor() {
    this.pnlTeclado = document.getElementById("pnlTeclado") as HTMLDivElement;  

    this.btnVerificarChute = document.getElementById("btnVerificarChute") as HTMLButtonElement;
    this.btnNovoJogo = document.getElementById("btnNovoJogo") as HTMLButtonElement;

    this.inputNivelDificuldade = document.getElementById("inputNivelDificuldade") as HTMLSelectElement;
    this.inputNumeroChute = document.getElementById("inputNumeroChute") as HTMLInputElement;

    this.labelMensagemFinal = document.getElementById("labelMensagemFinal") as HTMLLabelElement;    

    this.jogo = new JogoAdvinhacao(this.obtemDificuldade());

    this.registrarEventos();
  }

  obtemDificuldade(): string {
    let indice: number = this.inputNivelDificuldade.selectedIndex;
    return this.inputNivelDificuldade.options[indice].value;
  }

  registrarEventos(): void {

    for (const botao of this.pnlTeclado.children) 
      botao.addEventListener("click", this.digitarLetra.bind(this));    

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

  digitarLetra(event: Event) {    

    const numero = (event.target as HTMLButtonElement).textContent;
    
    if (numero)
      this.inputNumeroChute.value = numero;        
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