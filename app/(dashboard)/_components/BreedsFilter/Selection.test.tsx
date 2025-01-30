import { render, screen, fireEvent } from "@testing-library/react";
import { ReactNode } from "react";
import { Listbox } from "@headlessui/react";
import BreedsFilterSelection from "./Selection";

jest.mock("./Label", () => ({ breed }: { breed: string }) => (
  <span>{breed}</span>
));

jest.mock("@headlessui/react", () => ({
  Listbox: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  ListboxButton: ({ children }: { children: ReactNode }) => (
    <button>{children}</button>
  ),
}));

describe("BreedsFilterSelection", () => {
  const mockOnClear = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render placeholder when no breeds are selected", () => {
    render(
      <Listbox>
        <BreedsFilterSelection breeds={[]} onClear={mockOnClear} />
      </Listbox>,
    );
    const placeholderText = screen.getByText(/select breeds.../i);
    expect(placeholderText).toBeInTheDocument();
  });

  it("should render selected breeds when fewer than or equal to 5 breeds are provided", () => {
    const breeds = ["Beagle", "Boxer", "Chow", "Dingo", "Pug"];
    render(
      <Listbox>
        <BreedsFilterSelection breeds={breeds} onClear={mockOnClear} />
      </Listbox>,
    );

    breeds.forEach((breed) => {
      const breedLabel = screen.getByText(breed);
      expect(breedLabel).toBeInTheDocument();
    });
  });

  it("should render first five breeds and a count when more than 5 breeds are provided", () => {
    const breeds = [
      "Beagle",
      "Boxer",
      "Chow",
      "Dingo",
      "Pug",
      "Redbone",
      "Saluki",
    ];
    render(
      <Listbox>
        <BreedsFilterSelection breeds={breeds} onClear={mockOnClear} />
      </Listbox>,
    );

    const displayedBreeds = breeds.slice(0, 5);
    displayedBreeds.forEach((breed) => {
      const breedLabel = screen.getByText(breed);
      expect(breedLabel).toBeInTheDocument();
    });

    const moreCountText = screen.getByText(/\+ 2 breeds/i);
    expect(moreCountText).toBeInTheDocument();
  });

  it("should call onClear when clear button is clicked", () => {
    const breeds = ["Boxer"];
    render(
      <Listbox>
        <BreedsFilterSelection breeds={breeds} onClear={mockOnClear} />
      </Listbox>,
    );

    const clearButton = screen.getByRole("button", { name: /clear/i });
    fireEvent.click(clearButton);
    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });

  it("should not render clear button when no breeds are selected", () => {
    render(
      <Listbox>
        <BreedsFilterSelection breeds={[]} onClear={mockOnClear} />
      </Listbox>,
    );
    const clearButton = screen.queryByRole("button", { name: /clear/i });
    expect(clearButton).not.toBeInTheDocument();
  });
});
