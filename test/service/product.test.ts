import { describe, expect, test, jest } from "@jest/globals";
import { ProductService } from "../../src/routes/product/service";
import Product from "../../src/routes/product/model";

jest.mock("../../src/routes/product/model", () => {
  return {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };
});

describe("Product Service", () => {
  test("Get all products", async () => {
    const data = [
      {
        _id: "60f8c4c4c4c4c4c4c4c4b3",
        brand: {
          _id: "60f8c4c4c4c4c4c4c4c4b3",
          brand_name: "Brand 1",
          image: [],
          __v: 0,
        },
        product_name: "Product 1",
        price: 1000,
        description: "Lorem Ipsum",
        color: "#000000",
        category: "Computer",
        quantity: 10,
        isNewlyCreated: true,
        image: [],
        __v: 0,
      },
      {
        _id: "60f8c4c4c4c4c4c4c4c4b3",
        brand: {
          _id: "60f8c4c4c4c4c4c4c4c4b3",
          brand_name: "Brand 1",
          image: [],
          __v: 0,
        },
        product_name: "Product 2",
        price: 2000,
        description: "Lorem Ipsum",
        color: "#000000",
        category: "Computer",
        quantity: 10,
        isNewlyCreated: true,
        image: [],
        __v: 0,
      },
    ];

    const mockPopulate = jest
      .fn<() => Promise<typeof data>>()
      .mockResolvedValue(data);

    (Product.find as jest.Mock).mockReturnValue({
      populate: mockPopulate,
    });

    const res = await ProductService.getAll();
    expect(res).toBeTruthy();
    expect(res).toEqual(data);
    expect(Product.find).toHaveBeenCalledTimes(1);
    expect(mockPopulate).toHaveBeenCalledWith({
      path: "brand",
      select: "brand_name",
    });
  });
  test("Get product by id", async () => {
    const data = {
      _id: "60f8c4c4c4c4c4c4c4c4b3",
      brand: {
        _id: "60f8c4c4c4c4c4c4c4c4b3",
        brand_name: "Brand 1",
        image: [],
        __v: 0,
      },
      product_name: "Product 2",
      price: 2000,
      description: "Lorem Ipsum",
      color: "#000000",
      category: "Computer",
      quantity: 10,
      isNewlyCreated: true,
      image: [],
      __v: 0,
    };

    const mockPopulate = jest
      .fn<() => Promise<typeof data>>()
      .mockResolvedValue(data);

    (Product.findById as jest.Mock).mockReturnValue({
      populate: mockPopulate,
    });

    const res = await ProductService.getOne("60f8c4c4c4c4c4c4c4c4b3");
    expect(res).toBeTruthy();
    expect(res).toEqual(data);
    expect(Product.findById).toHaveBeenCalledTimes(1);
    expect(mockPopulate).toHaveBeenCalledWith({
      path: "brand",
      select: "brand_name",
    });
  });

  test("Create product", async () => {
    const data = {
      _id: "60f8c4c4c4c4c4c4c4c4b3",
      brand: "60f8c4c4c4c4c4c4c4c4b3",
      product_name: "Product 2",
      price: 2000,
      description: "Lorem Ipsum",
      color: "#000000",
      category: "Computer",
      quantity: 10,
      isNewlyCreated: true,
      image: [],
      __v: 0,
    };

    (
      Product.create as jest.MockedFunction<typeof Product.create>
    ).mockResolvedValue(data as any);
    const res = await ProductService.Add(data as any);
    expect(res).toBeTruthy();
    expect(res).toEqual(data);
  });

  //   test("Update product by id", async () => {});
  //   test("Delete product by id", async () => {});
});
