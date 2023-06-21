# firebase_service.py
import os
from dotenv import load_dotenv
from firebase_admin import credentials, initialize_app, firestore, storage

# NOTE use the same env of the ui
load_dotenv(".env.local")

bucket_name = os.getenv("NEXT_PUBLIC_FIREBASE_BUCKET")

# Initialize Firebase app with your project's credentials
cred = credentials.Certificate(".cred.json")
initialize_app(cred, {"storageBucket": bucket_name})

db = firestore.client()
bucket = storage.bucket()
