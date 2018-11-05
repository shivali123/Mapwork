let nextUserId = 0;
export const addPlace = obj => ({
  type: "ADD_PLACE",
  id: nextUserId++,
  title: obj.title,
  latlng: obj.latlng,
  img: obj.img
});

export const stylePlaces = newTodoList => ({
  type: "POPULATE_PLACES",
  newTodoList
});

export const placename = text => ({
  type: "PLACE_NAME",
  text
});

export const textinput = () => ({
  type: "SHOW_TEXTINPUT",
  textinput
});
