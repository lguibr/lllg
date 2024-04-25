from flask import Blueprint, request, jsonify
from services.firebase import db

contexts = Blueprint("contexts", __name__)


def get_context_by_name(name):
    ref = db.collection("contexts").document(name)
    context = ref.get()
    if context.exists:
        return context.to_dict()
    else:
        return {"message": f"Context {name} not found."}


@contexts.route("/api/contexts", methods=["POST"])
def create_context():
    data = request.get_json()
    name = data.get("name")
    description = data.get("description")
    files = data.get("files")

    ref = db.collection("contexts").document(name)
    ref.set({"name": name, "description": description, "files": files})

    return jsonify({"message": f"Context {name} created successfully."}), 201


@contexts.route("/api/contexts/<name>", methods=["GET"])
def get_context(name):
    ref = db.collection("contexts").document(name)
    context = ref.get()
    if context.exists:
        return jsonify(context.to_dict()), 200
    else:
        return jsonify({"message": f"Context {name} not found."}), 404


@contexts.route("/api/contexts/<name>", methods=["PUT"])
def update_context(name):
    data = request.get_json()
    files = data.get("files")

    ref = db.collection("contexts").document(name)
    if ref.get().exists:
        ref.update({"files": files})
        return jsonify({"message": f"Context {name} updated successfully."}), 200
    else:
        return jsonify({"message": f"Context {name} not found."}), 404


@contexts.route("/api/contexts/<name>", methods=["DELETE"])
def delete_context(name):
    ref = db.collection("contexts").document(name)
    if ref.get().exists:
        ref.delete()
        return jsonify({"message": f"Context {name} deleted successfully."}), 200
    else:
        return jsonify({"message": f"Context {name} not found."}), 404


@contexts.route("/api/contexts", methods=["GET"])
def list_contexts():
    refs = db.collection("contexts").stream()
    contexts = [{doc.id: doc.to_dict()} for doc in refs]
    return jsonify({"contexts": contexts}), 200
