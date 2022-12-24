//Jobs.test.jsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom"
import Create from '../jobs/Create';

describe('rendering Create Jobs component', () => {

    test('renders the landing page', async () => {
        render(<Create />, { wrapper: BrowserRouter });
        expect(screen.getByRole("combobox")).toHaveDisplayValue("-- Select Role --");
        expect(await screen.findByRole("option", { name: "Devops Engineer" })).toBeInTheDocument()
        const submitBtn = screen.getByRole("button");
        expect(submitBtn).not.toBeDisabled();
    });
});