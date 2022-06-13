const express = require('express');
const path = require('path');
const mysql = require('mysql');

require('dotenv').config();

const { insert, read, update, remove } = require('./operations');
const { insertPool, readPool, updatePool, removePool } = require('./operations-pool');

const bodyParser = require('body-parser');

const app = express();

const connection = mysql.createConnection({
	host: process.env.DBHOST,
	user: process.env.DBUSER,
	password: process.env.DBPASS,
	database: process.env.DATABASE
});

const pool = mysql.createPool({
	host: process.env.DBHOST,
	user: process.env.DBUSER,
	password: process.env.DBPASS,
	database: process.env.DATABASE
});

connection.connect((err) => {
	if(err) throw err;
	console.log('Connected to database');
});

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res) => {
	res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/insert', (req,res) => {
	insert(
		connection, 
		{ 
			name:'Jean Dieu', 
			email:'jeandieumv@gmail.com' 
		}, 
		(result) => {
			res.json(result);
		}
	);
});

app.get('/read', (req,res) => {
	read	(
		connection,  
		(result) => {
			res.json(result);
		}
	);
});

app.get('/update', (req,res) => {
	update(
		connection, 
		{ 
			id:1, 
			email:'jeandieumv@gmail.com' 
		}, 
		(result) => {
			res.json(result);
		}
	);
});

app.get('/remove', (req,res) => {
	remove(
		connection, 
		{ 
			id:2
		}, 
		(result) => {
			res.json(result);
		}
	);
});


app.get('/insert-pool', (req,res) => {
	insertPool(
		pool, 
		{ 
			name:'Jean Dieu', 
			email:'jeandieumv@gmail.com' 
		}, 
		(result) => {
			res.json(result);
		}
	);
});

app.get('/read-pool', (req,res) => {
	readPool(
		pool,  
		(result) => {
			res.json(result);
		}
	);
});

app.get('/update-pool', (req,res) => {
	updatePool(
		pool, 
		{ 
			id:1, 
			email:'jeandieumv@gmail.com' 
		}, 
		(result) => {
			res.json(result);
		}
	);
});

app.get('/remove-pool', (req,res) => {
	removePool(
		pool, 
		{ 
			id:3
		}, 
		(result) => {
			res.json(result);
		}
	);
});


app.post('/formulario', (req,res) => {
	res.sendFile(path.resolve(__dirname, 'formulario.html'));
});

app.listen(8080);
console.log('Server on port 8080');