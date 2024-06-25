// Input.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Input from '../src/components/Input';
import React from 'react';

describe('Input', () => {
    it('renders without crashing', () => {
        render(<Input type="text" label="Test Label" />);
        const input = screen.getByText('Test Label');
        expect(input).toBeInTheDocument();
    });

    it('renders label correctly', () => {
        render(<Input type="text" label="Test Label" />);
        const label = screen.getByText('Test Label');
        expect(label).toBeInTheDocument();
    });

    it('handles input value correctly', () => {
        render(<Input type="text" label="Test Label" value="test value" />);
        const input = screen.getByText('Test Label') as HTMLInputElement;
        expect(input.value).toBe('test value');
    });

    it('calls onChange handler correctly', () => {
        const handleChange = vi.fn();
        render(<Input type="text" label="Test Label" onChange={handleChange} />);
        const input = screen.getByText('Test Label');
        fireEvent.change(input, { target: { value: 'new value' } });
        expect(handleChange).toHaveBeenCalled();
    });

    it('handles disabled state', () => {
        render(<Input type="text" label="Test Label" disabled />);
        const input = screen.getByText('Test Label');
        expect(input).toBeDisabled();
    });

    it('displays error message', () => {
        const errorMessage = 'This is an error message';
        render(<Input type="text" label="Test Label" error={errorMessage} />);
        const error = screen.getByText(errorMessage);
        expect(error).toBeInTheDocument();
        expect(error).toHaveClass('text-red-800');
    });

    it('renders checkbox correctly', () => {
        render(
            <Input
                type="text"
                label="Test Label"
                check
                checkLabel="Check me"
                checkStatus={false}
                setCheackStatus={vi.fn()}
            />
        );
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
        const checkLabel = screen.getByText('Check me');
        expect(checkLabel).toBeInTheDocument();
    });

    it('handles checkbox state and calls setCheackStatus', () => {
        const setCheackStatus = vi.fn();
        render(
            <Input
                type="text"
                label="Test Label"
                check
                checkLabel="Check me"
                checkStatus={false}
                setCheackStatus={setCheackStatus}
            />
        );
        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(setCheackStatus).toHaveBeenCalledWith(true);
    });

    it('disables input when checkbox is checked', () => {
        render(
            <Input
                type="text"
                label="Test Label"
                check
                checkLabel="Check me"
                checkStatus={true}
            />
        );
        const input = screen.getByText('Test Label') as HTMLInputElement;
        expect(input.disabled).toBe(true);
    });
});
