import { JogoAdvinhacao } from "./jogo-advinhacao.js";
import { ResultadoChuteEnum } from "./resultado-chute.js";
export class JogoAdvinhacaoTela {
    constructor() {
        this.pnlTeclado = document.getElementById("pnlTeclado");
        this.btnVerificarChute = document.getElementById("btnVerificarChute");
        this.btnNovoJogo = document.getElementById("btnNovoJogo");
        this.inputNivelDificuldade = document.getElementById("inputNivelDificuldade");
        this.inputNumeroChute = document.getElementById("inputNumeroChute");
        this.labelMensagemFinal = document.getElementById("labelMensagemFinal");
        this.jogo = new JogoAdvinhacao(this.obtemDificuldade());
        this.registrarEventos();
    }
    obtemDificuldade() {
        let indice = this.inputNivelDificuldade.selectedIndex;
        return this.inputNivelDificuldade.options[indice].value;
    }
    registrarEventos() {
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
            const selectedValue = event.target.value;
            this.novoJogo(selectedValue);
        });
    }
    digitarLetra(event) {
        const numero = event.target.textContent;
        if (numero)
            this.inputNumeroChute.value = numero;
    }
    verificarChute() {
        const numeroChute = parseInt(this.inputNumeroChute.value);
        if (isNaN(numeroChute)) {
            this.labelMensagemFinal.textContent = "Chute inválido";
            return;
        }
        const resultadoChute = this.jogo.Chutar(numeroChute);
        if (resultadoChute == ResultadoChuteEnum.acertou) {
            this.labelMensagemFinal.classList.add("cor-acertou");
        }
        else if (resultadoChute == ResultadoChuteEnum.perdeu) {
            this.labelMensagemFinal.classList.add("cor-perdeu");
        }
        else {
            this.labelMensagemFinal.classList.remove("cor-acertou");
            this.labelMensagemFinal.classList.remove("cor-perdeu");
        }
        this.labelMensagemFinal.textContent = this.jogo.mensagem;
    }
    novoJogo(nivelDificuldade) {
        this.jogo = new JogoAdvinhacao(nivelDificuldade);
        this.inputNumeroChute.value = "";
        this.labelMensagemFinal.textContent = "";
    }
}
//# sourceMappingURL=jogo-advinhacao.tela.js.map