# 📚 Library Management API

This is a **Library Management API** project, which I found very interesting to build.  
In this project, I focus on two main aspects: **Setup** and **API details**.  

---

## ⚙️ Setup
The setup process is very important for running this project smoothly.  
I have organized the project using a **modular architecture**, which makes the codebase cleaner, scalable, and easy to maintain.

---

## 🏗️ Modular Architecture
In this project, I used the **modular system** instead of the traditional MVC folder structure.  

- Modular architecture means structuring code into **self-contained, independent modules**.  
- Each module groups related files together, such as:
  - `model`
  - `controller`
  - `service`
  - `routes`  

👉 Instead of separating by type (all models in one folder, all controllers in another), we separate by **feature**.  

For example:  
- A **Book Module** contains everything related to books (`book.model.js`, `book.controller.js`, `book.service.js`, `book.routes.js`).  
- A **User Module** contains all user-related files.  

This makes the project easier to extend and maintain.  

---

## 📌 API Details
(Here you can list and explain your API endpoints, e.g., `/api/books`, `/api/users`, etc.)  


---

## 📌 API & Business Logic

### Borrow a Book  
When a user borrows a book, the following steps happen:

1. **Find the book by `bookId`.**  
   - If the book is not found → return an error.

2. **Check book availability.**  
   - If `book.copies < quantity` → return an error.

3. **Update book stock.**  
   - Deduct copies → `book.copies -= quantity`.  
   - If `book.copies == 0` → set `book.available = false`.

4. **Save the updated book** to the database.

5. **Create a borrow record** with:  
   - `bookId`  
   - `quantity`  
   - `dueDate`  
   - `userId`

6. **Save the borrow record** to the database.

7. **Return a success response** with a message and borrow data.

---
