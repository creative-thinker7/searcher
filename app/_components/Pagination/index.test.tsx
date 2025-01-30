import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Pagination from "./index";

describe("Pagination Component", () => {
  const handleChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correct buttons", () => {
    const { getByText } = render(
      <Pagination currentPage={1} total={5} onChange={handleChange} />,
    );

    expect(getByText("<<")).toBeInTheDocument();
    expect(getByText("<")).toBeInTheDocument();
    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("2")).toBeInTheDocument();
    expect(getByText("3")).toBeInTheDocument();
    expect(getByText("4")).toBeInTheDocument();
    expect(getByText("5")).toBeInTheDocument();
    expect(getByText(">")).toBeInTheDocument();
    expect(getByText(">>")).toBeInTheDocument();
  });

  it("should disable previous and first buttons on the first page", () => {
    const { getByText } = render(
      <Pagination currentPage={1} total={5} onChange={handleChange} />,
    );

    expect(getByText("<<")).toBeDisabled();
    expect(getByText("<")).toBeDisabled();
  });

  it("should disable next and last buttons on the last page", () => {
    const { getByText } = render(
      <Pagination currentPage={5} total={5} onChange={handleChange} />,
    );

    expect(getByText(">")).toBeDisabled();
    expect(getByText(">>")).toBeDisabled();
  });

  it("should call onChange when page button is clicked", () => {
    const { getByText } = render(
      <Pagination currentPage={1} total={5} onChange={handleChange} />,
    );

    fireEvent.click(getByText("2"));
    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it("should show ellipsis when there are hidden pages", () => {
    const { getByText } = render(
      <Pagination
        currentPage={3}
        total={10}
        maxButtons={5}
        onChange={handleChange}
      />,
    );

    expect(getByText("...")).toBeInTheDocument();
    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("2")).toBeInTheDocument();
    expect(getByText("3")).toBeInTheDocument();
    expect(getByText("4")).toBeInTheDocument();
    expect(getByText("5")).toBeInTheDocument();
    expect(getByText("10")).toBeInTheDocument();
  });

  it("should not show ellipsis when all pages are visible", () => {
    const { queryByText } = render(
      <Pagination currentPage={2} total={5} onChange={handleChange} />,
    );

    expect(queryByText("...")).not.toBeInTheDocument();
  });
});
