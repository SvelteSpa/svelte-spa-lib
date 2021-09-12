import app from '@spa/main'
import run from '@spa/run'

export type ThenFun = (res: any) => void
export type FailFun = (code: num, tx: str) => void
export type AfterFun = () => void
export type FinallyFun = () => void
export type BusyFun = (on: bool) => void

let isBusy = false // request in progress
let busyReportTimeout: any = 0
let busyReported = false

function parseJSON(tx: str): any | null {
  try {
    return JSON.parse(tx)
  } catch (err) {
    return null
  }
}

function xhrRequest(x: Xhr) {
  let xhr = new XMLHttpRequest()

  let onThen = (res: any, json: str) => {
    if (x._thenFun) {
      run.TR(2, () => `then: ${json}`)
      x._thenFun(res)
    }
  }

  let onAfter = () => {
    if (x._afterFun) {
      x._afterFun()
    }
  }

  let onFail = (code: num, tx: str) => {
    if (x._failFun) {
      run.TR(1, () => `fail: ${code} - ${tx}`)
      x._failFun(code, tx)
    }
  }

  let onFinally = () => {
    if (x._finallyFun) {
      x._finallyFun()
    }
  }

  xhr.onreadystatechange = () => {
    switch (xhr.readyState) {
      case XMLHttpRequest.DONE: {
        let unlocked = false
        try {
          if (200 === xhr.status) {
            let json = xhr.responseText
            let obj = parseJSON(json)
            if (null === obj) {
              onFail(500, 'bad reply: "' + json + '"')
            } else {
              onThen(obj.res, json)
              x._unlock()
              unlocked = true
              onAfter()
            }
          } else {
            onFail(xhr.status, xhr.responseText)
          }
        } finally {
          unlocked || x._unlock()
          onFinally()
        }
      }
    }
  }

  return xhr
}

let _ms = 777

export class Xhr {
  _url: str
  _thenFun: ThenFun | null = null
  _failFun: FailFun | null = null
  _afterFun: AfterFun | null = null
  _finallyFun: FinallyFun | null = null

  _doLock = true
  _busyFun: BusyFun = app.setBusy

  constructor(url: str) {
    this._url = url
  }

  _lock(): bool {
    if (!this._doLock) return true
    if (isBusy) return false
    isBusy = true

    clearTimeout(busyReportTimeout)
    busyReportTimeout = (() => {
      this._busyFun((busyReported = true))
    }).delay(_ms)

    return true
  }

  _unlock() {
    if (!this._doLock) return
    if (!run.sysChk(isBusy, () => 'xhr not busy')) return

    clearTimeout(busyReportTimeout)
    busyReportTimeout = // how fast to un-report
    (() => {
      this._busyFun((busyReported = false))
    }).delay(busyReported ? _ms : 0)

    isBusy = false
  }

  // on success, still locked
  then(fun: ThenFun): Xhr {
    this._thenFun = fun
    return this
  }

  // on failure, still locked
  fail(fun: FailFun): Xhr {
    this._failFun = fun
    return this
  }

  // on success, after unlocked
  after(fun: AfterFun): Xhr {
    this._afterFun = fun
    return this
  }

  // always, after unlocked
  finally(fun: FinallyFun): Xhr {
    this._finallyFun = fun
    return this
  }

  // w/o locking
  lock(on: bool): Xhr {
    this._doLock = on
    return this
  }

  // go
  get(): bool {
    if (!this._lock()) return false
    let xhr = xhrRequest(this)

    xhr.open('GET', this._url)
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.send()

    return true
  }

  post(obj: {}): bool {
    if (!this._lock()) return false
    let xhr = xhrRequest(this)

    xhr.open('POST', this._url)
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
    xhr.setRequestHeader('Accept', 'application/json')

    let json = JSON.stringify(obj)
    run.TR(1, () => `post: ${json}`)
    xhr.send(json)
    return true
  }
}

let xhr = (url: str): Xhr => new Xhr(url)

export default xhr
