# Brezaa

Api for a hand-service app

## Indices

- [Review](#review)

  - [Add a Review](#1-add-a-review)
  - [Get reviews for a seller](#2-get-reviews-for-a-seller)

- [Users](#users)

  - [Get All Sellers](#1-get-all-sellers)
  - [Get Nearest Sellers](#2-get-nearest-sellers)
  - [Login](#3-login)
  - [signup](#4-signup)

---

## Review

Review sellers.

### 1. Add a Review

Review a seller by adding reviewValue and comment. User must be signed in first before they can carry out this function and user must be a client

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: https://brezaatest.herokuapp.com/api/v1/review
```

**_Query params:_**

| Key      | Value                    | Description |
| -------- | ------------------------ | ----------- |
| sellerId | 5f6a076368f2d43e6680f321 |             |

**_Body:_**

```js
{
    "reviewValue": 4,
    "comment" : "This is my first review"
}
```

### 2. Get reviews for a seller

Get all reviews for a particular seller by providing the sellers ID

**_Endpoint:_**

```bash
Method: GET
Type:
URL: https://brezaatest.herokuapp.com/api/v1/review/getSellerReviews
```

**_Query params:_**

| Key      | Value                    | Description |
| -------- | ------------------------ | ----------- |
| sellerId | 5f6a076368f2d43e6680f321 |             |

## Users

To handle authentication and to fetch info about sellers

### 1. Get All Sellers

Fetch all sellers from the Database

**_Endpoint:_**

```bash
Method: GET
Type:
URL: https://brezaatest.herokuapp.com/api/v1/users/getAllSellers
```

### 2. Get Nearest Sellers

Get sellest closer to a coordinate by providing the coordinate and the Max distance.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: https://brezaatest.herokuapp.com/api/v1/users/getNearestSellers
```

**_Query params:_**

| Key         | Value     | Description |
| ----------- | --------- | ----------- |
| longitude   | -0.259548 |             |
| latitude    | 51.466546 |             |
| maxDistance | 2         |             |

### 3. Login

Login a user by providing the correct Username and password

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: https://brezaatest.herokuapp.com/api/v1/users/login
```

**_Body:_**

```js
{
		"username": "brezaa",
        "password": "brezaa11"
}
```

### 4. signup

Register new user to this route by providing email, password, username, firstName, lastName, address, select the typeOfUser, and add a profession(optional)

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: https://brezaatest.herokuapp.com/api/v1/users/signup
```

**_Body:_**

```js
{
		"email": "test421112@test.com",
        "password": "brezaa11",
        "username": "brezaa421122",
        "firstName": "Moses",
        "lastName": "Aizee",
        "address": "43 Kingston Road, Wimbledon, London SW19 8NP",
        "typeOfUser": "seller",
        "profession": ""
}
```

---

[Back to top](#brezaa)

> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2020-09-23 13:27:13 by [docgen](https://github.com/thedevsaddam/docgen)
