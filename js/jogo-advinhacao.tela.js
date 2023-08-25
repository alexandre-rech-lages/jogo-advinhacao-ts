import { JogoAdvinhacao } from "./jogo-advinhacao.js";
import { ResultadoChuteEnum } from "./resultado-chute.js";
export class JogoAdvinhacaoTela {
    constructor() {
        this.btnVerificarChute = document.getElementById("btnVerificarChute");
        this.btnNovoJogo = document.getElementById("btnNovoJogo");
        this.labelMensagemFinal = document.getElementById("labelMensagemFinal");
        this.inputNivelDificuldade = document.getElementById("nivelDificuldade");
        this.inputNumeroChute = document.getElementById("inputNumeroChute");
        this.jogo = new JogoAdvinhacao(this.obtemDificuldade());
        this.registrarEventos();
    }
    obtemDificuldade() {
        let indice = this.inputNivelDificuldade.selectedIndex;
        return this.inputNivelDificuldade.options[indice].value;
    }
    registrarEventos() {
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