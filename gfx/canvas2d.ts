type WH = { w: num; h: num }

class Canvas2D {
  cvs: HTMLCanvasElement
  c: CanvasRenderingContext2D
  hasMarker = true

  constructor(cvs: HTMLCanvasElement) {
    this.cvs = cvs
    this.c = cvs.getContext('2d') as CanvasRenderingContext2D // x null
  }

  off = false

  clear(wh?: WH) {
    this.hasMarker = true
    let cvs = this.cvs

    if (!wh) wh = { w: cvs.width, h: cvs.height }

    // these assignments resets everything (transform etc.)
    let w = (cvs.width = wh.w)
    let h = (cvs.height = wh.h)

    this.off = false
    this.c.lineCap = 'round'

    this.tr(w / 2, h / 2)
      .sc(1, -1)
      .push()
      .stroke('#ccc')
      .line(0, -h / 2, 0, h / 2)
      .line(-w / 2, 0, w / 2, 0)
      .stroke('#000')

    return this
  }

  stroke(style: str) {
    this.c.strokeStyle = style
    return this
  }

  fill(style: str) {
    this.c.fillStyle = style
    return this
  }

  width(width: num) {
    this.c.lineWidth = Math.max(1, width)
    return this
  }

  rect(x: num, y: num, w: num, h: num) {
    this.c.strokeRect(x, y, w, h)
    return this
  }

  fillRect(x: num, y: num, w: num, h: num) {
    this.c.fillRect(x, y, w, h)
    return this
  }

  clearRect(x: num, y: num, w: num, h: num) {
    this.c.clearRect(x, y, w, h)
    return this
  }

  move(x: num, y: num) {
    this.c.moveTo(x, y)
    return this
  }

  to(x: num, y: num) {
    this.c.lineTo(x, y)
    return this
  }

  beg() {
    this.c.beginPath()
    return this
  }

  end(fill = false) {
    fill ? this.c.fill() : this.c.stroke()
    return this
  }

  line(x1: num, y1: num, x2: num, y2: num) {
    this.beg().move(x1, y1).to(x2, y2).end()
    return this
  }

  path(p: [x: num, y: num][], fill = false) {
    this.beg()
    let t = this
    arr.each(p, ([x, y], i) => (i ? t.to(x, y) : t.move(x, y)))
    this.end(fill)
    return this
  }

  fillPath(p: [x: num, y: num][]) {
    return this.path(p, true)
  }

  push() {
    this.c.save()
    return this
  }

  pop() {
    this.c.restore()
    return this
  }

  tr(x: num, y: num) {
    this.c.translate(x, y)
    return this
  }

  sc(x: num, y: num) {
    this.c.scale(x, y)
    return this
  }

  rot(deg: num) {
    this.c.rotate((deg * Math.PI) / 180)
    return this
  }

  marker() {
    if (this.hasMarker) {
      let sz = 8,
        sz2 = sz / 1.2
      this.push()
        .fill('#00f')
        .fillPath([
          [0, 0],
          [-sz, -sz2],
          [0, sz],
          [sz, -sz2],
          [0, 0],
        ])
        .pop()
    }
    return this
  }
}

export default Canvas2D
