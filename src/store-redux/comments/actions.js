export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: "comments/load-start" });
      try {
        const res = await services.api.request({
          url: `api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // Товар загружен успешно
        dispatch({
          type: "comments/load-success",
          payload: { data: res.data.result },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: "comments/load-error" });
      }
    };
  },

  newComment: (parentId, type, text) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/load-comment" });

      try {
        const res = await services.api.request({
          url: `api/v1/comments?fields=author(_id, profile(name)),dateCreate,isDeleted,parent(_id,_type), text`,
          method: "POST",
          body: JSON.stringify({
            text,
            parent: {
              _id: parentId,
              _type: type,
            },
          }),
        });

        dispatch({
          type: "comments/add-comment",
          payload: { item: res.data.result },
        });
      } catch (e) {
        //Ошибка загрузки
        console.log(e);
        dispatch({ type: "comments/load-error" });
      }
    };
  },
};
