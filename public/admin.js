console.log("Admin runnning");
const buttons = document.querySelectorAll(".adminButton");

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", (e) => {
    fetch("/Menu/" + buttons[i].id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  });
}

const updateButton = document.querySelectorAll("form");
for (let i=0; i<updateButton.length; i++){
  updateButton[i].addEventListener("submit",(e)=>{
    e.preventDefault()
    const itemData = new FormData (updateButton[i]);
    const reqBody = Object.fromEntries(itemData);
    fetch("/menu/" + updateButton[i].dataset.id, {
      method:"PATCH",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(reqBody)
    })
    .then(()=>{
      window.location.href="/admin"
    })
  })
}


