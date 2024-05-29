# Register User API

Endpoint : POST /api/users

Request Body :

```json
{
    "username" : "uname",
    "password" : "123abc",
    "name" : "nama",
}
```

Respone Body Success :

```json
{
    "data" : {
        "username" : "uname",
        "name" : "nama",
    }
}
```

Rsponse Body Error :

```json
{
    "errors" : "Password Has to Include Number",
}
```

# Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
    "username" : "uname",
    "password" : "nama",
}
```

Response Body Succes :

```json
{
    "data" : {
        "token" : "", //bisa ga gausa pake token, susah
    },
}
```

Response Body Error :

```json
{
    "errors" : "Wrong Password",
}
```

# Update User API

Endpoint : PATCH /api/users/current

Headers :
- Authorization : token

Request Body :

```json
{
    "name" : , //optional
    "password" : , //optional
}
```

Response Body Success :

```json
{
    "data" : {
        "username" : ,
        "name" : ,
    }
}
```

Response Body Error :

```json
{
    "errors" : "",
}
```

# Get User API

Endpoint GET /api/users/current

Headers :
- Authorization : token

Response Body Success :

```json
{
    "data" : {
        "username" : "uname",
        "name" : "nama",
    },
}
```

Response Body Error :

```json
{
    "errors" : "Unauthorized",
}
```

# Logout User API

Endpoint : DELETE /api/users/logout

Headers :
- Authorization : token

Response Body Success :

```json
{
    "data" : "ok",
}
```

Response Body Error :

```json
{
    "errors" : "Unauthorized",
}
```