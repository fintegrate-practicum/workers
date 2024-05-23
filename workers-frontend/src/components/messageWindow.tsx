import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import messageSlice, { editMessage } from "../redux/messageSlice";
import { RootState, AppDispatch } from "../redux/store";

const MessageWindow = () => {
  const dispatch: AppDispatch = useDispatch();
  const id = useSelector((state: RootState) => state.messageSlice.data); // נניח שהמשתנה id נמצא ב state של ההודעה ב Redux
  const isUpdateSuccess = useSelector((state: RootState) => state.messageSlice.isUpdateSuccess); // נניח שהמשתנה isUpdateSuccess מציין האם העדכון הצליח ב Redux

  useEffect(() => {
    const updateMessage = async () => {
      try {
        await dispatch(editMessage(id)); // שליחת הפעולה ל־Redux
      } catch (error) {
        console.error("Error editing message:", error);
      }
    };
    if (isUpdateSuccess) {
      updateMessage();
    }
  }, [dispatch, id, isUpdateSuccess]);
  return (
    <div>
      {id}
      {/* כאן אתה יכול להשתמש במשתנים מ־Redux כרצונך */}
    </div>
  );
};

export default MessageWindow;