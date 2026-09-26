"use client";

import { z } from "zod";
import Button from "@/app/Components/Button";
import Input from "@/app/Components/Input";
import Select from "@/app/Components/Select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const naturalPersonSchema = z
  .object({
    documentType: z.string().min(1, "Selecciona un tipo de documento"),
    documentNumber: z.string().min(1, "Ingresa el número de documento"),
    firstName: z.string().min(1, "Ingresa tu primer nombre"),
    secondName: z.string(),
    firstSurname: z.string().min(1, "Ingresa tu primer apellido"),
    secondSurname: z.string(),
    birthDate: z.string(),
    gender: z.string(),
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

  function onSubmit(data: NaturalPersonFormData) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-12 gap-x-4 gap-y-5"
    >
      <Select
        {...register("documentType")}
        label="Tipo de documento *"
        id="document-type"
        placeholder="Seleccione un Tipo de documento"
        wrapperClassName="col-span-12 md:col-span-6"
        error={errors.documentType?.message}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Select>

      <Input
        {...register("documentNumber")}
        label="Número de documento *"
        id="document-number"
        placeholder="Ej: 1234567890"
        type="text"
        wrapperClassName="col-span-12 md:col-span-6"
        error={errors.documentNumber?.message}
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
        {...register("gender")}
        label="Género"
        id="gender"
        placeholder="Seleccione un genero"
        wrapperClassName="col-span-12 md:col-span-4"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
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
