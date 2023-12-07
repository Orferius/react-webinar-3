import StoreModule from "../module";

class Product extends StoreModule {
  initState() {
    return {
      data: null,
    };
  }

  async loadItem(id) {
    const response = await fetch(
      `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
    );
    const json = await response.json();

    this.setState({
      ...this.getState(),
      data: {
        _id: json.result._id,
        title: json.result.title,
        description: json.result.description,
        price: json.result.price,
        country: json.result.madeIn,
        year: json.result.edition,
        category: json.result.category,
      },
    }, "Загружен 1 товар");
  }
}

export default Product;