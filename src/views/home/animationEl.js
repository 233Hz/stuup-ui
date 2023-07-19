class AnimationEl {
  constructor(game, x, y, width, height, maxFrameX, maxFrameY, fps, imageId) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrameX = maxFrameX;
    this.maxFrameY = maxFrameY;
    this.fps = fps;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.image = document.getElementById(imageId);
    this.spiritWidth = this.image.width / (this.maxFrameX + 1);
    this.spiritHeight = this.image.height / (this.maxFrameY + 1);
  }

  update(deltaTimer) {
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX >= this.maxFrameX) this.frameX = 0;
      else this.frameX++;
      if (this.frameY >= this.maxFrameY) this.frameY = 0;
      else this.frameY++;
    } else {
      this.frameTimer += deltaTimer;
    }
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.spiritWidth * this.frameX,
      this.spiritHeight * this.frameY,
      this.spiritWidth,
      this.spiritHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

export class BmhBloom extends AnimationEl {
  constructor(game) {
    super(game, 0, 300, 400, 400, 0, 0, 10, 'animate1');
    this.game = game;
    this.speed = 0.1;
    this.degree = 0;
    this.maxDegree = 0;
    this.minDegree = -15;
  }

  update(deltaTimer) {
    this.degree += this.speed;
    if (this.degree < this.minDegree || this.degree > this.maxDegree) {
      this.speed = -this.speed;
    }
    super.update(deltaTimer);
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

export class Chicken extends AnimationEl {
  constructor(game) {
    super(game, 1620, 460, 100, 100, 15, 0, 8, 'animate2');
  }
}

export class Butterfly extends AnimationEl {
  constructor(game) {
    super(game, 800, 300, 100, 100, 7, 0, 20, 'animate3');
  }
}

export class Bird1 extends AnimationEl {
  constructor(game) {
    super(game, 0, 100, 100, 100, 0, 7, 16, 'animate4');
    this.speed = 5;
  }

  update(deltaTimer) {
    this.x += this.speed;
    if (this.x > this.game.width * 1.2) this.x = -this.width;
    super.update(deltaTimer);
  }
}

export class Bird2 extends AnimationEl {
  constructor(game) {
    super(game, 200, 700, 100, 100, 11, 0, 5, 'animate5');
  }
}

export class Squirrel extends AnimationEl {
  constructor(game) {
    super(game, 800, 700, 100, 100, 7, 0, 3, 'animate6');
  }
}
