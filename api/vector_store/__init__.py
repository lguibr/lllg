# vectorstore/__init__.py

from flask import Blueprint
from .routes import vectorstore


def init_app(app):
    app.register_blueprint(vectorstore)
