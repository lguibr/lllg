from flask import Blueprint
from .routes import contexts


def init_app(app):
    app.register_blueprint(contexts)
