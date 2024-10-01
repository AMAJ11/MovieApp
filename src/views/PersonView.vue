<template>
  <v-app class="per">
    <v-card>
      <v-text-field
        @keyup="this.dat = false"
        name="name"
        label="Search..."
        id="id"
        v-model="query"
      ></v-text-field>

      <v-btn v-if="this.sr" color="success" @click="this.dat = true"
        >search</v-btn
      >
      <ul style="padding: 10px" v-if="this.query != '' && this.dat == true">
        <li v-for="item in filteredResults" :key="item">
          <v-btn :to="`/casts/${item.id}`" color="success" variant="text">{{
            item.name
          }}</v-btn>
        </li>
      </ul></v-card
    >
    <div
      class="mt-1 mb-3"
      style="display: flex; align-items: center; justify-content: center"
    >
      <v-icon
        style="cursor: pointer"
        color="primary"
        @click="page != 1 ? this.page-- : false"
        >mdi-arrow-left</v-icon
      >
      <p class="mx-5">{{ this.page }}</p>
      <v-icon style="cursor: pointer" color="primary" @click="this.page++"
        >mdi-arrow-right</v-icon
      >
    </div>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="4"
        v-for="person in pop[this.page]"
        :key="person"
      >
        <v-card :to="`/casts/${person.id}`" style="overflow: hidden">
          <v-card-title class="text-primary" primary-title>{{
            person.name
          }}</v-card-title>
          <img
            class="img"
            style="
              width: 100%;
              height: 400px;
              transition: 0.3s;
              cursor: pointer;
            "
            :src="this.img + '' + person.profile_path"
            alt=""
          />
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<style scoped>
.per {
  padding: 10% 5%;
}
@media (max-width: 900px) {
  .per {
    padding-top: 20%;
    padding-bottom: 20%;
  }
}
</style>

<script>
import axios from "axios";
export default {
  name: "PersonView",
  async mounted() {
    for (let i = 0; i < 500; i++) {
      await axios
        .get(
          `https://api.themoviedb.org/3/person/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-us&page=${
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
        this.casts.push(this.pop[i][j]);
      }
    }
    console.log(this.pop);
    this.sr = true;
  },
  data: function () {
    return {
      arr: [],
      casts:[],
      pop: [],
      page: 1,
      img: "https://image.tmdb.org/t/p/original",
      query: "",
      dat: false,
      sr: false,
    };
  },
  computed: {
    filteredResults() {
      return this.casts.filter((item) =>
        item.name.toLowerCase().includes(this.query),
      );
    },
  },
};
</script>
