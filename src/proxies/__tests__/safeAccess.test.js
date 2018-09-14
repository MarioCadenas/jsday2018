import { createSafe, either } from '../safeAccess'

describe('safeAccessProxy', () => {
  test('debería lanzar una excepción cuando se acceden a propiedades no existentes de un objeto', () => {
    const obj = {
      foo: 'bar',
      baz: {
        qux: 'quux'
      }
    }

    expect(() => {
      obj.qux.quux
    }).toThrowError()
  })

  test('debería poder acceder a propiedades existentes de un objeto', () => {
    const safeObj = createSafe({
      foo: 'bar',
      baz: {
        qux: 'quux'
      }
    })

    expect(safeObj.foo).toEqual('bar')
  })

  test('no debería lanzar una excepción cuando se acceden a propiedades no existentes de un objeto', () => {
    const safeObj = createSafe({
      foo: 'bar',
      baz: {
        qux: 'quux'
      }
    })

    expect(() => {
      safeObj.qux.quux
    }).not.toThrowError()
  })

  test('no debería lanzar una excepción cuando se acceden a propiedades anidadas no existentes de un objeto', () => {
    const safeObj = createSafe({
      foo: 'bar',
      baz: {
        qux: 'quux'
      }
    })

    expect(() => {
      safeObj.baz.quux.quuux
    }).not.toThrowError()
  })

  test('puede tener valores por defecto', () => {
    const safeObj = createSafe({
      foo: 'bar',
      baz: {
        qux: 'quux'
      }
    })

    expect(either(safeObj.qux.quux, 'foo')).toBe('foo')
  })
})