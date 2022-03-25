let lang = getLang();
if(!lang){setLang('it');}
let pageFull = getPage();
let page = pageFull.split('.');

$(document).ready(function() {
  $("header").load('asset/header.html');
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
