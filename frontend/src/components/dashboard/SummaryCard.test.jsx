import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SummaryCard from './SummaryCard';

describe('SummaryCard Component', () => {
    // Test 1: Verifies text rendering
    it('renders the text passed as a prop correctly', () => {
        render(<SummaryCard text="Total Employees" number={10} color="bg-teal-600" />);
        expect(screen.getByText('Total Employees')).toBeDefined();
    });

    // Test 2: Verifies numeric rendering
    it('renders the number passed as a prop correctly', () => {
        render(<SummaryCard text="Total Employees" number={150} color="bg-teal-600" />);
        expect(screen.getByText('150')).toBeDefined();
    });

    // Test 3: Verifies dynamic class injection
    it('applies the correct background color class dynamically', () => {
        const { container } = render(<SummaryCard text="Test" number={1} color="bg-red-600" />);
        const iconDiv = container.querySelector('.bg-red-600');
        expect(iconDiv).toBeDefined();
        expect(iconDiv).not.toBeNull();
    });

    // Test 4: Verifies React node/icon rendering
    it('renders the provided icon component', () => {
        const mockIcon = <svg data-testid="mock-icon" />;
        render(<SummaryCard icon={mockIcon} text="Test" number={1} color="bg-teal-600" />);
        expect(screen.getByTestId('mock-icon')).toBeDefined();
    });

    // Test 5: Boundary testing for zero
    it('handles zero as a valid number without failing', () => {
        render(<SummaryCard text="Pending Leaves" number={0} color="bg-yellow-600" />);
        expect(screen.getByText('0')).toBeDefined();
    });
});import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SummaryCard from './SummaryCard';

describe('SummaryCard Component', () => {
    // Test 1: Verifies text rendering
    it('renders the text passed as a prop correctly', () => {
        render(<SummaryCard text="Total Employees" number={10} color="bg-teal-600" />);
        expect(screen.getByText('Total Employees')).toBeDefined();
    });

    // Test 2: Verifies numeric rendering
    it('renders the number passed as a prop correctly', () => {
        render(<SummaryCard text="Total Employees" number={150} color="bg-teal-600" />);
        expect(screen.getByText('150')).toBeDefined();
    });

    // Test 3: Verifies dynamic class injection
    it('applies the correct background color class dynamically', () => {
        const { container } = render(<SummaryCard text="Test" number={1} color="bg-red-600" />);
        const iconDiv = container.querySelector('.bg-red-600');
        expect(iconDiv).toBeDefined();
        expect(iconDiv).not.toBeNull();
    });

    // Test 4: Verifies React node/icon rendering
    it('renders the provided icon component', () => {
        const mockIcon = <svg data-testid="mock-icon" />;
        render(<SummaryCard icon={mockIcon} text="Test" number={1} color="bg-teal-600" />);
        expect(screen.getByTestId('mock-icon')).toBeDefined();
    });

    // Test 5: Boundary testing for zero
    it('handles zero as a valid number without failing', () => {
        render(<SummaryCard text="Pending Leaves" number={0} color="bg-yellow-600" />);
        expect(screen.getByText('0')).toBeDefined();
    });
});