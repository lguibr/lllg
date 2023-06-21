"use client";
import firebase from "@/firebase/clientApp";
import Upload from "./component";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { UploadProvider } from "@/contexts/files";

export default function Home() {
  const auth = getAuth(firebase);
  const { push } = useRouter();
  const [user, loading] = useAuthState(auth);
  if (loading) return <div>Loading...</div>;
  if (!user) {
    push("/auth");
    return <div>Not logged in</div>;
  }
  return (
    <main>
      <UploadProvider>
        <Upload />
      </UploadProvider>
    </main>
  );
}
