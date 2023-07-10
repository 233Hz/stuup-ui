export class BmhAnimationEl {
  constructor(game) {
    this.game = game;
    this.x = 0;
    this.y = 300;
    this.width = 400;
    this.height = 400;
    this.spiritWidth = 511;
    this.spiritHeight = 474;
    this.speed = 0.1;
    this.degree = 0;
    this.maxDegree = 0;
    this.minDegree = -15;
    this.image = document.getElementById('animate1');
  }

  update() {
    this.degree += this.speed;
    if (this.degree < this.minDegree || this.degree > this.maxDegree) {
      this.speed = -this.speed;
    }
  }

  draw(context) {
    context.save();
    context.translate(this.x, this.y + this.height);
    context.rotate((this.degree * Math.PI) / 180);
    context.drawImage(
      this.image,
      0,
      0,
      this.spiritWidth,
      this.spiritHeight,
      this.x,
      -this.height,
      this.width,
      this.height
    );
    context.restore();
  }
}

export class ChickenAnimationEl {
  constructor(game) {
    this.game = game;
    this.x = 0;
    this.y = 300;
    this.width = 400;
    this.height = 400;
    this.spiritWidth = 511;
    this.spiritHeight = 474;
    this.speed = 0.1;
    this.degree = 0;
    this.maxDegree = 0;
    this.minDegree = -15;
    this.image = document.getElementById('animate1');
  }

  update() {
    this.degree += this.speed;
    if (this.degree < this.minDegree || this.degree > this.maxDegree) {
      this.speed = -this.speed;
    }
  }

  draw(context) {
    context.save();
    context.translate(this.x, this.y + this.height);
    context.rotate((this.degree * Math.PI) / 180);
    context.drawImage(
      this.image,
      0,
      0,
      this.spiritWidth,
      this.spiritHeight,
      this.x,
      -this.height,
      this.width,
      this.height
    );
    context.restore();
  }
}
