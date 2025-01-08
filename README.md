# Blog Chronicle Backend

A powerful Node.js application designed to deliver seamless functionality with a reliable backend architecture. The project includes robust features for managing data and APIs, ensuring optimal performance and scalability using mongoose and node.js.
Checkout a demo frontend: [live frontend website](https://blogchronicle.netlify.app/)

## Features

- 🌟 **Comprehensive API Endpoints**: Provides RESTful endpoints for efficient data handling.
- 📦 **Dynamic Product Management**: Add, update, and delete products seamlessly.
- 🔍 **Stock Management**: Real-time product availability updates based on stock levels.
- 📧 **Order Processing**: Handles customer orders with validation and stock updates.
- 📊 **Scalable Architecture**: Built for extensibility with modular design.
- 🔐 **Secure Configuration**: Environment variables ensure sensitive data protection.
- 🔐 **Secure Dataflaw**: The JWT authenticatiotion makes sure about data security.
- 📂 **Built-in Timestamps**: Automatically track data creation and updates.
- 🚀 **Ready for Deployment**: Preconfigured for Vercel or other deployment platforms.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Configuration Management**: Dotenv
- **Build Tool**: TypeScript

## Getting Started

Follow the steps below to set up the project locally on your machine.

### Prerequisites

Ensure the following are installed on your system:

- **Node.js** (version 16 or above)  
  [Download Node.js](https://nodejs.org/)
- **MongoDB** (local instance or cloud-based like MongoDB Atlas)  
  [MongoDB Installation Guide](https://www.mongodb.com/docs/manual/installation/)
- **Package Manager**: NPM (comes with Node.js) or Yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/joychandrauday/BlogChronicle-backend.git
    ```
2.  Navigate to the project directory
    ```bash
    cd BlogChronicle-backend
    ```
3.  Install dependencies:

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

4.  Environment Variables:

    Create a .env file in the root directory and provide the necessary variables:

    ```bash
        PORT=3000
        DB_URL= mongodb+srv://<username>:<password>@cluster.mongodb.net/your-database
    ```

6.  Run the Application:
    Start the server in development mode:



    ```bash
        npm run dev
    ```


## API Endpoints

### Auth Management

- **POST** `/api/auth/register`: Registering or creating new user.
- **POST** `/api/auth/login`: Log in a registered user.

### Blog Management

- **POST** `/api/blogs`: Create a new blog(you will need to sign in and a access token to create a new blog post).
- **GET** `/api/blogs?search=&sortBy=createdAt&sortOrder=desc&filter=(authorId)`: Retrieve all blog posts from database by queries and params.
- **PATCH** `/api/blogs/:id`: Update a Blog post.
- **DELETE** `/api/blogs/:id`: Delete a Blog post.


### User Management
- **GET** `/api/users`: Retrieve all users from database.
- **GET** `/api/users/:id`: Retrieve a single user.

### Admin Routes
- **PATCH** `/api/admin/users/:userId/block`: Admin route To block a user from databese.
- **DELETE** `/api/admin/blogs/:blogId`: Admin route for Deleting any existing blog from database.


## Project Structure

📦project-root  
┣ 📂dist                # Compiled output (after build)  
┣ 📂src                 # Source code  
┃   ┣📂app
┃   ┃   ┣ 📂models            # Mongoose models  
┃   ┃   ┣ 📂routes            # Route handlers  
┃   ┃   ┣ 📂services          # Business logic  
┃   ┗ app.js           
┃   ┗ server.js           # Main server file  
┣ 📜package.json        # Project dependencies and scripts  
┣ 📜README.md           # Project documentation  
┗ .env                  # Environment variables


## Contributing

We welcome contributions to enhance this project!

1. Fork the repository
2. Create a branch for your feature:
   ```bash
   git checkout -b feature-name
    ```
3. Commit your changes
    ```bash
    git commit -m 'Add new feature'
    ```
4.  Push your feature
    ```bash
    git push origin feature-name
    ```

## Contact
For questions or feedback, contact:
- **Name**: Joy Chandra Uday
- **Email**: joychandrauda@gmail.com
- **Website**: [https://joychandrauday.web.app/](https://joychandrauday.web.app/)
