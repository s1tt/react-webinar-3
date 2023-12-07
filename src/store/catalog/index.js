import { PRODUCTS_ON_THE_PAGE } from "../../constants";
import { codeGenerator, getPageCount } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      totalItems: 0,
      totalPages: 0,
      currentPage: 1,
    };
  }

  async load(skip = 0, currentPage = 1) {
    const response = await fetch(
      `/api/v1/articles?limit=${PRODUCTS_ON_THE_PAGE}&skip=${skip}&fields=items(_id, title, price),count`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        totalItems: json.result.count,
        totalPages: getPageCount(json.result.count, PRODUCTS_ON_THE_PAGE),
        currentPage,
      },
      "Загружены товары из АПИ"
    );
  }
}

export default Catalog;
