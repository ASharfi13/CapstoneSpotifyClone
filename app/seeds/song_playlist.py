from app.models import db, SongPlaylist, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_song_playlists():
    like1 = SongPlaylist(song_id=1, playlist_id=1)
    like2 = SongPlaylist(song_id=2, playlist_id=1)
    like3 = SongPlaylist(song_id=3, playlist_id=1)
    like4 = SongPlaylist(song_id=4, playlist_id=2)
    like5 = SongPlaylist(song_id=1, playlist_id=2)
    like6 = SongPlaylist(song_id=2, playlist_id=2)
    like7 = SongPlaylist(song_id=3, playlist_id=3)
    like8 = SongPlaylist(song_id=4, playlist_id=3)
    like9 = SongPlaylist(song_id=1, playlist_id=3)
    like10 = SongPlaylist(song_id=2, playlist_id=4)
    like11 = SongPlaylist(song_id=3, playlist_id=4)
    like12 = SongPlaylist(song_id=4, playlist_id=4)

    db.session.add(like1)
    db.session.add(like2)
    db.session.add(like3)
    db.session.add(like4)
    db.session.add(like5)
    db.session.add(like6)
    db.session.add(like7)
    db.session.add(like8)
    db.session.add(like9)
    db.session.add(like10)
    db.session.add(like11)
    db.session.add(like12)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_song_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.song_playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM song_playlists"))

    db.session.commit()
