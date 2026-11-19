import { object, string, type InferType } from 'yup';

interface ContactValidationMessages {
  required: string;
  invalidEmail: string;
}

export function createContactSchema(messages: ContactValidationMessages) {
  return object({
    fullName: string().trim().required(messages.required),
    email: string().trim().required(messages.required).email(messages.invalidEmail),
    question: string().trim().required(messages.required),
  });
}

export type ContactValues = InferType<ReturnType<typeof createContactSchema>>;
