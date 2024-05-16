const MessageWindow = (props: any) => {

  console.log(props.read_status);


  return (
    <div style={{ backgroundColor: props.read_status ? "gray" : "white" }}>
      <p>{props.message_content}</p>
      <h3>message from: {props.sender_id}</h3>
      <h5>sent on: {props.date_time}</h5>
      {/* {props.status}: */}
    </div>
  )
}
export default MessageWindow





