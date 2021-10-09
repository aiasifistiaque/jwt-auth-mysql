Guidelines on using the jwt login system

1. Set up the environment variables - list given below
2. Run from command line: npm install
3. Run the server : npm run start
4. Api doc : http://localhost:5000/api-docs/

List of environment variables:

PORT=
NODE_ENV=
DB_HOST=
DB_PORT= 
DB_USER= 
DB_PASSWORD= 
DB_DATABASE= 
JWT_PRIVATE_KEY= *replace this random string* 
JWT_REFRESH_SECRET= *replace this random string*
TOKEN_EXPIRE_TIME= *replace token expire time, default: 1h*

*env variables for password reset mail server from which OTP will be sent*

MAIL_HOST= eg: 'mail.privateemail.com'
MAIL_ADDRESS= eg: 'support@mail.com'
MAIL_PASSWORD=
MAIL_PORT= eg: 587
MAIL_DISPLAYNAME=

Have a nice day :)