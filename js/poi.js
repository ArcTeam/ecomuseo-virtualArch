const item = localStorage.getItem('poi');
let pannello = pannelli[item[0]]
let audioLabel={
  "it":{
    "title":"Ascolta il paesaggio",
    "label":"pannello disponibile in modalità audio"
  },
  "etr":{
    "title":"Ascolta il paesaggio",
    "label":"pannello disponibile in modalità audio"
  },
  "en":{
    "title":"Listen to the landscape",
    "label":"panel available in audio mode"
  },
  "de":{
    "title":"Lauschen Sie der Landschaft",
    "label":"Bedienfeld im Audiomodus verfügbar"
  }
}

$("#audioWrap > h6").text(audioLabel[lang]['title']);
$("#audioWrap > small").text(audioLabel[lang]['label']);
console.log(audioLabel);
$("#introTitle").text(pannello.titolo_pannello);
for(i=0;i<(pannello.poi.length > pannello.img.length ? pannello.poi.length : pannello.img.length);i++){
  if (i < pannello.poi.length){
    let row=$("<div/>",{class:'row'}).appendTo('#introText');
    let col=$("<div/>",{class:'col-12'}).appendTo(row);
    $("<h5/>",{text:pannello.poi[i][lang]['nome']}).appendTo(col)
    $("<div/>")
      .addClass('my-3')
      .html(pannello.poi[i][lang]['testo'])
      .appendTo(col)
  }
  if (i < pannello.img.length){
    let row=$("<div/>",{class:'row'}).appendTo('#introText');
    let col=$("<div/>",{class:'col'}).appendTo(row);
    let fig = $("<figure/>").appendTo(col)
    $("<img/>",{class:'img-fluid', loading:'lazy', src:'asset/media/pan'+ pannello['id'] +'/foto/'+pannello.img[i]}).appendTo(fig);
    let caption = $("<figcaption/>").appendTo(fig)
    $("<small/>").text(pannello['didascalia_'+lang][i]).appendTo(caption)
  }
}

$("audio").attr("src","asset/media/pan"+pannello['id']+"/audio/p"+pannello['id']+"_"+lang+".mp3");
