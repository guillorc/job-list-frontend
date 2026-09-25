import Container from "@/app/Components/Container";
import Input from "@/app/Components/Input";

export default function Home() {
  return (
    <Container className="py-10 font-medium">
      <Input
        label="Primer nombre"
        id="first-name"
        placeholder="Ej: Guillermo"
        type="text"
      />
    </Container>
  );
}
