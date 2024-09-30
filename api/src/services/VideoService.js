const { videos } = require("../mock/dados.json");
const Video = require("../models/Video");

class VideoService {
  listarVideos() {
    return videos;
  }

  buscarVideoPorId(id) {
    return videos.find(video => video.id === id);
  }

  criarVideo(videoData) {
    const gerarIdUnico = () => {
      let id;
      do {
        id = Math.floor(Math.random() * 1000);
      } while (videos.some(video => video.id === id));
      return id;
    };

    const novoVideo = new Video(
      gerarIdUnico(),
      videoData.titulo,
      videoData.descricao,
      videoData.quantidadeViews,
      videoData.image,
      videoData.canalID
    );

    videos.push(novoVideo);
    return novoVideo;
  }

  atualizarVideo(id, novoVideoData) {
    const video = this.buscarVideoPorId(id);
    if (!video) return null;

    video.titulo = novoVideoData.titulo || video.titulo;
    video.descricao = novoVideoData.descricao || video.descricao;
    video.quantidadeViews = novoVideoData.quantidadeViews || video.quantidadeViews;
    video.canalID = novoVideoData.canalID || video.canalID;

    return video;
  }

  removerVideo(id) {
    const indiceDoVideo = videos.findIndex(video => video.id === id);
    if (indiceDoVideo === -1) return null;

    return videos.splice(indiceDoVideo, 1);
  }
}

module.exports = new VideoService();
