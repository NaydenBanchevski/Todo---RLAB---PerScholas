export const todoReducer = (state, action) => {
  switch (action.type) {
    case "Add":
      return [
        {
          id: Date.now(),
          title: action.title,
          completed: false,
          isEditing: false,
        },
        ...state,
      ];
    case "Toggle":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case "Delete":
      return state.filter((todo) => todo.id !== action.id);
    case "Edit":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, isEditing: true } : todo
      );
    case "Save_Edit":
      return state.map((todo) =>
        todo.id === action.id
          ? { ...todo, title: action.newTitle, isEditing: false }
          : todo
      );
    default:
      return state;
  }
};
