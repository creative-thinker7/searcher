import { chunkArray, isValidZipCode } from ".";

describe("libs", () => {
  describe("chunkArray", () => {
    it("should split an array into chunks of the specified size", () => {
      const input = [1, 2, 3, 4, 5];
      const size = 2;
      const expectedOutput = [[1, 2], [3, 4], [5]];

      expect(chunkArray(input, size)).toEqual(expectedOutput);
    });

    it("should return an empty array when input is empty", () => {
      const input: number[] = [];
      const size = 2;
      const expectedOutput: number[][] = [];

      expect(chunkArray(input, size)).toEqual(expectedOutput);
    });

    it("should return the original array when size is greater than the array length", () => {
      const input = [1, 2, 3];
      const size = 5;
      const expectedOutput = [[1, 2, 3]];

      expect(chunkArray(input, size)).toEqual(expectedOutput);
    });

    it("should handle chunk size of 1", () => {
      const input = [1, 2, 3, 4];
      const size = 1;
      const expectedOutput = [[1], [2], [3], [4]];

      expect(chunkArray(input, size)).toEqual(expectedOutput);
    });

    it("should handle chunk size equal to array length", () => {
      const input = [1, 2, 3];
      const size = 3;
      const expectedOutput = [[1, 2, 3]];

      expect(chunkArray(input, size)).toEqual(expectedOutput);
    });
  });

  describe("isValidZipCode", () => {
    it("should return true for valid 5-digit ZIP codes", () => {
      expect(isValidZipCode("12345")).toBe(true);
      expect(isValidZipCode("67890")).toBe(true);
    });

    it("should return true for valid 5-digit ZIP+4 codes", () => {
      expect(isValidZipCode("12345-6789")).toBe(true);
      expect(isValidZipCode("98765-4321")).toBe(true);
    });

    it("should return false for invalid ZIP codes", () => {
      expect(isValidZipCode("1234")).toBe(false); // Too short
      expect(isValidZipCode("123456")).toBe(false); // Too long
      expect(isValidZipCode("12345-678")).toBe(false); // Invalid ZIP+4 format
      expect(isValidZipCode("12345-67890")).toBe(false); // Invalid ZIP+4 format
      expect(isValidZipCode("abcde")).toBe(false); // Non-numeric
      expect(isValidZipCode("12345-")).toBe(false); // Incomplete ZIP+4
    });

    it("should return false for empty strings", () => {
      expect(isValidZipCode("")).toBe(false);
    });
  });
});
