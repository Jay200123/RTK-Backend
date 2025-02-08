import { describe, test, expect, jest } from "@jest/globals";
import { BrandService } from "../../src/routes/brand/service";
import Brand from "../../src/routes/brand/model";

jest.mock("../../src/routes/brand/model", () => {
  return {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };
});

describe("Brand Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAll service", async () => {
    const data = [
      {
        _id: "60f7b3b3b3b3b3b3b3b3b3b3",
        brand_name: "Brand 1",
        image: [],
        __v: 0,
      },
    ];

    (Brand.find as jest.MockedFunction<typeof Brand.find>).mockResolvedValue(
      data
    );
    const res = await BrandService.getAll();
    expect(res).toBeTruthy();
    expect(res).toEqual(data);
  });
  test("getById service", async () => {
    const data = {
      _id: "60f7b3b3b3b3b3b3b3b3b3",
      brand_name: "Brand 1",
      image: [],
      __v: 0,
    };

    (
      Brand.findById as jest.MockedFunction<typeof Brand.findById>
    ).mockResolvedValue(data);
    const res = await BrandService.getById("60f7b3b3b3b3b3b3b3b3b3");
    expect(res).toBeTruthy();
    expect(res).toEqual(data);
  });
  test("Create Brand", async () => {
    const data = {
      _id: "60f7b3b3b3b3b3b3b3b3b3",
      brand_name: "Brand 1",
      image: [],
      __v: 0,
    };

    (
      Brand.create as jest.MockedFunction<typeof Brand.create>
    ).mockResolvedValue(data as any);
    const res = await BrandService.Add(data);
    expect(res).toBeTruthy();
    expect(res).toEqual(data);
  });
  test("Update By Id", async () => {
    const data = {
      _id: "60f7b3b3b3b3b3b3b3b3b3",
      brand_name: "Brand 1",
      image: [],
      __v: 0,
    };

    (
      Brand.findByIdAndUpdate as jest.MockedFunction<
        typeof Brand.findByIdAndUpdate
      >
    ).mockResolvedValue(data as any);
    const res = await BrandService.updateById("60f7b3b3b3b3b3b3b3b3b3", data);
    expect(res).toBeTruthy();
    expect(res).toEqual(data);
  });

  test("Delete By Id", async () => {
    const data = {
      _id: "60f7b3b3b3b3b3b3b3b3b3",
      brand_name: "Brand 1",
      image: [],
      __v: 0,
    };

    (
      Brand.findByIdAndDelete as jest.MockedFunction<
        typeof Brand.findByIdAndDelete
      >
    ).mockResolvedValue(data as any);
    const res = await BrandService.deleteById("60f7b3b3b3b3b3b3b3b3b3");
    expect(res).toBeTruthy();
    expect(res).toEqual(data);
  });
});
