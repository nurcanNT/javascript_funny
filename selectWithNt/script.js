const app = Vue.createApp({
    components: {
      NtSelect: window["nt-select"]
    },
    data() {
      return {
        books: [
          { title: "HTML5 Books" },
          { title: "The Lock Artist" },
          { title: "The Man's War", icon: "name" },
          { title: "Thank You Jeeves" }
        ]
      };
    }
  });
  
  app.mount("#app");
  

console.log(app);