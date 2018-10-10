function capitalize(string) {
  return string.toUpperCase().slice(0, 1) + string.slice(1)
}

export function createLogger(target, logger = console) {
  const message = `${new Date().toISOString()} [${capitalize(typeof target)}]`

  const handler = {
    get(target, prop) {
      logger.log(`${message} (Prop: ${prop}) {Result: ${target[prop]}}`)
      return Reflect.get(...arguments)
    },
    apply(target, thisArgument, listOfArguments) {
      const result = target(...listOfArguments)
      handleResult(result, target.name, logger)
      logger.log(`${message} ${target.name} (Args: ${listOfArguments}) {Result: ${result}}`)
      return result
    }
  }

  return new Proxy(target, handler)
}

async function handleResult(result, name, logger = console) {
  const isResultAPromise = Promise.resolve(result) == result
  if (isResultAPromise) {
    const label = `Execution of ${name} in`
    logger.time(label)
    await result
    logger.timeEnd(label)
  }
}