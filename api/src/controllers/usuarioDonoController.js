const UsuarioDono = require("../models/UsuarioDono");
const { usuarios } = require("../mock/dados.json");

const usuariosDono = usuarios.filter(
  (usuario) => usuario.papel === "usuarioDono"
);

class UsuarioDonoController {
  index(_req, res) {
    try {
      if (usuariosDono.length > 0) {
        res.status(200).json(usuariosDono);
      } else {
        res.status(404).json({ mensagem: "Nenhum usuário encontrado" });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao buscar usuários", detalhes: erro.message });
    }
  }

  show(req, res) {
    try {
      const id = parseInt(req.params.id);
      const usuario = usuariosDono.find((v) => v.id === id);

      if (usuario) {
        res.status(200).json(usuario);
      } else {
        res.status(404).json({ mensagem: "Usuário não encontrado" });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao buscar usuário", detalhes: erro.message });
    }
  }

  store(req, res) {
    try {
      const { nome, imagem, email } = req.body;

      const gerarIdUnico = () => {
        let id;
        do {
          id = Math.floor(Math.random() * 1000);
        } while (usuariosDono.some((v) => v.id === id));
        return id;
      };

      const novoVideo = new UsuarioDono(
        gerarIdUnico(),
        nome,
        imagem,
        email
      );

      usuariosDono.push(novoVideo);
      res.status(201).json(novoVideo);
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao criar usuário", detalhes: erro.message });
    }
  }

  update(req, res) {
    try {
      const { nome, imagem, email } = req.body;
      const id = parseInt(req.params.id);
      const usuario = usuariosDono.find((v) => v.id === id);

      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }

      usuario.nome = nome;
      usuario.imagem = imagem;
      usuario.email = email;

      res.status(200).json(usuario);
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao editar usuário", detalhes: erro.message });
    }
  }

  delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      const indiceDoUsuario = usuariosDono.findIndex((v) => v.id === id);

      if (indiceDoUsuario !== -1) {
        const usuarioRemovido = usuariosDono.splice(indiceDoUsuario, 1);
        res.status(200).json({
          mensagem: `Usuário id:${id} removido com sucesso!`,
          usuarioRemovido
        });
      } else {
        res.status(404).json({ mensagem: "Usuário não encontrado" });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao remover usuário", detalhes: erro.message });
    }
  }
}

module.exports = new UsuarioDonoController();
