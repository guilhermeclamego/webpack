import { NegociacaoController } from './controllers/NegociacaoController.js';
import { Negociacao } from './domain/index.js';
import 'bootstrap/dist/css/bootstrap.css';       //pega do node_modules   
import 'bootstrap/dist/css/bootstrap-theme.css'; //pega do node_modules
import '../css/meucss.css'; //pega da pasta css do projeto

const controller = new NegociacaoController();
const negociacao = new Negociacao(new Date(), 1, 200);
const headers = new Headers();
headers.set('Content-Type', 'application/json');
const body = JSON.stringify(negociacao);
const method = 'POST';

const config = { 
    method,
    headers,
    body 
};

fetch('http://localhost:3000/negociacoes', config)
    .then(() => console.log('Dado enviado com sucesso'));