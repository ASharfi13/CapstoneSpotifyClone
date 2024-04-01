from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_songs():
    song1 = Song(
        title='Song1', song_url='https://spotifycapstonecloneaudiofiles.s3.us-east-2.amazonaws.com/SkrillexLivesHere/BraydenK+%26+Akacia+-+Cold+Hearted.mp3', cover_img='https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/SongImages/song1.jpeg', album_id=1, artist_id=2)
    song2 = Song(
        title='Song2', song_url='https://spotifycapstonecloneaudiofiles.s3.us-east-2.amazonaws.com/SkrillexLivesHere/Cozmoe+-+Resonate.mp3', cover_img='https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/SongImages/song1.jpeg', album_id=1, artist_id=2)
    song3 = Song(
        title='Song3', song_url='https://spotifycapstonecloneaudiofiles.s3.us-east-2.amazonaws.com/SkrillexLivesHere/MADZI%2C+L3ss%2C+Barmuda+-+Hush.mp3', cover_img='https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/SongImages/undocumented.png', album_id=2, artist_id=3)
    song4 = Song (
        title="Song4", song_url="https://spotifycapstonecloneaudiofiles.s3.us-east-2.amazonaws.com/SkrillexLivesHere/Necrolx%2C+Hxi%2C+Qoiet+-+I%E2%80%98ll+show+you+(feat.+Youk3iv).mp3", cover_img='https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/SongImages/undocumented.png', album_id=2, artist_id=3
    )
    song5 = Song(
        title="Song5", song_url="https://spotifycapstonecloneaudiofiles.s3.us-east-2.amazonaws.com/frank+ocean+-+thinkin+bout+you+(ryan+hemsworth+bootleg)%EF%B9%9Dslowed+reverb%EF%B9%9E.mp3",
        cover_img="https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/focean.jpeg", artist_id=1
    )

    db.session.add(song1)
    db.session.add(song2)
    db.session.add(song3)
    db.session.add(song4)
    db.session.add(song5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
