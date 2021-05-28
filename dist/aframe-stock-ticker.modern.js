function t(t,e,i,s){return new Promise((a,o)=>{fetch(`https://twelve-data1.p.rapidapi.com/time_series?symbol=${t}&interval=${e}&outputsize=${i}&format=json`,{method:"GET",headers:{"x-rapidapi-key":s,"x-rapidapi-host":"twelve-data1.p.rapidapi.com"}}).then(t=>{t.json().then(t=>{a(t)})}).catch(t=>{o(t)})})}function e(t,e){return new Promise((i,s)=>{fetch(`https://api.coingecko.com/api/v3/coins/ethereum/ohlc?vs_currency=usd&days=${e}`).then(s=>{s.json().then(s=>{const a=[];s.forEach(t=>{a.push({open:t[1],high:t[2],low:t[3],close:t[4]})});const o=e<=2?"30 min":e>=31?"4 day":"4 hour",n=Math.ceil(e<=2?24*e/.5:e>=31?e/4:24*e/4)+1;i({meta:{symbol:t,interval:o,numCandles:n},values:a})})}).catch(t=>{s(t)})})}AFRAME.registerComponent("stock-chart",{schema:{symbol:{default:"AMC"},interval:{default:"15min"},length:{default:100},refreshRate:{default:5},width:{default:4},height:{default:2},backgroundColor:{default:"#333"},enableBackground:{default:!0},enableTitle:{default:!0},enablePrices:{default:!0},enableWicks:{default:!0}},init:function(){const e=this.data;t(e.symbol,e.interval,e.length,window.TWELVE_API_KEY).then(t=>{this.timeseries=t,e.timeseries=t,this.updateChart()}),setInterval(()=>{t(e.symbol,e.interval,e.length,window.TWELVE_API_KEY).then(t=>{this.timeseries=t,e.timeseries=t,this.updateChart()})},1e3*e.refreshRate*60)},updateChart:function(){const t=this.el,e=this.data,{length:i,width:s,height:a,timeseries:o}=e,n=o.values;for(;t.firstChild;)t.firstChild.remove();const r=n.map(t=>t.high),h=n.map(t=>t.low),l=Math.max(...r),c=Math.min(...h);function u(t){return(t-c)/(l-c)*a}const d=s/i;let b=0;if(n.forEach(i=>{b++;const s=document.createElement("a-box");t.appendChild(s),s.setAttribute("width",d),s.setAttribute("depth",d);const a=u(i.open)-u(i.close);s.setAttribute("height",Math.abs(a));const o=b*d-d/2,n=a<0?Math.abs(a)/2:Math.abs(a)/-2,r=u(i.open)+n;s.setAttribute("position",`${o} ${r} 0`);const h=a<0?"#f44":"#4f4";if(s.setAttribute("color",h),1==e.enableWicks){const t=document.createElement("a-box");s.appendChild(t),t.setAttribute("width",d/5),t.setAttribute("depth",d/5);const e=Math.abs(u(i.high)-u(i.open))/2;t.setAttribute("height",e),t.setAttribute("color",h),t.setAttribute("position",`0 ${e/2} 0`);const a=document.createElement("a-box");s.appendChild(a),a.setAttribute("width",d/5),a.setAttribute("depth",d/5);const o=Math.abs(u(i.low)-u(i.open))/2;a.setAttribute("height",o),a.setAttribute("color",h),a.setAttribute("position",`0 ${o/-2} 0`)}}),1==e.enableBackground){const i=document.createElement("a-box");t.appendChild(i);const o=.05;i.setAttribute("width",s),i.setAttribute("height",a),i.setAttribute("depth",o),i.setAttribute("color",e.backgroundColor),i.setAttribute("position",`${s/2} ${a/2} ${(-d-o)/2}`)}if(1==e.enableTitle){const e=document.createElement("a-text");t.appendChild(e),e.setAttribute("value",`${o.meta.symbol} | ${o.meta.interval}`),e.setAttribute("font","roboto"),e.setAttribute("position","0 0.155 "+-d/2)}if(1==e.enablePrices){const e=.1,i=document.createElement("a-text");t.appendChild(i),i.setAttribute("scale",".75 .75 1"),i.setAttribute("font","roboto"),i.setAttribute("align","right"),i.setAttribute("value",""+Math.round(100*c)/100),i.setAttribute("position",`${s} ${e} ${-d/2}`);const o=document.createElement("a-text");t.appendChild(o),o.setAttribute("scale",".75 .75 1"),o.setAttribute("font","roboto"),o.setAttribute("align","right"),o.setAttribute("value",""+Math.round(100*l)/100),o.setAttribute("position",`${s} ${a-e} ${-d/2}`)}if(void 0!==e.lastRefreshPrice){const i=n[n.length-1].close;t.emit(i>e.lastRefreshPrice?"price_increase":"price_decrease",{name:e.symbol,price:i,candle:n[n.length-1]},!0)}e.lastRefreshPrice=n[n.length-1].close}}),AFRAME.registerComponent("crypto-chart",{schema:{id:{default:"Ethereum"},days:{default:14},refreshRate:{default:1},width:{default:4},height:{default:2},backgroundColor:{default:"#333"},enableBackground:{default:!0},enableTitle:{default:!0},enablePrices:{default:!0},enableWicks:{default:!0}},init:function(){const t=this.data;e(t.id,t.days).then(e=>{this.timeseries=e,t.timeseries=e,this.updateChart()}),setInterval(()=>{e(t.id,t.days).then(e=>{this.timeseries=e,t.timeseries=e,this.updateChart()})},1e3*t.refreshRate*60)},updateChart:function(){const t=this.el,e=this.data,{width:i,height:s,timeseries:a}=e,o=a.values,n=a.meta.numCandles;for(;t.firstChild;)t.firstChild.remove();const r=o.map(t=>t.high),h=o.map(t=>t.low),l=Math.max(...r),c=Math.min(...h);function u(t){return(t-c)/(l-c)*s}const d=i/n;let b=0;if(o.forEach(i=>{b++;const s=document.createElement("a-box");t.appendChild(s),s.setAttribute("width",d),s.setAttribute("depth",d);const a=u(i.open)-u(i.close);s.setAttribute("height",Math.abs(a));const o=b*d-d/2,n=a<0?Math.abs(a)/2:Math.abs(a)/-2,r=u(i.open)+n;s.setAttribute("position",`${o} ${r} 0`);const h=a<0?"#4f4":"#f44";if(s.setAttribute("color",h),1==e.enableWicks){const t=document.createElement("a-box");s.appendChild(t),t.setAttribute("width",d/5),t.setAttribute("depth",d/5);const e=Math.abs(u(i.high)-u(i.open))/2;t.setAttribute("height",e),t.setAttribute("color",h),t.setAttribute("position",`0 ${e/2} 0`);const a=document.createElement("a-box");s.appendChild(a),a.setAttribute("width",d/5),a.setAttribute("depth",d/5);const o=Math.abs(u(i.low)-u(i.open))/2;a.setAttribute("height",o),a.setAttribute("color",h),a.setAttribute("position",`0 ${o/-2} 0`)}}),1==e.enableBackground){const a=document.createElement("a-box");t.appendChild(a);const o=.05;a.setAttribute("width",i),a.setAttribute("height",s),a.setAttribute("depth",o),a.setAttribute("color",e.backgroundColor),a.setAttribute("position",`${i/2} ${s/2} ${(-d-o)/2}`)}if(1==e.enableTitle){const e=document.createElement("a-text");t.appendChild(e),e.setAttribute("value",`${a.meta.symbol} | ${a.meta.interval}`),e.setAttribute("font","roboto"),e.setAttribute("position","0 0.155 "+-d/2)}if(1==e.enablePrices){const e=.1,a=document.createElement("a-text");t.appendChild(a),a.setAttribute("scale",".75 .75 1"),a.setAttribute("font","roboto"),a.setAttribute("align","right"),a.setAttribute("value",""+Math.round(100*c)/100),a.setAttribute("position",`${i} ${e} ${-d/2}`);const o=document.createElement("a-text");t.appendChild(o),o.setAttribute("scale",".75 .75 1"),o.setAttribute("font","roboto"),o.setAttribute("align","right"),o.setAttribute("value",""+Math.round(100*l)/100),o.setAttribute("position",`${i} ${s-e} ${-d/2}`)}if(void 0!==e.lastRefreshPrice){const i=o[o.length-1].close;t.emit(i>e.lastRefreshPrice?"price_increase":"price_decrease",{name:e.id,price:i,candle:o[o.length-1]},!0)}e.lastRefreshPrice=o[o.length-1].close}});
//# sourceMappingURL=aframe-stock-ticker.modern.js.map
