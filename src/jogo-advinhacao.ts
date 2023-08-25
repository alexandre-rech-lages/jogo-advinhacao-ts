import { ResultadoChuteEnum } from "./resultado-chute.js";

export class JogoAdvinhacao {
  numeroSecreto: number = 0;
  quantidadeChutes: number = 0;
  totalDePontos: number = 100;
  totalDeTentativas: number = 0;  
  mensagem : string;
  resultadoChute : ResultadoChuteEnum

  constructor(nivelDificuldade: string) {
    this.numeroSecreto = this.ObterNumeroSecreto();

    switch (nivelDificuldade) {
      case "1": this.totalDeTentativas = 15; break;
      case "2": this.totalDeTentativas = 10; break;
      case "3": this.totalDeTentativas = 5; break;
    }
  }

  Chutar(numeroChute: number): ResultadoChuteEnum {
    this.quantidadeChutes++;

    const acertou: boolean = numeroChute === this.numeroSecreto;
    const menor: boolean = numeroChute < this.numeroSecreto;

    let pontosPerdidos = Math.abs((numeroChute - this.numeroSecreto) / 2);

    this.totalDePontos = this.totalDePontos - pontosPerdidos;
    
    if (acertou) {
      this.mensagem = `Você ganhou e a sua pontuação foi: ${this.totalDePontos} pontos`;
      this.resultadoChute = ResultadoChuteEnum.acertou;
    } else if (menor) {
      this.mensagem = `${numeroChute} é menor que o número secreto`;
      this.resultadoChute = ResultadoChuteEnum.tenteNovamente;
    } else {
      this.mensagem = `${numeroChute} é maior que o número secreto`;
      this.resultadoChute = ResultadoChuteEnum.tenteNovamente;
    }

    if (this.quantidadeChutes >= this.totalDeTentativas){
      this.mensagem = `Você perdeu e a sua pontuação foi: ${this.totalDePontos} pontos`;
      this.resultadoChute = ResultadoChuteEnum.perdeu;
    }

    return this.resultadoChute;
  }

  ObterNumeroSecreto(): number {
    return Math.floor(Math.random() * 20) + 1;
  }
  
}


