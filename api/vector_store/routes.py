# vectorstore/routes.py

from flask import Blueprint, request, jsonify
from api.context.routes import get_context_by_name
from api.sources.routes import get__blob_source_by_name
from langchain.vectorstores import Chroma
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from services.firebase import bucket, db
from flask import current_app as app

from langchain.docstore.document import Document

import os

vectorstore = Blueprint("vectorstore", __name__)


@vectorstore.route("/api/vectorstore", methods=["POST"])
def create_vectorstore():
    logger = app.logger
    data = request.get_json()
    vectorstore_name = data["name"]
    description = data["description"]
    context_names = data["contexts"]
    vector_store_dir = f"chroma_dbs/{vectorstore_name}"

    # Define embeddings
    embeddings = OpenAIEmbeddings()
    documents = []
    logger.debug("context_names")
    logger.debug(context_names)
    # Iterate through all the context names provided
    for context_name in context_names:
        context = get_context_by_name(context_name)
        if context:
            files = context["files"]
            logger.debug("files")
            logger.debug(files)
            for file in files:
                logger.debug("file")
                logger.debug(file)
                blob = get__blob_source_by_name(file.replace("sources/", ""))
                logger.debug("blob")
                logger.debug(blob)
                if blob:
                    logger.debug("blob")
                    logger.debug(blob)
                    text_splitter = CharacterTextSplitter(
                        chunk_size=1000, chunk_overlap=0
                    )
                    logger.debug("blob")
                    logger.debug(blob)
                    documents_from_file = [
                        Document(page_content=blob, metadata={"source": file})
                    ]
                    logger.debug("documents_from_file")
                    logger.debug(documents_from_file)
                    documents.extend(documents_from_file)

    logger.debug("documents")
    logger.debug(documents)

    # Build Chroma instance with documents and embeddings
    docs_search = Chroma.from_documents(
        documents,
        embeddings,
        persist_directory=vector_store_dir,
        collection_name=vectorstore_name,
    )

    docs_search.persist()

    all_files = [
        f
        for f in os.listdir(vector_store_dir)
        if os.path.isfile(os.path.join(vector_store_dir, f))
    ]

    for file in all_files:
        local_file = os.path.join(vector_store_dir, file)
        blob = bucket.blob(os.path.join(vector_store_dir, file))
        blob.upload_from_filename(local_file)

    # Save to Firestore
    ref = db.collection("vectorstores").document(vectorstore_name)
    ref.set(
        {
            "name": vectorstore_name,
            "description": description,
            "blob_name": vector_store_dir,
            "contexts": context_names,
        }
    )

    return jsonify({"message": "Vectorstore created successfully."}), 201


@vectorstore.route("/api/vectorstore/<id>", methods=["GET"])
def get_vectorstore(id):
    ref = db.collection("vectorstores").document(id)
    vectorstore = ref.get()
    if vectorstore.exists:
        return jsonify(vectorstore.to_dict()), 200
    else:
        return jsonify({"message": f"Vectorstore {id} not found."}), 404


@vectorstore.route("/api/vectorstore", methods=["GET"])
def list_vectorstores():
    refs = db.collection("vectorstores").stream()
    vectorstores = [{doc.id: doc.to_dict()} for doc in refs]
    return jsonify({"vectorstores": vectorstores}), 200


@vectorstore.route("/api/vectorstore/<id>", methods=["DELETE"])
def delete_vectorstore(id):
    # Delete vectorstore from ChromaDB
    try:
        # Delete from Firestore
        ref = db.collection("vectorstores").document(id)
        if ref.get().exists:
            ref.delete()

        blob_name = f"vectorstore/{id}"
        blob = bucket.blob(blob_name)
        if blob.exists():
            blob.delete()

        return jsonify({"message": "Vectorstore deleted successfully."}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 404


@vectorstore.route("/api/vectorstore/<id>/query", methods=["POST"])
def question_answer(id):
    logger = app.logger

    logger.debug("id")
    logger.debug(id)
    # Download vectorstore from bucket to local directory
    try:
        local_folder = os.path.join(
            "temp", id
        )  # replace 'path_to_your_local_directory' with actual path
        blob_folder = f"chroma_dbs/{id}"
        download_dir_from_bucket(bucket, blob_folder, local_folder)
    except Exception as e:
        return jsonify({"message": str(e)}), 404

    # Instantiate Chroma with the downloaded data
    try:
        vectorstore = Chroma(
            id,
            OpenAIEmbeddings(),
            local_folder,
        )
    except Exception as e:
        return jsonify({"message": str(e)}), 404
    logger.debug("vectorstore")
    logger.debug(vectorstore)
    data = request.get_json()
    query = data["query"]
    logger.debug("query")
    logger.debug(query)
    docs = vectorstore.similarity_search(query)
    logger.debug("docs")
    logger.debug(docs)
    # Return top answer
    if docs:
        return jsonify({"answer": docs[0].page_content}), 200
    return jsonify({"message": "No answer found."}), 404


def download_dir_from_bucket(bucket, source_folder, destination_folder):
    """Downloads a directory from Google Cloud Storage"""
    blobs = bucket.list_blobs(prefix=source_folder)
    for blob in blobs:
        filename = blob.name.replace(source_folder, destination_folder)
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        blob.download_to_filename(filename)
