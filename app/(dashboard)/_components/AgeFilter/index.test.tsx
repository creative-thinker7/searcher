import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import AgeFilter from "./index";

describe("AgeFilter Component", () => {
  const mockOnFilter = jest.fn();
  const mockOnReset = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render with default values", () => {
    const { getByLabelText, getByRole } = render(
      <AgeFilter
        isFilterApplied={false}
        onFilter={mockOnFilter}
        onReset={mockOnReset}
      />,
    );

    expect(getByLabelText(/Min Age:/i)).toHaveValue(0);
    expect(getByLabelText(/Max Age:/i)).toHaveValue(14);
    expect(getByRole("button", { name: /Filter/i })).toBeInTheDocument();
  });

  it("should submit the form with valid values", async () => {
    const { getByLabelText, getByRole } = render(
      <AgeFilter
        isFilterApplied={false}
        onFilter={mockOnFilter}
        onReset={mockOnReset}
      />,
    );

    fireEvent.change(getByLabelText(/Min Age:/i), { target: { value: 5 } });
    fireEvent.change(getByLabelText(/Max Age:/i), { target: { value: 10 } });
    fireEvent.click(getByRole("button", { name: /Filter/i }));

    await waitFor(() => expect(mockOnFilter).toHaveBeenCalledWith(5, 10));
  });

  it("should show error message for invalid max age", async () => {
    const { getByLabelText, findByText, getByRole } = render(
      <AgeFilter
        isFilterApplied={false}
        onFilter={mockOnFilter}
        onReset={mockOnReset}
      />,
    );

    fireEvent.change(getByLabelText(/Min Age:/i), { target: { value: 10 } });
    fireEvent.change(getByLabelText(/Max Age:/i), { target: { value: 5 } });
    fireEvent.click(getByRole("button", { name: /Filter/i }));

    expect(
      await findByText(/Please enter a valid maximum age/i),
    ).toBeInTheDocument();
  });

  it("should call onReset when reset button is clicked", () => {
    const { getByRole } = render(
      <AgeFilter
        isFilterApplied={true}
        onFilter={mockOnFilter}
        onReset={mockOnReset}
      />,
    );

    fireEvent.click(getByRole("button", { name: /Reset/i }));
    expect(mockOnReset).toHaveBeenCalled();
  });

  it("should not show reset button when no filter is applied", () => {
    const { queryByRole } = render(
      <AgeFilter
        isFilterApplied={false}
        onFilter={mockOnFilter}
        onReset={mockOnReset}
      />,
    );

    expect(queryByRole("button", { name: /Reset/i })).not.toBeInTheDocument();
  });
});
