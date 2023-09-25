import { Amplify } from "aws-amplify";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "@/aws-exports";
import Link from "next/link";
Amplify.configure(awsExports);
export default function App() {
  return (
    <Authenticator className="bg-green-100 py-[163px]">
      {({ signOut, user }) => (
        <main className="mx-24">
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
          <Link className="block" href={"/"}>
            Return to home
          </Link>
        </main>
      )}
    </Authenticator>
  );
}
