const UsuarioInscritoService = require("../services/UsuarioInscritoService");

class UsuarioInscritoController {
  index(_req, res) {
    try {
      const usuariosInscritos = UsuarioInscritoService.listarUsuarios();
      if (usuariosInscritos.length > 0) {
        res.status(200).json(usuariosInscritos);
      } else {
        res.status(404).json({ mensagem: "Nenhum usuário encontrado" });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao buscar usuário", detalhes: erro.message });
    }
  }

  show(req, res) {
    try {
      const id = parseInt(req.params.id);
      const usuario = UsuarioInscritoService.buscarUsuarioPorId(id);

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
      const novoUsuario = UsuarioInscritoService.criarUsuario({ nome, imagem, email });
      res.status(201).json(novoUsuario);
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao criar usuario", detalhes: erro.message });
    }
  }

  update(req, res) {
    try {
      const { nome, imagem, email } = req.body;
      const id = parseInt(req.params.id);
      const usuarioAtualizado = UsuarioInscritoService.atualizarUsuario(id, { nome, imagem, email });

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
      const usuarioRemovido = UsuarioInscritoService.removerUsuario(id);

      if (usuarioRemovido) {
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

module.exports = new UsuarioInscritoController();
