const { videos } = require("../mock/dados.json");

const Video = require("../models/Video");

class videosController {
  index(_req, res) {
    try {
      if (videos.length > 0) {
        res.status(200).json(videos);
      } else {
        res.status(404).json({ mensagem: "Nenhum vídeo encontrado" });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao buscar vídeos", detalhes: erro.message });
    }
  }

  show(req, res) {
    try {
      const id = parseInt(req.params.id);
      const video = videos.find((v) => v.id === id);

      if (video) {
        res.status(200).json(video);
      } else {
        res.status(404).json({ mensagem: "Vídeo não encontrado" });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao buscar vídeo", detalhes: erro.message });
    }
  }

  store(req, res) {
    try {
      const { titulo, descricao, quantidadeViews, image, canalID } = req.body;

      const gerarIdUnico = () => {
        let id;
        do {
          id = Math.floor(Math.random() * 1000);
        } while (videos.some((v) => v.id === id));
        return id;
      };

      const novoVideo = new Video(
        gerarIdUnico(),
        titulo,
        descricao,
        quantidadeViews,
        image,
        canalID
      );

      videos.push(novoVideo);
      res.status(201).json(novoVideo);
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao criar vídeo", detalhes: erro.message });
    }
  }

  update(req, res) {
    try {
      const { titulo, descricao, quantidadeViews, canalID } = req.body;
      const id = parseInt(req.params.id);
      const video = videos.find((v) => v.id === id);

      if (!video) {
        return res.status(404).json({ mensagem: "Vídeo não encontrado" });
      }

      video.titulo = titulo;
      video.descricao = descricao;
      video.quantidadeViews = quantidadeViews;
      video.canalID = canalID;

      res.status(200).json(video);
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao editar vídeo", detalhes: erro.message });
    }
  }

  delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      const indiceDoVideo = videos.findIndex((v) => v.id === id);

      if (indiceDoVideo !== -1) {
        const videoRemovido = videos.splice(indiceDoVideo, 1);
        res
          .status(200)
          .json({
            mensagem: `Vídeo id:${id} removido com sucesso!`,
            videoRemovido
          });
      } else {
        res.status(404).json({ mensagem: "Vídeo não encontrado" });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao remover vídeo", detalhes: erro.message });
    }
  }
}

module.exports = new videosController();
