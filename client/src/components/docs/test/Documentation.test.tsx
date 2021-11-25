import Documentation from '../Documentation'
import { render } from '@testing-library/react'
import { Suspense } from 'react'

test('Shold render Documentation component', () => {
    const { container } = render(
        <Suspense fallback={<div>Loading...</div>}>
            <Documentation />
        </Suspense>
    )
    const sectionsList = container.querySelector('ol')
    expect(sectionsList?.childElementCount).toBe(3)
})