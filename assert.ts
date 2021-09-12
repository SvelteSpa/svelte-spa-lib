export type Assertable = bool | str | num

export default function assert(
  val: Assertable,
  msgFun = () => 'Assert failed.'
) {
  if (!val) throw Error(msgFun())
  return val
}
