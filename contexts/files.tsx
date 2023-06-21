import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getAuth, User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "@/firebase/clientApp";
import {
  listSources,
  uploadSource,
  deleteSource,
  CreateContextPayload,
  createContext as apiCreateContext,
} from "@/lib/lllg";
import { ChangeEvent, FormEvent, DragEvent } from "react";

type UploadContextProps = {
  files: File[];
  uploadedFiles: string[];
  selectedUploadedFiles: string[];
  setSelectedUploadedFiles: React.Dispatch<React.SetStateAction<string[]>>;
  uploading: boolean;
  user?: User | null;
  loading: boolean;
  token: string | null;
  handleDragOver: (e: DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: DragEvent<HTMLDivElement>) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleDelete: (fileName: string) => void;
  handleCreateContext: (payload: CreateContextPayload) => Promise<void>;
  fileInputRef: React.RefObject<HTMLInputElement>;
};
const UploadContext = createContext<UploadContextProps | undefined>(undefined);

export const UploadProvider = ({ children }: React.PropsWithChildren) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const auth = getAuth(firebase);
  const [user, loading] = useAuthState(auth);
  const [token, setToken] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedUploadedFiles, setSelectedUploadedFiles] = useState<string[]>(
    []
  );

  useEffect(() => {
    if (user) {
      user.getIdToken().then((token) => {
        setToken(token);
        listSources(token).then((files) => {
          if (Array.isArray(files)) {
            setUploadedFiles(files);
          } else {
            console.error(files);
          }
        });
      });
    }
  }, [user]);

  const handleDelete = async (fileName: string) => {
    if (!token) {
      alert("Please login to delete files");
      return;
    }
    console.log({ fileName });

    const parsedFileName = fileName.replace("sources/", "");
    console.log({ parsedFileName });

    try {
      const response = await deleteSource(parsedFileName, token);
      if (response instanceof Error) throw response;

      // Refresh the list of uploaded files
      const updatedFiles = await listSources(token);
      if (Array.isArray(updatedFiles)) {
        setUploadedFiles(updatedFiles);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    let files = e.dataTransfer.files;
    setFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles(Array.from(e.target.files || []));
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) {
      alert("Please login to upload files");
      return;
    }
    if (files.length === 0) {
      alert("Please select files to upload");
      return;
    }

    setUploading(true);

    for (const file of files) {
      try {
        const response = await uploadSource({ source: file }, token);
        if (typeof response === typeof Error) throw new Error("Upload failed");
        console.log({ response });
        const updatedFiles = await listSources(token);
        if (Array.isArray(updatedFiles)) {
          setUploadedFiles(updatedFiles);
        }
      } catch (error) {
        alert(error);
      }
    }

    setUploading(false);

    setFiles([]);
    alert("Files uploaded successfully");
  };

  const handleCreateContext = async (payload: CreateContextPayload) => {
    if (!token) {
      alert("Please login to create context");
      return;
    }

    try {
      const response = await apiCreateContext(payload, token);
      console.log({ response });

      if (typeof response === typeof Error || !response?.ok) {
        throw new Error("Error while creating context");
      }

      alert("Context created successfully");
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };

  return (
    <UploadContext.Provider
      value={{
        setSelectedUploadedFiles,
        files,
        uploadedFiles,
        selectedUploadedFiles,
        uploading,
        user,
        loading,
        token,
        handleDragOver,
        handleDrop,
        handleFileChange,
        handleClick,
        handleFormSubmit,
        handleDelete,
        handleCreateContext,
        fileInputRef,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = (): UploadContextProps => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUpload must be used within a UploadProvider");
  }
  return context;
};
