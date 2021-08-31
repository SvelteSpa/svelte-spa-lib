let consName = (x: any) => (null == x ? '' : x.constructor.name)

let isDef = (x: any) => 'undefined' != typeof x
let isUdf = (x: any) => !isDef(x)

let $ = {
  // constructor name
  consName,

  isDef, // defined
  isUdf, // undefined

  isFin: (x: any) => Number.isFinite(x),
  isNan: (x: any) => Number.isNaN(x),
  isInt: (x: any) => Number.isInteger(x),

  isArr: (x: any) => 'Array' === consName(x),
  isBol: (x: any) => 'Boolean' === consName(x),
  isObj: (x: any) => 'Object' === consName(x),
  isNum: (x: any) => 'Number' === consName(x),
  isStr: (x: any) => 'String' === consName(x),

  clone: (x: any) => JSON.parse(JSON.stringify(x)),
}

export default $
