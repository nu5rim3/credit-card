import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Listbox } from '../src/components';

describe('Listbox Component', () => {
    const baseProps = {
        options: ['Option 1', 'Option 2', 'Option 3'],
        label: 'Sample Listbox',
        required: true,
        error: 'Error message'
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('1. renders with label and required indicator', () => {
        render(<Listbox {...baseProps} />);
        const label = screen.getByRolet('button');
        expect(label).toBeInTheDocument();
    });

    it('renders options correctly', () => {
        render(<Listbox {...baseProps} />);
        const button = screen.getByRole('button');
        userEvent.click(button);
        const options = screen.getAllByRole('option');
        expect(options.length).toBe(baseProps.options.length);
        expect(options[0]).toHaveTextContent('Option 1');
        expect(options[1]).toHaveTextContent('Option 2');
    });

    it('handles selection correctly', async () => {
        const user = userEvent.setup();
        render(<Listbox {...baseProps} />);
        const button = screen.getByRole('button');
        await user.click(button);
        const optionToSelect = screen.getByText('Option 2');
        await user.click(optionToSelect);
        expect(button).toHaveTextContent('Option 2');
    });

    it('is disabled when disabled prop is true', () => {
        render(<Listbox {...baseProps} disabled={true} />);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });

    it('displays an error message when error prop is provided', () => {
        render(<Listbox {...baseProps} />);
        const errorMessage = screen.getByText(baseProps.error);
        expect(errorMessage).toBeInTheDocument();
    });
});