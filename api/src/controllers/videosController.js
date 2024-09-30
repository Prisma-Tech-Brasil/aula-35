const VideoService = require("../services/VideoService");

class VideoController {
  index(_req, res) {
    try {
      const videos = VideoService.listarVideos();
      if (videos.length > 0) {
        res.status(200).json(videos);
      } else {
        res.status(404).json({ mensagem: "Nenhum vídeo encontrado" });
      }
    } catch (erro) {
      res.status(500).json({ mensagem: "Erro ao buscar vídeos", detalhes: erro.message });
    }
  }

  show(req, res) {
    try {
      const id = parseInt(req.params.id);
      const video = VideoService.buscarVideoPorId(id);

      if (video) {
        res.status(200).json(video);
      } else {
        res.status(404).json({ mensagem: "Vídeo não encontrado" });
      }
    } catch (erro) {
      res.status(500).json({ mensagem: "Erro ao buscar vídeo", detalhes: erro.message });
    }
  }

  store(req, res) {
    try {
      const novoVideo = VideoService.criarVideo(req.body);
      res.status(201).json(novoVideo);
    } catch (erro) {
      res.status(500).json({ mensagem: "Erro ao criar vídeo", detalhes: erro.message });
    }
  }

  update(req, res) {
    try {
      const id = parseInt(req.params.id);
      const videoAtualizado = VideoService.atualizarVideo(id, req.body);

      if (videoAtualizado) {
        res.status(200).json(videoAtualizado);
      } else {
        res.status(404).json({ mensagem: "Vídeo não encontrado" });
      }
    } catch (erro) {
      res.status(500).json({ mensagem: "Erro ao editar vídeo", detalhes: erro.message });
    }
  }

  delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      const videoRemovido = VideoService.removerVideo(id);

      if (videoRemovido) {
        res.status(200).json({ mensagem: "Vídeo removido com sucesso!", videoRemovido });
      } else {
        res.status(404).json({ mensagem: "Vídeo não encontrado" });
      }
    } catch (erro) {
      res.status(500).json({ mensagem: "Erro ao remover vídeo", detalhes: erro.message });
    }
  }
}

module.exports = new VideoController();
