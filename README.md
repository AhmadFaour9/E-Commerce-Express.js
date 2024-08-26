# 📦 E-Commerce Project

This is an e-commerce web application built using Node.js, Express.js, and MongoDB.

## 🎨 Features

    User Management:
        Registration and login for two types of users: Manager and Customer
        Secure authentication using bcrypt for password hashing
        Role-based access control (RBAC) to restrict access to certain pages based on user type

    Product Management:
        Managers can add, edit, and delete products
        Products are categorized and associated with companies
        Customers can view and search for products

    Category Management:
        Managers can add, edit, and delete product categories
        Categories are used to organize and filter products

    Company Management:
        Managers can add, edit, and delete companies associated with products
        Companies are used to filter products by manufacturer

    User Interface:
        Responsive design that adapts to different screen sizes
        Intuitive navigation and user-friendly experience

## 🛠️ Technologies Used

    Backend:
        Node.js
        Express.js
        MongoDB (with Mongoose ODM)
        bcrypt for password hashing
    Frontend:
        HTML (with EJS templating engine)
        CSS (with a CSS framework like Bootstrap or Tailwind CSS)
        JavaScript

## 🚀 Getting Started

    Clone the repository:

git clone https://github.com/AhmadFaour9/E-Commerce-Express.js.git

Install dependencies:

cd e-commerce-project
npm install

Set up the environment variables:

    Create a .env file in the server/ directory
    Add the necessary environment variables, such as the MongoDB connection string and any other required configurations

Start the development server:

    npm run start:dev

    Open the application in your browser:
        The server will be running on http://localhost:3000
        The client-side application will be served from the client/ directory

## 🌐 Deployment

To deploy the application, you can use a hosting platform like Heroku, AWS, or DigitalOcean. The deployment process may vary depending on the platform you choose, but the general steps would be:

    Build the production-ready client-side assets:

npm run build

Configure the server for production deployment:

    Set the appropriate 

