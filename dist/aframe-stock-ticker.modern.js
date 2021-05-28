AFRAME.registerComponent("stock-chart",{schema:{symbol:{default:"ETH/USD"},interval:{default:"15min"},length:{default:100},refreshRate:{default:5},width:{default:4},height:{default:2},enableBackground:{default:!0},backgroundColor:{default:"#333"},enableTitle:{default:!0},enablePrices:{default:!0},enableWicks:{default:!0},coloredWicks:{default:!0}},init:function(){const t=this.data;var e,i,a,o;setInterval((e=t.symbol,i=t.interval,a=t.length,o=window.TWELVE_API_KEY,new Promise((t,s)=>{fetch(`https://twelve-data1.p.rapidapi.com/time_series?symbol=${e}&interval=${i}&outputsize=${a}&format=json`,{method:"GET",headers:{"x-rapidapi-key":o,"x-rapidapi-host":"twelve-data1.p.rapidapi.com"}}).then(e=>{e.json().then(e=>{t(e)})}).catch(t=>{s(t)})})).then(e=>{t.timeseries=e,this.updateChart()}),1e3*t.refreshRate*60)},updateChart:function(){const t=this.el,e=this.data,{length:i,width:a,height:o,timeseries:s}=e,n=s.values;for(;t.firstChild;)t.firstChild.remove();const r=n.map(t=>t.high),l=n.map(t=>t.low),u=Math.max(...r),h=Math.min(...l);function d(t){return(t-h)/(u-h)*o}const c=a/i;let b=0;if(n.forEach(i=>{b++;const a=document.createElement("a-box");t.appendChild(a),a.setAttribute("width",c),a.setAttribute("depth",c);const o=d(i.open)-d(i.close);a.setAttribute("height",Math.abs(o));const s=b*c-c/2,n=o<0?Math.abs(o)/2:Math.abs(o)/-2,r=d(i.open)+n;a.setAttribute("position",`${s} ${r} 0`);const l=o<0?"#f44":"#4f4";if(a.setAttribute("color",l),1==e.enableWicks){const t=document.createElement("a-box");a.appendChild(t),t.setAttribute("width",c/5),t.setAttribute("depth",c/5);const o=d(i.high)-d(i.low);t.setAttribute("height",o+.01),t.setAttribute("color",1==e.coloredWicks?l:"#000")}}),1==e.enableBackground){const i=document.createElement("a-box");t.appendChild(i);const s=.05;i.setAttribute("width",a),i.setAttribute("height",o),i.setAttribute("depth",s),i.setAttribute("color",e.backgroundColor),i.setAttribute("position",`${a/2} ${o/2} ${(-c-s)/2}`)}if(1==e.enableTitle){const e=document.createElement("a-text");t.appendChild(e),e.setAttribute("value",`${s.meta.symbol} | ${s.meta.interval}`),e.setAttribute("font","roboto"),e.setAttribute("position","0 0.155 "+-c/2)}if(1==e.enablePrices){const e=.1,i=document.createElement("a-text");t.appendChild(i),i.setAttribute("scale",".75 .75 1"),i.setAttribute("font","roboto"),i.setAttribute("align","right"),i.setAttribute("value",""+Math.round(100*h)/100),i.setAttribute("position",`${a} ${e} ${-c/2}`);const s=document.createElement("a-text");t.appendChild(s),s.setAttribute("scale",".75 .75 1"),s.setAttribute("font","roboto"),s.setAttribute("align","right"),s.setAttribute("value",""+Math.round(100*u)/100),s.setAttribute("position",`${a} ${o-e} ${-c/2}`)}}});
//# sourceMappingURL=aframe-stock-ticker.modern.js.map
