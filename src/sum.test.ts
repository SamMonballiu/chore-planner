import sum from "./sum";

describe("sum", () => {
  it("should calculate the sum correctly", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
