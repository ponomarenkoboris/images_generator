import Countdown from 'react-countdown'

type CountDownProps = {
    date: Date
    onMount: ({ completed }: { completed: boolean }) => void
    onComplete: () => void
}

type RenderCounterProps = {
    days: number
    hours: number
    minutes: number
    seconds: number
    completed?: boolean
}

const RenderCounter = ({
    days,
    hours,
    minutes,
    seconds
}: RenderCounterProps) => {
    return (
        <span>
            {hours + (days || 0) * 24} hours, {minutes} minutes, {seconds}{' '}
            seconds
        </span>
    )
}

export const CountDown = ({ date, onMount, onComplete }: CountDownProps) => {
    return (
        <Countdown
            date={date}
            onMount={onMount}
            onComplete={onComplete}
            renderer={RenderCounter}
        />
    )
}
