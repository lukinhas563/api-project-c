# E-Ficaz

A API for contabilit system made on Node.js

1. [How to start](#howToStart)
2. [How to use](#howToUse)
3. [What you can do](#whatYouCanDo)
    1. [Collaborators](#collaborators)
    2. [Companies](#companies)
    3. [Activities](#activities)
    4. [Partners](#partners)
    5. [Employees](#employees)
    6. [Address](#address)

<a name="howToStart"></a>

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

<a name="howToUse"></a>

## How to use

If you want to use the API you must logIn first.
You can do it in this path:

```
_.URL/register
```

Then you must send a JSON with this informations:

```json
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

```json
{
    "user_name": "your_user_name",
    "password_hash": "Your_password"
}
```

If you followed the steps correctly, you'll receive a TOKEN for use the system.

<a name="whatYouCanDo"></a>

## What you can do

<a name="collaborators"></a>

### Collaborators

In the E-Ficaz system, the users can create different profiles. These profiles are called 'Collaborators' and these one are responsible to registering companies, employees and make the tax records.
You cand do it in this path using the method **POST**:

```
_.URL/collaborators
```

```json
{
    "first_name": "Miguel",
    "email": "miguelrodrigues@email.com"
}
```

If you have the curiosity how many collaborators you have, you can verify all of them using the same path in the method **GET**, and then you'll recive something like that:

```json
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

```json
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

<a name="companies"></a>

### Companies

Ok, the most important thing abouth this system is the possibility of registering your costumers, the companies.
If you created your first collaborator you are able to register your first company too. You can do that in this path:

```
_.URL/companies?idCollaborator=1
```

This path it is a little different than the last one. As you can see, you must to inform who is the responsible for the company through the querry **"idCollaborator"** an then you mush inform the **ID** of the collaborator. In the body of the request you must provide the following data:

```json
{
    "company_name": "your_company_name",
    "fantasy_name": "your_company_fantasy_name",
    "cnpj": "cnpj",
    "size": "size",
    "tax_regime": "tax_regime",
    "opening_date": "opening_data"
}
```

Following the same logic of the lasts one, if you wanto to see all companies of the collaborator you can the method **GET**:

```
_.URL/companies?page=1&limit=9&idCollaborator=2
```

Result:

```json
{
    "result": [
        {
            "id": 1,
            "company_name": "Fulano del Toro",
            "fantasy_name": "Escola de Cinema",
            "cnpj": "80.654.321/0001-01",
            "email": null,
            "size": "me",
            "tax_regime": "simples nacional",
            "status": null,
            "opening_date": "11/09/1997",
            "main_economic_activity": "Vendedor",
            "id_collaborator": 2,
            "id_user": 1,
            "created_at": "2024-03-27 14:43:13",
            "updated_at": "2024-03-27 14:43:13",
            "secondaryEconomicActivity": [
                {
                    "id": 2,
                    "code": "11.25.23",
                    "activity": "Funilaria",
                    "created_at": "2024-03-27 14:53:47",
                    "updated_at": "2024-03-27 14:53:47"
                },
                {
                    "id": 1,
                    "code": "11.25.23",
                    "activity": "Limpeza e lavagem de carros",
                    "created_at": "2024-03-27 14:52:57",
                    "updated_at": "2024-03-27 14:52:57"
                }
            ],
            "partners": [],
            "employees": []
        }
    ]
}
```

As you can see, this path has a few differents querrys, the <code>page</code>,<code>limit</code> and <code>idCollaborator</code>. The querrys page and limit are not required, but is you wanto to have more control over your searches you can use them. The querry **idCollaborator** is required and you must inform the ID of one of your collaborators.

For get just one of them you can use this path:

```
_.URL/companies/9?idCollaborator=2
```

In this path you must send the **ID** of the company and inform who is the responsible for them.
For delete and update you can do the same way you already did using the method <code>DELETE</code> and <code>PUT</code>.

<a name="activities"></a>

### Activities

The companies can offer a lot of others services too and you must inform it into the system.

As you can see in the lest JSON result, the companies have some field that was not mentioned, the **"secondaryEconomicActivity"**, **"partners"** and **"employees"**. In this section we'll talk you about how you can register all the services that you campany can to offer.

Using the path <code>activity</code> you can inform them using the mothod <code>POST</code>:

```
_.URL/activity?idCompany=2
```

Like the Collaborator's path, you must inform the **ID** of the company and inform the data:

```json
{
    "code": "11.25.23",
    "activity": "Armazenagem e Logistica"
}
```

And just that!

But if you want to check all activities registred in your system you can use the method <code>GET</code>.

```
_.URL/activity
```

But it might to be a messy if you already registred a lot of them. Because of that you can use a querry params to filter your searches:

```
_.URL/activity?idCompany=2
```

Using the querry **idCompany** you have to inform the **ID** of the company and it will return all of activities belongs this company.

If you can see just one of them you can use the next path using the ID of the activity:

```
_.URL/activity/1
```

And using the method <code>DELETE</code> and <code>PUT</code> you can delete and update them, just like you already did.

<a name="partners"></a>

### Partners

Ok, let's talk about partners field.
A company can have a lot of partners in the system, you just have to use the next path to register them into the company that already was created:

```
_.URL/partners?idCompany=6
```

Like the last one, you must to inform the company that this partner belongs to, using the **ID** of the company and sending this informations:

```json
{
    "first_name": "Name",
    "last_name": "Last Name",
    "cpf": "CPF",
    "percentage": 50
}
```

To check all cof them you can use the method <code>GET</code>.

```
_.URL/partners
```

or for get by id:

```
_.URL/partners/1
```

It's normal to send wrong information, because of that you can also use the method <code>DELETE</code> and <code>PUT</code> to reverse this situation.

<a name="employees"></a>

### Employees

E-Ficaz is a system for contabilit, because of that is very important to have a form to check the employees of the companies.
You can also register employees in each company in your system using the next path using the method <code>POST</code>:

```
_.URL/employees?idCompany=5
```

It's just like you already did. You must inform the company that this employee belongs to using the company's **ID**.
And to get all you can use the method <code>GET</code>:

```
_.URL/employees
```

or get one by id:

```
_.URL/employees/1
```

You can also use the methods <code>DELETE</code> and <code>PUT</code> to reverse some wrong informations.

<a name="address"></a>

### Address
