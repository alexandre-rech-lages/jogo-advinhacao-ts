import { JogoAdvinhacao } from "./jogo-advinhacao.js";
export class JogoAdvinhacaoTela {
    constructor() {
        this.btnVerificarChute = document.getElementById("btnVerificarChute");
        this.btnNovoJogo = document.getElementById("btnNovoJogo");
        this.labelMensagem = document.getElementById("labelMensagem");
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
            this.labelMensagem.textContent = "Chute inválido";
            return;
        }
        this.labelMensagem.textContent = this.jogo.Chutar(numeroChute);
    }
    novoJogo(nivelDificuldade) {
        this.jogo = new JogoAdvinhacao(nivelDificuldade);
        this.inputNumeroChute.value = "";
        this.labelMensagem.textContent = "";
    }
}
