import os
from dotenv import load_dotenv
from firebase_admin import credentials, initialize_app, firestore, storage

load_dotenv(".env.local")

bucket_name = os.getenv("NEXT_PUBLIC_FIREBASE_BUCKET")

cred = credentials.Certificate(".cred.json")
initialize_app(cred, {"storageBucket": bucket_name})

db = firestore.client()
bucket = storage.bucket()
