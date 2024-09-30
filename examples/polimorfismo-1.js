class Animal {
  fazerSom() {
    console.log('O animal faz um som.');
  }
}

class Cachorro extends Animal {
  fazerSom() {
    console.log('O cachorro faz au au.');
  }
}

class Gato extends Animal {
  fazerSom() {
    console.log('O gato faz miau.');
  }
}

const animais = [new Cachorro(), new Gato()];

animais.forEach(animal => animal.fazerSom());
// Saída:
// O cachorro faz au au.
// O gato faz miau.