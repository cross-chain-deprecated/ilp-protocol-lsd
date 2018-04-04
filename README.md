# ilp-protocol-lsd
Loopback Server Discovery

Example of an `application/lsd+json` document:
```js
{
  "protocol": "BTP/2.0",
  "loopback": "btp+ws://:2614c1e9c0059641c49179de59d8e213@localhost:8913/"
}
```

For a demo of how Alice can create a loopback connection to Bob, run:
```sh
git clone https://github.com/interledgerjs/ilp-protocol-lt
cd ilp-protocol-lt
npm install
npm run test
node scripts/rouletteReceiver.js

# in a second window:
curl -v http://localhost:8914/
cd ilp-protocol-lt
node scripts/rouletteConnector.js

# in a third window:
cd ilp-protocol-lt
node scripts/rouletteSender.js
```
