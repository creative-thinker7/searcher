"use client";

import FetchButton from "@/components/FetchButton";
import FetchInput from "@/components/FetchInput";
import { Description, Field, Label } from "@headlessui/react";
import { useForm } from "react-hook-form";

interface AgeFilterRequest {
  ageMin: number;
  ageMax: number;
}

interface Props {
  isFilterApplied: boolean;
  onFilter: (ageMin: number, ageMax: number) => void;
  onReset: () => void;
}

export default function AgeFilter({
  isFilterApplied,
  onFilter,
  onReset,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AgeFilterRequest>({
    defaultValues: {
      ageMin: 0,
      ageMax: 14,
    },
  });

  const onSubmit = async (data: AgeFilterRequest) => {
    onFilter(data.ageMin, data.ageMax);
  };

  return (
    <form
      className="flex items-center gap-x-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Field>
        <div className="flex items-center gap-x-1">
          <Label className="whitespace-nowrap">Min Age:</Label>
          <FetchInput
            type="number"
            min={0}
            className="max-w-[64px]"
            {...register("ageMin", {
              required: true,
              min: 0,
              valueAsNumber: true,
            })}
          />
        </div>
        {errors.ageMin && (
          <Description className="text-fetch-red">
            Please enter a valid minimum age.
          </Description>
        )}
      </Field>
      <Field>
        <div className="flex items-center gap-x-1">
          <Label className="whitespace-nowrap">Max Age:</Label>
          <FetchInput
            type="number"
            min={0}
            className="max-w-[64px]"
            {...register("ageMax", {
              required: true,
              min: 0,
              valueAsNumber: true,
              validate: (value, formValues) => {
                return value >= formValues.ageMin;
              },
            })}
          />
        </div>
        {errors.ageMax && (
          <Description className="text-fetch-red">
            Please enter a valid maximum age.
          </Description>
        )}
      </Field>
      <FetchButton aria-label="filter" type="submit">
        Filter by Age
      </FetchButton>
      {isFilterApplied && (
        <FetchButton aria-label="reset" onClick={onReset}>
          Reset
        </FetchButton>
      )}
    </form>
  );
}
