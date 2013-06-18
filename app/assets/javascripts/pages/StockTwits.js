
//stocktwits-widget-loader.min.js
STWT=window.STWT||{};
(function(){function l(){var b=[];this.add=function(d,a){b.push({name:d,value:a})};this.toString=function(){for(var d=[],a=0;a<b.length;a++)d[a]=encodeURIComponent(b[a].name)+"="+encodeURIComponent(b[a].value);return d.join("&")}}if(!(STWT&&STWT.Widget))STWT.Widget=function(b){function d(){return['<body style="border:0;margin:0" onload="',"var d=document;d._stwtWidgetIdx="+window._stwtWidget.num+";","d.getElementsByTagName('head')[0].appendChild(d.createElement('script')).src='",m+"stocktwits.com/addon/widget/2/widget-streams.min.js?1336151556",
"';\"></body>"].join("")}b=b||{};var a=document.createElement("iframe"),e=new l,h=["avatars","scrollbars","times","streaming","header","limit","title","partner","symbol","user","canned_stream"],i=["stream_option","message_option","footer_option","border_color","border_color_2","box_color","header_text_color","header_option","divider_color","stream_color","username_color","username_hover_color","username_font","username_size","divider_type","link_color","link_hover_color","link_ticker_color","link_ticker_hover_color",
"font","font_option","font_size","text_color","time_color","time_font_size"],m="https://",n=document.getElementById(b.container||"stocktwits-widget"),c,f,g,j;a.setAttribute("allowtranparency","true");a.setAttribute("frameBorder","0");a.setAttribute("border","0");a.setAttribute("style","border: 0");a.setAttribute("scrolling","no");f=/\d+/.test(b.width)?b.width:300;g=/\d+/.test(b.height)?b.height:300;a.style.width=f+"px";a.style.height=g+"px";e.add("width",f);e.add("height",g);e.add("domain",
document.domain);if(b){for(c=0;c<h.length;c++)b[h[c]]!==undefined&&e.add(h[c],b[h[c]]);if(b.style)for(c=0;c<i.length;c++)b.style[i[c]]!==undefined&&e.add(i[c],b.style[i[c]])}n.appendChild(a);window._stwtWidget=window._stwtWidget||{num:0,widgets:{}};window._stwtWidget.num+=1;window._stwtWidget[window._stwtWidget.num]={w:f,h:g,param:e.toString()};window._stwtWParam={w:f,h:g,param:e.toString()};try{a.contentWindow.document.open()}catch(o){j="javascript:var d=document.open();d.domain='"+document.domain+
"';";a.src=j+"void(0);"}try{var k=a.contentWindow.document;k.write(d());k.close()}catch(p){a.src=j+'d.write("'+d().replace(/"/g,'\\"')+'");d.close();'}}})();


$(document).ready(function() {

      $("#go").on("click", function(){
        $("#stocktwits-widget-news").html("");
        STWT.Widget({
            container: 'stocktwits-widget-news',
            symbol: $("#ticker").val(),
            width: '900',
            height: '2000',
            limit: '500',
            scrollbars: 'true',
            streaming: 'true',
            title: $("#ticker").val() + ' Ideas',
            style: {
              link_color: '4871a8',
              link_hover_color: '4871a8',
              header_text_color: '000000',
              border_color: 'cecece',
              divider_color: 'cecece',
              divider_color: 'cecece',
              divider_type: 'solid',
              box_color: 'f5f5f5',
              stream_color: 'ffffff',
              text_color: '000000',
              time_color: '999999'
              }
          });
      });
  })