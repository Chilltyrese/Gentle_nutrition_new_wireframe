// Gentle Nutrition Stage 1: local-only interactions. No tracking, checkout or data collection.
const menuToggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#main-nav');
if(menuToggle&&nav){
 menuToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));});
 nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');}));
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.focus();}});
}
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
const search=document.querySelector('#product-search');
if(search){const cards=[...document.querySelectorAll('#products-list .product-card')];const count=document.querySelector('#results-count');const empty=document.querySelector('#empty-results');search.addEventListener('input',()=>{const q=search.value.trim().toLowerCase();let visible=0;cards.forEach(card=>{const match=card.textContent.toLowerCase().includes(q);card.hidden=!match;if(match)visible++;});count.textContent=`${visible} result${visible===1?'':'s'} found`;empty.hidden=visible!==0;});}
const products={
 guide:{name:'Gentle Nutrition Guide',price:'£9.99',headline:'Your Personal Guide to a Healthy Lifestyle — Without Guilt or Rules',description:'An introduction to the Gentle Nutrition philosophy and everyday practice. Full contents pending review.',format:'73-page PDF.',delivery:'After payment you’ll receive your download link.'},
 challenge:{name:'30-Day Challenge',price:'£29.99',headline:'A daily invitation to reconnect with your body… gently',description:'A guided programme with a PDF and 16 cards. Full contents pending review.',format:'44-page PDF and 16 cards.',delivery:'After payment you’ll receive your download link.'},
 lunchboxes:{name:'School Lunch Boxes Guide',price:'£9.99',headline:'A calm, illustrated resource for school lunch-boxes',description:'Practical packed-lunch ideas for parents and carers. Full contents pending review.',format:'12-page PDF.',delivery:'After payment you’ll receive your download link.'},
 constructors:{name:'Constructors',price:'Free',headline:'Mix. Match. Make it yours.',description:'Five meal-building PDFs. Ukrainian language pending verification.',format:'Digital guides.',delivery:'Download instantly — no payment needed.'}
};
const detailName=document.querySelector('#detail-name');
if(detailName){
 const $=s=>document.querySelector(s);
 const id=new URLSearchParams(location.search).get('id');const item=products[id];
 if(!item){
  detailName.textContent='Product not found';$('#crumb-name').textContent='Not found';
  $('#detail-description').textContent='Please select a product from the catalogue.';
  ['#detail-headline','.rating-row','#detail-price','.pdp-rest','.pdp-extra','#buy-bar'].forEach(s=>{const e=$(s);if(e)e.hidden=true;});
 }else{
  let label='Demo — payment coming soon';
  if(id==='constructors')label='Demo — download coming soon';
  if(id==='lunchboxes')label='Not yet available';
  detailName.textContent=item.name;$('#crumb-name').textContent=item.name;
  $('#detail-headline').textContent=item.headline;$('#detail-price').textContent=item.price;
  $('#detail-description').textContent=item.description;$('#detail-contents').textContent=item.format;
  $('#detail-format').textContent=item.format;
  $('#detail-delivery').textContent=id==='lunchboxes'?'Not yet published — purchase unavailable.':item.delivery;
  $('#detail-cover').innerHTML='<div class="cover cover-large"><img class="product-cover-image" src="assets/'+id+'.webp" alt="'+item.name+' cover"></div>';
  document.title=item.name+' | Gentle Nutrition Demo';
  $('.wide-btn').textContent=label;$('#buy-bar-btn').textContent=label;
  // preview carousel: cover plus labelled placeholders until approved preview images exist
  const total=3;let cur=0;
  const slide=i=>i===0?'<img class="product-cover-image" src="assets/'+id+'.webp" alt="">':'<div class="slide-ph"><strong>Preview '+(i+1)+'</strong><span>Approved preview images pending</span></div>';
  const draw=()=>{$('#slide-prev').innerHTML=slide((cur+total-1)%total);$('#slide-next').innerHTML=slide((cur+1)%total);$('#slide-cur').innerHTML=cur===0?'<img class="product-cover-image" src="assets/'+id+'.webp" alt="'+item.name+' cover, preview 1 of '+total+'">':slide(cur);$('#car-status').textContent='Preview '+(cur+1)+' of '+total;};
  $('#car-prev').addEventListener('click',()=>{cur=(cur+total-1)%total;draw();});
  $('#car-next').addEventListener('click',()=>{cur=(cur+1)%total;draw();});
  draw();
  // reviews: desktop shows them always; "View more" toggles extra placeholders
  const reviews=$('#reviews');const mq=window.matchMedia('(min-width:701px)');
  const sync=()=>{if(mq.matches)reviews.open=true;};
  if(mq.addEventListener)mq.addEventListener('change',sync);sync();
  $('#view-reviews').addEventListener('click',()=>{reviews.open=true;});
  const more=$('#reviews-more');
  more.addEventListener('click',()=>{const showing=more.getAttribute('aria-expanded')==='true';document.querySelectorAll('.review-extra').forEach(e=>e.hidden=showing);more.setAttribute('aria-expanded',String(!showing));more.textContent=showing?'View more reviews':'Show fewer reviews';});
  // recommendations: the other products
  $('#recs-grid').innerHTML=Object.keys(products).filter(k=>k!==id).map(k=>'<a class="product-card rec-card" href="product.html?id='+k+'"><div class="cover"><img class="product-cover-image" loading="lazy" src="assets/'+k+'.webp" alt="'+products[k].name+' cover"></div><div class="product-card-content"><h3>'+products[k].name+'</h3><p class="price-small">'+products[k].price+'</p></div></a>').join('');
 }
}
