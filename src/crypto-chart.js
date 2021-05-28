AFRAME.registerComponent('crypto-chart', {
  schema: {
    id: { default: 'Ethereum' }, //see '/coins/list' https://www.coingecko.com/en/api#explore-api
    days: { default: 14 }, //1,7,14,30,90,180,365,max
    refreshRate: { default: 1 }, //updates every x minutes
    width: { default: 4 },
    height: { default: 2 },
    backgroundColor: { default: '#333' },
    enableBackground: { default: true },
    enableTitle: { default: true },
    enablePrices: { default: true },
    enableWicks: { default: true },
  },

  init: function () {
    const data = this.data;

    requestGecko(data.id, data.days).then((timeseries) => {
      this.timeseries = timeseries;
      data.timeseries = timeseries;
      this.updateChart();
    });

    //get data on a timer
    setInterval(() => {
      requestGecko(data.id, data.days).then((timeseries) => {
        this.timeseries = timeseries;
        data.timeseries = timeseries;
        this.updateChart();
      });
    }, data.refreshRate * 1000 * 60);
  },

  updateChart: function () {
    const el = this.el;
    const data = this.data;
    const { width: width, height: height, timeseries: timeseries } = data;
    const values = timeseries.values;
    const length = timeseries.meta.numCandles;

    //clear previous chart
    while (el.firstChild) {
      el.firstChild.remove();
    }

    //determine chart scale
    const highs = values.map((item) => {
      return item.high;
    });
    const lows = values.map((item) => {
      return item.low;
    });
    const seriesMax = Math.max(...highs);
    const seriesMin = Math.min(...lows);

    //converts a price to a y positon on the chart
    function scaleToChart(value) {
      return ((value - seriesMin) / (seriesMax - seriesMin)) * height;
    }

    //create the candles
    const candleWidth = width / length;
    let i = 0;
    values.forEach((candle) => {
      i++;
      const bar = document.createElement('a-box');
      el.appendChild(bar);

      bar.setAttribute('width', candleWidth);
      bar.setAttribute('depth', candleWidth);

      const candleHeight = scaleToChart(candle.open) - scaleToChart(candle.close);
      bar.setAttribute('height', Math.abs(candleHeight));

      const x = i * candleWidth - candleWidth / 2;
      const heightAdj = candleHeight < 0 ? Math.abs(candleHeight) / 2 : Math.abs(candleHeight) / -2;
      const y = scaleToChart(candle.open) + heightAdj;
      bar.setAttribute('position', `${x} ${y} 0`);

      const color = candleHeight < 0 ? '#f44' : '#4f4';
      bar.setAttribute('color', color);

      //create wick
      if (data.enableWicks == true) {
        const wick = document.createElement('a-box');
        bar.appendChild(wick);

        wick.setAttribute('width', candleWidth / 5);
        wick.setAttribute('depth', candleWidth / 5);

        const wickHeight = scaleToChart(candle.high) - scaleToChart(candle.low);
        wick.setAttribute('height', wickHeight + 0.01); // 0.01 is to avoid texture collisions with the candle
        wick.setAttribute('color', color);
      }
    });

    //add background
    if (data.enableBackground == true) {
      const background = document.createElement('a-box');
      el.appendChild(background);

      const backgroundDepth = 0.05;
      background.setAttribute('width', width);
      background.setAttribute('height', height);
      background.setAttribute('depth', backgroundDepth);
      background.setAttribute('color', data.backgroundColor);
      background.setAttribute('position', `${width / 2} ${height / 2} ${(-candleWidth - backgroundDepth) / 2}`);
    }

    //add title
    if (data.enableTitle == true) {
      const title = document.createElement('a-text');
      el.appendChild(title);

      const text = `${timeseries.meta.symbol} | ${timeseries.meta.interval}`;
      title.setAttribute('value', text);
      title.setAttribute('font', 'roboto');

      const y = 0.155;
      title.setAttribute('position', `0 ${y} ${-candleWidth / 2}`);
    }

    //add prices
    if (data.enablePrices == true) {
      const heightAdj = 0.1;

      const priceLow = document.createElement('a-text');
      el.appendChild(priceLow);
      priceLow.setAttribute('scale', '.75 .75 1');
      priceLow.setAttribute('font', 'roboto');
      priceLow.setAttribute('align', 'right');
      priceLow.setAttribute('value', `${Math.round(seriesMin * 100) / 100}`);
      priceLow.setAttribute('position', `${width} ${heightAdj} ${-candleWidth / 2}`);

      const priceHigh = document.createElement('a-text');
      el.appendChild(priceHigh);
      priceHigh.setAttribute('scale', '.75 .75 1');
      priceHigh.setAttribute('font', 'roboto');
      priceHigh.setAttribute('align', 'right');
      priceHigh.setAttribute('value', `${Math.round(seriesMax * 100) / 100}`);
      priceHigh.setAttribute('position', `${width} ${height - heightAdj} ${-candleWidth / 2}`);
    }
  },
});

function requestGecko(id, days) {
  return new Promise((resolve, reject) => {
    fetch(`https://api.coingecko.com/api/v3/coins/ethereum/ohlc?vs_currency=usd&days=${days}`)
      .then((response) => {
        response.json().then((data) => {
          const values = [];
          data.forEach((candle) => {
            values.push({
              open: candle[1],
              high: candle[2],
              low: candle[3],
              close: candle[4],
            });
          });
          const interval = days <= 2 ? '30 min' : days >= 31 ? '4 day' : '4 hour';
          const numCandles = Math.ceil(days <= 2 ? (days * 24) / 0.5 : days >= 31 ? days / 4 : (days * 24) / 4) + 1;
          const meta = {
            symbol: id,
            interval: interval,
            numCandles: numCandles,
          };
          const formatted = {
            meta: meta,
            values: values,
          };
          resolve(formatted);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}
