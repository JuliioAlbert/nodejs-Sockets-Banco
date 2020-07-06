const { io } = require('../app');

const { TicketControl } = require('../classes/ticket-control');

const controlTicket = new TicketControl();


io.on('connection', (client) => {
    console.log('Usuario Conectado');

    client.on('siguienteTicket', () => {
        let siguiente = controlTicket.siguiente();
        client.emit('sig', siguiente)
    }); 

    client.emit('estadoActual', {
        actual: controlTicket.getUltimoTicket(),
        ultimos4: controlTicket.getUltimos4()
    });

    client.on('atenderTicket', ({escritorio}, cb)=> {
            if(!escritorio){
                return cb({
                    ok:false,
                    msj: "No hay Tickets"
                });
            }
            
            let atenderTicket = controlTicket.atenderTicket(escritorio);
            cb({
               ok:true,
               atenderTicket 
            });

            //Actualizar /Notificar Cambios en los 4
            client.broadcast.emit('ultimos4',{
                ultimos4: controlTicket.getUltimos4()
            })
    });
});

