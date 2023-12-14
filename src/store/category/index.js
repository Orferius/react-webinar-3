import StoreModule from "../module";

class CategoryState extends StoreModule {
  initState() {
    return {
      categories: [],
      waiting: false, // признак ожидания загрузки
    };
  }

  async loadCategories() {
    const response = await fetch(
      `/api/v1/categories?fields=_id,title,parent(_id)&limit=*`
    );
    const json = await response.json();
    const result = await json.result;

    this.setState(
      {
        categories: result,
        waiting: false,
      },
      "Загружены категории из АПИ"
    );
  }
}

export default CategoryState;