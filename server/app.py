from flask import  request, make_response, session, abort, jsonify
from flask_restful import  Resource, reqparse
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
        user_dict = user.to_dict(rules=('posts', '-posts.user_id'))
        response = make_response(
            user_dict,
            200
        )
        return response
api.add_resource(UserByID, '/users/<int:id>')

class Posts(Resource):
    def get(self):
        page = request.args.get('page', 1, type=int)
        per_page = 5
        start = (page - 1) * per_page
        end = start + per_page
        
        posts = [post.to_dict(rules= ('is_liked', 'liked_amount', 'comments', '-likes.post_id', '-likes.user_id', '-comments.user_id')) for post in Post.query.order_by(Post.id).slice(start, end)]
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




class Likes(Resource):
    def get(self, post_id):
        likes = Like.query.filter_by(post_id=post_id).all()
        liked_amounts = len(likes)
        return {'liked_amounts': liked_amounts}, 200
    
    def post(self, post_id):
        parser = reqparse.RequestParser()
        parser.add_argument('user_id', type=int, required=True)
        args = parser.parse_args()
        
        like = Like(user_id=args['user_id'], post_id=post_id)
        db.session.add(like)
        db.session.commit()
        
        return make_response(like.to_dict(), 201)
    
    def delete(self, post_id, user_id):
        like = Like.query.filter_by(user_id=user_id, post_id=post_id).first()
        if not like:
            return {'error': 'Like not found'}, 404
        
        db.session.delete(like)
        db.session.commit()
        
        return {'message': 'Like deleted successfully'}, 200

api.add_resource(Likes, '/posts/<int:post_id>/likes', '/posts/<int:post_id>/likes/<int:user_id>')

class Recordings(Resource): #check all of this
    def post(self):
        audio_file = request.files.get("audio")
        # Store the audio file in the database or on the filesystem
        return {"message": "Audio file saved successfully"}

api.add_resource(Recordings, "/recording")

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

class Comments(Resource):
    def post(self, post_id):
        data = request.get_json()
        comment = Comment(
            comment=data["comment"],
            user_id=session['user_id'],
            post_id=post_id
        ) 

        db.session.add(comment)
        db.session.commit()

        response = make_response(
            comment.to_dict(),
            201
        )
        return response

    def patch(self, id):
        comment = Comment.query.filter_by(id=id).first()
        if not comment:
            return make_response({'error': 'Comment not found'}, 404)
        data = request.get_json()
        comment.comment = data['comment']
        db.session.commit()

        return make_response(comment.to_dict(), 202)

    def delete(self, id):
        comment = Comment.query.filter_by(id=id).first()
        if not comment:
            return make_response({"error": "Comment not found"}, 404)
        db.session.delete(comment)
        db.session.commit()

        return make_response('', 204)

api.add_resource(Comments, '/posts/<int:post_id>/comments', '/comments/<int:id>')


if __name__ == "__main__":
    app.run(port="5555", debug=True)