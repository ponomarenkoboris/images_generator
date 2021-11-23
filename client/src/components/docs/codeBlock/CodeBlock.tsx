import { useState } from 'react'
import { Button } from '@material-ui/core'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import './CodeBlock.scss'

type CodeBlockProps = {
    children: string
}

export const CodeBlock = ({ children }: CodeBlockProps) => {
    const [isCopied, setIsCopied] = useState(false)

    const codeToClipboard = () => {
        navigator.clipboard.writeText(children)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

    return (
        <code className='code'>
            <p className='code-fragment'>{children}</p>
            <div className='code-copy__button'>
                <Button
                    onClick={codeToClipboard}
                >
                    {!isCopied ? 'Copy' : (
                        <div className='code-isCopied'>
                            <span>Copied</span>
                            <DoneAllIcon />
                        </div>
                    )}
                </Button>
            </div>
        </code>
    )
}