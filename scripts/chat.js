//----------------------- add new chat documnents-----------------------------------

class Chatroom{
    constructor(room,username){
        this.room = room;
        this.username = username;
        this.chats = db.collection("chats");
        this.unsub;
        this.id=id;
    }

    async addChat(message,id){
        // format a chat object
        id = doSmths(id);
        console.log(id);
        const now = new Date();
        const chat = {
            message,
            userid:id,
            username:this.username,
            room:this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        }  
        // save the chat document
        const response = await this.chats.add(chat);
        return response;
    }

    getChats(callback){
        let arr = [];
        let type = '';
      this.unsub =  this.chats
            .where("room", "==", this.room)
            .orderBy('created_at')
            .onSnapshot(snapshot=>{
                snapshot.docChanges().forEach(change=>{
                    type = change.type;
                    if(change.type==="added"){
                        console.log(change.type);
                        arr.push({...change.doc.data(), id: change.doc.id});
                        // callback(change.doc.data());
                    }
                })
                // console.log(arr)
                if(type === 'added'){
                    callback(arr);
                    arr = [];
                    type = '';
                }
            })
    }
    updateName(username){
        this.username = username;
       
    }
    updateRoom(room){
        this.room = room;

        console.log("room updated");
        if(this.unsub){
            this.unsub();
        }
    }
    getrandomnum(min,max){
        return Math.floor(Math.random()*100000000);
        
    }
    deleteMessage(id){
        this.chats.doc(id).delete()
        .then(() => {
            console.log('deleted');
        })
        .catch(err => console.log(err))
    }
    
  


}



// chatroom.addChat("Hello everyone").then(()=>{
//     console.log("chat added");
// }).catch(err=>{
//     console.log(err);
// })



// setTimeout(() => {
//     chatroom.updateRoom("gaming");
//     chatroom.updateName("Mohit");
//     chatroom.getChats((data)=>{
//         console.log(data);
//     })
//     chatroom.addChat("hello");
// }, 3000);