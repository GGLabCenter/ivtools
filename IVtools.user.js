// ==UserScript==
// @name     IVtools
// @version  0.0.1
// @grant    comfort
// @namespace     https://github.com/GGLabCenter/ivtools
// @description	  IV tools to make life easier
// @author        @gabrieleguerrisi
// @match         https://instantview.telegram.org/contest
// @grant    GM_addStyle
// ==/UserScript==

(function(){
      
  function GM_addStyle (cssStr) {
      var D               = document;
      var newNode         = D.createElement ('style');
      newNode.textContent = cssStr;

      var targ    = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
      targ.appendChild (newNode);
  }
  GM_addStyle(`
              .contest-item-btn-success::before { content: none; }
              `);
  
  for (let el of document.querySelectorAll('.dev_side_image')) el.style.visibility = 'hidden';
  
  var items = document.querySelectorAll('.contest-item-btn-success');
  for (i=0; i<items.length; i++){
    var g = (i+1);
    var num = document.createElement('b');
    num.textContent = g + " ";
    num.setAttribute("class", "contest-item-btn");
    items[i].parentNode.insertBefore(num, items[i]);
  }
  
  var mainDiv = document.querySelector(".row");
  var div = document.createElement('div');

  var youWon = 0;
  var winning = 0;
  var freeDomains = 0;
  var firstFree = 0;
  var domain;
  var items = document.querySelectorAll('.list-group-contest-item');
  var totals = items.length
  for(i=0; i<items.length; i++){
    domain = items[i];
    var whereAreYou = domain.querySelectorAll('.you-are-candidate').length;
    var whereEnded = domain.querySelectorAll('.status-winner').length;
    var freDomains = domain.querySelectorAll('.has-info').length;
    if (freDomains == 0){
        freeDomains+=1;
        if (firstFree == 0){
          domain.setAttribute("id","firstFree");
          
        }
      
    }else if(whereAreYou>0 && whereEnded>0){
       youWon +=1;
    }else if(whereAreYou>0 && whereEnded == 0){
       winning +=1;
    }
  }
  div.textContent += " ?? You have "+ document.querySelectorAll('.contest-item-btn-success').length + " active templates";
  div.setAttribute('class', '');
  div.setAttribute('style', 'width: 300px; overflow-y:hidden;');              
                  
  var p = document.createElement('p');
  p.textContent = " ?? You are winning in "+ document.querySelectorAll('.you-are-candidate').length + "";
  p.setAttribute('class', 'nav nav-pills nav-stacked');
  
  var yWinning = document.createElement('p');
  yWinning.textContent = " ?? You are winning in "+ winning + " domains";
  var yWon = document.createElement('p');
  yWon.textContent = " ? You won on "+ youWon + " domains";
  var fDomains = document.createElement('p');
  fDomains.textContent = " ?? Free open domains: "+ freeDomains + "/"+totals+"!";
  if (freeDomains > 0){
    var see = document.createElement('a');
    see.textContent= " See";
    see.setAttribute("href", "#firstFree");
    see.onclick = function(){
      document.getElementById('firstFree').scrollIntoView(); 
  }; 
    fDomains.appendChild(see);
  }
  div.setAttribute("style","padding: 10px 0 30px 20px; position: fixed; top: 68px; bottom: 0; width: 300px;");
 
  div.appendChild(yWinning);
  div.appendChild(yWon);
  div.appendChild(document.createElement('hr'));
  div.appendChild(fDomains);
  document.body.appendChild(div);
  
  const parent = document.getElementById("dev_page_content");
  while (parent.firstChild) {
      parent.firstChild.remove();
  }
  document.getElementById('header-panel').parentNode.parentNode.remove();
  
})();
