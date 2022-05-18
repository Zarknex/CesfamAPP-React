import {useContext} from "react";
import MedicinesContext from "../context/MedicineProvider"
const useMedicines = () => {
  return useContext(MedicinesContext);
};

export default useMedicines