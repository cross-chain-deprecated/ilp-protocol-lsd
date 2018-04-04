# ilp-protocol-lsd
Loopback Server Discovery

For a demo of how Alice can create a loopback connection to Bob, run:
```sh
git clone https://github.com/interledgerjs/ilp-protocol-lt
cd ilp-protocol-lt
npm install
npm run test
node scripts/rouletteReceiver.js

# in a second window:
cd ilp-protocol-lt
node scripts/rouletteConnector.js

# in a third window:
cd ilp-protocol-lt
node scripts/rouletteSender.js
```
