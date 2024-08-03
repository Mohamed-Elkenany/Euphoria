import React from "react";
import { useFormStatus } from "react-dom";
function SubmitButton() {
    const { pending } = useFormStatus();
  return (
    <div>
      <input
        disabled={pending}
        type="submit"
        value="Save"
        className={`${
          pending ? "cursor-default opacity-25" : "cursor-pointer"
        } px-5 py-2 bg-colorPink text-colorGrayFive rounded-md mr-6`}
      />
    </div>
  );
}

export default SubmitButton;
