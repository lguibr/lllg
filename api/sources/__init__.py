from flask import Blueprint
from .routes import sources


def init_app(app):
    app.register_blueprint(sources)
