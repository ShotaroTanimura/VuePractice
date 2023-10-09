const app = Vue.createApp({
  data: () => ({
    message: 'Hello world',
    name: ['Tom','Nike','Mike'],
    bool: false,
    names: ["A","B","C"],
    user: {
      name: "yamada",
      hobby: "soccer",
      age: "20"
    },
    users: [{
      id: 1,
      name: "a",
      age: 10
    },
    {
      id: 2,
      name: "b",
      age: 20
    },
    {
      id: 3,
      name: "c",
      age: 30
    }],
    click: "now",
    changeMessage: "name"
  }),
  methods: {
    onClick: function(){
      this.click = new Date().toLocaleString()
    }
  }
});

app.component('component-name',{
  template: '<p>My name is TTT</p>'
})
app.mount('#app');