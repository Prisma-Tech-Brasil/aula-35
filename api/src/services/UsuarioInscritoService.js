const { usuarios } = require("../mock/dados.json");
const UsuarioInscrito = require("../models/UsuarioInscrito");
const UsuarioPapel = require("../models/UsuarioPapel");

class UsuarioInscritoService {
  constructor() {
    this.usuariosInscritos = usuarios.filter(
      (usuario) => usuario.papel === UsuarioPapel.USUARIO_INSCRITO
    );
  }

  listarUsuarios() {
    return this.usuariosInscritos;
  }

  buscarUsuarioPorId(id) {
    return this.usuariosInscritos.find((usuario) => usuario.id === id);
  }

  criarUsuario(usuarioData) {
    const gerarIdUnico = () => {
      let id;
      do {
        id = Math.floor(Math.random() * 1000);
      } while (this.usuariosInscritos.some((v) => v.id === id));
      return id;
    };

    const novoUsuario = new UsuarioInscrito(
      gerarIdUnico(),
      usuarioData.nome,
      usuarioData.imagem,
      usuarioData.email
    );

    this.usuariosInscritos.push(novoUsuario);
    return novoUsuario;
  }

  atualizarUsuario(id, novoUsuarioData) {
    const usuario = this.buscarUsuarioPorId(id);
    if (!usuario) return null;

    usuario.nome = novoUsuarioData.nome || usuario.nome;
    usuario.imagem = novoUsuarioData.imagem || usuario.imagem;
    usuario.email = novoUsuarioData.email || usuario.email;

    return usuario;
  }

  removerUsuario(id) {
    const indiceDoUsuario = this.usuariosInscritos.findIndex((v) => v.id === id);
    if (indiceDoUsuario === -1) return null;

    return this.usuariosInscritos.splice(indiceDoUsuario, 1)[0];
  }
}

module.exports = new UsuarioInscritoService();
