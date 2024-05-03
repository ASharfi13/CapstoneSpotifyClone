from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name="Demo", last_name="User")
    sonny = User(
        username='Skrillex', email='skrillex@aa.io', password='password', first_name="Sonny", last_name="Moore")
    frank = User(
        username='FrankOcean', email='focean@aa.io', password='password', first_name="Frank", last_name="Ocean")
    ice = User(
        username='IceJJFish', email='icejjfish@aa.io', password='password', first_name="Ice", last_name="JJFish")
    rexxo = User(
        username='Rexxo', email='rexxo@aa.io', password='password', first_name="Rexxo", last_name="Fire"
    )
    diana = User(
        username='SadDiana', email='diana@aa.io', password='password', first_name='Sad', last_name='Diana'
    )
    david = User(
        username='DavidR', email='davidR@aa.io', password='password', first_name='David', last_name='Reilly'
    )
    tom = User(
        username='TomH', email='tomH@aa.io', password='password', first_name='Tom', last_name="H"
    )
    abby = User(
        username='AbbyRocker', email="abbyRock@aa.io", password='password', first_name='Abby', last_name="Rocker"
    )

    db.session.add(demo)
    db.session.add(sonny)
    db.session.add(frank)
    db.session.add(ice)
    db.session.add(rexxo)
    db.session.add(diana)
    db.session.add(david)
    db.session.add(tom)
    db.session.add(abby)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
