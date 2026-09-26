import Container from "@/app/Components/Container";
import NaturalPersonForm from "@/app/Components/NaturalPersonForm";

const page = () => {
  return (
    <Container className="py-20">
      <div className="md:card md:shadow-lg/100">
        <div className="md:card-body">
          <p className="uppercase text-center tracking-[0.3em] font-bold">
            job list
          </p>

          <h1 className="text-3xl text-center mt-3 mb-2">Persona natural</h1>

          <p className="text-center mb-3">Crea una cuenta</p>

          <NaturalPersonForm />
        </div>
      </div>
    </Container>
  );
};

export default page;
