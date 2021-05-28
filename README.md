# aframe-stock-ticker

[![Latest NPM release](https://img.shields.io/npm/v/aframe-stock-ticker.svg)](https://www.npmjs.com/package/aframe-stock-ticker)
[![Minzipped size](https://badgen.net/bundlephobia/minzip/aframe-stock-ticker)](https://bundlephobia.com/result?p=aframe-stock-ticker)
[![License](https://img.shields.io/badge/license-MIT-007ec6.svg)](https://github.com/ryota-mitarai/aframe-stock-ticker/blob/master/LICENSE)

An [aframe](https://github.com/aframevr/aframe) component for displaying live stock tickers. Also works with cryptocurrency and forex.

![Example gif](https://github.com/ryota-mitarai/aframe-stock-ticker/blob/master/examples/preview.gif)

## Usage

To create a chart, add the **stock-chart** component.

```html
<a-entity stock-chart="symbol: ETH/USD; interval: 30min; width: 5; height: 2.5;"></a-entity>
```

Data is gathered from the [Twelve Data API](https://rapidapi.com/twelvedata/api/twelve-data1). To use this component, you must also supply an API key. An API key can be acquired [here](https://rapidapi.com/twelvedata/api/twelve-data1/pricing) for free, with a limit of 800 requests / day.

Once you have an API key, set **window.TWELVE_API_KEY** equal to it, as seen at the top of the [example](https://github.com/ryota-mitarai/aframe-stock-ticker/blob/master/examples/index.html).

This probably isn't the best way to handle an API key but I'm not sure how else to do it.

### Properties

| Property         | Description                                       | Default   |
| ---------------- | ------------------------------------------------- | --------- |
| symbol           | symbol of the target asset                        | "ETH/USD" |
| interval         | chart interval, how long each candle represents   | "15min"   |
| length           | how many candles to display                       | 100       |
| width            | width of the chart                                | 4         |
| height           | height of the chart                               | 2         |
| refreshRate      | how often to refresh the chart data, in minutes   | 5         |
|                  |                                                   |           |
| backgroundColor  | the color of the chart background                 | "#333"    |
| enableBackground | whether to enable a background behind the candles | true      |
| enableTitle      | whether to display the ticker name on the chart   | true      |
| enablePrices     | whether to display the prices on the chart        | true      |
| coloredWicks     | whether to display wicks in the candles           | true      |

### Members

| Member     | Description                 | Path                                    |
| ---------- | --------------------------- | --------------------------------------- |
| timeseries | the current timeseries data | el.components["stock-chart"].timeseries |
