from app.extensions import db
from .base import BaseModel


class VectorStore(BaseModel):
    __tablename__ = "vectorstore"

    name = db.Column(db.String(255), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=True)
    file_path = db.Column(
        db.String(255), unique=True, nullable=False
    )  # This could be the local path
    gcs_blob_name = db.Column(
        db.String(255), unique=True, nullable=False
    )  # The name of the blob on GCS
