from random import random, randint, choice as rc
from app import app
from models import db, User, Post, Comment, Like
from datetime import datetime, timedelta
# User, Post, Like, Comment

video = './videos/'

print('creating users')
users_list = [
    {"username": "shellyBoy", "password": "@snailY", "name": "Ari", "avatar": "http://www.campustimes.org/wp-content/uploads/2022/10/Sunahra_Tanvir_Marcel_CT-800x560-c-default.png"},
    {"username": "snailMail", "password": "@SlowAndSteady", "name": "Marcelina", "avatar": "data:image/jpeg;base64,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"},
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
    {"quote": "Sometimes people say that my head is too big for my body and then I say 'Compared to what!' ", "original": True, "user_id": 4, "image": './videos/compared_to_what.mp4'},
    {"quote": "Guess why I smile a lot? Uh, because it's worth it", "original": True, "user_id": 1, "image": "./videos/guess_why_i_smile.mp4"},
    {"quote": "Guess what I wear as a hat... A lentil", "original": True, "user_id": 2, "image": "./videos/guesswhatIwhereasaHat.mp4"},
    {"quote": "Guess what my bed is... a piece of bread.", "original": True, "user_id": 3, "image": "./videos/breadroom.mp4"},
    {"quote": "If you do drive a bug, you have to be pretty easy-going because you're only going to get to go where the bug wants to go", "original": True, "user_id": 4, "image": "./videos/drive_a_bug.mp4"},
    {"quote": "My name is Marcel...I have a lot of other great qualities as well", "original": True, "user_id": 5, "image": "./videos/i_like_that_about_myself.mp4"},
    {"quote": "Guess what my skis are.", "original": True, "user_id": 6, "image": "./videos/skis.mp4"},
    {"quote": "Windy.. thats your nickname", "original": True, "user_id": 7, "image": "./videos/windy.mp4"},
    {"quote": "All he cares about is treats, treats and snoozin'", "original": True, "user_id": 8, "image": "./videos/treats_and_snoozin.mp4"},
    {"quote": "Guess what I wear as a hat... A lentil", "original": True, "user_id": 2, "image": "./videos/guesswhatIwhereasaHat.mp4"},
    {"quote": "Guess what I wear as a hat... A lentil", "original": True, "user_id": 3, "image": "./videos/guesswhatIwhereasaHat.mp4"},
    {"quote": "Guess what I wear as a hat... A lentil", "original": True, "user_id": 7, "image": "./videos/guesswhatIwhereasaHat.mp4"},
    {"quote": "Guess what I wear as a hat... A lentil", "original": True, "user_id": 11, "image": "./videos/guesswhatIwhereasaHat.mp4"}, 
    {"quote": "Guess what I wear as a hat... A lentil", "original": True, "user_id": 10, "image": "./videos/guesswhatIwhereasaHat.mp4"},
    {"quote": "Guess what I wear as a hat... A lentil", "original": True, "user_id": 9, "image": "./videos/guesswhatIwhereasaHat.mp4"},
    {"quote": "Guess what I wear as a hat... A lentil", "original": True, "user_id": 8, "image": "./videos/guesswhatIwhereasaHat.mp4"},
    {"quote": "Guess what I wear as a hat... A lentil", "original": True, "user_id": 7, "image": "./videos/guesswhatIwhereasaHat.mp4"}, 
    {"quote": "Guess what I wear as a hat... A lentil", "original": True, "user_id": 6, "image": "./videos/guesswhatIwhereasaHat.mp4"},
    {"quote": "Guess what I wear as a hat... A lentil", "original": True, "user_id": 12, "image": "./videos/guesswhatIwhereasaHat.mp4"},
    {"quote": "Guess what I wear as a hat... A lentil", "original": True, "user_id": 4, "image": "./videos/guesswhatIwhereasaHat.mp4"},
    {"quote": "Guess what I wear as a hat... A lentil", "original": True, "user_id": 13, "image": "./videos/guesswhatIwhereasaHat.mp4"}
    ]
print('posts created')

# Add posts to database
def make_posts():
    Post.query.delete()

    posts = []

    for post_dict in posts_list:

        days_ago = randint(1, 10000)
        created_at = datetime.now() - timedelta(days=days_ago)

        post = Post(
            quote=post_dict["quote"],
            original=post_dict["original"],
            user_id=post_dict['user_id'],
            image=post_dict["image"],
            created_at=created_at 
        )
        posts.append(post)

    db.session.add_all(posts)
    db.session.commit()
print('posts committed')

print('creating likes')
likes_set = set()

for i in range(100):
    while True:
        user_id = randint(1, 13)
        post_id = randint(1, 22)
        pair = (user_id, post_id)
        # If the pair is not in the set, add it and break the loop
        if pair not in likes_set:
            likes_set.add(pair)
            break

likes_list = [{'user_id': pair[0], 'post_id': pair[1]} for pair in likes_set]
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
    post_id = randint(1, 21)
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