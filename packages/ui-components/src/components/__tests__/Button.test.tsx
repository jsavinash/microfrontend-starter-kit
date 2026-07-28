import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "../Button";

describe("Button component", () => {
    it("renders with children text", () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole("button")).toHaveTextContent("Click me");
    });

    it("applies default variant and size classes", () => {
        render(<Button>Default</Button>);
        const button = screen.getByRole("button");
        expect(button.className).toContain("bg-blue-600");
        expect(button.className).toContain("px-4");
    });

    it("applies the primary variant styles", () => {
        render(<Button variant="primary">Primary</Button>);
        expect(screen.getByRole("button").className).toContain("bg-blue-600");
    });

    it("applies the secondary variant styles", () => {
        render(<Button variant="secondary">Secondary</Button>);
        expect(screen.getByRole("button").className).toContain("bg-gray-600");
    });

    it("applies the outline variant styles", () => {
        render(<Button variant="outline">Outline</Button>);
        expect(screen.getByRole("button").className).toContain("border-2");
    });

    it("applies the ghost variant styles", () => {
        render(<Button variant="ghost">Ghost</Button>);
        expect(screen.getByRole("button").className).toContain("text-gray-700");
    });

    it("applies size classes correctly", () => {
        const { rerender } = render(<Button size="sm">Small</Button>);
        expect(screen.getByRole("button").className).toContain("px-3");

        rerender(<Button size="lg">Large</Button>);
        expect(screen.getByRole("button").className).toContain("px-6");
    });

    it("disables the button when disabled prop is true", () => {
        render(<Button disabled>Disabled</Button>);
        expect(screen.getByRole("button")).toBeDisabled();
    });

    it("disables the button when isLoading is true", () => {
        render(<Button isLoading>Loading</Button>);
        expect(screen.getByRole("button")).toBeDisabled();
    });

    it("shows a spinner when isLoading is true", () => {
        render(<Button isLoading>Loading</Button>);
        const button = screen.getByRole("button");
        expect(button.querySelector("svg")).toBeInTheDocument();
    });

    it("calls onClick handler when clicked", () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click</Button>);
        fireEvent.click(screen.getByRole("button"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", () => {
        const handleClick = vi.fn();
        render(
            <Button onClick={handleClick} disabled>
                Click
            </Button>,
        );
        fireEvent.click(screen.getByRole("button"));
        expect(handleClick).not.toHaveBeenCalled();
    });

    it("merges custom className with existing classes", () => {
        render(<Button className="custom-class">Custom</Button>);
        expect(screen.getByRole("button").className).toContain("custom-class");
    });

    it("renders as a button element", () => {
        render(<Button>Test</Button>);
        expect(screen.getByRole("button").tagName).toBe("BUTTON");
    });
});
