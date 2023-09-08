const mongoose = require('mongoose');

if (process.argv.length < 3) {
	console.log('Usage: node mongo.js <password> [<name> <number>]');
	process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://red:${password}@fullstackopen.q67ya4m.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model('Person', personSchema);

if (name && number) {
	const person = new Person({
		name: name,
		number: number,
	});

	person.save().then(() => {
		console.log(`added ${name} number ${number} to phonebook`);
		mongoose.connection.close();
	});
} else {
	Person.find({}).then((persons) => {
		console.log('phonebook:');
		persons.forEach((person) => {
			console.log(`${person.name} ${person.number}`);
		});
		mongoose.connection.close();
	});
}
