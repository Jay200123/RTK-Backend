import Brand from "./model";

export class BrandService {
  static async getAll() {
    return await Brand.find();
  }

  static async getById(id: string) {
    return await Brand.findById(id);
  }

  static async Add(data: any) {
    return await Brand.create(data);
  }

  static async updateById(id: string, data: any) {
    return await Brand.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  static async deleteById(id: string) {
    return await Brand.findByIdAndDelete(id);
  }
}
