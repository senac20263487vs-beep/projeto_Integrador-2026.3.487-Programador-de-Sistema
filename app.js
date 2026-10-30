const products = [
  {id:'001',name:'Arroz Branco 1kg',brand:'Coringa',price:3.50,stock:50,supplier:'Grupo Coringa',expiry:'06/07/2028',sold:1254},
  {id:'002',name:'Feijão Carioca 1kg',brand:'Camil',price:4.60,stock:64,supplier:'Camil Alimentos',expiry:'06/03/2027',sold:980},
  {id:'003',name:'Açúcar Cristal 1kg',brand:'Caeté',price:3.15,stock:42,supplier:'Grupo Carlos Lyra',expiry:'04/09/2027',sold:895},
  {id:'004',name:'Café Maratá Torrado e Moído 250g',brand:'Maratá',price:7.80,stock:35,supplier:'Grupo Maratá',expiry:'30/12/2026',sold:650},
  {id:'005',name:'Goma de Mandioca p/ Tapioca Canaã 1kg',brand:'Canaã',price:7.94,stock:22,supplier:'Farinha Canaã',expiry:'02/09/2027',sold:510},
  {id:'006',name:'Flocão de Milho Coringa 500g',brand:'Coringa',price:1.99,stock:68,supplier:'Grupo Coringa',expiry:'26/09/2027',sold:480},
  {id:'007',name:'Flocão de Milho Maratá 500g',brand:'Maratá',price:1.85,stock:57,supplier:'Grupo Maratá',expiry:'17/05/2027',sold:430},
  {id:'008',name:'Molho de Tomate Popular Tradicional 300g',brand:'Popular',price:2.59,stock:18,supplier:'Popular Alimentos',expiry:'03/02/2027',sold:390},
  {id:'009',name:'Molho de Tomate Julieta Tradicional 310g',brand:'Julieta',price:2.54,stock:15,supplier:'Julieta Alimentos',expiry:'19/08/2027',sold:355},
  {id:'010',name:'Margarina Primor com Sal 500g',brand:'Primor',price:5.60,stock:11,supplier:'Grupo JBS',expiry:'31/10/2027',sold:310},
  {id:'011',name:'Margarina Qualy com Sal 500g',brand:'Qualy',price:7.34,stock:14,supplier:'Qualy Distribuidora',expiry:'09/04/2028',sold:280},
  {id:'012',name:'Leite em Pó Integral Camponesa 200g',brand:'Camponesa',price:7.50,stock:10,supplier:'Grupo Alvoar Lácteos',expiry:'11/08/2027',sold:245}
];
const money = n => n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function renderDashboard(query='') {
  const list = products.filter(p => (p.name+' '+p.brand+' '+p.id+' '+p.supplier).toLowerCase().includes(query.toLowerCase()));
  document.querySelector('#stockRows').innerHTML = list.map(p=>`<tr><td>${p.id}</td><td>${esc(p.name)}</td><td>${esc(p.brand)}</td><td>${money(p.price)}</td><td>${p.stock} un.</td><td>${esc(p.supplier)}</td><td>${p.expiry}</td></tr>`).join('');
  document.querySelector('#stockFoot').textContent = `Total de Produtos: ${list.length} • Total em Estoque: ${list.reduce((s,p)=>s+p.stock,0)} unidades • Valor Total em Estoque: ${money(list.reduce((s,p)=>s+p.stock*p.price,0))}`;
  document.querySelector('#topBars').innerHTML = list.slice().sort((a,b)=>b.sold-a.sold).slice(0,5).map(p=>`<div class="barrow"><div class="barlabel">${esc(p.name)}</div><div class="bartrack"><div class="bar" style="width:${Math.max(5,p.sold/1400*100)}%" title="${p.sold} unidades"></div></div></div>`).join('');
  document.querySelector('#reorderList').innerHTML = list.filter(p=>p.stock<=15).slice(0,4).map(p=>`<li>${esc(p.name)}</li>`).join('');
  document.querySelector('#attentionList').innerHTML = list.filter(p=>p.stock>15&&p.stock<=25).slice(0,5).map(p=>`<li>${esc(p.name)}</li>`).join('');
}
document.querySelector('#searchInput').addEventListener('input',e=>renderDashboard(e.target.value));
document.querySelector('#nav').addEventListener('click',e=>{const btn=e.target.closest('[data-page]');if(!btn)return;document.querySelectorAll('.nav-link').forEach(b=>b.classList.toggle('active',b===btn));const titles={dashboard:'Dashboard',produtos:'Produtos',insumos:'Insumos',demandas:'Demandas',validade:'Validade',estoque:'Alerta de Estoque',vendas:'Caixa e PDV'};document.querySelector('#pageTitle').textContent=titles[btn.dataset.page];if(btn.dataset.page!=='dashboard'){document.querySelector('#content').innerHTML=`<section class="simple-page"><h2>${titles[btn.dataset.page]}</h2><p>Esta seção está representada no protótipo visual. Para habilitar cadastro, relatórios e operações completas, conecte os formulários a uma API/backend.</p><button class="back-btn" id="backDashboard">Voltar ao Dashboard</button></section>`;document.querySelector('#backDashboard').addEventListener('click',()=>location.reload());}});
document.querySelector('#menuBtn').addEventListener('click',()=>document.querySelector('#sidebar').classList.toggle('open'));
document.querySelector('#periodBtn').addEventListener('click',()=>{const start=prompt('Data inicial (DD/MM/AAAA):','01/10/2026');if(start===null)return;const end=prompt('Data final (DD/MM/AAAA):','20/10/2026');if(end===null)return;document.querySelector('#periodBtn').textContent=`Período: ${start} – ${end}`;});
renderDashboard();
