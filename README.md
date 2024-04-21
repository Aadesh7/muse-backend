# muse-backend

To run,

1) Clone the project, run "npm install"
2) Set up a mysql database and name it muse. In the config file, add your mysql server's (local or hosted) username and password inside development.
3) Run "npx sequelize-cli db:migrate" to migrate the model.
4) Run "node app.js" to run the application. The application will run on 3000 Port. You can change this in app.js file.
5) Request the routes accordingly, postman collection will be shared.