from .base import BaseModel
from sqlalchemy.dialects.postgresql import JSONB
from app.extensions import db


class Retriever(BaseModel):
    __tablename__ = "retriever"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=True)
    retrievers = db.Column(JSONB)  # This stores the vector store and retriever type
