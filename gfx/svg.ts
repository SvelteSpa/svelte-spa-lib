import ra from '@spa/geom/ra'
import xy from '@spa/geom/xy'

const NS = 'http://www.w3.org/2000/svg'

function appendChild(el: any, name: str): Node {
  let child = document.createElementNS(NS, name)
  el.appendChild(child)
  ;(child as any).__proto__ = Node.prototype
  return child as Node
}

class Node extends SVGElement {
  // init
  static topG(el: SVGSVGElement): Node {
    return appendChild(el, 'g')
  }

  // children
  child(name: str): Node {
    return appendChild(this, name)
  }

  g(): Node {
    return this.child('g')
  }

  // attributes
  attr(tag: str, val: any) {
    this.setAttribute(tag, val)
    return this
  }

  attrs(as: {}) {
    as.each((v, k) => this.attr(k, v))
    return this
  }

  fill(val: any) {
    return this.attr('fill', val)
  }

  stroke(val: any, width: any = null) {
    this.attr('stroke', val)
    if (null !== width) this.attr('stroke-width', width)
    return this
  }

  linecap(val: any) {
    return this.attr('stroke-linecap', val)
  }

  // shapes
  path(d: any) {
    return this.child('path').attrs({
      d,
    })
  }

  circle(x: any, y: any, r: any) {
    return this.child('circle').attrs({
      x,
      y,
      r,
    })
  }

  arc(x: any, y: any, r: any, start: any, end: any) {
    let ctr = xy(x, y)
    let p1 = ra(r, start).toXY().add(ctr)
    let p2 = ra(r, end).toXY().add(ctr)
    return this.path(
      `M ${p1.x()} ${p1.y()} A ${r} ${r} 0 0 1 ${p2.x()} ${p2.y()}`
    )
  }

  line(x1: any, y1: any, x2: any, y2: any) {
    return this.child('line').attrs({
      x1,
      y1,
      x2,
      y2,
    })
  }

  // wheel() {
  //   this.spin()
  //   let numSegs = 7
  //   _.range(numSegs).forEach((_) => {
  //     let a = 360 / numSegs
  //     this.arc(0, 0, 29, _ * a, (_ + 0.4) * a)
  //       .fill('none')
  //       .stroke('red', '6')
  //       .linecap('round')
  //   })
  //   return this
  // }

  // others
  // spin() {
  //   this.animate([{ transform: 'rotate(360deg)' }], {
  //     duration: 3600,
  //     iterations: Infinity,
  //   })
  // }
}

export default Node
