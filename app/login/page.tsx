import Container from "@/app/Components/Container";
import NaturalPersonForm from "@/app/Components/NaturalPersonForm";

const page = async () => {
  return (
    <Container className="py-20">
      <div className="md:card md:shadow-lg/100">
        <div className="md:card-body">
          <p className="uppercase text-center tracking-[0.3em] font-bold">
            job list
          </p>

          <h1 className="text-3xl text-center my-2">Persona natural</h1>

          <p className="text-center mb-3">Inicia sesión</p>
        </div>
      </div>
    </Container>
  );
};

export default page;
