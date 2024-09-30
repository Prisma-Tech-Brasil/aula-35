// models/Usuario.js
const UsuarioPapel = require("./UsuarioPapel");

class Usuario {
  // Propriedades privadas
  #id;
  #nome;
  #imagem;
  #email;
  #papel;

  constructor(id, nome, imagem, email, papel) {
    this.#id = id;
    this.#nome = nome;
    this.#imagem = imagem;
    this.#email = email;

    if (!Object.values(UsuarioPapel).includes(papel)) {
      throw new Error(`Papel inválido: ${papel}`);
    }
    this.#papel = papel;
  }

  // Métodos públicos
  pegarPapel() {
    return this.#papel;
  }
}

module.exports = { Usuario };