<script setup lang="ts">
import { onMounted } from 'vue'

class Star {
  ctx: CanvasRenderingContext2D
  image: HTMLCanvasElement
  orbitRadius: number
  radius: number
  orbitX: number
  orbitY: number
  timePassed: number
  speed: number
  alpha: number
  constructor(
    ctx: CanvasRenderingContext2D,
    image: HTMLCanvasElement,
    w: number,
    h: number,
    maxStars: number,
  ) {
    this.ctx = ctx
    this.image = image
    this.orbitRadius = this.random(this.maxOrbit(w, h))
    this.radius = this.random(60, this.orbitRadius) / 12
    this.orbitX = w / 2
    this.orbitY = h / 2
    this.timePassed = this.random(0, maxStars)
    this.speed = this.random(this.orbitRadius) / 900000
    this.alpha = this.random(2, 10) / 10
  }
  draw() {
    const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
      y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
      twinkle = this.random(10)

    if (twinkle === 1 && this.alpha > 0) {
      this.alpha -= 0.05
    } else if (twinkle === 2 && this.alpha < 1) {
      this.alpha += 0.05
    }

    this.ctx.globalAlpha = this.alpha

    this.ctx.drawImage(
      this.image,
      x - this.radius / 2,
      y - this.radius / 2,
      this.radius,
      this.radius,
    )
    this.timePassed += this.speed
  }

  private random(min: number, max?: number) {
    if (!max) {
      max = min
      min = 0
    }

    if (min > max) {
      const hold = max
      max = min
      min = hold
    }

    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  private maxOrbit(x: number, y: number) {
    const max = Math.max(x, y),
      diameter = Math.round(Math.sqrt(max * max + max * max))
    return diameter / 2
  }
}

const hue = 217,
  maxStars = 1200

const animation = (
  ctx: CanvasRenderingContext2D,
  stars: Star[],
  w: number,
  h: number,
) => {
  ctx.globalCompositeOperation = 'source-over'
  ctx.globalAlpha = 0.8
  ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)'
  ctx.fillRect(0, 0, w, h)

  ctx.globalCompositeOperation = 'lighter'
  for (var i = 1, l = stars.length; i < l; i++) {
    stars[i].draw()
  }

  window.requestAnimationFrame(() => {
    animation(ctx, stars, w, h)
  })
}

const drawCanvas = () => {
  let canvas = document.getElementById('canvas') as HTMLCanvasElement,
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D,
    w = (canvas.width = window.innerWidth),
    h = (canvas.height = window.innerHeight),
    canvas2 = document.createElement('canvas') as HTMLCanvasElement,
    ctx2 = canvas2.getContext('2d') as CanvasRenderingContext2D
  canvas2.width = 100
  canvas2.height = 100
  const half = canvas2.width / 2,
    gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half)
  gradient2.addColorStop(0.025, '#fff')
  gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)')
  gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)')
  gradient2.addColorStop(1, 'transparent')

  ctx2.fillStyle = gradient2
  ctx2.beginPath()
  ctx2.arc(half, half, half, 0, Math.PI * 2)
  ctx2.fill()

  let stars: Star[] = []
  for (var i = 0; i < maxStars; i++) {
    stars.push(new Star(ctx, canvas2, w, h, maxStars))
  }

  animation(ctx, stars, w, h)
}

onMounted(() => {
  drawCanvas()
})
</script>

<template>
  <canvas id="canvas" style="width: 100%; height: 100%" />
</template>

<style scoped lang="scss"></style>
