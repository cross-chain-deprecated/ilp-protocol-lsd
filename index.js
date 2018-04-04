const fetch = require('node-fetch')

async function getPluginFromUrl(lsdUrl, PluginBtp) {
  const request = await fetch(lsdUrl)
  const obj = await request.json()
  if (obj.protocol !== 'BTP/2.0') {
    throw new Error('Only BTP/2.0 is supported as a protocol')
  }
  const plugin = new PluginBtp({ server: obj.loopback })
  await plugin.connect()
  return plugin
}

function generateLsdDocument(btpUrl) {
  return JSON.stringify({
    protocol: 'BTP/2.0',
    loopback: btpUrl
  }, null, 2)
}

module.exports = {
  getPluginFromUrl,
  generateLsdDocument
}
