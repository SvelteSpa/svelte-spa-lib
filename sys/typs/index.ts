import './arr'
import './fun'
import './num'
import './str'

declare global {
  // short-word types
  type num = number
  type int = num & { __int__: void }
  type str = string
  type chr = string
  type bool = boolean

  // simple funs
  type FnVoid = () => void
  type FnVoidUnd = FnVoid | undefined
}
