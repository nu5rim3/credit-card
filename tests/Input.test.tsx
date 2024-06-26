// Input.test.tsx

import Input from '../src/components/Input';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

describe('Input Component', () => {
    const mockSetCheckStatus = vi.fn();
    const mockOnChange = vi.fn();
    const baseProps = {
        type: 'text',
        label: 'Username',
        value: 'textBox',
        check: true,
        checkLabel: 'Enable',
        checkStatus: false,
        setCheackStatus: mockSetCheckStatus,
        onChange: mockOnChange,
        className: 'additional-class',
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('1. renders input with label', () => {
        render(<Input {...baseProps} />);
        const inputLableElement = screen.getByText('Username');
        expect(inputLableElement).toBeInTheDocument();
    });

    it('2. displays the checkbox if check is true', () => {
        render(<Input {...baseProps} />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
    });

    it('3. does not display the checkbox if check is false', () => {
        render(<Input {...{ ...baseProps, check: false }} />);
        const checkbox = screen.queryByRole('checkbox');
        expect(checkbox).toBeNull();
    });

    it('4. calls setCheackStatus when checkbox is clicked', async () => {
        render(<Input {...baseProps} />);
        const checkbox = screen.getByRole('checkbox');
        await userEvent.click(checkbox);
        expect(mockSetCheckStatus).toHaveBeenCalledWith(true);
    });


    it('5. applies additional classes passed to the component', () => {
        render(<Input {...baseProps} />);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toHaveClass('additional-class');
    });

    it('6. displays an error message when error prop is provided', () => {
        const errorMessage = "Invalid username";
        render(<Input {...baseProps} error={errorMessage} />);
        const errorLabel = screen.getByText(errorMessage);
        expect(errorLabel).toBeInTheDocument();
    });

    it('7. input is disabled if disabled prop is true', () => {
        render(<Input {...{ ...baseProps, disabled: true }} />);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toBeDisabled();
    });

    it('8. input is disabled if checkStatus is true', () => {
        render(<Input {...{ ...baseProps, checkStatus: true }} />);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toBeDisabled();
    });
});
