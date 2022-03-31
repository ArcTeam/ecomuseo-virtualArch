let lang = getLang();
if(!lang){setLang('it');}
let pageFull = getPage();
let page = pageFull.split('.');
let header ={
  it:{
    title:"inclusività sulla via <span>Claudia Augusta</span>",
    subTitle:"valorizzazione del tratto <span>lavis-trento</span>"
  },
  en:{
    title:"inclusivity on via <span>Claudia Augusta</span>",
    subTitle:"enhancement of the <span>Lavis-Trento</span> stretch "
  },
  de:{
    title:"Inklusion auf der via <span>Claudia Augusta</span>",
    subTitle:"Revitalisierung der Strecke <span>lavis-trento</span>"
  }
}

$(document).ready(function() {
  $("header").load('asset/header.html',initHeader);
  $("#wrapMenu").load('asset/menu.html');
  $("footer").load('asset/footer.html');
  $('#openMenu')
    .mouseover(function() { $(this).addClass("opened");})
    .mouseout(function() { $(this).removeClass("opened");})
  $("body").on('click',"[name=langSel]", function(){
    setLang($(this).val())
    location.reload();
  })
  $("body").on('click',"[name=fontSize]", function(){
    fontSize($(this).val())
  })
});

function initHeader(){
  $("#titolo > div").html(header[lang].title);
  $("#subText").html(header[lang].subTitle);
}
function setLang(lang){ localStorage.setItem("lang",lang); }
function getLang(){ return localStorage.getItem("lang");}
function clearAll(){ localStorage.clear();}
function getPage(){return(location.pathname.substring(location.pathname.lastIndexOf('/')+1));}
function fontSize(val){
  let size = parseInt($("main").css("font-size"));
  size == 16 ? $("#fontDec").prop("disabled", true) : $("#fontDec").prop("disabled", false)
  size == 25 ? $("#fontInc").prop("disabled", true) : $("#fontInc").prop("disabled", false)
  let newSize = val == 'inc' ? size + parseInt(1) : size - parseInt(1);
  $("main").css("font-size", newSize)
}
function nl2br(str){return str.replace(/(?:\r\n|\r|\n)/g, '<br>');}
function cutString(str,length){ return str.split(' ').slice(0, length).join(' ') }

// jquery extend function
$.extend({
  redirectPost: function(location, args){
    const form = $('<form></form>');
    form.attr("method", "post");
    form.attr("action", location);
    $.each( args, function( key, value ) {
      let field = $('<input></input>');
      field.attr("type", "hidden");
      field.attr("name", key);
      field.attr("value", value);
      form.append(field);
    });
    $(form).appendTo('body').submit();
  }
});

//$.redirectPost('workPage.php', {id: v.id});
