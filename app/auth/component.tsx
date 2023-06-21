"use client";
import firebase from "@/firebase/clientApp";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

export default function SignInScreen() {
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  const auth = getAuth(firebase);
  const [user, loading] = useAuthState(auth);

  const signIn = async () => {
    const { user } = await signInWithPopup(auth, provider);
    router.push("/upload");
    console.log({ user });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    router.push("/upload");
    return <div>Logged in as {user.displayName}</div>;
  }

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={signIn}>Sign In</button>
    </div>
  );
}
