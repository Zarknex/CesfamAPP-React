import { Link } from "react-router-dom";
const PreviewMedicine = ({medicine}) => {
  const {_id, description, stock, manufacturer, content, typeMedicine} = medicine;
  
  
  return (
    <div className="border-b p-3 flex">
      <p className="flex-1">
        {description}
        <span className="text-sm text-gray-500 uppercase">
          {" "}
          {manufacturer}
        </span>
      </p>
      <Link
        to={`${_id}`}
        className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold no-underline"
      >
        Ver Medicina
      </Link>
      </div>
  );
}

export default PreviewMedicine;