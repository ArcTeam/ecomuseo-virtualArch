$(document).ready(function() {
  init();
  buildCard();

  $("[name=chooseLang]").on('click', function(){
    localStorage.setItem("lang",$(this).val());
    init();
  })
});

function init(){
  if (!localStorage.lang) {
    $(".lang").show();
    $(".langTitle").text('')
    $(".tourSelect").hide();
  } else {
    $(".langTitle").text(gui.tourSelect[localStorage.lang])
    $(".lang").hide();
    $(".tourSelect").show();
  }
}

function buildCard(){
  let container = ".tourSelect>div";
  let imgDir = "img/ico/";
  for(k in gui.tour){
    let txtLang = localStorage.getItem('lang') === 'ita' ? gui.tour[k].itaTxt : gui.tour[k].engTxt;
    let row = $("<div/>",{class:'row'}).appendTo(container);
    let col = $("<div/>", {class:'col'}).appendTo(row);
    let card = $("<div/>",{class:'card mb-3', id:k}).appendTo(col);
    let innerRow = $("<div/>",{class:'row no-gutters'}).appendTo(card);
    let innerImgCol = $("<div/>", {class:'col-4 p-2 bg-secondary'}).appendTo(innerRow);
    let innerTxtCol = $("<div/>", {class:'col-8'}).appendTo(innerRow);
    let img = $("<img/>",{class:'card-img', src:imgDir+gui.tour[k].logo}).appendTo(innerImgCol);
    let body =$("<div/>",{class:'card-body'}).appendTo(innerTxtCol);
    let title =$("<h5/>",{class:'card-title txt-titleApp font-weight-bold', text:gui.tour[k].titolo}).appendTo(body);
    let text =$("<p/>",{class:'card-text text-dark', text:txtLang}).appendTo(body);
    let link =$("<a/>",{class:'card-link btn btn-sm btn-primary', href:gui.tour[k].link, target:'_blank', text:'open app'}).appendTo(body);

  }

}
