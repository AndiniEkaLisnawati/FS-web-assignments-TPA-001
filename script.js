const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

// Year
$("#year") && ($("#year").textContent = new Date().getFullYear());

//Mobile nav 
const navBtn = $(".nav-toggle");
const nav = $("[data-js='nav']");
if (navBtn && nav){
  navBtn.addEventListener("click", () => {
    const expanded = navBtn.getAttribute("aria-expanded") === "true";
    navBtn.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("open");
  });
}


const typing = $(".typing");
if (typing){
  const words = JSON.parse(typing.getAttribute("data-words") || "[]");
  let i=0, char=0, dir=1;
  const tick = () => {
    typing.textContent = words[i].slice(0, char);
    char += dir;
    if (char === words[i].length + 1){ dir = -1; }
    if (char === 0){ dir = 1; i = (i+1) % words.length; }
    setTimeout(tick, dir>0 ? 80 : 40);
  };
  tick();
}

const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if (e.isIntersecting){
      e.target.classList.add("in-view");
      io.unobserve(e.target);
    }
  });
},{threshold:0.2});
$$(".reveal").forEach(el=>io.observe(el));
$$(".skill[data-level]").forEach(s => {
  const level = Math.min(100, Math.max(0, parseInt(s.getAttribute("data-level")||"0",10)));
  const bar = $(".bar", s);
  if (bar){ requestAnimationFrame(()=> bar.style.width = level + "%"); }
});




const form = $("#contact-form");
if (form){
  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const name = $("#name").value.trim();
    const email = $("#email").value.trim();
    const message = $("#message").value.trim();
    let ok = true;

    const setError = (id, msg) => { const el = $("#"+id).nextElementSibling; if (el) el.textContent = msg; };
    ["name","email","message"].forEach(id => setError(id,""));

    if (!name){ setError("name","Name is required."); ok=false; }
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)){ setError("email","Enter a valid email."); ok=false; }
    if (message.length < 10){ setError("message","Message should be at least 10 characters."); ok=false; }

    if (ok){
      alert("Thanks! Your message has been sent (demo).");
      form.reset();
    }
  });
}