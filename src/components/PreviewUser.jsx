import { Link } from "react-router-dom";
const PreviewUser = ({ user }) => {
  const { username, name, _id, lastName, typeUser } = user;
  return (
    <div className="border-b p-3 flex">
      <p className="flex-1">
        {username}
        <span className="text-sm text-gray-500 uppercase">
          {" "}
          {name}
        </span>
      </p>
      <Link
        to={`${_id}`}
        className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold no-underline"
      >
        Ver usuario
      </Link>
    </div>
  );
};

export default PreviewUser;
