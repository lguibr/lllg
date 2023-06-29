# api/retriever/routes.py
from flask import Blueprint, request, jsonify
from services.firebase import db

retriever = Blueprint("retriever", __name__)


@retriever.route("/api/retriever", methods=["POST"])
def create_retriever():
    try:
        data = request.get_json()
        ref = db.collection("retrievers").document(data["name"])
        ref.set(
            {
                "name": data["name"],
                "description": data["description"],
                "retrievers": data["retrievers"],
            }
        )
        return jsonify({"message": "Retriever created successfully."}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 404


@retriever.route("/api/retriever/<id>", methods=["GET"])
def get_retriever(id):
    ref = db.collection("retrievers").document(id)
    retriever = ref.get()
    if retriever.exists:
        return jsonify(retriever.to_dict()), 200
    else:
        return jsonify({"message": f"Retriever {id} not found."}), 404


@retriever.route("/api/retriever", methods=["GET"])
def list_retrievers():
    refs = db.collection("retrievers").stream()
    retrievers = [{doc.id: doc.to_dict()} for doc in refs]
    return jsonify({"retrievers": retrievers}), 200


@retriever.route("/api/retriever/<id>", methods=["DELETE"])
def delete_retriever(id):
    try:
        ref = db.collection("retrievers").document(id)
        if ref.get().exists:
            ref.delete()
        return jsonify({"message": "Retriever deleted successfully."}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 404


@retriever.route("/api/retriever/<id>", methods=["PUT"])
def update_retriever(id):
    try:
        data = request.get_json()
        ref = db.collection("retrievers").document(id)
        if ref.get().exists:
            ref.update(
                {
                    "name": data["name"],
                    "description": data["description"],
                    "retrievers": data["retrievers"],
                }
            )
        return jsonify({"message": "Retriever updated successfully."}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 404
