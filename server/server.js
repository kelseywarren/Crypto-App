const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const port = 5500;
const apiKey = "b389ed0c-d634-4243-841d-f38788db5e9c";

app.use(cors());

let symbols = [
    'BTC',      'ETH',     'USDT',     'BNB',      'SOL',     'USDC',
    'XRP',      'DOGE',    'ADA',      'TON',      'SHIB',    'AVAX',
    'LINK',     'DOT',     'TRX',      'BCH',      'NEAR',    'MATIC',
    'PEPE',     'LTC',     'UNI',      'ICP',      'LEO',     'DAI',
    'ETC',      'APT',     'RNDR',     'HBAR',     'WIF',     'IMX',
    'KAS',      'ATOM',    'FIL',      'ARB',      'MNT',     'XLM',
    'CRO',      'FDUSD',   'OKB',      'GRT',      'AR',      'XMR',
    'STX',      'TAO',     'OP',       'SUI',      'MKR',     'VET',
    'FLOKI',    'INJ',     'BONK',     'FTM',      'NOT',     'THETA',
    'LDO',      'TIA',     'RUNE',     'BGB',      'ONDO',    'FET',
    'JASMY',    'CORE',    'PYTH',     'AAVE',     'ALGO',    'JUP',
    'SEI',      'GALA',    'BEAM',     'STRK',     'ENA',     'FLOW',
    'CHZ',      'BSV',     'W',        'AXS',      'AGIX',    'DYDX',
    'BTT',      'AKT',     'FLR',      'QNT',      'WLD',     'NEO',
    'EGLD',     'SAND',    'RON',      'KCS',      'ORDI',    'SNX',
    'BOME',     'MINA',    'XTZ',      'EOS',      'PENDLE',  'XEC',
    'GNO',      'SAFE',    'CFX',      'AEVO',     'MANA',    'ENS',
    'KLAY',     'AIOZ',    'NEXO',     'APE',      'DOG',     'GT',
    'DEXE',     'USDD',    'OM',       'KAVA',     'LPT',     'IOTA',
    'AXL',      'CAKE',    'CKB',      'LUNC',     'BLUR',    'ROSE',
    '1000SATS', 'HNT',     'TFUEL',    'WOO',      'MANTA',   'BTG',
    'PRIME',    'IOTX',    'MEME',     'XAUt',     'PEOPLE',  'CRV',
    '1INCH',    'OSMO',    'RBN',      'XDC',      'ETHFI',   'FTT',
    'ARKM',     'TWT',     'OCEAN',    'LUNA',     'ETHDYDX', 'TUSD',
    'ASTR',     'GLM',     'COMP',     'GMT',      'WEMIX',   'DYM',
    'SUPER',    'NFT',     'ENJ',      'RAY',      'CELO',    'ZRX',
    'SKL',      'SSV',     'METIS',    'ZEC',      'ZIL',     'HOT',
    'ANKR',     'PAXG',    'JTO',      'GAL',      'MX',      'RSR',
    'RPL',      'ANT',     'MEW',      'BICO',     'XRD',     'PIXEL',
    'ALT',      'ID',      'PYUSD',    'YGG',      'RVN',     'SC',
    'HIGH',     'ABT',     'SFP',      'FXS',      'ETHW',    'BNX',
    'ELF',      'ZETA',    'QTUM',     'LRC',      'BAT',     'ILV',
    'TRAC',     'DASH',    'POLYX',    'GMX',      'CSPR',    'CFG',
    'T',        'MASK',    'stETH',    'WSTETH',   'WETH',    'WBTC',
    'WTRX',     'EETH',    'weETH',    'EZETH',    'BTCB',    'WHBAR',
    'WBETH',    'USDe',    'RETH',     'METH',     'JITOSOL', 'ZBU',
    'BRETT',    'vBNB',    'sUSDe',    'RSETH',    'CHEEL',   'WBNB',
    'MSOL',     'TRUMP',   'SWETH',    'cbETH',    'FTN',     'FRAX',
    'SFRXETH',  'MOG',     'AERO',     'RSWETH',   'ETHX',    'TURBO',
    'USDB',     'ORBR',    'WPLS',     'INF',      'IPV',     'POPCAT',
    'BSOL',     'BETH',    'LSETH',    'XEM',      'FLUX',    'XCH',
    'DCR',      'GAS',     'DEGEN',    'NMT',      'ONE',     'JST',
    'SUSHI',    'VANRY',   'AMP',      'PAAL',     'TEL',     'SAGA',
    'vBTC',     'BB',      'RSS3',     'TRIBE',    'sAVAX',   'TRB',
    'WAVES',    'UMA',     'BabyDoge', 'CVX',      'GLMR',    'CHR',
    'API3',     'KSM',     'ONT',      'EDU',      'MYRO',    'ANDY',
    'RLC',      'HEX',     'BAND',     'TBTC',     'AUDIO',   'VTHO',
    'FNSA',     'XAI',     'ACH',      'YFI',      'AGI',     'OMNI',
    'CTC',      'BAL',     'MAGIC',    'MERL',     '0x0',     'KDA',
    'WAXP',     'ICX',     'POKT',     'ZENT',     'BORG',    'BIGTIME',
    'TRU',      'NTRN',    'AZERO',    'BDX',      'SXP',     'C98',
    'PRO',      'LCX',     'STORJ',    'PORTAL',   'SOL',     'RLB',
    'COTI',     'LSK',     'POND',     'AI',       'REZ',     'PROM',
    'CYBER',    'CELR',    'DESO',     'WAVAX',    'COQ',     'DGB',
    'VENOM',    'CTSI',    'NMR',      'MWC',      'DUSK',    'IOST',
    'APU',      'BTRST',   'slisBNB',  'USDY',     'PONKE',   'ATOR',
    'FLEX',     'TNSR',    'JOE',      'H2O',      'IQ',      'BITCOIN',
    'MAGA',     'USDJ',    'XNO',      'ORAI',     'VVS',     'KEEP',
    'ONG',      'TOSHI',   'USTC',     'SLP',      'RIF',     'LADYS',
    'KUJI',     'XVS',     'SDEX',     'WILD',     'POWR',    'MANEKI',
    'CVC',      'TOKEN',   'HIVE',     'SYS',      'BONE',    'AUCTION',
    'BORA',     'LMWR',    'WMT',      'MOBILE',   'ARK',     'SLERF',
    'MNTC',     'CQT',     'USDP',     'STRAX',    'PUNDIX',  'STG',
    'WEN',      'HOOK',    'MRS',      'OAS',      'METFI',   'MVL',
    'ZEN',      'CRVUSD',  'SURE',     'REQ',      'SYN',     'SNT',
    'NFP',      'CREAM',   'APEX',     'DENT',     'ZIG',     'PHA',
    'EURS',     'stMATIC', 'PHB',      'SFUND',    'MOVR',    'ACE',
    'VELO',     'XYM',     'osETH',    'NAKA',     '$MICHI',  'PUPS',
    'STRD',     'ankrETH', 'NYM',      'DAG',      'PYR',     'STEEM',
    'ORCA',     'FRONT',   'WMATIC',   'Gomining', 'POL',     'SUN',
    'HFT',      'KNC',     'DODO',     'CPOOL',    'ALPH',    'DKA',
    'RDNT',     'NOIA',    'LON',      'HONEY',    'WIN',     'SPELL',
    'LEVER',    'MYRIA',   'ELON',     'ZCX',      'vUSDC',   'AGLD',
    'BZR',      'MTL',     'MAVIA',    'LUSD',     'MLK',     'CTK',
    'ALPHA',    'BMX',     'MAV',      'BLZ',      'LQTY',    'MBX',
    'DAO',      'PCI',     'WZRD',     'ARPA',     'OXT',     'BNT',
    'SCRT',     'ALICE',   'GOG',      'WCRO',     'GTC',     'MBOX',
    'GNS',      'MED',     'HIFI',     'DIONE',    'FORT',    'AITECH',
    'XYO',      'ORBS',    'GROK',     'GPU',      'HASHAI',  'GFI',
    'STPT',     'LOOM',    'BANANA',   'XVG',      'SNEK',    'PNG',
    'OMG',      'TLOS',    'ACA',      'ZBCN',     'CUDOS',   'EWT',
    'VELO',     'DAR',     'XPLA',     'ARDR',     'EVER',    'RAD',
    'CGPT',     'GF',      'OZO',      'BCCOIN',   'NKN',     'LOOKS',
    'LTO',      'AURORA'
  ];
  

app.get("/api", (req, res) => {
    axios
      .get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=500", {
        headers: {
          "X-CMC_PRO_API_KEY": `${apiKey}`,
        },
      })
      .then((response) => {
        //console.log(response.data.data[0].name);
        res.json(response.data) // send json data to local host 

       /* for (i = 0; i <= 500; i++) {
            symbols.push(response.data.data[i].symbol)
            console.dir(symbols, {'maxArrayLength': null});
            
        }
        */
        
      })
      .catch((error) => {
        console.log(error);
      });
  });

  app.get("/info", (req, res) => {
    axios
    .get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${symbols}`, {
      headers: {
        "X-CMC_PRO_API_KEY": `${apiKey}`,
      },
    })
    .then((response) => {
        //console.log(response.data.data);
        res.json(response.data.data);
    })
    .catch((error) => {
        console.log(error);
    });
  });


app.listen(port, () => {
    console.log(`server listening on port ${port}`); 
})

