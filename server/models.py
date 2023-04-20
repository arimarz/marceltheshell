from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from flask import session
#from sqlalchemy import Date
import re

from config import bcrypt, db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    #admin = db.Column(db.String, default=False)
    name = db.Column(db.String, nullable=False)
    avatar = db.Column(db.String)

    posts = db.relationship('Post', backref='user')
    likes = db.relationship('Like', backref='user')
    comments = db.relationship('Comment', backref='user')
    serialize_rules = ('-posts', '-likes', '-comments', '-_password_hash' )

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    @validates('username')
    def validate_username(self, key, username):
        users = User.query.all()
        usernames = [user.username for user in users]
        if not username:
            raise ValueError('Username must be provided')
        elif username in usernames:
            raise ValueError('Username already exists')
        elif len(username) < 3:
            raise ValueError('Username must be at least 3 characters long.')
        return username

    @validates('password')
    def validate_password(self, key, password):
        if len(password) < 8:
            raise ValueError('Password must be at least 8 characters long.')
        elif not re.search('[!@#$%^&*]', password):
            raise ValueError('Password must contain at least one special character.')
        return password
        
    @validates('name')
    def validate_name(self, key, value):
        if not value:
            raise ValueError('Name must be provided')
        return value
    
    def __repr__(self):
        return f'USER: ID: {self.id}, Name {self.name}, Username: {self.username}'
    

class Post(db.Model, SerializerMixin):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String, nullable=False)
    quote = db.Column(db.String, nullable= False)
    created_at = db.Column(db.DateTime, nullable=True, server_default=db.func.now())
    original = db.Column(db.Boolean, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    likes = db.relationship('Like', backref='post')
    comments = db.relationship('Comment', backref='post')
    serialize_rules = ('-likes', '-comments')
    @property
    def is_liked(self):
        return True if Like.query.filter_by(user_id=session['user_id'], post_id=self.id).first() else False
    
    @property
    def liked_amount(self):
        return len(Like.query.filter_by(post_id=self.id).all())
        #or len(self.likes)
        # import ipdb
        # ipdb.set_trace()
    
    @validates('quote')
    def validate_quote(self, key, value):
        if not value:
            raise ValueError('Quote must be provided')
        return value
    
    @validates('image')
    def validate_image(self, key, value):
        if not value:
            raise ValueError('Image must be provided')
        return value
    
    @validates('made_up')
    def validate_made_up(self, key, value):
        if not value:
            raise ValueError('Originality must be provided')
        return value

class Like(db.Model, SerializerMixin):
    __tablename__ = 'likes'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    __table_args__ = (db.UniqueConstraint('user_id', 'post_id', name='user_post_unique'),) #no doubles
    

class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    serialize_rules = ('-post',)

# class PostTag(db.Model, SerializerMixin):
#     __tablename__ = 'post_tags'
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
#     post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))

# class Tag(db.Model, SerializerMixin):
#     __tablename__ = 'tags'
#     id = db.Column(db.Integer, primary_key=True)
#     tag = db.Column(db.String)