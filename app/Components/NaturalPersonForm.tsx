"use client";

import { z } from "zod";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/app/Components/Input";
import Button from "@/app/Components/Button";
import Select from "@/app/Components/Select";
import Catalog from "@/app/services/Catalog/Catalog.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { CatalogData } from "@/app/services/Catalog/Catalog.service";
import SignUp, {
  SignUpResponse,
} from "../services/NaturalPerson/SignUp.service";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const naturalPersonSchema = z
  .object({
    documentTypeId: z.string().min(1, "Selecciona un tipo de documento"),
    identificationNumber: z.string().min(1, "Ingresa el número de documento"),
    firstName: z.string().min(1, "Ingresa tu primer nombre"),
    secondName: z.string(),
    firstSurname: z.string().min(1, "Ingresa tu primer apellido"),
    secondSurname: z.string(),
    birthDate: z.string(),
    genderId: z.string(),
    phone: z.string(),
    address: z.string(),
    email: z
      .string()
      .min(1, "Ingresa tu correo")
      .email("El correo no es válido"),
    password: z.string().min(8, "Usa al menos 8 caracteres"),
    passwordConfirm: z.string().min(1, "Confirma tu contraseña"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Las contraseñas no coinciden",
    path: ["passwordConfirm"],
  });

type NaturalPersonFormData = z.infer<typeof naturalPersonSchema>;

export default function NaturalPersonForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NaturalPersonFormData>({
    resolver: zodResolver(naturalPersonSchema),
  });

  const router = useRouter();
  const [documentTypes, setDocumentTypes] = useState<CatalogData[]>([]);
  const [genders, setGenders] = useState<CatalogData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDocumentTypes = async () => {
      try {
        const dt = await Catalog("DOCUMENT_TYPE");
        setDocumentTypes(dt.data);
        const g = await Catalog("GENDER");
        setGenders(g.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentTypes();
  }, []);

  const onSubmit: SubmitHandler<NaturalPersonFormData> = async (
    data,
  ): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response: SignUpResponse = await SignUp(data);

      console.log("Registro exitoso:", response.message);
      toast.success("Cuenta creada con éxito");

      router.push("/login");
    } catch (error: unknown) {
      console.log(error);

      const message =
        error instanceof AxiosError
          ? error.response?.data?.message
          : "Ocurrió un error al crear la cuenta";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <span className="loading loading-spinner loading-xl"></span>;
  if (error) return <div className="text-error">Error: {error.message}</div>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-12 gap-x-4 gap-y-5"
    >
      <Select
        {...register("documentTypeId")}
        label="Tipo de documento *"
        id="document-type"
        placeholder="Seleccione un Tipo de documento"
        wrapperClassName="col-span-12 md:col-span-6"
        error={errors.documentTypeId?.message}
      >
        {documentTypes.map((documentType) => (
          <option key={documentType.uuid} value={documentType.uuid}>
            {documentType.name}
          </option>
        ))}
      </Select>

      <Input
        {...register("identificationNumber")}
        label="Número de documento *"
        id="document-number"
        placeholder="Ej: 1234567890"
        type="text"
        wrapperClassName="col-span-12 md:col-span-6"
        error={errors.identificationNumber?.message}
      />

      <Input
        {...register("firstName")}
        label="Primer nombre *"
        id="first-name"
        placeholder="Ej: Guillermo"
        type="text"
        wrapperClassName="col-span-12 md:col-span-6"
        error={errors.firstName?.message}
      />

      <Input
        {...register("secondName")}
        label="Segundo nombre"
        id="second-name"
        placeholder="Ej: Luis"
        type="text"
        wrapperClassName="col-span-12 md:col-span-6"
        error={errors.secondName?.message}
      />

      <Input
        {...register("firstSurname")}
        label="Primer apellido *"
        id="first-surname"
        placeholder="Ej: García"
        type="text"
        wrapperClassName="col-span-12 md:col-span-6"
        error={errors.firstSurname?.message}
      />

      <Input
        {...register("secondSurname")}
        label="Segundo apellido"
        id="second-surname"
        placeholder="Ej: López"
        type="text"
        wrapperClassName="col-span-12 md:col-span-6"
        error={errors.secondSurname?.message}
      />

      <Input
        {...register("birthDate")}
        label="Fecha de nacimiento"
        id="birth-date"
        placeholder=""
        type="date"
        wrapperClassName="col-span-12 md:col-span-4"
        error={errors.birthDate?.message}
      />

      <Select
        {...register("genderId")}
        label="Género"
        id="gender"
        placeholder="Seleccione un genero"
        wrapperClassName="col-span-12 md:col-span-4"
        error={errors.genderId?.message}
      >
        {genders.map((gender) => (
          <option key={gender.uuid} value={gender.uuid}>
            {gender.name}
          </option>
        ))}
      </Select>

      <Input
        {...register("phone")}
        label="Teléfono"
        id="phone"
        placeholder="Ej: +34 600 123 456"
        type="tel"
        wrapperClassName="col-span-12 md:col-span-4"
      />

      <Input
        {...register("address")}
        label="Dirección"
        id="address"
        placeholder="Ej: Calle Mayor 10"
        type="text"
        wrapperClassName="col-span-12"
      />

      <Input
        {...register("email")}
        label="Correo electrónico *"
        id="email"
        placeholder="Ej: nombre@correo.com"
        type="email"
        wrapperClassName="col-span-12"
        error={errors.email?.message}
      />

      <Input
        {...register("password")}
        label="Contraseña *"
        id="password"
        placeholder="Escribe una contraseña"
        type="password"
        wrapperClassName="col-span-12 md:col-span-6"
        error={errors.password?.message}
      />

      <Input
        {...register("passwordConfirm")}
        label="Confirmar contraseña *"
        id="password-confirm"
        placeholder="Confirma la contraseña"
        type="password"
        wrapperClassName="col-span-12 md:col-span-6"
        error={errors.passwordConfirm?.message}
      />

      <Button
        className="btn-lg col-span-12 md:col-span-4 md:col-start-5"
        type="submit"
      >
        Crear cuenta
      </Button>
    </form>
  );
}
