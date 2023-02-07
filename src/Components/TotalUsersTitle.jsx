import React from "react";

const TotalUsersTitle = ({ length }) => {
  return (
    <h1 className="p-3 mb-2 bg-dark text-white">{`Количество пользователей ${length}`}</h1>
  );
};

export default TotalUsersTitle;
