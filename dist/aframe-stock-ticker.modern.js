function t(t,e,i,a){return new Promise((s,n)=>{fetch(`https://twelve-data1.p.rapidapi.com/time_series?symbol=${t}&interval=${e}&outputsize=${i}&format=json`,{method:"GET",headers:{"x-rapidapi-key":a,"x-rapidapi-host":"twelve-data1.p.rapidapi.com"}}).then(t=>{t.json().then(t=>{s(t)})}).catch(t=>{n(t)})})}AFRAME.registerComponent("stock-chart",{schema:{symbol:{default:"ETH/USD"},interval:{default:"15min"},length:{default:100},refreshRate:{default:5},width:{default:4},height:{default:2},enableBackground:{default:!0},backgroundColor:{default:"#333"},enableTitle:{default:!0},enablePrices:{default:!0},enableWicks:{default:!0}},init:function(){const e=this.data;t(e.symbol,e.interval,e.length,window.TWELVE_API_KEY).then(t=>{this.timeseries=t,e.timeseries=t,this.updateChart()}),setInterval(()=>{t(e.symbol,e.interval,e.length,window.TWELVE_API_KEY).then(t=>{this.timeseries=t,e.timeseries=t,this.updateChart()})},1e3*e.refreshRate*60)},updateChart:function(){const t=this.el,e=this.data,{length:i,width:a,height:s,timeseries:n}=e,o=n.values;for(;t.firstChild;)t.firstChild.remove();const r=o.map(t=>t.high),l=o.map(t=>t.low),h=Math.max(...r),u=Math.min(...l);function d(t){return(t-u)/(h-u)*s}const c=a/i;let b=0;if(o.forEach(i=>{b++;const a=document.createElement("a-box");t.appendChild(a),a.setAttribute("width",c),a.setAttribute("depth",c);const s=d(i.open)-d(i.close);a.setAttribute("height",Math.abs(s));const n=b*c-c/2,o=s<0?Math.abs(s)/2:Math.abs(s)/-2,r=d(i.open)+o;a.setAttribute("position",`${n} ${r} 0`);const l=s<0?"#f44":"#4f4";if(a.setAttribute("color",l),1==e.enableWicks){const t=document.createElement("a-box");a.appendChild(t),t.setAttribute("width",c/5),t.setAttribute("depth",c/5);const e=d(i.high)-d(i.low);t.setAttribute("height",e+.01),t.setAttribute("color",l)}}),1==e.enableBackground){const i=document.createElement("a-box");t.appendChild(i);const n=.05;i.setAttribute("width",a),i.setAttribute("height",s),i.setAttribute("depth",n),i.setAttribute("color",e.backgroundColor),i.setAttribute("position",`${a/2} ${s/2} ${(-c-n)/2}`)}if(1==e.enableTitle){const e=document.createElement("a-text");t.appendChild(e),e.setAttribute("value",`${n.meta.symbol} | ${n.meta.interval}`),e.setAttribute("font","roboto"),e.setAttribute("position","0 0.155 "+-c/2)}if(1==e.enablePrices){const e=.1,i=document.createElement("a-text");t.appendChild(i),i.setAttribute("scale",".75 .75 1"),i.setAttribute("font","roboto"),i.setAttribute("align","right"),i.setAttribute("value",""+Math.round(100*u)/100),i.setAttribute("position",`${a} ${e} ${-c/2}`);const n=document.createElement("a-text");t.appendChild(n),n.setAttribute("scale",".75 .75 1"),n.setAttribute("font","roboto"),n.setAttribute("align","right"),n.setAttribute("value",""+Math.round(100*h)/100),n.setAttribute("position",`${a} ${s-e} ${-c/2}`)}}});
//# sourceMappingURL=aframe-stock-ticker.modern.js.map
