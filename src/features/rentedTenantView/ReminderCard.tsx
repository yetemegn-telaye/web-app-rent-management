
interface Reminder {
    id:string,
    title: string,
    message: string,
    date: string
}

type ReminderCardProps = {
    reminder: Reminder
}

const ReminderCard: React.FC<ReminderCardProps> = ({reminder})=>{
    const isDelayed = reminder.title.toLowerCase().includes('delayed');
    const inWaintingPeriod = reminder.title.toLocaleLowerCase().includes('warning');
    return(
        <div className={`w-full flex justify-between rounded-lg shadow-md p-8 px-8 ${inWaintingPeriod ? 'bg-red-100 border border-red-500 text-red-700 animate-pulse': 'bg-green-50'}`}>
            <div className="flex flex-col justify-center gap-3">
                <h4 className={`font-bold ${isDelayed && 'text-red-700'}`}>{reminder.title}</h4>
                <span className="text-gray-600 font-light text-sm">{reminder.message}</span>
            </div>
            <div className="flex flex-col gap-8">
                <p className="font-semibold text-gray-500">{reminder.date}</p>
                {(isDelayed || inWaintingPeriod) && <button className="bg-red-600 text-white rounded-md p-2">Pay</button>}
            </div>
        </div>
    )
}
export default ReminderCard;