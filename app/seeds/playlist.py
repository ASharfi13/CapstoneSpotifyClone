from app.models import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_playlists():
    playlist1 = Playlist(title="Jazzy Vibes", cover_img="https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/jazzplaylist.png", description="For all the great Jazz lovers, this one is definitely for you!", user_id=1)
    playlist2 = Playlist(title="Let's Rock", cover_img="https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/rockPlaylist.png", description="Let's Rock and Roll! All the greatest rock hits for the Rock lovers!", user_id=2)
    playlist3 = Playlist(title="I'm Weird", cover_img="https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/weirdPlaylist.png", description="This is my weird playlist. All the songs here are weird and I love it! Don't judge!", user_id=1)
    playlist4 = Playlist(title="Everything Everywhere", cover_img="https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/varietyPlaylist.png", description="I like to listen to a variety of music, come take a musical journey with me in through this playlist", user_id=3)

    db.session.add(playlist1)
    db.session.add(playlist2)
    db.session.add(playlist3)
    db.session.add(playlist4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlists"))

    db.session.commit()
