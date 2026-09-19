const products=[
{id:1,name:"Produit Exemple 1",price:2500,image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",desc:"Produit pratique et de qualité."},
{id:2,name:"Produit Exemple 2",price:1800,image:"https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80",desc:"Une solution simple pour votre quotidien."},
{id:3,name:"Produit Exemple 3",price:3200,image:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",desc:"Design moderne et utilisation facile."},
{id:4,name:"Produit Exemple 4",price:1500,image:"https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=800&q=80",desc:"Bon rapport qualité-prix."}
];
let cart=[];
const money=n=>n.toLocaleString("fr-FR")+" DA";
function renderProducts(){
 const q=document.getElementById("search").value.toLowerCase();
 const list=products.filter(p=>p.name.toLowerCase().includes(q));
 document.getElementById("productsGrid").innerHTML=list.map(p=>`<article class="card"><img src="${p.image}" alt="${p.name}"><div class="card-body"><h3>${p.name}</h3><p>${p.desc}</p><div class="price">${money(p.price)}</div><button onclick="add(${p.id})">Ajouter au panier</button></div></article>`).join("");
}
function add(id){const p=products.find(x=>x.id===id);const i=cart.find(x=>x.id===id);i?i.qty++:cart.push({...p,qty:1});updateCart();openCart()}
function updateCart(){document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0)}
function openCart(){renderCart();document.getElementById("cartModal").classList.remove("hidden")}
function closeCart(){document.getElementById("cartModal").classList.add("hidden")}
function renderCart(){
 const el=document.getElementById("cartItems");
 if(!cart.length){el.innerHTML="<p>Votre panier est vide.</p>";document.querySelector("#cartModal .full").disabled=true}else{
 el.innerHTML=cart.map(x=>`<div class="item"><span>${x.name} × ${x.qty}</span><b>${money(x.price*x.qty)}</b></div>`).join("");document.querySelector("#cartModal .full").disabled=false}
 document.getElementById("cartTotal").textContent=money(cart.reduce((s,x)=>s+x.price*x.qty,0));
}
function showOrder(){if(cart.length){closeCart();document.getElementById("orderModal").classList.remove("hidden")}}
function closeOrder(){document.getElementById("orderModal").classList.add("hidden")}
function submitOrder(e){
 e.preventDefault();
 const WHATSAPP_NUMBER="213561716497"; // Remplace par ton numéro, ex: 213555123456
 if(WHATSAPP_NUMBER.includes("X")){
   alert("Configure ton numéro WhatsApp dans script.js : WHATSAPP_NUMBER=\"213XXXXXXXXX\"");
   return;
 }
 const f=new FormData(e.target);
 const total=cart.reduce((sum,x)=>sum+x.price*x.qty,0);
 const lines=cart.map(x=>`• ${x.name} x${x.qty} = ${money(x.price*x.qty)}`).join("\n");
 const msg=`🛍️ *NOUVELLE COMMANDE - BOUTIQUE DZ*\n\n${lines}\n\n💰 *Total : ${money(total)}*\n\n👤 Nom : ${f.get("name")}\n📞 Téléphone : ${f.get("phone")}\n📍 Wilaya : ${f.get("wilaya")}\n🏘️ Commune : ${f.get("commune")}\n🏠 Adresse : ${f.get("address")}\n\n💵 Paiement à la livraison`;
 const url=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
 window.open(url,"_blank");
 cart=[]; updateCart(); closeOrder(); e.target.reset();
}
renderProducts();updateCart();
