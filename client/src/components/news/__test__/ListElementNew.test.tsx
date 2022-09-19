import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import ListElementNew from '../ListElementNew';


describe("Component ListElementNew", () => {

    const mockOnRemove = jest.fn(x => 42 + x);
    const timeYesterday = dayjs().subtract(1, 'day')

    render(<ListElementNew
        title="Test title"
        url="http://www.test.com"
        time={timeYesterday.format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]')}
        id="123456"
        author="Dany Santos"
        onRemove={mockOnRemove}
    />)

    it("Displays component", () => {
        expect(screen.findByText("Test title"))
    })

    it("Check is yesterday component show", () => {
        expect(screen.findByText("Yesterday"))
    })

})