import { Container, Menu, Button } from "semantic-ui-react";
import Image from "next/image";
import { useRouter } from "next/router";

export const Navbar = () => {
  const router = useRouter();

  return (
    <Menu inverted attached style={{ padding: "1.5rem" }}>
      <Container>
        <Menu.Item onClick={() => router.push("/")}>
          <Image
            width="30"
            height="30"
            src="https://react.semantic-ui.com/logo.png"
            alt="nextjs logo"
          />
        </Menu.Item>

        <Menu.Menu position="right">

          <Menu.Item>
            <Button onClick={() => router.push("/task")} primary>
              Task
            </Button>
          </Menu.Item>

          <Menu.Item>
            <Button onClick={() => router.push("/posts")} primary>
              Postagens
            </Button>
          </Menu.Item>

          <Menu.Item>
            <Button onClick={() => router.push("/database")} primary>
              Install
            </Button>
          </Menu.Item>

          <Menu.Item>
            <Button onClick={() => router.push("/categoria")} primary>
              Categorias
            </Button>
          </Menu.Item>

          <Menu.Item>
            <Button onClick={() => router.push("/dominio")} primary>
              Dominios
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
