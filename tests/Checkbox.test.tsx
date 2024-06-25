// Checkbox.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Checkbox from '../src/components/Checkbox';

describe('Checkbox', () => {
    it('renders without crashing', () => {
        render(<Checkbox label="Test Label" />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
    });

    it('renders label correctly', () => {
        render(<Checkbox label="Test Label" />);
        const label = screen.getByText('Test Label');
        expect(label).toBeInTheDocument();
    });

    it('handles check and uncheck', () => {
        const handleChange = vi.fn();
        render(<Checkbox label="Test Label" onChange={handleChange} />);
        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(handleChange).toHaveBeenCalledWith(true);
        fireEvent.click(checkbox);
        expect(handleChange).toHaveBeenCalledWith(false);
    });

    it('handles disabled state', () => {
        render(<Checkbox label="Test Label" disabled />);
        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });

    it('displays error message', () => {
        const errorMessage = 'This is an error message';
        render(<Checkbox label="Test Label" error={errorMessage} />);
        const error = screen.getByText(errorMessage);
        expect(error).toBeInTheDocument();
        expect(error).toHaveClass('text-red-800');
    });

    it('renders terms and conditions type correctly', () => {
        const setOpen = vi.fn();
        render(<Checkbox label="Test Label" type="terms" setOpen={setOpen} />);
        const termsLink = screen.getByText('terms and conditions');
        expect(termsLink).toBeInTheDocument();
        fireEvent.click(termsLink);
        expect(setOpen).toHaveBeenCalledWith(true);
    });

    it('applies custom className', () => {
        const customClass = 'custom-class';
        render(<Checkbox label="Test Label" className={customClass} />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toHaveClass(customClass);
    });
});
