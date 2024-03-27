# E-Ficaz
A API for contabilit system made on Node.js

## How to start
First, you'll need to install the dependences:
```
$ npm install
```

And for start you can type:
```
$ npm run dev
```

or

```
$ npm run build
 and
$ npm start
```

## How to use
If you want to use the API you must logIn first.
You can do it in this path:
```
_.URL/register
```

Then you must send a JSON with this informations:
```
{
			"user_name": "your_user_name",
			"first_name": "Your_first_name",
			"last_name": "Your_last_name",
			"cpf": "Your_CPF",
			"email": "your-email@email.com",
			"password_hash": "Your_password"
}
```

And for last:
```
_.URL/register
```

```
{
		"user_name": "your_user_name",
		"password_hash": "Your_password"
}
```

If you followed the steps correctly, you'll receive a TOKEN for use the system.

### What you can do
In the E-Ficaz system, the users can create different profiles. These profiles are called 'Collaborators' and are responsible to registering companies, employees and make the tax records.
You cand do it in this path:
```
_.URL/collaborators
```

```
{
	    "first_name" : "Miguel",
	    "email" : "miguelrodrigues@email.com"
}
```
