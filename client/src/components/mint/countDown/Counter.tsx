type CounterProps = {
    days: number
    hours: number
    minutes: number
    seconds: number
}

export const Counter = ({ days, hours, minutes, seconds }: CounterProps) => {
    return <span>{hours + (days || 0) * 24} hours, {minutes} minutes, {seconds}</span> 
}