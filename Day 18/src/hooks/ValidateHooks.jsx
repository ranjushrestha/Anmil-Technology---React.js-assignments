
import { useForm } from "react-hook-form";

export const useValidation = (defaultValues, validationRules) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    mode: "onSubmit"
, 
  });

  return {
    register,
    handleSubmit,
    errors,
    watch,
    reset,
    validationRules, 
  };
};
