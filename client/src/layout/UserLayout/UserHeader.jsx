import React from "react";

import UserProfileContainer from "./UserProfileContainer";

const UserHeader = () => {
  return (
    <div className="w-full flex items-center justify-between border-b px-8">
      <div className="pr-4 w-full text-blue-500">
        {/* <marquee>Chào mừng bạn đến với Vouchee</marquee> */}
      </div>
      {/* profile section  */}
      <UserProfileContainer />
    </div>
  );
};

export default UserHeader;
