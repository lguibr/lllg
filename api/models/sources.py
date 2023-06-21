# inside models/sources.py
from app.extensions import db
from .base import BaseModel


class Source(BaseModel):
    __tablename__ = "sources"

    file_path = db.Column(db.String(255), unique=True, nullable=False)
    # any other fields you might need for a source
