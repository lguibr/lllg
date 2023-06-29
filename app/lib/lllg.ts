// utils/api.ts

interface UploadSourcePayload {
  source: File; // or whatever the type of your source is
}

export async function uploadSource(
  payload: UploadSourcePayload,
  token: string
): Promise<Response | Error> {
  try {
    const formData = new FormData();
    formData.append("file", payload.source);

    const response = await fetch("/api/sources", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return response;
  } catch (e) {
    console.log(e);
    return e as Error;
  }
}

export async function listSources(token: string): Promise<string[] | Error> {
  try {
    const response = await fetch("/api/sources", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error while fetching sources");
    }

    const data = await response.json();

    return data.files;
  } catch (e) {
    console.log(e);
    return e as Error;
  }
}

export async function deleteSource(
  fileName: string,
  token: string
): Promise<Response | Error> {
  try {
    const response = await fetch(`/api/sources/${fileName}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error while deleting source");
    }

    return response;
  } catch (e) {
    console.log(e);
    return e as Error;
  }
}

export interface CreateContextPayload {
  name: string;
  description: string;
  files: string[];
}

export async function createContext(
  payload: CreateContextPayload,
  token: string
): Promise<Response | Error> {
  try {
    const response = await fetch("/api/contexts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Error while creating context");
    }

    return response;
  } catch (e) {
    console.log(e);
    return e as Error;
  }
}

export async function listContexts(token: string): Promise<any[] | Error> {
  try {
    const response = await fetch("/api/contexts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error while fetching contexts");
    }

    const data = await response.json();

    return data.contexts;
  } catch (e) {
    console.log(e);
    return e as Error;
  }
}

export async function deleteContext(
  contextName: string,
  token: string
): Promise<Response | Error> {
  try {
    const response = await fetch(`/api/contexts/${contextName}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error while deleting context");
    }

    return response;
  } catch (e) {
    console.log(e);
    return e as Error;
  }
}

export interface CreateVectorStorePayload {
  name: string;
  description: string;
  contexts: string[];
}

export async function createVectorStore(
  payload: CreateVectorStorePayload,
  token: string
): Promise<Response | Error> {
  try {
    const response = await fetch("/api/vectorstore", {
      // update the path as per your server endpoint
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Error while creating vector store");
    }

    return response;
  } catch (e) {
    console.log(e);
    return e as Error;
  }
}

export async function listVectorStores(token: string): Promise<any[] | Error> {
  try {
    const response = await fetch("/api/vectorstore", {
      // update the path as per your server endpoint
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error while fetching vector stores");
    }

    const data = await response.json();

    return data.vectorstores; // make sure the key matches what your server returns
  } catch (e) {
    console.log(e);
    return e as Error;
  }
}

export async function deleteVectorStore(
  vectorstoreName: string,
  token: string
): Promise<Response | Error> {
  try {
    const response = await fetch(`/api/vectorstore/${vectorstoreName}`, {
      // update the path as per your server endpoint
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error while deleting vector store");
    }

    return response;
  } catch (e) {
    console.log(e);
    return e as Error;
  }
}

export interface VectorStoreQueryPayload {
  query: string;
}

export async function vectorStoreQuery(
  vectorStoreName: string,
  payload: VectorStoreQueryPayload,
  token: string
): Promise<any | Error> {
  try {
    const response = await fetch(`/api/vectorstore/${vectorStoreName}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Error while querying vector store");
    }

    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
    return e as Error;
  }
}

export interface CreateRetrieverPayload {
  name: string;
  description: string;
}

export async function createRetriever(
  payload: CreateRetrieverPayload,
  token: string
): Promise<Response | Error> {
  try {
    const response = await fetch("/api/retrievers", {
      // update the path as per your server endpoint
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Error while creating retriever");
    }

    return response;
  } catch (e) {
    console.log(e);
    return e as Error;
  }
}

export async function listRetrievers(token: string): Promise<any[] | Error> {
  try {
    const response = await fetch("/api/retrievers", {
      // update the path as per your server endpoint
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error while fetching retrievers");
    }

    const data = await response.json();

    return data.retrievers; // make sure the key matches what your server returns
  } catch (e) {
    console.log(e);
    return e as Error;
  }
}

export async function deleteRetriever(
  retrieverName: string,
  token: string
): Promise<Response | Error> {
  try {
    const response = await fetch(`/api/retrievers/${retrieverName}`, {
      // update the path as per your server endpoint
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error while deleting retriever");
    }

    return response;
  } catch (e) {
    console.log(e);
    return e as Error;
  }
}
