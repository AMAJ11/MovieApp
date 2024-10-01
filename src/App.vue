<template>
  <v-layout>
    <v-app-bar class="">
      <v-row>
        <v-col
          cols="4"
          sm="6"
          md="4"
          lg="3"
          style="display: flex; justify-content: center; align-items: center"
          ><img style="width: 70px" src="./assets/camera.png" alt="" />
          <p class="text-h4 hidden-xs">MovieStudio</p>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="4" lg="2" sm="3" class="">
          <v-icon
            class="ic"
            color="primary"
            style="cursor: pointer; translate: 0px 21px; transition: 0.5s"
            @click="this.dia = true"
            >mdi-magnify</v-icon
          >
        </v-col>
      </v-row>
    </v-app-bar>
    <v-bottom-navigation style="height: 40px" class="bg-red">
      <v-btn to="/" style="font-size: 17px" color="primary">
        <v-tooltip location="top" color="grey" activator="parent">
          view all Movies </v-tooltip
        ><v-icon>mdi-home </v-icon></v-btn
      >
      <v-btn to="/person" style="font-size: 17px" color="primary">
        <v-tooltip location="top" color="grey" activator="parent">
          view all Actors
        </v-tooltip>
        <v-icon>mdi-account </v-icon></v-btn
      >
    </v-bottom-navigation>
  </v-layout>
  <router-view />
  <v-dialog
    class="pa-4"
    v-model="dia"
    width="500"
    transition="dialog-transition"
  >
    <v-card>
      <v-text-field
        @keyup="this.dat = false"
        name="name"
        label="Search..."
        id="id"
        v-model="query"
      ></v-text-field>

      <v-btn v-if="this.sr" color="success" @click="this.dat = true">search</v-btn>
      <ul style="padding: 10px" v-if="this.query != '' && this.dat == true">
        <li v-for="item in filteredResults" :key="item.id">
          <v-btn
            @click="this.dia = false"
            :to="`/movie/${item.id}`"
            color="success"
            variant="text"
            >{{ item.original_title }}</v-btn
          >
        </li>
      </ul></v-card
    >
  </v-dialog>
</template>
<style scoped>
.ic:hover {
  transform: rotate(360deg);
}
</style>
<script>
import axios from "axios";
export default {
  data: function () {
    return {
      arr: [],
      pop: [],
      mov: [],
      query: "",
      dia: false,
      dat: false,
      sr: false,
    };
  },
  async mounted() {
    for (let i = 0; i < 500; i++) {
      await axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-us&page=${
            i + 1
          }`,
        )
        .then((res) => {
          this.arr = res.data.results;
          this.pop.push(this.arr);
        });
    }
    for (let i = 0; i < 500; i++) {
      for (let j = 0; j < 20; j++) {
        this.mov.push(this.pop[i][j]);
      }
    }
    console.log(this.mov);
    this.sr=true
  },
  methods: {},
  computed: {
    filteredResults() {
      return this.mov.filter((item) =>
        item.original_title.toLowerCase().includes(this.query),
      );
    },
  },
};
</script>
