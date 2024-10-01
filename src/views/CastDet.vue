<template>
  <v-app class="cast">
    <v-row>
      <v-col cols="12" sm="12" md="8" lg="6">
        <img
          style="width: 80%; height: 500px"
          :src="this.img + '' + cast.profile_path"
          alt=""
        />
      </v-col>
      <v-col lg="6">
        <h1 class="text-primary">{{ cast.name }}</h1>
        <p class="mt-4">{{ cast.biography }}</p>
        <div style="display: flex; align-items: center">
          <p
            style="font-size: 20px !important"
            class="mt-4 text-orange text-button"
          >
            {{ cast.birthday }}
          </p>
          <p class="text-button ml-4" style="translate: 0 9px">
            {{ cast.place_of_birth }}
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="4" v-for="mov1 in mov" :key="mov1">
        <v-card :to="`/movie/${mov1.id}`" style="overflow: hidden">
          <img
            class="img"
            style="
              width: 100%;
              height: 400px;
              transition: 0.3s;
              cursor: pointer;
            "
            :src="this.img + '' + mov1.backdrop_path"
            alt=""
          />
          <v-card-title class="text-primary" primary-title>{{
            mov1.original_title
          }}</v-card-title>

          <v-card-text
            ><p class="text-orange">lang: {{ mov1.original_language }}</p>
          </v-card-text>
          <v-rating
            readonly
            length="10"
            size="x-small"
            density="cobact"
            v-model="mov1.vote_average"
            half-increments
          ></v-rating>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<style scoped>
.cast {
  padding: 8% 2% 10% 6%;
}
</style>

<script>
import axios from "axios";
export default {
  name: "MovieDet",
  async mounted() {
    await axios
      .get(
        `https://api.themoviedb.org/3/person/${this.id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`,
      )
      .then((res) => (this.cast = res.data));
    await axios
      .get(
        `https://api.themoviedb.org/3/person/${this.id}/movie_credits?api_key=4e44d9029b1270a757cddc766a1bcb63`,
      )
      .then((res) => (this.mov = res.data.cast));
    console.log(this.cast);
  },
  data: function () {
    return {
      cast: {},
      id: this.$route.params.id,
      img: "https://image.tmdb.org/t/p/original/",
      mov: [],
    };
  },
};
</script>
