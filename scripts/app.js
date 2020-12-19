// dom queries


let id="";
let newperson="";
const chatList = document.querySelector("#msg");
const send = document.querySelector("#send");
const chatting = document.querySelector("#text");
const update = document.querySelector("#update-name");
const name = document.querySelector("#name-text");
const rooms = document.querySelector("#buttons");
const shortmsg = document.querySelector("#short-msg");
const genbtn = document.querySelector("#general");
document.addEventListener('DOMContentLoaded', () => {
    genbtn.classList.add('active');
})
// const removemsg = document.querySelector("html");





// update the room

rooms.addEventListener("click",e=>{
      if(e.target.tagName === "BUTTON"){
          document.querySelectorAll('.roombtn').forEach(x => {
              if(x.classList.contains('active')){
                x.classList.remove('active')
              }
          })
          e.target.classList.add('active');
          chatUI.clear();
          chatroom.updateRoom(e.target.getAttribute('id'));
          chatroom.getChats(chat=>{
              chatUI.render(chat)
              addEvents();
          });
      }
})
// document.addEventListener('DOMContentLoaded',checklocal);

    if(localStorage.getItem("name")){
        newperson = localStorage.getItem("name")
    }
    else{
        newperson = "anon";
    }
    chatUI = new chatUI(chatList);
    const chatroom = new Chatroom("general",newperson);


// class instance


// chatroom.updateName(newperson);

send.addEventListener("click",e=>{
    let id = localStorage.getItem("id");
    e.preventDefault();
   const message = chatting.value.trim();
   chatting.value="";
   chatroom.addChat(message,id).then(()=>{
       
   }).catch(err=>{
       console.log(err);
   })
})


update.addEventListener("click",e=>{
    e.preventDefault();
    const newName = name.value.trim();
    chatroom.updateName(newName);
    name.value="";
    addtolocalstorage(newName);
    shortmsg.textContent=`your name was updated to ${newName}`;
    setTimeout(() => {
        shortmsg.textContent="";
    }, 2000);

})



if(!(localStorage.getItem("id"))){
     localStorage.setItem("id",doSmth(chatroom.getrandomnum()));
}



function addtolocalstorage(person){
    
    localStorage.setItem("name",person);
}




// get chats and render
chatroom.getChats((data)=>{
    chatUI.render(data);
    addEvents();
})
function addEvents(){
    let id = localStorage.getItem('id');
    document.querySelectorAll(".remove").forEach(item=>{
        if(item.getAttribute('data-uid') === doSmths(id)){
            item.addEventListener("click",e=>{
                console.log(e.target.getAttribute('data-id'));
                chatroom.deleteMessage(e.target.getAttribute('data-id'));
                e.target.parentElement.remove()
            })
        }
    })
}
