const form= 
  document.querySelector("form");

form.addEventListener("submit", (e)=>{
  e.preventDefault();
  const data = new FormData(form);
  const reqBody = Object.fromEntries(data);

  fetch("/menu",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(reqBody)
  })
  
  .then(()=>{
    window.location.href="/menu"
  }).then ((response)=>{
    if(response.redirected){
      window.location.href= repsonse.url;
    }else{
      window.location.href="/";
    }
  })
  
})