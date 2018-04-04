const PluginMiniAccounts = require('ilp-plugin-mini-accounts')
const IlpPacket = require('ilp-packet')
const IlDcp = require('ilp-protocol-ildcp')
const LSD = require('..')
const http = require('http')
const crypto = require('crypto')
const BTP_PORT = 8913
const LSD_PORT = 8914

async function run (btpPort, lsdPort) {
  const plugin = new PluginMiniAccounts({
    wsOpts: {
      port: btpPort
    }
  })
  plugin.registerDataHandler(packet => {
    const obj = IlpPacket.deserializeIlpPrepare(packet)
    console.log(obj)
    if (obj.destination === 'peer.config') {
      return IlDcp.serializeIldcpResponse({
        clientAddress: 'receiver',
        assetCode: 'USD',
        assetScale: 6
      })
    }
    return plugin.sendData(IlpPacket.serializeIlpPrepare(obj))
  })
  await plugin.connect()
  console.log(`Listening for ILPv4 over BTP/2.0 on port ${btpPort}`)
  const lsdServer = http.createServer((req, res) => {
    const token = crypto.randomBytes(16).toString('hex')
    res.writeHead(200, { 'content-type': 'application/json+lsd' })
    const lsdDoc = LSD.generateLsdDocument(`btp+ws://:${token}@localhost:${BTP_PORT}/`)
    res.end(lsdDoc)
    console.log('Generated LSD document', lsdDoc)
  })
  lsdServer.listen(LSD_PORT)
  console.log(`Listening for LSD on port ${lsdPort}`)
}

run(BTP_PORT, LSD_PORT)
