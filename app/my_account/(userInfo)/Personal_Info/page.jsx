import UserAddress from "@/app/_components/userAddress/UserAddress";
import getUserMeLoader from "@/app/_data/actions/getUserMeLoader";
import React from "react";

async function Personal_Info() {
  const user = await getUserMeLoader();
  return (
    <div className="pl-12">
      <div className="mb-6">
        <h1 className="text-colorGrayOne text-2xl font-semibold mb-2">
          My Info
        </h1>
        <p className="text-md font-normal text-colorGrayTwo">Contact Details</p>
      </div>
      <div>
        <div className="py-4 border-b">
          <h6 className="text-colorGrayTwo tracking-wide mb-3">Your Name</h6>
          <h2 className="text-colorGrayOne text-xl font-medium">
            {user.data.username}
          </h2>
        </div>
        <div className="py-4 border-b">
          <h6 className="text-colorGrayTwo tracking-wide mb-3">Your Email</h6>
          <h2 className="text-colorGrayOne text-xl font-medium">
            {user.data.email}
          </h2>
        </div>
      </div>
      <UserAddress id={user.data.id} token={user.jwt}/>
    </div>
  );
}

export default Personal_Info;
