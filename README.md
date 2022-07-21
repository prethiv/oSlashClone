# oSlashClone

REST Api is Choosen for seamless data transfer between client and server and also it makes json form of data transfer easier.

Authorization:
Generic way of authorizing users like get username and password from request fetch password stored in database based on incoming username and compare it with the passworrd from request
if it matches then user will get a json web token to authenticate further api's else authorization will fail.


Database choosed for this task in mysql.

Tables used:
users=> columns username,password
tag => tagid,tag
shortcuts => username,shortlink,description,full_url,tagid
