<template>
  <div class="container">
    <h1>Usuarios (SQLite + Express)</h1>

    <div class="form">
      <input
        v-model="newUser"
        placeholder="Nombre"
        @keyup.enter="addUser"
      />
      <button @click="addUser">Agregar</button>
    </div>

    <ul class="user-list">
      <li v-for="u in users" :key="u.id">{{ u.name }}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Usuarios",

  data() {
    return {
      users: [],
      newUser: ""
    };
  },

  methods: {
    async loadUsers() {
      const res = await axios.get("http://localhost:3000/users");
      this.users = res.data;
    },

    async addUser() {
      if (!this.newUser.trim()) return;

      await axios.post("http://localhost:3000/users", {
        name: this.newUser
      });

      this.newUser = "";
      this.loadUsers();
    }
  },

  mounted() {
    this.loadUsers();
  }
};
</script>

<style>
.container {
  max-width: 500px;
  margin: 30px auto;
  font-family: Arial, sans-serif;
}
.form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.user-list {
  list-style: none;
  padding: 0;
}
.user-list li {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
</style>
