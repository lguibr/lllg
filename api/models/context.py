from app.extensions import db
from .base import BaseModel


class Context(BaseModel):
    __tablename__ = "context"

    name = db.Column(db.String(255), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=True)
    file_path = db.Column(db.String(255), unique=True, nullable=False)
    # any other fields you might need for a context
