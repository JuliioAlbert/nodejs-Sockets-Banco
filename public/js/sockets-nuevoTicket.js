let socket = io();

let titulo = $('#lblNuevoTicket');

//escuchar cuando se conecta a le servidor 
socket.on('connect', function(){
    console.log('Conectado a el servidor')
});
//Escuchar cuando se desconecta a el servidor 
socket.on('disconnect', function(){
    console.log('Conectado a el servidor')
});



$('button').on('click', function(){
     //Enviar Algo al servidor
   socket.emit('siguienteTicket');
   socket.on('sig', function(siguiente){
      titulo.text(siguiente);
   })
});
//Escuchar 
