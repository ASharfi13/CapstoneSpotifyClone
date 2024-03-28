from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime as dt


class Album(db.Model):
    __tablename__ = 'albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40), nullable=False)
    genre = db.Column(db.String, nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    cover_img = db.Column(db.String, nullable=False)
    songs = db.relationship("Song", backref="album", lazy=True)
    createdAt = db.Column(db.Date, default=dt.datetime.now())
    updatedAt = db.Column(db.Date, default=dt.datetime.now())

    def to_Dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "genre": self.genre,
            "artist_id": self.artist_id,
            "cover_img": self.cover_img,
            "songs": [song.to_Dict() for song in self.songs],
            "created_at": str(self.createdAt)
            }
