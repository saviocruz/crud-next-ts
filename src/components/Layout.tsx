import { ReactNode } from "react";
import { Container } from "semantic-ui-react";
import HeaderLocal from "./HeaderLocal";
import { Navbar } from "./Navbar";

type HeaderProps = {
  titulo?: string;
  children?: ReactNode;
}

export function Layout({ titulo, children }: HeaderProps) {

  return (
    <div>
      <Navbar />
      <main
        style={{
          backgroundColor: "#212121",
          color: "#c76890",
          paddingBottom: "30px"
        }} >
        <h1 style={{ textAlign: "center" }}>{titulo}</h1>
        <Container
          fluid={true}
          style={{
            padding: "2rem",
            minHeight: "80vh",
            border: "2px solid #c0c0c0",
            backgroundColor: "#666",
            width: "90%",
            borderStartEndRadius: "20px",
            borderStartStartRadius: "20px",
          }} >
          {children}
        </Container>
      </main>
    </div>
  );
};
