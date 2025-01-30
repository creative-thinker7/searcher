"use client";

import { LoginFormRequest } from "@/types";
import FetchButton from "@/components/FetchButton";
import FetchInput from "@/components/FetchInput";
import { Description, Field, Label } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useLogin } from "@/api";
import Loader from "@/components/Loader";
import { useState } from "react";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormRequest>();

  const { mutate, isPending } = useLogin();

  const [submitError, setSubmitError] = useState<string | undefined>();

  const onSubmit = async (data: LoginFormRequest) => {
    try {
      await mutate(data);
    } catch {
      setSubmitError("Failed to login.");
    }
  };

  return (
    <form
      className="relative flex flex-col gap-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {isPending && <Loader />}
      <Field>
        <Label>
          Name <span className="text-fetch-red">*</span>
        </Label>
        <FetchInput
          className="mt-2"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <Description className="text-fetch-red">
            Please enter your name.
          </Description>
        )}
      </Field>
      <Field>
        <Label>
          Email <span className="text-fetch-red">*</span>
        </Label>
        <FetchInput
          type="email"
          className="mt-2"
          {...register("email", { required: true, pattern: EMAIL_REGEX })}
        />
        {errors.email && (
          <Description className="text-fetch-red">
            Please enter a valid email address.
          </Description>
        )}
      </Field>
      <FetchButton aria-label="login" type="submit" disabled={isPending}>
        Login
      </FetchButton>
      {submitError && (
        <Field>
          <Description className="text-center text-fetch-red">
            {submitError}
          </Description>
        </Field>
      )}
    </form>
  );
}
