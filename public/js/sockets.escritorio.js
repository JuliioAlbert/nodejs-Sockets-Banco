let socket = io();

var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location= 'index.html';
    throw new Error('Es escritorio es necesario');
}
var escritorio = searchParams.get('escritorio');
var label = $('h4');
var small = $('small');

$('h1').text(`Escritorio ${escritorio}`);


//Boton cgl "Picando"

$('button').on('click', function(){
    socket.emit('atenderTicket', {escritorio}, function(resp){
        if(resp.msj){
            label.text(resp.msj);
            alert(resp.msj)
        }
        small.text(`Ticket ${resp.atenderTicket.numero}`);
    });

});



