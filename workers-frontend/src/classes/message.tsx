class message {
    message_id!: number;
    sender_id!: string;
    receiver_id!: string;
    message_content!: string;
    date_time: Date;
    read_status!: false;
    status!:String;
    constructor(message_id: number, sender_id: string,receiver_id: string,message_content: string, date_time: Date,status: string) {
        this.message_id = message_id
        this.sender_id = sender_id
        this.receiver_id = receiver_id
        this.message_content = message_content
        this.date_time = date_time
        this.status = status
    }
}
export default message