export const getProductById = async (productId) => {
  try {
    const res = await fetch(
      `/api/v1/articles/${productId}?fields=*,madeIn(title,code),category(title)`
    );
    const data = await res.json();
    return data.result;
  } catch (e) {
    console.log(e);
  }
};
