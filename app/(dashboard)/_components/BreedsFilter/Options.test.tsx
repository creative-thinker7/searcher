import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import BreedsFilterOptions from "./Options";

jest.mock("@headlessui/react", () => ({
  ListboxOption: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("BreedsFilterOptions", () => {
  it("should render loading state", () => {
    render(<BreedsFilterOptions isLoading={true} breeds={[]} />);
    const loadingText = screen.getByText(/loading breeds.../i);
    expect(loadingText).toBeInTheDocument();
  });

  it("should render no breeds found message when there is no breeds", () => {
    render(<BreedsFilterOptions isLoading={false} breeds={[]} />);
    const noBreedsText = screen.getByText(/no breeds found/i);
    expect(noBreedsText).toBeInTheDocument();
  });

  it("should renders breed options", () => {
    const breeds = ["Beagle", "Boxer", "Dingo"];
    render(<BreedsFilterOptions isLoading={false} breeds={breeds} />);

    breeds.forEach((breed) => {
      const breedOption = screen.getByText(breed);
      expect(breedOption).toBeInTheDocument();
    });
  });
});
