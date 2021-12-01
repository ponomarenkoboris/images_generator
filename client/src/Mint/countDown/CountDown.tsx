import Countdown from 'react-countdown'
import { Counter } from './Counter'

type CountDownProps = {
    date: Date
    onMount: ({ completed }: { completed: boolean }) => void
    onComplete: () => void
}

export const CountDown = (props: CountDownProps) => {
    return <Countdown {...props} renderer={Counter} />
}