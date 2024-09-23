class Video {
  constructor(id, titulo, descricao, quantidadeViews = 0, image, canalID) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.quantidadeViews = quantidadeViews;
    this.image = image;
    this.canalID = canalID;
  }

  // Incrementar o número de visualizações
  adicionarView() {
    this.quantidadeViews += 1;
  }

  // Atualizar informações do vídeo
  atualizarInformacoes(novoTitulo, novaDescricao, novaImagem) {
    if (novoTitulo) {
      this.titulo = novoTitulo;
    }
    if (novaDescricao) {
      this.descricao = novaDescricao;
    }
    if (novaImagem) {
      this.image = novaImagem;
    }
  }

  // Exibir informações do vídeo
  exibirInformacoes() {
    return {
      id: this.id,
      titulo: this.titulo,
      descricao: this.descricao,
      quantidadeViews: this.quantidadeViews,
      image: this.image,
      canalID: this.canalID,
    };
  }

  // Verificar se o vídeo pertence a um canal
  pertenceAoCanal(canalID) {
    return this.canalID === canalID;
  }
}

module.exports = Video;
