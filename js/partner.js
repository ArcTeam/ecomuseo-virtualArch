$(document).ready(function() {
  partner.forEach((item, i) => {
    let col = $("<div/>",{class:'col-12'}).appendTo('#partnersWrap');
    let card = $("<div/>",{class:'card'}).appendTo(col);
    $("<img/>",{src:'img/partner/'+item.logo, class:'m-auto'}).appendTo(card);
    let body = $("<div/>",{class:'card-body'}).appendTo(card);
    let footer = $("<div/>",{class:'card-footer'}).appendTo(card);
    $("<h5/>",{class:'card-title fw-bold text-center'}).text(item.nome).appendTo(body);
    $("<div/>",{class:'desc'}).html(item.desc).appendTo(body)
    $("<a/>",{href:item.url, target:'_blank', class:'btn btn-sm btn-secondary'}).text('#web site').appendTo(footer)
  });
});
