import { expect, describe, vi, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";


describe("App", async() => {

    window.fetch = vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue({
            data: []
        })
    });

    it("should render the name", async() => { 

        render(<App />);

    const name = screen.getByText("Markus Löffler");

    expect(name).toBeInTheDocument();
    expect(name).toBeVisible();


    });

    
});