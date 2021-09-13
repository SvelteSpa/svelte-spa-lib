export default class Stack<Type = any> extends Array<Type> {
  top(): Type {
    return this[this.sz - 1]
  }
}
