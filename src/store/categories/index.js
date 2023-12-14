import StoreModule from "../module";

class CategoriesState extends StoreModule {
  initState() {
    return {
      categories: [],
      waiting: false,
    };
  }

  async load() {
    this.setState({
      categories: [],
      waiting: true,
    });

    try {
      const response = await fetch(
        `/api/v1/categories?fields=_id,title,parent(_id)&limit=*`
      );
      const json = await response.json();

      this.setState(
        {
          categories: json.result.items,
          waiting: false,
        },
        "Загружен список категорий из АПИ"
      );
    } catch (e) {
      this.setState({
        items: [],
        waiting: false,
      });
    }
  }
}

export default CategoriesState;
