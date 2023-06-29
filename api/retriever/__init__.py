from flask import Blueprint
from .routes import retriever


def init_app(app):
    app.register_blueprint(retriever)
