class chatUI{
    constructor(list){
        this.list = list;
    }
    
    clear(){
        this.list.innerHTML = "";
    }

    render(data){
        console.log('called');
        data.forEach(x => {
            const when = dateFns.distanceInWordsToNow(
                x.created_at.toDate(),
                {addSuffix:true}
                );
                const html=`
                
                <li class="list-items">
                <span class="username">${x.username} :</span>
                <span class="messages">${x.message}</span>
                <div class="time">${when}</div>
                <button class="remove" data-id="${x.id}" data-uid="${x.userid}">X</button>
                </li>
                `
            
                this.list.innerHTML+=html;
                
        })
        document.querySelectorAll('.list-items').forEach(item => {
            item.addEventListener('click', e => {
            if(e.target.tagName === "LI"){
                if(e.target.lastElementChild.classList.contains("check")){
                    e.target.lastElementChild.classList.remove("check");
                }
                else{
                    e.target.lastElementChild.classList.add("check");
                }
            }
            }
            )
        })
        window.document.querySelector('.msg').scrollBy(0, 2000);
    }
}