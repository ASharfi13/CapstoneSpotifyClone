from flask.cli import AppGroup
from .users import seed_users, undo_users
from .songs import seed_songs, undo_songs
from .albums import seed_albums, undo_albums
from .likes import seed_likes, undo_likes
from .song_playlist import seed_song_playlists, undo_song_playlists
from .playlist import seed_playlists, undo_playlists

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_albums()
        undo_songs()
        undo_likes()
        undo_playlists()
        undo_song_playlists()
    seed_users()
    seed_albums()
    seed_songs()
    seed_likes()
    seed_playlists()
    seed_song_playlists()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_albums()
    undo_songs()
    undo_likes()
    undo_playlists()
    undo_song_playlists()

    # Add other undo functions here
