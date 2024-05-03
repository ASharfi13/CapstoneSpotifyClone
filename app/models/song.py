from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime as dt

song_playlist_associations = db.Table(
    "song_playlist_associations",
    db.Model.metadata,
    db.Column('song_id', db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), primary_key=True),
    db.Column('playlist_id', db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id')), primary_key=True)
)

if environment == 'production':
    song_playlist_associations.schema = SCHEMA


class Song(db.Model):
    __tablename__ = 'songs'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(20), nullable=False)
    song_url = db.Column(db.String, nullable=False)
    cover_img = db.Column(db.String, nullable=False)
    album_id = db.Column(db.ForeignKey(add_prefix_for_prod("albums.id")), nullable=True)
    artist_id = db.Column(db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    playlists = db.relationship("Playlist", secondary='song_playlists', back_populates='songs')

    createdAt = db.Column(db.Date, default=dt.datetime.now())
    updatedAt = db.Column(db.Date, default=dt.datetime.now())


    def to_Dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "song_url": self.song_url,
            "album_id": self.album_id,
            "artist_id": self.artist_id,
            "cover_img": self.cover_img,
            "created_at": str(self.createdAt)
        }
