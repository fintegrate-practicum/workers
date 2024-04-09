import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import GenericList from './generic/genericList'
import employee, { selectEmployees } from '../redux/employeeSlice'
import {useAppSelector} from '../redux/hooks'
import { log } from 'console';



const WorkersShowList = () => {

    console.log('come');
    
 
const emoloyees = useAppSelector(selectEmployees);
   
    // const emoloyees=[{userId:2,code:"w",createdBy:"u",updatedBy:"u",roleId:6,position:"secretary"}]

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
       
        <GenericList title={"workers list"} list={emoloyees} column={["id", "code", "createdBy","updatedBy","roleId","position"]} desing={null}/>

      </div>
    </>
  );
};

export default WorkersShowList;
