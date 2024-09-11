import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import SkillSlider from '@/pages/main/SkillSlider';
import { items, banners } from '@/data/skillSliderItems';
describe("SkillSlider", () => {
    it("Should render the SkillSlider site", async () => {
        const { container } = render(<SkillSlider />);


        const Select = await screen.findByTestId("multi-select-dropdown");
        const Carousel = container.querySelector(".carousel");
        if(Carousel === null) throw new Error("Carousel is null");

        expect(Select).toBeInTheDocument();

        for(const item of items) {
        

            // 1. Click on the filter
            act(() => {
                //! Use mouseDown instead of click to open the dropdown
                fireEvent.mouseDown(Select.children[0]);
            });

            // 2. Wait for the dropdowns to appear
            const label = await screen.findByTestId(item.label);

            if(label === null) throw new Error("Dropdowns are not visible");

            const checkbox = (await screen.findByTestId("checkbox-"+item.label)).firstChild as unknown as HTMLInputElement;
            if(checkbox === null || checkbox.type !== "checkbox") throw new Error("Checkbox is not visible");

            // 3. Click on the filter
            act(() => {
                fireEvent.click(checkbox);
            });

            // 4. Wait for the filter to be checked
            
            await waitFor(() => expect(checkbox).toBeChecked());

            await waitFor(() => {
                // Check if the carousel has the correct number of items
                const carouselItems = Carousel.children[0]?.children;
                const expectedItems = banners.filter(i => i.props.type === item.skillType);
                console.log("Expected number of items after selecting:", item.label, "is:", expectedItems.length);
                console.log("Actual number of carousel items:", carouselItems.length);

                expect(carouselItems?.length).toBeGreaterThan(0);
                expect(carouselItems.length).toBe(expectedItems.length)
            });

            // Close the dropdown
            act(() => {
                fireEvent.click(checkbox);
            });

        }
    });
})