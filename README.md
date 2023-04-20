# Marcel's Shell
Created by: Ari Marz
This is an app for Marcel and fans. Although very similar to Instagram, it is very Marcel-like.

To run this:
-download from github and open in your vscode
in your terminal:
1. cd client
2. npm install
3. npm run

in other terminal window:
1. cd server
2. pipenv install && pipenv shell
3. flask db init(if there aren't migrations)
4. flask db revision --autogenerate -m'create tables'
5. flask db upgrade
6. python seed.py
if database is there skip 3-6
7. export FLASK_APP=app.py
8. export FLASK_RUN_PORT=5555
9. flask run --debug

This should show up in your browser!

Feel free to contact me if you have any errors :)

Features to add in the future:
-create your own post
-add a feature to record your own version of marcel's voice 
-able to add tags
-able to follow other friends/fans
