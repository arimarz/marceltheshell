from flask import  request, make_response, session, abort, jsonify
from flask_restful import  Resource
from models import User, Post, Like, Comment    
from config import db, api, app


class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        response = make_response(
            users,
            200
        )
        return response
api.add_resource(Users, '/users')

class UserByID(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            abort(404, "User not found")
        user_dict = user.to_dict()
        response = make_response(
            user_dict,
            200
        )
        return response
api.add_resource(UserByID, '/user/<int:id>')

class Posts(Resource):
    def get(self):
        posts = [post.to_dict() for post in Post.query.all()]
        response = make_response(
            posts,
            200
        )
        return response

    def post(self):
        try:
            data = request.get_json()
            post = Post(
                quote=data["quote"],
            original=data["original"],
            user_id=data['user_id'],
            image=data["image"]
            ) 

            db.session.add(post)
            db.session.commit()
        except Exception as e:
            return make_response({
                "errors": [e.__str__()]
            }, 422)
        response = make_response(
            post.to_dict(),
            201
        )
        return response
api.add_resource(Posts, '/posts')

class PostByID(Resource):
    def get(self, id):
        post = Post.query.filter_by(id=id).first()
        if not post:
            abort(404, "post not found")
        post_dict = post.to_dict()
        response = make_response(
            post_dict,
            200
        )
        return response

    def patch(self, id):
        post = Post.query.filter_by(id=id).first()
        if not post:
            return make_response({'error': 'Post not found'}, 404)
        data= request.get_json()
        for attr in data:
            setattr(post, attr, data[attr])
        db.session.add(post)
        db.session.commit()

        return make_response(post.to_dict(), 202)

    def delete(self, id):
        post = Post.query.filter_by(id=id).first()
        if not post:
            return make_response({"error": "Post not found"}, 404)
        db.session.delete(post)
        db.session.commit()

        return make_response('', 204)

api.add_resource(PostByID, '/posts/<int:id>')

class Signup(Resource):
    def post(self):
        form_json = request.get_json()
        new_user = User(username=form_json['username'])
        #Hashes our password and saves it to _password_hash
        new_user.password_hash = form_json['password']

        db.session.add(new_user)
        db.session.commit()

        response = make_response(
            new_user.to_dict(),
            201
        )
        return response
api.add_resource(Signup, '/signup')

class Login(Resource):
    def post(self):
        try:
            user = User.query.filter_by(username=request.get_json()['username']).first()
            if user.authenticate(request.get_json()['password']):
                session['user_id'] = user.id
                response = make_response(
                    user.to_dict(),
                    200
                )
                return response
        except:
            abort(401, "Incorrect Username or Password")

api.add_resource(Login, '/login')

class AuthorizedSession(Resource):
    def get(self):
        try:
            user = User.query.filter_by(id=session['user_id']).first()
            response = make_response(
                user.to_dict(),
        
                200
            )
            return response
        except:
            abort(401, "Unauthorized")

api.add_resource(AuthorizedSession, '/authorized')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None 
        response = make_response('',204)
        return response
api.add_resource(Logout, '/logout')


if __name__ == "__main__":
    app.run(port="5555", debug=True)