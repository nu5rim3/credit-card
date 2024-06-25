// Button.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Button, { HUIButtonProps } from '../src/components/Button';

describe('Button', () => {
    const variants: HUIButtonProps['variant'][] = ['primary', 'secondary', 'danger', 'outline', 'ghost', 'link'];

    it('renders without crashing', () => {
        render(<Button variant="primary">Test</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });

    variants.forEach((variant) => {
        it(`renders ${variant} variant correctly`, () => {
            render(<Button variant={variant}>Test</Button>);
        });
    });

    it('applies custom className', () => {
        const customClass = 'custom-class';
        render(<Button variant="primary" className={customClass}>Test</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass(customClass);
    });

    it('handles disabled state', () => {
        render(<Button variant="primary" disabled>Test</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
        expect(button).toHaveClass('opacity-50 cursor-not-allowed');
    });
});
