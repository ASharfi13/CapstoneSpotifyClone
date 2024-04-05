from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime as dt


class Playlist(db.Model):
    __tablename__ = "playlists"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String(400), nullable=True)
    cover_img = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    createdAt = db.Column(db.Date, default=dt.datetime.now())
    updatedAt = db.Column(db.Date, default=dt.datetime.now())
