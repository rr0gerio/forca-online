const express = require('express');
const path = require('path');
const crypto = require('crypto');


const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname,'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use('/', (req,res) =>{
    res.sendFile('index.html')
});

function createGame(io){
    const game = {
        palavras: {},
        jogadores: {},
        placar: {},
        palavraCorrente=[],

        adicionaPalavra, //add na partida
        registraPalavraInfo, // broadcast para players
        sortearPalavra, //sorteia uma pal

        adicionaLetra,//add na partida
        registraLetra,//broadcast para players
        validaLetra,

        adicionaJogador,
        removeJogador,
        
        iniciarRodada
    }

    
    function adicionaPalavra(jogadorId, palavra){
        var id = crypto.randomBytes(5).toString('hex');
        return game.palavras[id] = {
            palavra: palavra,
            owner: jogadorId
        }
    }

    function sortearPalavra(){
        var keys = Object.keys(game.palavras);
        var palavraObj =  game.palavras[
            keys[keys.length * Math.random << 0]
        ]
        game.palavraCorrente=palavraObj.palavra.split("");
        return{
            tamanho: palavraObj.palavra.length,    
            owner: palavraObj.owner
        } 
    }

    function registraPalavraInfo(){
        io.broadcast.emit('nova-palavra',sortearPalavra)
    }


    function adicionaLetra(jogador,letra,timestamp){
        
    }

    function registraLetra(){}
    function validaLetra(){}

    function adicionaJogador(jogadorId, nomeUsuario){
        game.jogadores[jogadorId]={
            nome: nomeUsuario,
            pontuacao: 0
        }
        io.broadcast.emit('registra-novo-jogador',game.jogadores[jogadorId]);
    }

    function removeJogador(jogadorId){
        io.broadcast.emit('remove-jogador',jogadorId);
        delete game.jogadores[jogadorId]
    }

    function iniciarRodada(){}

    return game;
}



const game = createGame(io);
io.on('connection', (socket) => {
    console.log(`${socket.id}`);

    socket.on('novaLetra', novaLetra => {
        // validar letra com a palavra corrente
        // se a letra for valida
        //      broadcast no span da forca informando posicao
        //      soma ponto no usuário
        //      broadcast pontuaçao
        console.log('nova letra');
    });
    
    socket.on('novaPalavra', (novaPalavra) =>{
        // inserir nova palavra no array
        game.adicionaPalavra(socket.id, novaPalavra);
        console.log(game.palavras);
    })
    socket.on('novoJogador', (nomeUsuario) =>{
        //inserir novo jogador socket.id + username
        game.adicionaJogador(socket.id, nomeUsuario);
        console.log(jogador);
    })
});

server.listen(8080);

