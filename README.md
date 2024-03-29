# Book Management

### Important Links

- [Backend deployed Link](https://backend-idea-clan.vercel.app/graphql) :

```bash
https://backend-idea-clan.vercel.app/graphql
```

- [Backend deployed Repo Link](https://github.com/artisonii/backend-idea-clan) :

```bash
https://github.com/artisonii/backend-idea-clan
```

- ### [Postman Collection](https://drive.google.com/file/d/1AKzYieKfc_qU3nci-EtjGeuFtmXTFYL-/view?usp=sharing)

### **To Signup**

```
mutation {
    register(input: {
        name: "abc",
        email: "example@gmail.com",
        password: "abc",
        role: "admin"
    }) {
        message
        success
    }
}
```

- response

```json
{
  "data": {
    "register": {
      "message": "User signed up successfully!",
      "success": true
    }
  }
}
```

### **To Login**

```
mutation{
    login(input:{email:"admin@gmail.com",password:"admin"}){
            token
            name
            role
            message
            success
    }
}
```

- response

```json
{
  "data": {
    "login": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VySWQiOiI2NWY1ZWU5ZDc2NWQ3NjYwMjhmNTVlMWIiLCJpYXQiOjE3MTA2NzU2NTl9.3FUfr8km1lmaaZO2SAH_U-sdWfVaxFm9E6z2xhh5iPw",
      "name": "admin",
      "role": "admin",
      "message": "login successful",
      "success": true
    }
  }
}
```

### **get Books**

```
query{
   getBooks{
    data{
      id,
      title,
      author,
      genre,
      status
    }
    page,
    totalPages,
    totalItems,
    message,
    success

   }
}
```

- response

```json
{
  "data": {
    "getBooks": {
      "data": [
        {
          "id": "65f5f76c16bb7a3e8bfa3c0f",
          "title": "The hawk",
          "author": "armi",
          "genre": "hii",
          "status": "AVAILABLE"
        },
        {
          "id": "65f615de970ed8ee38fa784d",
          "title": "The hawk",
          "author": "armi",
          "genre": "hii",
          "status": "BORROWED"
        },
        {
          "id": "65f62af6810eb455a820d1e6",
          "title": "the sun",
          "author": "dharam",
          "genre": "drama",
          "status": "AVAILABLE"
        },
        {
          "id": "65f63de1c3dffadd0da44463",
          "title": "the sun",
          "author": "dharam",
          "genre": "drama",
          "status": "AVAILABLE"
        }
      ],
      "page": 1,
      "totalPages": 1,
      "totalItems": 4,
      "message": null,
      "success": null
    }
  }
}
```

### **Buy Book**

```
mutation{
    buyBook(id:"65f6da9af1af242ed76a9c9f",orderType:"borrow"){
        message,
        success
    }
}
```

- response

```json
{
  "data": {
    "buyBook": {
      "message": "book has been borrowed successfully",
      "success": true
    }
  }
}
```

### **Borrow From Borrower**

```
mutation{
    borrowFromBorrower(id:"65f615de970ed8ee38fa784d"){
        message,
        success

    }
}
```

- response

```json
{
  "data": {
    "borrowFromBorrower": {
      "message": "book has been borrowed successfully",
      "success": true
    }
  }
}
```

### **Search by Title**

```
query{
   getBooks(params:{title:"sun"}){
    data{
      id,
      title,
      author,
      genre,
      status
    }
    page,
    totalPages,
    totalItems,
    message,
    success

   }
}
```

- response

```json
{
  "data": {
    "getBooks": {
      "data": [
        {
          "id": "65f62af6810eb455a820d1e6",
          "title": "the sun",
          "author": "dharam",
          "genre": "drama",
          "status": "AVAILABLE"
        },
        {
          "id": "65f63de1c3dffadd0da44463",
          "title": "the sun",
          "author": "dharam",
          "genre": "drama",
          "status": "AVAILABLE"
        },
        {
          "id": "65f6da9af1af242ed76a9c9f",
          "title": "the sun",
          "author": "dharam",
          "genre": "drama",
          "status": "AVAILABLE"
        }
      ],
      "page": 1,
      "totalPages": 1,
      "totalItems": 3,
      "message": null,
      "success": null
    }
  }
}
```

### **Sort by Title**

```
query{
   getBooks(params:{sort:"title",order:"asc"}){
    data{
      id,
      title,
      author,
      genre,
      status
    }
    page,
    totalPages,
    totalItems,
    message,
    success

   }
}
```

- response

```json
{
  "data": {
    "getBooks": {
      "data": [
        {
          "id": "65f5f76c16bb7a3e8bfa3c0f",
          "title": "The hawk",
          "author": "armi",
          "genre": "hii",
          "status": "AVAILABLE"
        },

        {
          "id": "65f63de1c3dffadd0da44463",
          "title": "the sun",
          "author": "dharam",
          "genre": "drama",
          "status": "AVAILABLE"
        },
        {
          "id": "65f6da9af1af242ed76a9c9f",
          "title": "the sun",
          "author": "dharam",
          "genre": "drama",
          "status": "AVAILABLE"
        }
      ],
      "page": 1,
      "totalPages": 1,
      "totalItems": 5,
      "message": null,
      "success": null
    }
  }
}
```

### **Filter by author**

```
query{
   getBooks(params:{author:"dharam"}){
    data{
      id,
      title,
      author,
      genre,
      status
    }
    page,
    totalPages,
    totalItems,
    message,
    success

   }
}
```

- response

```json
{
  "data": {
    "getBooks": {
      "data": [
        {
          "id": "65f62af6810eb455a820d1e6",
          "title": "the sun",
          "author": "dharam",
          "genre": "drama",
          "status": "AVAILABLE"
        },
        {
          "id": "65f63de1c3dffadd0da44463",
          "title": "the sun",
          "author": "dharam",
          "genre": "drama",
          "status": "AVAILABLE"
        },
        {
          "id": "65f6da9af1af242ed76a9c9f",
          "title": "the sun",
          "author": "dharam",
          "genre": "drama",
          "status": "AVAILABLE"
        }
      ],
      "page": 1,
      "totalPages": 1,
      "totalItems": 3,
      "message": null,
      "success": null
    }
  }
}
```

### **Add Book**

```
mutation{
    addBook(title:"the sun",author:"dharam",genre:"drama"){
        message,
        success
    }
}
```

- response

```json
{
  "data": {
    "addBook": {
      "message": "Book has been added successfuly",
      "success": true
    }
  }
}
```

### **Update Book**

```
mutation{
    updateBook(input:{id:"65f5f76c16bb7a3e8bfa3c0f"}){
message,
success
    }
}
```

- response

```json
{
  "data": {
    "updateBook": {
      "message": "Book updated successfully",
      "success": true
    }
  }
}
```

### **Delete Book**

```
mutation{
   deleteBook(id:"65f63de1c3dffadd0da44463") {
    message,
    success
   }
}
```

- response

```json
{
  "data": {
    "deleteBook": {
      "message": "Book deleted successfully",
      "success": true
    }
  }
}
```

# Created by Arti Soni

- [LinkedIn](https://www.linkedin.com/in/arti-soni/)
- [Portfolio](https://artisonii.github.io/)
- [GitHub](https://github.com/artisonii)
