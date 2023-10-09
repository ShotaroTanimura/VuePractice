const app = Vue.createApp({
  data: () => ({
    inputItem: '',
    todos: [],
  }),
  methods: {
    addItem: function (event) {
      // console.log('click');
      if (this.inputItem === '') return;
      let todo = {
        item: this.inputItem,
        isDone: false
      };
      this.todos.push(todo);
      this.inputItem = '';
    },
  },
});
app.mount('#app');
