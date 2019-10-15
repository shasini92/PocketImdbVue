// import todoService from "../../services/TodoService";

const state = {
  todos: [],
  alert: {
    message: "",
    color: ""
  },
  showUpdate: false
};

const getters = {
  allTodos: state => state.todos,
  showUpdate: state => state.showUpdate,
  alert: state => state.alert
};

const actions = {
  async markComplete({ commit }, data) {
    try {
      await todoService.updateTodo(data);
    } catch (error) {
      console.log(error);
    }
  },

  async showUpdateForm({ commit }, data) {
    try {
      commit("showUpdateForm", data);
    } catch (error) {
      console.log(error);
    }
  },
  async updateTodo({ commit }, data) {
    try {
      const updatedTodo = await todoService.updateTodo(data);
      commit("updateTodo", updatedTodo);
    } catch (error) {
      console.log(error);
    }
  },

  async getAllTodos({ commit }) {
    try {
      const allTodos = await todoService.fetchTodos();
      commit("setTodos", allTodos);
    } catch (error) {
      console.log(error);
    }
  },
  async addTodo({ commit }, data) {
    try {
      const newTodo = await todoService.addTodo(data);

      commit("newTodo", newTodo);
    } catch (error) {
      console.log(error);
    }
  },

  async deleteTodo({ commit }, data) {
    try {
      await todoService.deleteTodo(data);

      commit("removeTodo", data);
    } catch (error) {
      console.log(error);
    }
  }
};

const getPriorityColor = item => {
  if (item.priority === "High") item.priorityColor = "#f5365c";
  if (item.priority === "Medium") item.priorityColor = "#ffbb33";
  if (item.priority === "Low") item.priorityColor = "#5e72e4";
};

const mutations = {
  setTodos: (state, todos) => {
    state.todos = todos.map(todo => {
      getPriorityColor(todo);
      return todo;
    });
  },
  newTodo: (state, todo) => {
    getPriorityColor(todo);
    state.todos.unshift(todo);
    state.alert = {
      message: "Todo successfully created.",
      class: "alert-success"
    };
  },

  updateTodo: (state, updatedTodo) => {
    state.todos.filter(todo => {
      if (todo.id === updatedTodo.id) {
        todo.title = updatedTodo.title;
        todo.description = updatedTodo.description;
        todo.priority = updatedTodo.priority;
        getPriorityColor(todo);
      }
    });
    state.showUpdate = false;
    state.alert = {
      message: "Todo successfully updated.",
      class: "alert-primary"
    };
  },
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter(todo => todo.id !== id)),

  showUpdateForm: (state, data) => (state.showUpdate = data)
};

export default {
  state,
  getters,
  actions,
  mutations
};
