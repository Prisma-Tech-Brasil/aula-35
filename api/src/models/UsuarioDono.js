const { Usuario } = require("./Usuario");
const UsuarioPapel = require("./UsuarioPapel");
const Video = require("./Video");

class UsuarioDono extends Usuario {
  constructor(id, nome, imagem, email) {
    super(id, nome, imagem, email, UsuarioPapel.USUARIO_DONO);
    this.videos = [];
    this.inscritos = [];
  }

  adicionarVideo(video) {
    const novoVideo = new Video(video);

    this.videos.push(novoVideo);
    return novoVideo;
  }

  removerVideo(idVideo) {
    const indexVideo = this.videos.findIndex(v => v.id === idVideo);

    if (indexVideo < 0) {
      return "Erro: vídeo não encontrado";
    }

    this.videos.splice(indexVideo, 1);
    return "Vídeo removido com sucesso";
  }

  editarVideo(idVideo, novoTitulo, novaDescricao, novaImagem) {
    const video = this.videos.find(v => v.id === idVideo);
    if (!video) {
      return "Vídeo não encontrado";
    }
    video.titulo = novoTitulo || video.titulo;
    video.descricao = novaDescricao || video.descricao;
    video.image = novaImagem || video.image;
    return video;
  }

  listarVideos() {
    return this.videos;
  }

  listarInscritos() {
    return this.inscritos;
  }

  adicionarInscrito(usuario) {
    this.inscritos.push(usuario);
    return this.inscritos;
  }
}

module.exports = UsuarioDono;
