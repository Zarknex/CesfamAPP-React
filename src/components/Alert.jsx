const Alert = ({alert}) => {
  return (
    <div className={`${alert.error ? 'from-red-400 to-red-600' : 'from-sky-400 to-sky-600'} bg-gradient-to-br text-center p-2 rounded-xl text-white uppercase font-bold text-sm my-`}>
      {alert.msg}
    </div>
  );
};

export default Alert;