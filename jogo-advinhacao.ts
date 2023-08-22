export class JogoAdvinhacao {
  numeroSecreto: number = 0;
  quantidadeChutes: number = 0;
  totalDePontos: number = 0;
  totalDeTentativas: number = 0;

  constructor(nivelDificuldade: string) {
    this.numeroSecreto = this.ObterNumeroSecreto();

    switch (nivelDificuldade) {
      case "1": this.totalDeTentativas = 15; break;
      case "2": this.totalDeTentativas = 10; break;
      case "3": this.totalDeTentativas = 5; break;
    }
  }

  Chutar(numeroChute: number): string {
    this.quantidadeChutes++;

    const acertou: boolean = numeroChute === this.numeroSecreto;
    const menor: boolean = numeroChute < this.numeroSecreto;

    let pontosPerdidos = Math.abs((numeroChute - this.numeroSecreto) / 2);

    this.totalDePontos = this.totalDePontos - pontosPerdidos;

    let mensagem = "";

    if (acertou) {
      mensagem = "Parabéns, você acertou! O seu número de pontos foi: " + this.totalDePontos;
    } else if (menor) {
      mensagem = "Seu chute foi menor que o número secreto";
    } else {
      mensagem = "Seu chute foi maior que o número secreto";
    }

    if (this.quantidadeChutes >= this.totalDeTentativas)
      mensagem = "Que azar! Tente novamente. O seu número de pontos foi: " + this.totalDePontos;

      
    return mensagem;
  }

  ObterNumeroSecreto(): number {
    return Math.floor(Math.random() * 20) + 1;
  }
  
}


