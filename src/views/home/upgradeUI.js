class UpgardeBackgroundBorder {
  constructor(ui) {
    this.ui = ui;
    this.width = 1891 / 2;
    this.height = 1514 / 2;
    this.x = this.ui.game.width / 2 - this.width / 2;
    this.y = this.ui.game.height / 2 - this.height / 2;
    this.image = document.getElementById('upgarde-background-border');
  }

  update() {}

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class UpgardeBackground {
  constructor(ui) {
    this.ui = ui;
    this.width = 1494 / 2;
    this.height = 1122 / 2;
    this.x = this.ui.game.width / 2 - this.width / 2;
    this.y = this.ui.game.height / 2 - this.height / 2 + 30;
    this.image = document.getElementById('upgarde-background');
  }

  update() {}

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class UpgardeBoard {
  constructor(ui) {
    this.ui = ui;
    this.width = 388 / 2;
    this.height = 330 / 2;
    this.x = this.ui.backgroundBorder.x;
    this.y = this.ui.backgroundBorder.y + 100;
    this.image = document.getElementById('upgarde-board');
  }

  update() {}

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class UpgardeBarrel {
  constructor(ui) {
    this.ui = ui;
    this.width = 189 / 2;
    this.height = 316 / 2;
    this.x = this.ui.background.x + this.ui.background.width - this.width;
    this.y = this.ui.background.y + this.ui.background.height - this.height;
    this.image = document.getElementById('upgarde-barrel');
  }

  update() {}

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class UpgardeSpoon {
  constructor(ui) {
    this.ui = ui;
    this.width = 2223 / 30;
    this.height = 1258 / 30;
    this.x = this.ui.background.x + this.ui.background.width - this.ui.barrel.width / 1.5;
    this.y = this.ui.background.y + this.ui.background.height - this.ui.barrel.height + 30;
    this.image = document.getElementById('upgarde-spoon');
    this.speed = 2;

    this.wateringImage = document.getElementById('upgarde-flowing-water-anim');
    this.isWatering = false; // 是否正在播放浇水动画
    this.wateringMaxFrame = 15; // 动画的
    this.wateringFrameX = 0; // 动画帧索引
    this.wateringWidth = 28800 / this.wateringMaxFrame / 10;
    this.wateringHeight = 1200 / 10;
    this.animationTimer = null; // 定时器
  }

  update(deltaTimer) {
    if (this.isWatering) {
      const centerX = this.ui.game.width / 2;
      const centerY = this.ui.game.height / 2;
      if (this.x > centerX) this.x -= this.speed;
      if (this.y > centerY) this.y -= this.speed;
      if (this.x < centerX && this.y < centerY) {
        // 在这里更新序列帧的切换，可以根据 deltaTimer 来控制帧的播放速度
      }
    }
  }

  draw(context) {
    if (this.isWatering) {
      // 绘制浇水动画
    } else {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }

  wateringAnimation() {
    const centerX = this.ui.game.width / 2;
    const centerY = this.ui.game.height / 2;
  }
}

export class UpgradeUI {
  constructor(game) {
    this.game = game;
    this.backgroundBorder = new UpgardeBackgroundBorder(this);
    this.background = new UpgardeBackground(this);
    this.board = new UpgardeBoard(this);
    this.barrel = new UpgardeBarrel(this);
    this.spoon = new UpgardeSpoon(this);
    this.uiEls = [];
    this.show();
  }

  update(deltaTimer) {
    this.uiEls.forEach(el => el.update(deltaTimer));
  }

  draw(context) {
    this.uiEls.forEach(el => el.draw(context));
  }

  show() {
    this.uiEls = [this.backgroundBorder, this.background, this.board, this.barrel, this.spoon];
  }

  close() {
    this.uiEls = [];
  }
}
