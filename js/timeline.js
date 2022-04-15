$(document).ready(function() {
  const eventiFolder = 'img/timeline/eventi/'
  const schedeFolder = 'img/timeline/schede/'
  const timeDiv = $("#timeline");
  timeline.anni.forEach(function(item, i){
    let y = (item + 2200);
    let point = $("<div/>",{class:'anno center'}).css({"top":y+'px'}).appendTo(timeDiv);
    let anno = $("<div/>",{class:'anno-text'}).css({"top":y-20+'px'}).text(item).appendTo(timeDiv);
  });
  timeline.eventi.forEach(function(item, i){
    let y = item.anno + 2200;
    let evento = $("<div/>",{class:'evento '+item.lato}).css({"top":y+'px'}).appendTo(timeDiv);
    $("<img/>",{src:eventiFolder+item.ico}).appendTo(evento)
    $("<span/>").text(item.testo).appendTo(evento)
  });
  timeline.schede.forEach(function(item, i){
    let y = item.anno + 2200;
    let arrowSide = item.lato == 'destro' ? 'arrow-left' : 'arrow-right';
    let scheda = $("<div/>",{class:'bg-white scheda text-center arrow '+arrowSide+' '+item.lato})
      .css({"top":y+'px',"border-color":item.colore})
      .appendTo(timeDiv);
    $("<h5/>",{class:'fw-bold'}).css("color",item.colore).text(item.titolo).appendTo(scheda)
    let footer = $("<div/>",{class:'text-end'}).appendTo(scheda);
    $("<a/>",{href:'#', class:'link-poi'}).attr("data-poi",item.link).css("color",item.colore).text('#view poi').appendTo(footer)
    let arrowColor;
    switch (item.colore) {
      case '#293b88':  arrowColor = arrowSide+'-blue';  break;
      case '#ef3230':  arrowColor = arrowSide+'-light-red';  break;
      case '#880e13':  arrowColor = arrowSide+'-red';  break;
      case '#4f842e':  arrowColor = arrowSide+'-green';  break;
    }
    scheda.addClass(arrowColor);
  });
});
