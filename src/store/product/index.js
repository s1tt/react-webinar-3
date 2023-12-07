import { getProductById } from "../../api";
import StoreModule from "../module";

class Product extends StoreModule {
  initState() {
    return {};
  }

  async loadProduct(productId) {
    try {
      const data = await getProductById(productId);

      this.setState({
        ...data,
      });
    } catch (e) {
      console.log(e);
    }
  }

  clearProductData() {
    this.setState({});
  }
}
export default Product;
