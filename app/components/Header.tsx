import { getAuth } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import firebase from "@/app/lib/firebase";
import Text from "@/app/components/Text";
import Button from "@/app/components/Button";

const Header: React.FC = () => {
  const auth = getAuth(firebase);
  const [user, loading] = useAuthState(auth);

  const links = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Upload",
      href: "/upload",
    },
    {
      name: "Topics",
      href: "/topics",
    },
    {
      name: "Vectorstores",
      href: "/vectorstores",
    },
    {
      name: "Chat",
      href: "/chat",
    },
  ];

  const header = () => {
    if (loading) return <Content>Loading...</Content>;
    if (user)
      return (
        <Content>
          <Text>Logged in as {user.displayName}</Text>
          <Text>Links:</Text>
          {links.map((link) => (
            <Text key={link.name}>
              <a href={link.href}>{link.name}</a>
            </Text>
          ))}
          <Button onClick={() => auth.signOut()}>
            <Text>LogOut</Text>
          </Button>
        </Content>
      );
    return <Content>Not logged in</Content>;
  };
  return <Container>{header()}</Container>;
};

export default Header;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div`
  z-index: 999;
  position: sticky;
  top: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background ?? "red"};
`;
