<template>
  <div class="home">
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
        v-for="mov in pop[this.page]"
        :key="mov"
      >
        <v-card :to="`/movie/${mov.id}`" style="overflow: hidden">
          <img
            class="img"
            style="
              width: 100%;
              height: 400px;
              transition: 0.3s;
              cursor: pointer;
            "
            :src="this.img + '' + mov.backdrop_path"
            alt=""
          />
          <v-card-title class="text-primary" primary-title>{{
            mov.original_title
          }}</v-card-title>

          <v-card-text
            ><p class="text-orange">lang: {{ mov.original_language }}</p>
          </v-card-text>
          <v-rating
            readonly
            length="10"
            size="x-small"
            density="cobact"
            v-model="mov.vote_average"
            half-increments
          ></v-rating>
        </v-card>
      </v-col>
    </v-row>

    <div class="upcom mt-10">
      <p
        class="text-button"
        style="text-align: center; font-size: 25px !important"
      >
        Recommended For you
      </p>
      <!-- <swiper
        :autoplay="true"
        :effect="'cube'"
        :grabCursor="true"
        :EffectCoverflow="{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }"
        :pagination="{ clickable: true }"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide class="mb-5" v-for="mov in upcom" :key="mov">
          <p
            class="text-h4 text-white bg-red"
            style="cursor: pointer"
            :to="`/movie/${mov.id}`"
          >
            {{ mov.original_title }}
          </p>
          <img style="height: 100%" :src="this.img + '' + mov.backdrop_path" />
        </swiper-slide>
      </swiper> -->
      <swiper
        :pagination="{
          type: 'progressbar',
        }"
        :navigation="true"
        :modules="modules"
        class="swiper mt-lg-10"
        :autoplay="true"
      >
        <swiper-slide
          style="width: 100%;"
          v-for="mov in upcom"
          :key="mov"
        >
          <router-link :to="`/movie/${mov.id}`" style="text-decoration: none; "
            ><h2 class="bg-primary">{{ mov.original_title }}</h2></router-link
          >
          <img :src="this.img + '' + mov.backdrop_path" alt="" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: 10% 5%;
}

.swiper {
  width: 60%;
  height: 55vh;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
}

@media (max-width: 800px) {
  .swiper {
    width: 85%;
  }
}
.img:hover {
  scale: 1.1;
  rotate: -1deg;
}
@media (max-width: 900px) {
  .home {
    padding-top: 20%;
    padding-bottom: 20%;
  }
}
@media (max-width: 1000px) {
  .swiper {
    height: 70vh;
  }
}
</style>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/effect-cube";
import "swiper/css/pagination";
// import required modules
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
// @ is an alias to /src
import axios from "axios";

export default {
  name: "HomeView",
  components: {},
  methods: {
    setlocal: function () {},
  },

  async created() {
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
    await axios
      .get(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=1",
      )
      .then((res) => {
        this.upcom = res.data.results;
        console.log(res);
      });
  },
  data: function () {
    return {
      pop: [],
      arr: [],
      upcom: [],
      img: "https://image.tmdb.org/t/p/original",
      page: 1,
    };
  },
  setup() {
    return {
      modules: [EffectCoverflow, Pagination, Autoplay],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>
