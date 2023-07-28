"use client";
import firebase from "@/app/lib/firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import Text from "@/app/components/Text";
import Button from "@/app/components/Button";

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
      <Text>Sign In</Text>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
}
