from flask import Blueprint, request, jsonify
from services.firebase import bucket

sources = Blueprint("sources", __name__)


def get__blob_source_by_name(name):
    blob_name = f"sources/{name}"
    blob = bucket.blob(blob_name)

    if blob.exists():
        return blob.download_as_text()


@sources.route("/api/sources", methods=["POST"])
def create_source():
    file = request.files["file"]
    filename = file.filename
    blob_name = f"sources/{filename}"

    blob = bucket.blob(blob_name)
    blob.upload_from_file(file)  # Use upload_from_file instead of upload_from_filename

    return jsonify({"message": f"File {filename} uploaded successfully."}), 201


@sources.route("/api/sources/<id>", methods=["GET"])
def get_source(id):
    blob_name = f"sources/{id}"
    blob = bucket.blob(blob_name)

    if blob.exists():
        return blob.download_as_text(), 200
    else:
        return jsonify({"message": f"File {id} not found."}), 404


@sources.route("/api/sources/<id>", methods=["PUT"])
def update_source(id):
    file = request.files["file"]
    blob_name = f"sources/{id}"

    blob = bucket.blob(blob_name)
    if blob.exists():
        blob.upload_from_file(
            file
        )  # Use upload_from_file instead of upload_from_filename
        return jsonify({"message": f"File {id} updated successfully."}), 200
    else:
        return jsonify({"message": f"File {id} not found."}), 404


@sources.route("/api/sources/<id>", methods=["DELETE"])
def delete_source(id):
    blob_name = f"sources/{id}"

    blob = bucket.blob(blob_name)
    if blob.exists():
        blob.delete()
        return jsonify({"message": f"File {id} deleted successfully."}), 200
    else:
        return jsonify({"message": f"File {id} not found."}), 404


@sources.route("/api/sources", methods=["GET"])
def list_sources():
    prefix = "sources/"
    blobs = bucket.list_blobs(prefix=prefix)
    files = [blob.name for blob in blobs]
    return jsonify({"files": files}), 200
