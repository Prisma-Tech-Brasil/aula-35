const { Usuario } = require("./Usuario");
const UsuarioPapel = require("./UsuarioPapel");
const Video = require("./Video");

class UsuarioDono extends Usuario {
  videos;
  #inscritos; // Propriedade privada para armazenar inscritos

  constructor(id, nome, imagem, email) {
    super(id, nome, imagem, email, UsuarioPapel.USUARIO_DONO);
    this.videos = [];
    this.#inscritos = [];
  }

  postarVideo(video) {
    const novoVideo = new Video(video);
    this.videos.push(novoVideo);
    return novoVideo;
  }

  listarVideos() {
    return this.videos;
  }

  // Método público para listar inscritos
  listarInscritos() {
    return this.#inscritos;
  }
}

module.exports = UsuarioDono;
