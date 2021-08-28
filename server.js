const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname,'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use('/', (req,res) =>{
    res.render('index.html')
});

function criarPartida(){
    const partida = {
        jogadores: {},
        novoJogador,
        removerJogador
    }
}

io.on('connection', socket => {
    console.log(`${socket.id}`);
    
    socket.on('novaLetra', novaLetra => {
        // validar letra com a palavra corrente
        // se a letra for valida
        //      broadcast no span da forca informando posicao
        //      soma ponto no usuário
        //      broadcast pontuaçao
        console.log('nova letra');
    });
    
    socket.on('novaPalavra', novaPalavra =>{
        // inserir nova palavra no array
        console.log('nova palavra');
    })
    socket.on('novoJogador', nomeUsuario =>{
        //inserir novo jogador socket.id + username
        jogador={
            username: nomeUsuario,
            id: socket.id
        } 
        console.log(jogador);
    })
});

server.listen(8080);

