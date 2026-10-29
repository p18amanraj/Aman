/* ===== EDIT HERE: booking links (Calendly, Cal.com, Topmate...). Leave "" to show the email fallback. ===== */
var BOOKING = {
  intro:   "",
  consult: "",
  mentor:  ""
};

function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}

/* mobile menu */
(function(){
  var b=document.getElementById("menu"), ul=document.getElementById("navlinks");
  if(!b||!ul) return;
  b.addEventListener("click",function(){var o=ul.classList.toggle("open");b.setAttribute("aria-expanded",o?"true":"false");b.textContent=o?"Close":"Menu"});
})();

/* copy buttons */
document.addEventListener("click",function(e){
  var b=e.target.closest("button[data-copy]"); if(!b) return;
  var text=b.dataset.copy==="email"?"p18amanr@gmail.com":b.dataset.copy==="phone"?"+91 96619 07313":b.dataset.copy;
  var src=document.getElementById(b.dataset.copy), label=b.textContent;
  function done(m){b.textContent=m;setTimeout(function(){b.textContent=label},1600)}
  function fallback(){if(!src){done(text);return}try{var r=document.createRange();r.selectNodeContents(src);var s=window.getSelection();s.removeAllRanges();s.addRange(r);done("Selected")}catch(_){}}
  try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(function(){done("Copied")},fallback)}else fallback()}catch(_){fallback()}
});

/* coverage map (Work page) */
(function(){
  var map=document.getElementById("map"), statesEl=document.getElementById("states");
  if(!map||!statesEl) return;
  var STATES={
    UP:{name:"Uttar Pradesh",yr:"2022 Assembly",acs:"403",rounds:"4",samples:"20L+",lvl:4,note:"Scaled the field force to 600+ agents and trained them on survey and sampling protocols."},
    GJ:{name:"Gujarat",yr:"2022 Assembly",acs:"182",rounds:"3",samples:"6.8L+",lvl:3,note:"Took control of a stalled program and cut a projected 15-day delay to 3."},
    DL:{name:"Delhi",yr:"2025 Assembly",acs:"70",rounds:"5",samples:"4L+",lvl:2,note:"Owned the program end to end. Called 77% of seats correctly, vote share within 3%.",extra:"Plus 9 rounds of statewide tracker surveys, 4,500+ samples each."},
    BR:{name:"Bihar",yr:"2025 Assembly",acs:"243",rounds:"1",samples:"3L+",lvl:1,note:"Baseline survey across all 38 districts, delivered on a fixed end date."}
  };
  var TILES=[["JK",2,0,"Jammu and Kashmir"],["LA",3,0,"Ladakh"],["PB",1,1,"Punjab"],["HP",2,1,"Himachal Pradesh"],["UK",3,1,"Uttarakhand"],["SK",5,1,"Sikkim"],["AR",6,1,"Arunachal Pradesh"],["RJ",0,2,"Rajasthan"],["HR",1,2,"Haryana"],["DL",2,2,"Delhi"],["UP",3,2,"Uttar Pradesh"],["BR",4,2,"Bihar"],["AS",5,2,"Assam"],["NL",6,2,"Nagaland"],["GJ",0,3,"Gujarat"],["MP",1,3,"Madhya Pradesh"],["CG",2,3,"Chhattisgarh"],["JH",3,3,"Jharkhand"],["WB",4,3,"West Bengal"],["ML",5,3,"Meghalaya"],["MN",6,3,"Manipur"],["MH",1,4,"Maharashtra"],["TS",2,4,"Telangana"],["OD",3,4,"Odisha"],["TR",5,4,"Tripura"],["MZ",6,4,"Mizoram"],["GA",0,5,"Goa"],["KA",1,5,"Karnataka"],["AP",2,5,"Andhra Pradesh"],["KL",1,6,"Kerala"],["TN",2,6,"Tamil Nadu"]];
  TILES.forEach(function(t){
    var code=t[0],s=STATES[code],el=document.createElement(s?"button":"div");
    el.className="tile"+(s?" on l"+s.lvl:""); el.style.gridColumn=t[1]+1; el.style.gridRow=t[2]+1; el.title=t[3];
    if(s){el.type="button";el.innerHTML=code+"<small>"+esc(s.samples)+"</small>";el.setAttribute("aria-label",t[3]+": "+s.samples+" samples");el.dataset.code=code;el.addEventListener("click",function(){select(code,true)});el.addEventListener("mouseenter",function(){select(code,false)})}
    else{el.textContent=code;el.setAttribute("aria-hidden","true")}
    map.appendChild(el);
  });
  ["UP","GJ","DL","BR"].forEach(function(code){
    var s=STATES[code],a=document.createElement("article");
    a.className="state";a.id="st-"+code;a.dataset.code=code;
    a.innerHTML='<div class="top"><h3>'+esc(s.name)+'</h3><span class="yr">'+esc(s.yr)+'</span></div><div class="nums"><div><b>'+s.acs+'</b><span>constituencies</span></div><div><b>'+s.rounds+'</b><span>round'+(s.rounds==="1"?"":"s")+'</span></div><div><b>'+esc(s.samples)+'</b><span>samples</span></div></div><p>'+esc(s.note)+'</p>'+(s.extra?'<div class="extra">'+esc(s.extra)+'</div>':'');
    a.addEventListener("mouseenter",function(){select(code,false)});
    statesEl.appendChild(a);
  });
  function select(code,scroll){
    document.querySelectorAll(".tile.on,.state").forEach(function(e){e.classList.toggle("sel",e.dataset.code===code)});
    if(scroll&&window.matchMedia("(max-width:900px)").matches){var el=document.getElementById("st-"+code);if(el)el.scrollIntoView({behavior:"smooth",block:"center"})}
  }
  select("UP",false);
})();

/* Delhi seats grid: 70 seats, 54 called correctly */
(function(){
  var seats=document.getElementById("seats"); if(!seats) return;
  for(var i=0;i<70;i++){var d=document.createElement("i");if(i<54)d.className="hit";seats.appendChild(d)}
})();

/* booking cards */
(function(){
  var sess=document.getElementById("sessions"); if(!sess) return;
  var SESSIONS=[
    {key:"intro",len:"20 min · Free",title:"Hiring conversation",who:"For recruiters and hiring managers",body:"A quick call about a role, my background, and whether it is a fit. Bring the job description.",featured:true},
    {key:"consult",len:"30 min",title:"Survey and field operations",who:"For campaigns, research agencies and NGOs",body:"Sampling plans, field team setup, quality and fraud controls, or rescuing a survey that is running late."},
    {key:"mentor",len:"30 min",title:"UPSC and career guidance",who:"For aspirants and career switchers",body:"Planning a working professional's UPSC preparation, answer writing, or moving between civil services prep and a corporate career."}
  ];
  SESSIONS.forEach(function(s){
    var link=BOOKING[s.key],d=document.createElement("article");
    d.className="session lift"+(s.featured?" featured":"");
    d.innerHTML='<span class="len">'+esc(s.len)+'</span><h3>'+esc(s.title)+'</h3><span class="whoami">'+esc(s.who)+'</span><p>'+esc(s.body)+'</p>'+
      (link?'<a class="btn primary" href="'+esc(link)+'" target="_blank" rel="noopener">Choose a time <span class="arr" aria-hidden="true">→</span></a>'
           :'<button class="btn '+(s.featured?"primary":"ghost")+'" type="button" data-copy="email">Copy email to schedule</button><span class="soon">Online booking opens soon</span>');
    sess.appendChild(d);
  });
})();

/* weekly stock picks (Markets page). Data comes from picks/picks.js -> window.PICKS */
(function(){
  var root=document.getElementById("picks-root"); if(!root) return;
  var weeks=(window.PICKS||[]).slice().sort(function(a,b){return a.date<b.date?1:-1});
  var bar=document.getElementById("weekbar");
  function fmt(d){try{return new Date(d+"T00:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}catch(_){return d}}
  if(!weeks.length){
    bar.hidden=true;
    root.innerHTML='<div class="empty"><div class="ic" aria-hidden="true">₹</div><h3>The first weekly picks go up this weekend</h3><p>Every Saturday or Sunday I add a few stocks I have picked for my own portfolio, with chart screenshots and my notes.</p></div>';
    return;
  }
  function render(w){
    var html='<div class="weekhead"><h2>'+esc(w.label||("Week of "+fmt(w.date)))+'</h2><span class="date">Published '+esc(fmt(w.date))+' · '+w.stocks.length+' stock'+(w.stocks.length===1?"":"s")+'</span></div>';
    if(w.summary) html+='<p class="weeksum">'+esc(w.summary)+'</p>';
    html+='<div class="picks">';
    w.stocks.forEach(function(s){
      html+='<article class="pick">';
      if(s.images&&s.images.length){
        html+='<div class="shots">'+s.images.map(function(src,i){return '<button type="button" data-zoom="'+esc(src)+'" aria-label="Enlarge '+esc(s.symbol)+' screenshot '+(i+1)+'"><img src="'+esc(src)+'" alt="'+esc(s.symbol)+' chart screenshot '+(i+1)+'" loading="lazy"></button>'}).join("")+'</div>';
      }
      html+='<div class="body"><div class="sym"><h3>'+esc(s.symbol)+'</h3>'+(s.exchange?'<span class="ex">'+esc(s.exchange)+'</span>':'')+'</div>'+
        (s.name?'<div class="name">'+esc(s.name)+'</div>':'')+
        '<div class="note">'+esc(s.note)+'</div>'+
        '<div class="foot">Personal pick · not a recommendation</div></div></article>';
    });
    html+='</div>';
    root.innerHTML=html;
  }
  function show(date){
    var w=weeks.filter(function(x){return x.date===date})[0]||weeks[0];
    bar.querySelectorAll(".weekbtn").forEach(function(b){b.setAttribute("aria-pressed",b.dataset.date===w.date?"true":"false")});
    render(w);
  }
  weeks.forEach(function(w,i){
    var b=document.createElement("button");b.type="button";b.className="weekbtn";b.dataset.date=w.date;b.textContent=(i===0?"Latest · ":"")+fmt(w.date);
    b.addEventListener("click",function(){show(w.date);try{history.replaceState(null,"","#w"+w.date.replace(/-/g,""))}catch(_){}});
    bar.appendChild(b);
  });
  var h=(location.hash||"").match(/^#w(\d{4})(\d{2})(\d{2})$/);
  show(h?h[1]+"-"+h[2]+"-"+h[3]:weeks[0].date);

  /* lightbox */
  var lb=document.getElementById("lightbox"), lbi=document.getElementById("lightbox-img");
  root.addEventListener("click",function(e){var t=e.target.closest("[data-zoom]");if(!t)return;lbi.src=t.dataset.zoom;lbi.alt=t.getAttribute("aria-label")||"";lb.hidden=false});
  function close(){lb.hidden=true;lbi.removeAttribute("src")}
  lb.addEventListener("click",close);
  document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!lb.hidden)close()});
})();
