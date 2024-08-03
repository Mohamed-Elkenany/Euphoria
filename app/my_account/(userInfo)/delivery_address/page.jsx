"use client";
import FormAddress from "@/app/_components/formAddress/FormAddress";
import { addressAction } from "@/app/_data/actions/auth-actions";
import { useFormState } from "react-dom";
const INITIAL_STATE = {
  data: null,
};
function DeliveryAddress() {
  const [formState, actionForm] = useFormState(addressAction, INITIAL_STATE);
  console.log(formState);
  return (
    <div className="pl-12">
      {formState?.error && (
        <div className="fixed z-50 top-[120px] left-1/2 bg-white shadow-md p-2 rounded-md text-sm text-red-500">
          <h1>{formState.errorMessage}</h1>
        </div>
      )}
      {formState?.data && (
        <div className="fixed z-50 top-[120px] left-1/2 bg-white shadow-md p-2 rounded-md text-sm text-green-500">
          <h1>Created address successfully</h1>
        </div>
      )}
      <FormAddress actionForm={actionForm} formState={formState} />
    </div>
  );
}

export default DeliveryAddress;
