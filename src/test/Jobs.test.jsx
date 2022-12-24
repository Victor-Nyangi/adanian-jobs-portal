//Jobs.test.jsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom"
import Jobs from '../jobs/Index';



describe('Testing Jobs component', () => {
    // Title
test('header renders with correct text', () => {
    render(<Jobs />, { wrapper: BrowserRouter });
    const headerEl = screen.getByTestId("title");
    expect(headerEl.textContent).toBe("Jobs Board");
});

});