function t(t,e,i,a){return new Promise(function(r,n){fetch("https://twelve-data1.p.rapidapi.com/time_series?symbol="+t+"&interval="+e+"&outputsize="+i+"&format=json",{method:"GET",headers:{"x-rapidapi-key":a,"x-rapidapi-host":"twelve-data1.p.rapidapi.com"}}).then(function(t){t.json().then(function(t){r(t)})}).catch(function(t){n(t)})})}function e(t,e){return new Promise(function(i,a){fetch("https://api.coingecko.com/api/v3/coins/ethereum/ohlc?vs_currency=usd&days="+e).then(function(a){a.json().then(function(a){var r=[];a.forEach(function(t){r.push({open:t[1],high:t[2],low:t[3],close:t[4]})});var n=e<=2?"30 min":e>=31?"4 day":"4 hour",o=Math.ceil(e<=2?24*e/.5:e>=31?e/4:24*e/4)+1;i({meta:{symbol:t,interval:n,numCandles:o},values:r})})}).catch(function(t){a(t)})})}AFRAME.registerComponent("stock-chart",{schema:{symbol:{default:"AMC"},interval:{default:"15min"},length:{default:100},refreshRate:{default:5},width:{default:4},height:{default:2},backgroundColor:{default:"#333"},enableBackground:{default:!0},enableTitle:{default:!0},enablePrices:{default:!0},enableWicks:{default:!0}},init:function(){var e=this,i=this.data;t(i.symbol,i.interval,i.length,window.TWELVE_API_KEY).then(function(t){e.timeseries=t,i.timeseries=t,e.updateChart()}),setInterval(function(){t(i.symbol,i.interval,i.length,window.TWELVE_API_KEY).then(function(t){e.timeseries=t,i.timeseries=t,e.updateChart()})},1e3*i.refreshRate*60)},updateChart:function(){for(var t=this.el,e=this.data,i=e.length,a=e.width,r=e.height,n=e.timeseries,o=n.values;t.firstChild;)t.firstChild.remove();var s=o.map(function(t){return t.high}),u=o.map(function(t){return t.low}),h=Math.max.apply(Math,s),l=Math.min.apply(Math,u);function d(t){return(t-l)/(h-l)*r}var c=a/i,b=0;if(o.forEach(function(i){b++;var a=document.createElement("a-box");t.appendChild(a),a.setAttribute("width",c),a.setAttribute("depth",c);var r=d(i.open)-d(i.close);a.setAttribute("height",Math.abs(r));var n=b*c-c/2,o=r<0?Math.abs(r)/2:Math.abs(r)/-2,s=d(i.open)+o;a.setAttribute("position",n+" "+s+" 0");var u=r<0?"#f44":"#4f4";if(a.setAttribute("color",u),1==e.enableWicks){var h=document.createElement("a-box");a.appendChild(h),h.setAttribute("width",c/5),h.setAttribute("depth",c/5);var l=Math.abs(d(i.high)-d(i.open))/2;h.setAttribute("height",l),h.setAttribute("color",u),h.setAttribute("position","0 "+l/2+" 0");var p=document.createElement("a-box");a.appendChild(p),p.setAttribute("width",c/5),p.setAttribute("depth",c/5);var f=Math.abs(d(i.low)-d(i.open))/2;p.setAttribute("height",f),p.setAttribute("color",u),p.setAttribute("position","0 "+f/-2+" 0")}}),1==e.enableBackground){var p=document.createElement("a-box");t.appendChild(p),p.setAttribute("width",a),p.setAttribute("height",r),p.setAttribute("depth",.05),p.setAttribute("color",e.backgroundColor),p.setAttribute("position",a/2+" "+r/2+" "+(-c-.05)/2)}if(1==e.enableTitle){var f=document.createElement("a-text");t.appendChild(f),f.setAttribute("value",n.meta.symbol+" | "+n.meta.interval),f.setAttribute("font","roboto"),f.setAttribute("position","0 0.155 "+-c/2)}if(1==e.enablePrices){var m=document.createElement("a-text");t.appendChild(m),m.setAttribute("scale",".75 .75 1"),m.setAttribute("font","roboto"),m.setAttribute("align","right"),m.setAttribute("value",""+Math.round(100*l)/100),m.setAttribute("position",a+" 0.1 "+-c/2);var A=document.createElement("a-text");t.appendChild(A),A.setAttribute("scale",".75 .75 1"),A.setAttribute("font","roboto"),A.setAttribute("align","right"),A.setAttribute("value",""+Math.round(100*h)/100),A.setAttribute("position",a+" "+(r-.1)+" "+-c/2)}if(void 0!==e.lastRefreshPrice){var v=o[o.length-1].close;t.emit(v>e.lastRefreshPrice?"price_increase":"price_decrease",{name:e.symbol,price:v,candle:o[o.length-1]},!0)}e.lastRefreshPrice=o[o.length-1].close}}),AFRAME.registerComponent("crypto-chart",{schema:{id:{default:"Ethereum"},days:{default:14},refreshRate:{default:1},width:{default:4},height:{default:2},backgroundColor:{default:"#333"},enableBackground:{default:!0},enableTitle:{default:!0},enablePrices:{default:!0},enableWicks:{default:!0}},init:function(){var t=this,i=this.data;e(i.id,i.days).then(function(e){t.timeseries=e,i.timeseries=e,t.updateChart()}),setInterval(function(){e(i.id,i.days).then(function(e){t.timeseries=e,i.timeseries=e,t.updateChart()})},1e3*i.refreshRate*60)},updateChart:function(){for(var t=this.el,e=this.data,i=e.width,a=e.height,r=e.timeseries,n=r.values,o=r.meta.numCandles;t.firstChild;)t.firstChild.remove();var s=n.map(function(t){return t.high}),u=n.map(function(t){return t.low}),h=Math.max.apply(Math,s),l=Math.min.apply(Math,u);function d(t){return(t-l)/(h-l)*a}var c=i/o,b=0;if(n.forEach(function(i){b++;var a=document.createElement("a-box");t.appendChild(a),a.setAttribute("width",c),a.setAttribute("depth",c);var r=d(i.open)-d(i.close);a.setAttribute("height",Math.abs(r));var n=b*c-c/2,o=r<0?Math.abs(r)/2:Math.abs(r)/-2,s=d(i.open)+o;a.setAttribute("position",n+" "+s+" 0");var u=r<0?"#4f4":"#f44";if(a.setAttribute("color",u),1==e.enableWicks){var h=document.createElement("a-box");a.appendChild(h),h.setAttribute("width",c/5),h.setAttribute("depth",c/5);var l=Math.abs(d(i.high)-d(i.open))/2;h.setAttribute("height",l),h.setAttribute("color",u),h.setAttribute("position","0 "+l/2+" 0");var p=document.createElement("a-box");a.appendChild(p),p.setAttribute("width",c/5),p.setAttribute("depth",c/5);var f=Math.abs(d(i.low)-d(i.open))/2;p.setAttribute("height",f),p.setAttribute("color",u),p.setAttribute("position","0 "+f/-2+" 0")}}),1==e.enableBackground){var p=document.createElement("a-box");t.appendChild(p),p.setAttribute("width",i),p.setAttribute("height",a),p.setAttribute("depth",.05),p.setAttribute("color",e.backgroundColor),p.setAttribute("position",i/2+" "+a/2+" "+(-c-.05)/2)}if(1==e.enableTitle){var f=document.createElement("a-text");t.appendChild(f),f.setAttribute("value",r.meta.symbol+" | "+r.meta.interval),f.setAttribute("font","roboto"),f.setAttribute("position","0 0.155 "+-c/2)}if(1==e.enablePrices){var m=document.createElement("a-text");t.appendChild(m),m.setAttribute("scale",".75 .75 1"),m.setAttribute("font","roboto"),m.setAttribute("align","right"),m.setAttribute("value",""+Math.round(100*l)/100),m.setAttribute("position",i+" 0.1 "+-c/2);var A=document.createElement("a-text");t.appendChild(A),A.setAttribute("scale",".75 .75 1"),A.setAttribute("font","roboto"),A.setAttribute("align","right"),A.setAttribute("value",""+Math.round(100*h)/100),A.setAttribute("position",i+" "+(a-.1)+" "+-c/2)}if(void 0!==e.lastRefreshPrice){var v=n[n.length-1].close;t.emit(v>e.lastRefreshPrice?"price_increase":"price_decrease",{name:e.id,price:v,candle:n[n.length-1]},!0)}e.lastRefreshPrice=n[n.length-1].close}});
//# sourceMappingURL=aframe-stock-ticker.js.map
