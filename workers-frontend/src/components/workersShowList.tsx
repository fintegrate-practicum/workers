// import GenericList from './generic/genericList'
// import { useAppSelector } from '../redux/hooks'
// import ItemDetailToWorker from './itemDetailToWorker';

// const WorkersShowList = () => {

//   const emoloyees = useAppSelector(state => state.employeeSlice);

//   return (
//     <>
//       <div style={{ display: 'flex', flexWrap: 'wrap' }}>

//         <GenericList title={"workers list"} list={emoloyees} column={["userId", "code", "createdBy", "updatedBy", "roleId", "position", "details"]} desing={ItemDetailToWorker} />

//       </div>
//     </>
//   );
// };

// export default WorkersShowList;
import GenericList from "./generic/genericList";
import { useAppSelector } from "../redux/hooks";
import ItemDetailToWorker from "./itemDetailToWorker";
import React, { useState } from "react";
import Button from "@mui/material/Button";

const WorkersShowList = () => {
  const employees = useAppSelector((state) => state.employeeSlice);

  const [startIndex, setStartIndex] = useState<number>(0);
  const itemsPerPage = 10;
  const showMoreData = () => {
    setStartIndex(startIndex + itemsPerPage);
  };
  const showLessData = () => {
    setStartIndex(Math.max(0, startIndex - itemsPerPage));
  };
  const paginatedEmployees = employees.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const hasNextPage = startIndex + itemsPerPage < employees.length;
  const hasPreviousPage = startIndex - itemsPerPage >= 0;

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <GenericList
          title={"workers list"}
          list={paginatedEmployees}
          column={[
            "userId",
            "code",
            "createdBy",
            "updatedBy",
            "roleId",
            "position",
            "details",
          ]}
          desing={ItemDetailToWorker}
        />
      </div>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        // startIcon={<CloudUploadIcon />}
        onClick={showMoreData}
        disabled={!hasNextPage}
      >
        הבא
      </Button>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        // startIcon={<CloudUploadIcon />}
        onClick={showLessData}
        disabled={!hasPreviousPage}
      >
        הקודם
      </Button>
    </>
  );
};

export default WorkersShowList;
