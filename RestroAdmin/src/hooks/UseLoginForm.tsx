import { useState, type ChangeEvent, type FormEvent } from "react";
import validate, { type validation } from "../utils/validate";

interface UseFormProps<T> {
  defaultValues?: T;
  validations?: validation<T>;
}

interface UseFormReturn<T> {
  formData: T;
  errors: Partial<Record<keyof T, string>>;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (
    callback: (formData: T) => void
  ) => (e: FormEvent<HTMLFormElement>) => void;
}

const useForm = <T extends Record<string, any>>({
  defaultValues = {} as T,
  validations = {},
}: UseFormProps<T> = {}): UseFormReturn<T> => {
  const [formData, setFormData] = useState<T>(defaultValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!e?.target) return;
    const { name: rawName, type, value } = e.target;
    const name = rawName as keyof T;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    const newFormData = { ...formData, [name]: val } as T;
    setFormData(newFormData);
    if (isSubmitted)
      setErrors((prev) => {
        const fieldError = validate(newFormData, {
          [name]: validations?.[name],
        } as validation<T>);
        const newErrors = { ...prev };
        fieldError[name]
          ? (newErrors[name] = fieldError[name]!)
          : delete newErrors[name];
        return newErrors;
      });
  };

  const handleSubmit =
    (callback: (formData: T) => void) => (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitted(true);
      const validationErrors = validate(formData, validations);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) callback(formData);
    };

  return { formData, errors, handleChange, handleSubmit };
};

export default useForm;
