class Video {
  constructor(id, titulo, descricao, quantidadeViews = 0, image, canalID) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.quantidadeViews = quantidadeViews;
    this.image = image;
    this.canalID = canalID;
  }

  adicionarView() {
    this.quantidadeViews += 1;
  }

  buscarCanal(canalID) {
    return this.canalID === canalID;
  }
}

module.exports = Video;
