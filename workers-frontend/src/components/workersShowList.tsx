import GenericList from './generic/genericList'
import { useAppSelector } from '../redux/hooks'
import ItemDetailToWorker from './itemDetailToWorker';

const WorkersShowList = () => {

  const emoloyees = useAppSelector(state => state.employeeSlice); 

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>

        <GenericList title={"workers list"} list={emoloyees} column={["userId", "code", "createdBy", "updatedBy", "roleId", "position", "details"]} desing={ItemDetailToWorker} />

      </div>
    </>
  );
};

export default WorkersShowList;
