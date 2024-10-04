import ReminderCard from "./ReminderCard";

const Reminders : React.FC =()=>{
    interface Reminder {
        id:string,
        title: string,
        message: string,
        date: string
    }
    const reminders =[
        {
            id: '1',
            title: 'Warning Letter Sent to you',
            message: 'You are now in the 15 days waiting period, if you dont pay within 15 days 2% penality will be added',
            date: 'Sept,03,2024'
        },
        {
            id: '2',
            title: 'Delayed Payment',
            message: '4 days late, Pay within 10 days (until August 17 2024)',
            date: 'Aug,23,2024'
        },
        {
            id: '3',
            title: 'Maintenance Request Accepted',
            message: 'Your request has been accepted, it will get started soon',
            date: 'Aug,25,2024'
        }
      
    ];
    return(
        <div className="flex flex-col gap-8 bg-white shadow-lg p-6">
            {reminders.map(reminder=>{
               return <ReminderCard key={reminder.id} reminder={reminder}/>
            })}
        </div>
    )
}
export default Reminders;