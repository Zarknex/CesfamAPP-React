import UsersForm from "./UsersForm";
const NewUser = () => {
  return (
    <>
      <h1 className="text-4xl font-black">Nuevo usuario</h1>
      <div className="mt-10 flex justify-center">
        <UsersForm />
      </div>
    </>
  );
};

export default NewUser;
