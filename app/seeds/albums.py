from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text

genres = ["Hip-Hop", "Pop", "Rock", "Reggaeton", "Country", "Rap", "Indie", "Alternative", "Reggae", "House", "Punk", "Scream", "Techno", "Jazz", "RnB"]

# Adds a demo user, you can add other users here if you want
def seed_albums():
    album1 = Album (
        title='Album1', genre = genres[12], artist_id = 1, cover_img='https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/SongImages/song1.jpeg'
        )
    album2 = Album (
        title='Album2', genre = genres[9], artist_id = 2, cover_img="https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/SongImages/undocumented.png"
    )
    db.session.add(album1)
    db.session.add(album2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))

    db.session.commit()
