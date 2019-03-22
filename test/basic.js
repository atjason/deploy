
async function test(ctx) {
  let result = 'ok'

  ctx.body = result
  return
}

module.exports = {
  test
}