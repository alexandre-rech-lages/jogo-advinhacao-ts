export class JogoAdvinhacao {
    constructor(nivelDificuldade) {
        this.numeroSecreto = 0;
        this.quantidadeChutes = 0;
        this.totalDePontos = 0;
        this.totalDeTentativas = 0;
        this.numeroSecreto = this.ObterNumeroSecreto();
        switch (nivelDificuldade) {
            case "1":
                this.totalDeTentativas = 15;
                break;
            case "2":
                this.totalDeTentativas = 10;
                break;
            case "3":
                this.totalDeTentativas = 5;
                break;
        }
    }
    Chutar(numeroChute) {
        this.quantidadeChutes++;
        const acertou = numeroChute === this.numeroSecreto;
        const menor = numeroChute < this.numeroSecreto;
        let pontosPerdidos = Math.abs((numeroChute - this.numeroSecreto) / 2);
        this.totalDePontos = this.totalDePontos - pontosPerdidos;
        let mensagem = "";
        if (acertou) {
            mensagem = "Parabéns, você acertou! O seu número de pontos foi: " + this.totalDePontos;
        }
        else if (menor) {
            mensagem = "Seu chute foi menor que o número secreto";
        }
        else {
            mensagem = "Seu chute foi maior que o número secreto";
        }
        if (this.quantidadeChutes >= this.totalDeTentativas)
            mensagem = "Que azar! Tente novamente. O seu número de pontos foi: " + this.totalDePontos;
        return mensagem;
    }
    ObterNumeroSecreto() {
        return Math.floor(Math.random() * 20) + 1;
    }
}
