const socket = io();
let user;
let chatBox = document.getElementById('chatBox');
Swal.fire({
    title:"Identificate",
    input:"text",
    text:"Ingrese el nombre que utilizaras el chat",
    inputValidator: (value)=>{
        return !value && "identificate para usar el chat "
    },
    allowOutsideClick:false
}).then(result=>{
    user=result.value;
    socket.emit('registered',user);
})

chatBox.addEventListener('keyup',(etv)=>{
    if(etv.key==="Enter"){
        if(chatBox.value.trim().length>0)
        socket.emit('message',{user:user,message:chatBox.value})
        chatBox.value="";
    }
})

//SOCKETs
socket.on('newUser',(data)=>{
        Swal.fire({
            icon:"success",
            text:"Usiario nuevo conectado",
            toast:true,
            position:"top-right",
        })
})
socket.on('log',data=>{
    let log = document.getElementById('log')
    let messages = "";
    data.forEach(message=>{
        messages = messages+ `${message.user} dice: ${message.message} </br>`;
    })
    log.innerHTML = messages;
})