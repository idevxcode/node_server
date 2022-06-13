const mysql = require('mysql');

function insert(connection, data, callback){
	
	let insertQuery = "INSERT INTO tbl_users(name, email, password, verification_key, is_email_verified, google_auth_code, token_usuario, home_number, perfil) VALUES (?, ?, '', '', 1, '', '', 1001, 'ADMIN')";
	
	let query = mysql.format(insertQuery, [data.name, data.email]);
	
	connection.query(query, function(err, result){
		if(err) throw err;
		callback(result);
		connection.end();
	});
}

function read(connection, callback){
	
	connection.query('SELECT * FROM tbl_users', function(err, result){
		if(err) throw err;
		callback(result);
		connection.end();
	});
	
}

function update(connection, data, callback){
	
	const randomLetters = Math.random().toString(36).substring(7);
	const newMail = `${randomLetters}@gmail.com`;
	
	let updateQuery = "UPDATE tbl_users SET email=? WHERE id=?";
	
	let query = mysql.format(updateQuery, [newMail, data.id]);
	
	connection.query(query, function(err, result){
		if(err) throw err;
		callback(result);
		connection.end();
	});
}

function remove(connection, data, callback){
		
	let removeQuery = "DELETE FROM tbl_users WHERE id=?";
	
	let query = mysql.format(removeQuery, [data.id]);
	
	connection.query(query, function(err, result){
		if(err) throw err;
		callback(result);
		connection.end();
	});
}

module.exports = { insert, read, update, remove };