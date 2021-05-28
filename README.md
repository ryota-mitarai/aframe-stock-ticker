# aframe-stock-ticker

[![Latest NPM release](https://img.shields.io/npm/v/aframe-stock-ticker.svg)](https://www.npmjs.com/package/aframe-stock-ticker)
[![Minzipped size](https://badgen.net/bundlephobia/minzip/aframe-stock-ticker)](https://bundlephobia.com/result?p=aframe-stock-ticker)
[![License](https://img.shields.io/badge/license-MIT-007ec6.svg)](https://github.com/ryota-mitarai/aframe-stock-ticker/blob/master/LICENSE)

An [aframe](https://github.com/aframevr/aframe) component for displaying live stock tickers. Also works with cryptocurrency and forex.

![Example gif](https://github.com/ryota-mitarai/aframe-stock-ticker/blob/master/examples/preview.gif)

## Usage

### crypto-chart

To create a crypto chart, add the **crypto-chart** component.

```html
<a-entity crypto-chart="id: ethereum; days: 30; width: 5; height: 2.5;"></a-entity>
```

Uses the [Coingecko API](https://www.coingecko.com/en/api#explore-api) to gather data. This API doesn't require an API key, and works out of the box with the code above.

### stock-chart

To create a stock chart, add the **stock-chart** component.

```html
<a-entity stock-chart="symbol: AMC; interval: 30min; length: 100; width: 5; height: 2.5;"></a-entity>
```

Uses the [Twelve Data API](https://rapidapi.com/twelvedata/api/twelve-data1) to gather data. This API works for any asset type - stocks, forex, and crypto - but it requires an API key. An API key can be acquired [here](https://rapidapi.com/twelvedata/api/twelve-data1/pricing) for free, with a limit of 800 requests / day.

Once you have a Twelve API key, set **window.TWELVE_API_KEY** equal to it, as seen at the top of the [example](https://github.com/ryota-mitarai/aframe-stock-ticker/blob/master/examples/stock-chart/index.html).

## Properties

### crypto-chart

#### Properties

| Property         | Description                                                                                                                      | Default    |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| id               | id of the target token. Full list available as a JSON [here](https://api.coingecko.com/api/v3/coins/list?include_platform=false) | "Ethereum" |
| days             | how many days back to display data from. Can only be: 1,7,14,30,90,180,365,max                                                   | 14         |
| width            | width of the chart                                                                                                               | 4          |
| height           | height of the chart                                                                                                              | 2          |
| refreshRate      | how often to refresh the chart data, in seconds                                                                                  | 30         |
|                  |                                                                                                                                  |            |
| backgroundColor  | the color of the chart background                                                                                                | "#333"     |
| enableBackground | whether to enable a background behind the candles                                                                                | true       |
| enableTitle      | whether to display the ticker name on the chart                                                                                  | true       |
| enablePrices     | whether to display the prices on the chart                                                                                       | true       |
| coloredWicks     | whether to display wicks in the candles                                                                                          | true       |

#### Members

| Member     | Description                                                             | Path                                     |
| ---------- | ----------------------------------------------------------------------- | ---------------------------------------- |
| timeseries | the current [timeseries](https://twelvedata.com/docs#time-series) data. | el.components["crypto-chart"].timeseries |

### stock-chart

#### Properties

| Property         | Description                                       | Default |
| ---------------- | ------------------------------------------------- | ------- |
| symbol           | symbol of the target asset.                       | "AMC"   |
| interval         | chart interval, how long each candle represents   | "15min" |
| length           | how many candles to display                       | 100     |
| width            | width of the chart                                | 4       |
| height           | height of the chart                               | 2       |
| refreshRate      | how often to refresh the chart data, in seconds   | 30      |
|                  |                                                   |         |
| backgroundColor  | the color of the chart background                 | "#333"  |
| enableBackground | whether to enable a background behind the candles | true    |
| enableTitle      | whether to display the ticker name on the chart   | true    |
| enablePrices     | whether to display the prices on the chart        | true    |
| coloredWicks     | whether to display wicks in the candles           | true    |

#### Members

| Member     | Description                                                             | Path                                    |
| ---------- | ----------------------------------------------------------------------- | --------------------------------------- |
| timeseries | the current [timeseries](https://twelvedata.com/docs#time-series) data. | el.components["stock-chart"].timeseries |

## Events

| Event          | Description                                        | Event.detail                                                    |
| -------------- | -------------------------------------------------- | --------------------------------------------------------------- |
| price_increase | fired on chart refresh, if the price has increased | {name: asset name, price: current price, candle: latest candle} |
| price_decrease | fired on chart refresh, if the price has decreased | {name: asset name, price: current price, candle: latest candle} |

<p align="center">
  <a href="https://planetvoodoo.org/" target="_blank">
    <img width="120px" src="https://planetvoodoo.org/branding/planet-voodoo-logo-1000px.png">
  </a>
</p>

<p align="center">This component was developed in partnership with Planet Voodoo® (Voodoo LLC) as part of their 'WebXR Wizardry' initiative.</p>
