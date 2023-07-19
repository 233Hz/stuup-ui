class HoverHint {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = '';
    this.padding = 20;
    this.maxWidth = 400;
    this.lineHeight = 25;
    this.color = 'white';
    this.fontSize = '24px';
    this.fontFamily = 'Arial';
    this.lineY = this.y;
    this.lineHeight = 25;
  }

  draw(context, mouseCoord) {
    context.strokeRect(this.x, this.y, this.width, this.height);
    if (this.mouseIsInRect(mouseCoord)) {
      let line = '';
      let words = this.text.split('');
      context.fillStyle = this.color;
      context.font = this.fontSize + ' ' + this.fontFamily;
      words.forEach((word, index) => {
        const testLine = this.text + word;
        const metrics = context.measureText(testLine);
        const textWidth = metrics.width;

        if (textWidth > this.maxWidth && index > 0) {
          context.fillText(testLine, this.x, this.lineY);
          line = word;
          this.lineY += this.lineHeight;
        } else {
          line = testLine;
        }
      });
      context.fillText(line, mouseCoord.x, mouseCoord.y);
    }
  }

  mouseIsInRect(mouseCoord) {
    return (
      mouseCoord.x > this.x &&
      mouseCoord.x < this.x + this.width &&
      mouseCoord.y > this.y &&
      mouseCoord.y < this.y + this.height
    );
  }
}

export class BmhBloomHover extends HoverHint {
  constructor() {
    super(0, 300, 300, 400);
    this.text = '测试测试测测试测试测测试测试测测试测试测测试测试测测试测试测测试测试测测试测试测测试测试测';
  }
}
