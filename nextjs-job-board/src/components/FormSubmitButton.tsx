"use client";

import { useFormStatus } from "react-dom";
import LoadingButton from "./LoadingButton";

export default function FormSubmitButtom(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const { pending } = useFormStatus();
  return (
    <LoadingButton {...props} type="submit" loading={pending} />
  );
}
