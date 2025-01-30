import React from "react";
import { render } from "@testing-library/react";
import { useMatch } from "@/api";
import MatchFinder from "./index";

jest.mock("@/api", () => ({
  useMatch: jest.fn(),
}));

describe("MatchFinder Component", () => {
  const mockMutate = jest.fn();
  const mockUseMatch = useMatch as jest.Mock;

  beforeEach(() => {
    mockUseMatch.mockReturnValue({
      mutate: mockMutate,
      data: null,
      isPending: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render with no dogs selected", () => {
    const { getByText } = render(<MatchFinder dogIds={[]} />);
    expect(getByText("No dog selected")).toBeInTheDocument();
  });

  it("should render with one dog selected", () => {
    const { getByText } = render(<MatchFinder dogIds={["dog1"]} />);
    expect(getByText("1 dog selected")).toBeInTheDocument();
  });

  it("should render with multiple dogs selected", () => {
    const { getByText } = render(<MatchFinder dogIds={["dog1", "dog2"]} />);
    expect(getByText("2 dogs selected")).toBeInTheDocument();
  });

  it("should disable button when no dogs are selected", () => {
    const { getByRole } = render(<MatchFinder dogIds={[]} />);
    expect(getByRole("button", { name: /Find Match/i })).toBeDisabled();
  });

  it("should disable button when finding a match", () => {
    mockUseMatch.mockReturnValueOnce({
      mutate: mockMutate,
      data: null,
      isPending: true,
    });
    const { getByRole } = render(<MatchFinder dogIds={["dog1"]} />);
    expect(getByRole("button", { name: /Find Match/i })).toBeDisabled();
  });
});
