this is express js project build on express js version 5 using mysql workbench.
For 2 factor authentication I have used jwtwebtoken and argon2 to encrypt and decrypt.
For env, db and data validation i have used Zod.(verifying db name, token, verifying email, password and user name)
For logger one need to install morgon.
One need to create schema is db as below to access to db:-
PORT=3000
DATABASE_HOST=localhost
DATABASE_USER=*your user name
DATABASE_PASSWORD=*your password
DATABASE_NAME=url_shortner (with three tables users, sessions, url_shortner)
JWT_SECRET=superstrongsecret for access token
JWT_REFRESH_SECRET=refreshsecret for refresh token
There are 2 routes:-

1- login/register/logout - this will get user details and set access token and refessh token

2- shortner url - to perform crud operations on db- to dd, edit,delete or get the urls entered by user and shortned by express.




