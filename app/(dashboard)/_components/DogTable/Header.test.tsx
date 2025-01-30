import { render, fireEvent } from "@testing-library/react";
import Header from "./Header";

describe("Table Header Component", () => {
  const mockOnSort = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render all headings correctly", () => {
    const { getByText } = render(
      <table>
        <Header sortBy="name" sortOrder="asc" onSort={mockOnSort} />
      </table>,
    );

    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Breed")).toBeInTheDocument();
    expect(getByText("Age")).toBeInTheDocument();
    expect(getByText("Zip Code")).toBeInTheDocument();
  });

  it("should call onSort with correct value when a sortable heading is clicked", () => {
    const { getByText } = render(
      <table>
        <Header sortBy="name" sortOrder="asc" onSort={mockOnSort} />
      </table>,
    );

    fireEvent.click(getByText("Breed"));
    expect(mockOnSort).toHaveBeenCalledWith("breed");
  });

  it("should not call onSort when a non-sortable heading is clicked", () => {
    const { getByText } = render(
      <table>
        <Header sortBy="name" sortOrder="asc" onSort={mockOnSort} />
      </table>,
    );

    fireEvent.click(getByText("Zip Code"));
    expect(mockOnSort).not.toHaveBeenCalled();
  });

  it("should show ascending indicator for currently sorted column", () => {
    const { getByText } = render(
      <table>
        <Header sortBy="name" sortOrder="asc" onSort={mockOnSort} />
      </table>,
    );

    expect(getByText("Name").closest("th")).toContainHTML("&#9650;");
  });

  it("should show descending indicator for currently sorted column", () => {
    const { getByText } = render(
      <table>
        <Header sortBy="age" sortOrder="desc" onSort={mockOnSort} />
      </table>,
    );

    expect(getByText("Age").closest("th")).toContainHTML("&#9660;");
  });

  it("should not show sorting indicators for unsorted columns", () => {
    const { getByText } = render(
      <table>
        <Header sortBy="name" sortOrder="asc" onSort={mockOnSort} />
      </table>,
    );

    expect(getByText("Breed").closest("th")).not.toContainHTML("&#9650;");
    expect(getByText("Breed").closest("th")).not.toContainHTML("&#9660;");
  });
});
