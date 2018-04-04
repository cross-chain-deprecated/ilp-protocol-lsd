'use strict'

const IlpPacket = require('ilp-packet')
const chai = require('chai')
const assert = chai.assert
const LSD = require('..')
const MockPlugin = require('./mocks/mockPlugin')
const mock = require('mock-require')
const nock = require('nock')
const chaiAsPromised = require('chai-as-promised')
mock('ilp-plugin-btp', MockPlugin)
chai.use(chaiAsPromised)

describe('LSD', function () {
  beforeEach(function () {
  })

  afterEach(function () {
  })

  describe('getPluginFromUrl', function () {
    beforeEach(async function () {
      nock('http://example.com').get('/').reply(200, {
        protocol: 'BTP/2.0',
        loopback: 'btp+ws://:disco@btp.example.com:5678/qwer'
      })
      this.plugin = await LSD.getPluginFromUrl('http://example.com/', MockPlugin)
    })

    it('should return a connected plugin', async function () {
      assert.isObject(this.plugin)
      assert.isTrue(this.plugin.isConnected())
      assert.deepEqual(this.plugin.opts, { server: 'btp+ws://:disco@btp.example.com:5678/qwer' })
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
    })
  })
})
