import { render, screen, fireEvent } from "@testing-library/react";
import { isValidZipCode } from "@/libs";
import TabManual from "./TabManual";

jest.mock("@/libs", () => ({
  isValidZipCode: jest.fn(),
}));

describe("TabManual Component", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call onChange with valid zip codes", () => {
    (isValidZipCode as jest.Mock).mockImplementation(
      (zipCode) => zipCode === "12345" || zipCode === "67890",
    );

    render(<TabManual selectedZipCodes={[]} onChange={mockOnChange} />);

    const textarea = screen.getByPlaceholderText(
      /Enter one zip code per line/i,
    );

    fireEvent.change(textarea, {
      target: {
        value: "12345\ninvalid\n67890\n\n123",
      },
    });

    expect(mockOnChange).toHaveBeenCalledWith(["12345", "67890"]);
  });

  it("should not pass invalid zip codes", () => {
    (isValidZipCode as jest.Mock).mockImplementation(() => false);

    render(<TabManual selectedZipCodes={[]} onChange={mockOnChange} />);

    const textarea = screen.getByPlaceholderText(
      /Enter one zip code per line/i,
    );

    fireEvent.change(textarea, {
      target: {
        value: "invalid1\ninvalid2",
      },
    });

    expect(mockOnChange).toHaveBeenCalledWith([]);
  });

  it("should update the textarea value correctly", () => {
    render(<TabManual selectedZipCodes={[]} onChange={mockOnChange} />);

    const textarea = screen.getByPlaceholderText(
      /Enter one zip code per line/i,
    );

    // Simulate typing
    fireEvent.change(textarea, {
      target: {
        value: "12345\n67890",
      },
    });

    // Check if the textarea value is updated
    expect((textarea as HTMLTextAreaElement).value).toBe("12345\n67890");
  });
});
