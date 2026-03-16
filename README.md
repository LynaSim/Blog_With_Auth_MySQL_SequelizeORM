# A Creative Writing Blog



A full-stack monolithic application blog with authentication. Users can view, post, edit, categorise, and filter stories. This project showcases the use of:



* the MVC (Model-View-Controller) architecture
* Sequelize ORM
* Database storage with PostgreSQL
* Authentication with JSON WEB TOKEN
* CRUD logic
* RESTful API design.


## Live Demo
[View the Live App on Render](https://sequelize-full-stack-blog.onrender.com/)


## Features


* **Full CRUD Functionality:** Create, read, update, and delete stories.
* **Dynamic Filtering:** Filter blog posts by specific categories
* **Responsive Design:** A clean, minimal interface, clearly inspired by Medium.com
* **Persistent Storage:** Built with a PostgreSQL database

## Tech Stack
* **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL, Sequelize ORM
* **Deployment:** Render

## Installation & Setup

1. **Clone the repository:**
   ```
   git clone [https://github.com/LynaSim/Blog_With_Auth_MySQL_SequelizeORM.git]
   ```

2. **Install dependencies:**

```
npm install
```

3. **Database Configuration:**

Create a .env file in the root directory and add your local credentials:

Code snippet

```
DB_NAME='posts_db'
DB_USER='your_username'
DB_PASSWORD='your_password'
```

4. **Seed the Database:**

Populate the categories and sample posts:

```
npm run seed
```

5. **Start the Server:**

```
npm start
```

The app will be running at http://localhost:3001.


## Project Structure


* **/models:** Sequelize blueprints for Users, Posts, and Categories.

* **/routes:** Express API endpoints for data retrieval and filtering.

* **/public:** Frontend assets (CSS, client-side JS).

* **/seeds:** Scripts to populate the database with initial samples.


## Credentials

medium.com inspired the colour theme and font combination.
Fountain Pen favicon from <a target="_blank" href="https://icons8.com/icon/B6WOInNacWNm/fountain-pen">Fountain Pen</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>