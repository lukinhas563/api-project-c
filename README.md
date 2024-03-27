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
_.URL/login
```

```
{
	"user_name": "your_user_name",
	"password_hash": "Your_password"
}
```

If you followed the steps correctly, you'll receive a TOKEN for use the system.

## What you can do

### Collaborators

In the E-Ficaz system, the users can create different profiles. These profiles are called 'Collaborators' and these one are responsible to registering companies, employees and make the tax records.
You cand do it in this path using the method **POST**:

```
_.URL/collaborators
```

```
{
	"first_name" : "Miguel",
	"email" : "miguelrodrigues@email.com"
}
```

If you have the curiosity how many collaborators you have, you can verify all of them using the same path in the method **GET**, and then you'll recive something like that:

```
{
	"result": [
		{
			"id": 1,
			"first_name": "João",
			"last_name": null,
			"cpf": null,
			"email": "joaosantosmanoel@email.com",
			"id_user": 1,
			"created_at": "2024-03-27 14:41:42",
			"updated_at": "2024-03-27 14:41:42"
		},
		{
			"id": 2,
			"first_name": "Carlos",
			"last_name": null,
			"cpf": null,
			"email": "carlossantos@email.com",
			"id_user": 1,
			"created_at": "2024-03-27 14:41:57",
			"updated_at": "2024-03-27 14:41:57"
		},
		{
			"id": 3,
			"first_name": "Miguel",
			"last_name": null,
			"cpf": null,
			"email": "miguelrodrigues@email.com",
			"id_user": 1,
			"created_at": "2024-03-27 14:42:09",
			"updated_at": "2024-03-27 14:42:09"
		}
	]
}
```

But, if you are not content with the result, you can just delete or updated them using the methods **DELETE** and **PUT**. Using the mothod PUT, you can just send the id in the params and inform the updates into the request body.

```
_.URL/collaborators/:id
```

```
{
	"last_name": "Santana"
}
```

For delete is easy, just send the id in the params.

But you won't always want to check all collaborators, you might want to check just one. For to do it, you can use the method GET with an ID and you'll recive that:

```
{
	"result": {
		"id": 2,
		"photo": null,
		"first_name": "Carlos",
		"last_name": null,
		"cpf": null,
		"email": "carlossantos@email.com",
		"id_user": 1,
		"created_at": "2024-03-27 14:41:57",
		"updated_at": "2024-03-27 14:41:57"
	}
}
```

### Companies

Ok, the most important thing abouth this system is the possibility of registering your costumers, the companies.
If you created your first collaborator you are able to register your first company too. You can do that in this path:

```
_.URL/companies?idCollaborator=1
```

This path it is a little different than the last one. As you can see, you must to inform who is the responsible for the company through the querry **"idCollaborator"** an then you mush inform the **ID** of the collaborator. In the body of the request you must provide the following data:

```
{
	"company_name":
	"fantasy_name":
	"cnpj":
	"size":
	"tax_regime":
	"opening_date":
	"main_economic_activity":
}
```
