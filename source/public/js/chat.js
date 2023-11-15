const socketClient = io();
const evName = document.getElementById('name');
const showChat = document.getElementById('chatList');

Swal.fire({
    title: 'Bienvenido',
    text: 'Indique su nombre',
    input: 'text',
    inputValidator: (value) => {
        if(!value){
            return 'nombre es requerido'
        }
    },
    confirmButtonText: 'Aceptar'
  }).then(input=>{
    user = input.value;
    //evName.innerText = user;
    socketClient.emit('newUser', user)
  });


  socketClient.on('addNew', (newChatList) =>{

    const chat = newChatList.map((c) => {
            return `<h4>Usuario : ${c.user}</h4>
                    <h4>Detalle : ${c.message}</h4>
                    <hr>`;
        }).join(" ");

    showChat.innerHTML = chat;
});