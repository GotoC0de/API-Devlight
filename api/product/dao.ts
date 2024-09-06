import Product from "./model";
import { IProduct } from "../../types/index";

class ProductDao {
  async getAllProducts(
    category: string | undefined,
    salersId: string | undefined,
    priceStart: number | undefined,
    priceEnd: number | undefined,
    sort: -1 | 1 | undefined,
    page: string,
    limit: string
  ) {
    try {
      const formatedData = {
        category: category ? category : undefined,
        salersId: salersId ? salersId : undefined,
        price:
          priceStart && priceEnd
            ? { $gte: priceStart, $lte: priceEnd }
            : undefined,
      };
      /**
       * @param limit => Cantidad páginas que vaya a omitirse
       * @param page => La página que se desea mostrar
       */
      //Ejmp -> (1-1) * 10 = 0 - Trae los primeros 10 productos
      //Ejmp2 -> (2-1) * 10 = 10 - Omite los primeros 10 y retorna los siguientes 10 (Del 11 al 20)
      const skip = (Number(page) - 1) * Number(limit);
      const products = await Product.find(formatedData)
        //Evalua si la expresión sort && {price_sort} es true (No es undefined), en tal caso se ejecuta la aplicación de ordenación en el campo price con el valor de sort (auxilio, llevo más de 8 horas sentado :c)
        .sort(sort && { price: sort })
        .skip(skip)
        .limit(Number(limit));
      return products;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async getProductById(productId: string) {
    try {
      const product = await Product.findById(productId);
      return product;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async createProduct(product: IProduct) {
    try {
      const newProduct = await Product.create(product);
      return newProduct;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async editProduct(productId: string, product: IProduct) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        product,
        { new: true }
      );
      return updatedProduct;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async deleteProduct(productId: string) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);
      return deletedProduct;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
}

export const productDao = new ProductDao();
