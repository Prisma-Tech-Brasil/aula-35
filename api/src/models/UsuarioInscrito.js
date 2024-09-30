const { Usuario } = require("./Usuario");
const UsuarioPapel = require("./UsuarioPapel");

class UsuarioInscrito extends Usuario {
  #canaisInscritos; // Propriedade privada para canais inscritos

  constructor(id, nome, imagem, email) {
    super(id, nome, imagem, email, UsuarioPapel.USUARIO_INSCRITO);
    this.#canaisInscritos = [];
  }

  inscreverSeNoCanal(idCanal) {
    if (!idCanal) {
      return "O canal deve ser informado!";
    }
    this.#canaisInscritos.push(parseInt(idCanal));
  }

  listarCanaisInscritos() {
    return this.#canaisInscritos;
  }
}

module.exports = UsuarioInscrito;