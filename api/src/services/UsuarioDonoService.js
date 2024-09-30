const UsuarioDono = require("../models/UsuarioDono");
const { canais } = require("../mock/dados.json");
const UsuarioPapel = require("../models/UsuarioPapel");

class UsuarioDonoService {
  constructor() {
    this.usuariosDono = canais.filter((usuario) => usuario.papel === UsuarioPapel.USUARIO_DONO);
  }

  findAll() {
    return this.usuariosDono;
  }

  findById(id) {
    return this.usuariosDono.find((usuario) => usuario.id === id);
  }

  create(nome, imagem, email) {
    const gerarIdUnico = () => {
      let id;
      do {
        id = Math.floor(Math.random() * 1000);
      } while (this.usuariosDono.some((v) => v.id === id));
      return id;
    };

    const novoUsuario = new UsuarioDono(gerarIdUnico(), nome, imagem, email);
    this.usuariosDono.push(novoUsuario);
    return novoUsuario;
  }

  update(id, nome, imagem, email) {
    const usuario = this.findById(id);
    if (!usuario) {
      return null;
    }

    usuario.nome = nome;
    usuario.imagem = imagem;
    usuario.email = email;

    return usuario;
  }

  delete(id) {
    const indiceDoUsuario = this.usuariosDono.findIndex((usuario) => usuario.id === id);
    if (indiceDoUsuario === -1) {
      return null;
    }

    return this.usuariosDono.splice(indiceDoUsuario, 1)[0];
  }
}

module.exports = new UsuarioDonoService();
