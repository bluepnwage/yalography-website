import { useActionState, useEffect, useRef } from "react";
import { z } from "zod";

type Options = {
  resetOnSuccess?: boolean;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
  onPending?: () => void;
};
type ActionReturn<T> = {
  status: "error" | "success" | null;
  inputErrors: null | z.typeToFlattenedError<T>["fieldErrors"];
  message: string;
  submitId: string;
};

type ActionFunction<State> = (
  state: ActionReturn<State>,
  formDate: FormData
) => ActionReturn<State> | Promise<ActionReturn<State>>;

export function useAction<State>(action: ActionFunction<State>, options?: Partial<Options>) {
  const [state, formAction, isPending] = useActionState(action, {
    inputErrors: null,
    message: "",
    status: null,
    submitId: ""
  });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success" && formRef.current && options?.resetOnSuccess) {
      formRef.current.reset();
    }
  }, [formRef.current, options?.resetOnSuccess, state.status, state.submitId]);

  useEffect(() => {
    if (options?.onSuccess && state.status === "success") {
      console.log("is this running");
      options.onSuccess.call(null, state.message);
    }

    if (options?.onError && state.status === "error") {
      options.onError(state.message);
    }
  }, [state.submitId, state.message]);

  useEffect(() => {
    if (isPending && options?.onPending) {
      options.onPending();
    }
  }, [isPending]);

  return {
    state,
    formAction,
    ref: formRef,
    isPending
  };
}
