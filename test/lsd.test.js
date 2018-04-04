'use strict'

const IlpPacket = require('ilp-packet')
const chai = require('chai')
const assert = chai.assert
const LSD = require('..')
const MockPlugin = require('./mocks/mockPlugin')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

describe('LSD', function () {
  beforeEach(function () {
  })

  afterEach(function () {
  })

  describe('getPluginFromUrl', function () {
    beforeEach(async function () {
      this.plugin = await LSD.getPluginFromUrl('http://example.com/')
    })

    it('should return a connected plugin', async function () {
      assert.isObject(this.plugin)
      assert.isTrue(this.plugin.isConnected())
    })
    describe('generateLsdDocument', function () {
      beforeEach(function () {
        this.document = LSD.generateLsdDocument('btp+ws://:some_token@example.com:1234/asdf')
      })
      afterEach(function () {
      })
      it('should generate an LSD document', function () {
        assert.equal(this.document, JSON.stringify({
          protocol: 'BTP/2.0',
          loopback: 'btp+ws://:some_token@example.com:1234/asdf'
        }, null, 2))
      })
      it('should complete a rejected loopback payment', async function () {
        const result = await this.loop.pay({
          sourceAmount: '20',
          expiresAt: new Date(new Date().getTime() + 10000),
          loopbackHandler: (destinationAmount) => {
            assert.equal(destinationAmount, 25)
            return false
          }
        })
        assert.equal(result, false)
      })
    })
  })
})
