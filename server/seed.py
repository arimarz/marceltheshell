from random import random, randint, choice as rc
from app import app
from models import db, User, Post, Comment, Like
from datetime import datetime

# User, Post, Like, Comment


print('creating users')
users_list = [
    {"username": "shellyBoy", "password": "@snailY", "name": "Ari", "avatar": "http://www.campustimes.org/wp-content/uploads/2022/10/Sunahra_Tanvir_Marcel_CT-800x560-c-default.png"},
    {"username": "snailMail", "password": "@SlowAndSteady", "name": "Marcelina", "avatar": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fshop.a24films.com%2Fproducts%2Fmarcel-pin&psig=AOvVaw1WqII8A-Y3zre0Fgh-K5-d&ust=1680750926704000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCJCHt63jkf4CFQAAAAAdAAAAABAD"},
    {"username": "TinyConch", "password": "@ShellyParadise", "name": "Sebastian", "avatar": "https://ih1.redbubble.net/image.3801694980.8997/st,small,507x507-pad,600x600,f8f8f8.jpg"},
    {"username": "MrTinyShell", "password": "@TinyBFF", "name": "Finn", "avatar": "https://external-preview.redd.it/TDTD0M1IzU79UAoMFKAQpbrzjQZemmDUXgTUOnlhM2M.jpg?auto=webp&s=c29dcc299446a772b90e399c8815b369087d5919"},
    {"username": "ShellyTalks", "password": "@ShellSpeaks", "name": "Echo", "avatar": "https://i.redd.it/wazwcpecr3o91.png"},
    {"username": "SnailSpeed", "password": "@SlowAndSteady", "name": "Rapid", "avatar": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d8d7032a-c94c-4f65-8ad0-a79c6dcce8f9/d7wdaxc-26028f6e-c0fa-44d5-91dc-d2c513919a47.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q4ZDcwMzJhLWM5NGMtNGY2NS04YWQwLWE3OWM2ZGNjZThmOVwvZDd3ZGF4Yy0yNjAyOGY2ZS1jMGZhLTQ0ZDUtOTFkYy1kMmM1MTM5MTlhNDcuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.3d1cTJwBlTSIpnwEGsLUzMYUgCRMKi5uc1qEZVflBZI"},
    {"username": "ConchCove", "password": "@ShellParadise", "name": "Coral", "avatar": "https://s3.eu-west-2.amazonaws.com/ourartcorner/20150715/d4e27f-Marcel-the-Shell-with-Shoes-on-max.jpeg"},
    {"username": "OceanExplorer", "password": "@SeashellAdventure", "name": "Luna", "avatar": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3572171b-47dc-4f69-b4bd-74c373219c3d/d3d2bif-2679ae81-733b-4bb5-8827-d557063c131f.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzM1NzIxNzFiLTQ3ZGMtNGY2OS1iNGJkLTc0YzM3MzIxOWMzZFwvZDNkMmJpZi0yNjc5YWU4MS03MzNiLTRiYjUtODgyNy1kNTU3MDYzYzEzMWYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.XGrkFaz1omrbTHvsifAdBaWEjMYIFKd4gsrWLZpgDKA"},
    {"username": "BeachBum", "password": "@SandAndSun", "name": "Sunny", "avatar": "https://i.pinimg.com/236x/19/87/a8/1987a8cc2881d065236a9724b47aa951--marcel-the-shell-i-smile.jpg"},
    {"username": "TinyCaptain", "password": "@ShellBoat", "name": "Caspian", "avatar": "https://pbs.twimg.com/media/FrC25r9aEAc05np?format=jpg&name=large"},
    {"username": "SeashellShine", "password": "@GlisteningShell", "name": "Nova", "avatar": "https://cdn.dribbble.com/users/4640/screenshots/1241226/media/1c98d7c31b0c6e043a1fbf61dfcef992.png?compress=1&resize=400x300&vertical=top"},
    {"username": "MermaidTale", "password": "@UnderwaterShell", "name": "Ariel", "avatar": "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cffaa0146682601.62b475e4c774a.png"},
    {"username": "ConchChampion", "password": "@ShellWinner", "name": "Atlas", "avatar": "https://ih1.redbubble.net/image.4163968492.1471/st,small,507x507-pad,600x600,f8f8f8.jpg"},
]
print('users created')

# Add users to database
def make_users():

    User.query.delete()

    users = []

    for user_dict in users_list:
        user = User(
            username=user_dict["username"],
            name=user_dict["name"],
            avatar=user_dict["avatar"]
        )
        user.password_hash = user_dict["password"]
        users.append(user)

    db.session.add_all(users)
    db.session.commit()
print('users committed')

# post data
print('creating posts')
posts_list = [
    {"quote": "Guess why I smile? Uh, because it's worth it", "original": True, "user_id": 1, "image": "https://64.media.tumblr.com/tumblr_lzcsx7e42X1r6s6i5o1_500.gif"},
    {"quote": "I'm the smallest", "original": True, "user_id": 2, "image": "https://media.giphy.com/media/FqDvV8Wp5e5mH7Gc2C/giphy.gif"},
    {"quote": "I have shoes, they are pine needles.", "original": True, "user_id": 3, "image": "https://media.giphy.com/media/w6uwxA9SbdyaM/giphy.gif"},
    {"quote": "My one true regret is that I'll never have a dog. But sometimes I tie a hair to a piece of lint and I drag it around.", "original": True, "user_id": 4, "image": "https://media.giphy.com/media/Hm8JhBfNBKjOw/giphy.gif"},
    {"quote": "I don't always do a lot, but what I do, I do well - namely, breathing and being tiny.", "original": True, "user_id": 5, "image": "https://media.giphy.com/media/Ma7VjFgHdJ7YY/giphy.gif"},
    {"quote": "I can't tell time, but I know it's time for lunch.", "original": True, "user_id": 6, "image": "https://media.giphy.com/media/l2QZVMsBNbRUrTBJG/giphy.gif"},
    {"quote": "It's a heavy burden being such a tiny being.", "original": True, "user_id": 7, "image": "https://media.giphy.com/media/tKjEEXG8WtS4M/giphy.gif"},
    {"quote": "Sometimes on a Sunday I think I'm alone, but I'm really not alone. I have the bird.", "original": True, "user_id": 8, "image": "https://media.giphy.com/media/BLpJ3aqgVccOk/giphy.gif"},
    {"quote": "What is a skateboard? Oh, is it food?", "original": False, "user_id": 9, "image": "https://media.giphy.com/media/1MFgcjGrcFZ9POpeLD/giphy.gif"},
    {"quote": "I'm allergic to hazelnuts, but that doesn't stop me from loving Nutella.", "original": False, "user_id": 10, "image": "https://media.giphy.com/media/8pKerJZ9oFsoE/giphy.gif"},
    {"quote": "I've always wanted to be an astronaut, but I don't think they make spacesuits in my size.", "original": True, "user_id": 3, "image": "https://media.giphy.com/media/w0myG9zCJdBOs/giphy.gif"},
    {"quote": "I love the smell of fresh cut grass. It reminds me of when I was a blade of grass.", "original": False, "user_id": 2, "image": "https://media.giphy.com/media/Zv4A9tzLEiMCs/giphy.gif"},
    {"quote": "I can only see out of one eye because the other one is lazy", "original": True, "user_id": 1, "image": "https://media.giphy.com/media/9P4Hls4e0V7wU/giphy.gif"},
    {"quote": "I'm as happy as a clam, because I am a clam", "original": True, "user_id": 2, "image": "https://media.giphy.com/media/3o6ZtpGFEPL8A6UO7K/giphy.gif"},
    {"quote": "I'm like a seashell, but much, much louder", "original": True, "user_id": 3, "image": "https://media.giphy.com/media/12tj1fKHg9Xh8M/giphy.gif"},
    {"quote": "I'm so talented, I can play dead", "original": True, "user_id": 4, "image": "https://media.giphy.com/media/pbUEWlCvSTvLm/giphy.gif"},
    {"quote": "I'm a pretty busy guy. I've got a sentence to finish", "original": True, "user_id": 5, "image": "https://media.giphy.com/media/xUPGciJzdvg58xg1JW/giphy.gif"},
    {"quote": "I love doing impressions. Here's my impression of a thumb", "original": True, "user_id": 6, "image": "https://media.giphy.com/media/l4FGsV4pAKcMwCMPC/giphy.gif"},
    {"quote": "I don't mean to brag, but I just bought a house with a pool", "original": False, "user_id": 7, "image": "https://media.giphy.com/media/l2SpQefwpfU6C5UqM/giphy.gif"},
    {"quote": "I'm not just a shell. I'm a seashell", "original": True, "user_id": 8, "image": "https://media.giphy.com/media/gEJ1wVrZzGIuM/giphy.gif"},
    {"quote": "I'm an excellent walker. One of my best qualities", "original": True, "user_id": 9, "image": "https://media.giphy.com/media/l49JXJFvR3qHapwpy/giphy.gif"},
    {"quote": "My friends are like stars. They're always there, even when you can't see them", "original": False, "user_id": 10, "image": "https://media.giphy.com/media/xUOwFZr7kUXZzjtDkM/giphy.gif"}
    ]
print('posts created')

# Add posts to database
def make_posts():

    Post.query.delete()

    posts = []

    for post_dict in posts_list:
        post = Post(
            quote=post_dict["quote"],
            original=post_dict["original"],
            user_id=post_dict['user_id'],
            image=post_dict["image"]
        )
        posts.append(post)

    db.session.add_all(posts)
    db.session.commit()
print('posts committed')

print('creating likes')
likes_list = []

for i in range(100):
    user_id = randint(1, 13)
    post_id = randint(1, 22)
    likes_list.append({'user_id': user_id, 'post_id': post_id})
print('likes created')

# Add likes to database
def make_likes():

    Like.query.delete()

    likes = []

    for like_dict in likes_list:
        like = Like(
            user_id=like_dict['user_id'],
            post_id=like_dict['post_id']
        )
        likes.append(like)

    db.session.add_all(likes)
    db.session.commit()
print('likes committed')

print('creating comments')
comments_list = []
comments_random = [
    "Marcel the Shell is my spirit animal.",
    "I can't get enough of Marcel's adorable little voice.",
    "This just made my day. Thank you for sharing, Marcel!",
    "Marcel is the cutest thing on the internet, hands down.",
    "I could listen to Marcel talk about anything and everything for hours.",
    "Marcel is proof that good things come in small packages.",
    "This video always puts a smile on my face. Marcel is too cute for words.",
    "Marcel the Shell is the perfect example of less is more.",
    "I love how Marcel finds wonder in the smallest things.",
    "Marcel is such a unique and creative character.",
    "Marcel's positive attitude is contagious.",
    "This is exactly what I needed to brighten my day. Thanks, Marcel!",
    "Marcel's adventures always leave me wanting more.",
    "I never thought I'd say this, but Marcel the Shell might just be my favorite celebrity.",
    "Marcel's imagination knows no bounds.",
    "Marcel is the hero we all need in our lives.",
    "Marcel's outlook on life is so refreshing.",
    "Marcel is proof that even the smallest creatures can have the biggest personalities.",
    "I wish Marcel could narrate my life.",
    "Marcel the Shell is a national treasure."
]
for i in range(100):
    user_id = randint(1, 13)
    post_id = randint(1, 22)
    comment = rc(comments_random)
    comments_list.append({'user_id': user_id, 'post_id': post_id, 'comment': comment})
print('comments created')

# Add comments to database
def make_comments():

    Comment.query.delete()

    comments = []

    for comment_dict in comments_list:
        comment = Comment(
            user_id=comment_dict['user_id'],
            post_id=comment_dict['post_id'],
            comment=comment_dict['comment']
        )
        comments.append(comment)

    db.session.add_all(comments)
    db.session.commit()
print('comments committed')

if __name__ == '__main__':
    with app.app_context():
        make_users()
        make_posts()
        make_likes()
        make_comments()