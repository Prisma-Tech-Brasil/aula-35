const UsuarioDonoService = require("../services/UsuarioDonoService");

class UsuarioDonoController {
  index(_req, res) {
    try {
      const usuariosDono = UsuarioDonoService.findAll();
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
      const usuario = UsuarioDonoService.findById(id);

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
      const novoUsuario = UsuarioDonoService.create(nome, imagem, email);
      res.status(201).json(novoUsuario);
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
      const usuarioAtualizado = UsuarioDonoService.update(id, nome, imagem, email);

      if (!usuarioAtualizado) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }

      res.status(200).json(usuarioAtualizado);
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao editar usuário", detalhes: erro.message });
    }
  }

  delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      const usuarioRemovido = UsuarioDonoService.delete(id);

      if (!usuarioRemovido) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }

      res.status(200).json({
        mensagem: `Usuário id:${id} removido com sucesso!`,
        usuarioRemovido
      });
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao remover usuário", detalhes: erro.message });
    }
  }
}

module.exports = new UsuarioDonoController();
