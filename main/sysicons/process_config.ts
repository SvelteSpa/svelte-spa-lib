// convert fontello_config.json to js
let c = require('./sysicons_config.json')
let g = c.glyphs

let l = console.log

l('let codes = {')
g.forEach((_) => l(`'${_.css}': ${_.code},`))

l('}')

l('')

l('export default codes')
