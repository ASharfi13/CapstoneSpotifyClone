from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime as dt

class SongPlaylist(db.Model):
    __tablename__ = "song_playlists"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")))
    playlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("playlists.id")))
    createdAt = db.Column(db.Date, default=dt.datetime.now())
    updatedAt = db.Column(db.Date, default=dt.datetime.now())


    def to_Dict(self):
        return {
            "id" : self.id,
            "song_id": self.song_id,
            "playlist_id": self.playlist_id
        }
