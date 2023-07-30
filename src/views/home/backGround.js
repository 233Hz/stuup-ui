class Layer {
  constructor(game, width, height, image) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.image = image;
    this.x = 0;
    this.y = 0;
  }

  update() {}
  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

export class BackGround {
  constructor(game) {
    this.game = game;
    this.width = 1920;
    this.height = 1080;
    this.layerImage1 = document.getElementById('layer1');
    this.layer1 = new Layer(this.game, this.width, this.height, this.layerImage1);
    this.BacKGroundLayers = [this.layer1];
  }
  update() {
    this.BacKGroundLayers.forEach(layer => layer.update());
  }
  draw(context) {
    this.BacKGroundLayers.forEach(layer => layer.draw(context));
  }
}
