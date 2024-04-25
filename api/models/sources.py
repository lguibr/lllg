from app.extensions import db
from .base import BaseModel


class Source(BaseModel):
    __tablename__ = "sources"

    file_path = db.Column(db.String(255), unique=True, nullable=False)
