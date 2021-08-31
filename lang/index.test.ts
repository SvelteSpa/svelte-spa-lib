import lang, { l, ls, t as lt, ts as lts } from '.'
import test from 'ava'
import { get } from 'svelte/store'

test('lang', (t) => {
  t.deepEqual([], lang.availLangs())
  t.is('', lang.curLang())

  lang.setAvailLangs(['en', 'de'])
  t.deepEqual(['en', 'de'], lang.availLangs())
  t.is('en', lang.curLang())

  lang.addDict({ a: 'a', b: ['be', 'de'] })

  t.is('te', get(lts)(['te', 'td']))
  t.is('a', (get(lt) as any).a)
  t.is('be', (get(lt) as any).b)
  t.is('te', ls(['te', 'td']))
  t.is('a', l.a)
  t.is('be', l.b)

  lang.setCurLang('de')
  t.deepEqual(['en', 'de'], lang.availLangs())
  t.is('de', lang.curLang())
  t.is('td', get(lts)(['te', 'td']))
  t.is('a', (get(lt) as any).a)
  t.is('de', (get(lt) as any).b)
  t.is('td', ls(['te', 'td']))
  t.is('a', l.a)
  t.is('de', l.b)

  lang.setCurLang('d')
  t.deepEqual(['en', 'de'], lang.availLangs())
  t.is('en', lang.curLang())
  t.is('te', get(lts)(['te', 'td']))
  t.is('a', (get(lt) as any).a)
  t.is('be', (get(lt) as any).b)
  t.is('te', ls(['te', 'td']))
  t.is('a', l.a)
  t.is('be', l.b)
})
