<template>
  <v-app class="det">
    <v-progress-linear
      color="primary"
      :indeterminate="true"
      v-if="this.prog"
      height="50"
    ></v-progress-linear>
    <v-row>
      <v-col cols="12" sm="12" md="8" lg="8">
        <img
          style="width: 100%; height: 500px"
          :src="this.img + '' + mov.backdrop_path"
          alt=""
        />
      </v-col>
      <v-col lg="4">
        <h1 class="text-primary">{{ mov.original_title }}</h1>
        <ul style="list-style: none">
          TYPE: &nbsp;
          <li
            class="text-orange-darken-4"
            style="display: inline"
            v-for="gen in mov.genres"
            :key="gen"
          >
            {{ gen.name + ", " }}
          </li>
        </ul>
        <p style="display: inline" class="text-h5">Orginal Website: &nbsp;</p>
        <a
          style="display: inline; text-decoration: none"
          :href="mov.homepage"
          target="_blank"
        >
          <v-btn variant="outlined" color="success">VEIW</v-btn>
        </a>
        <p class="mt-4">{{ mov.overview }}</p>
        <br />
        <p style="display: inline" class="text-red">Country:</p>
        &nbsp;
        <span v-for="cn in mov.origin_country" :key="cn"> {{ cn }} </span>
        <div style="display: flex; align-items: center">
          <img
            v-for="im in mov.production_companies"
            :src="this.img + '' + im.logo_path"
            :key="im"
            alt=""
            style="width: 100px"
          />
        </div>
        <div
          v-if="this.key != ''"
          class="mt-5"
          style="display: flex; align-items: center"
        >
          <p>view treiler of movie</p>
          <v-btn @click="this.youtube = true" class="ml-5" color="red">
            <v-icon style="font-size: 30px !important">mdi-play</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-dialog
      class="pa-4"
      v-model="youtube"
      width="500"
      transition="dialog-transition"
    >
      <iframe
        width="100%"
        height="315"
        :src="`https://www.youtube.com/embed/${this.key}`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </v-dialog>
    <v-row class="mt-lg-10 mt-xl-13">
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="cast in this.casts"
        :key="cast"
      >
        <v-card :to="`/casts/${cast.id}`" variant="tonal">
          <v-card-title primary-title> {{ cast.original_name }} </v-card-title>
          <img
            style="width: 100%; height: 300px; cursor: pointer"
            :src="this.img + '' + cast.profile_path"
            alt=""
          />
        </v-card>
      </v-col>
    </v-row>
    <swiper
      :pagination="{
        type: 'progressbar',
      }"
      :navigation="true"
      :modules="modules"
      class="mySwiper mt-lg-10"
      :autoplay="true"
    >
      <swiper-slide style="width: 100%" v-for="img in this.photos" :key="img">
        <img :src="this.img + '' + img.file_path" alt="" />
      </swiper-slide>
    </swiper>
  </v-app>
</template>

<style scoped>
.det {
  padding: 7% 3%;
}
@media (max-width: 1070px) {
  .det {
    padding: 12% 2%;
  }
}
@media (max-width: 500px) {
  .det {
    padding-top: 15%;
  }
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.swiper {
  width: 60%;
  height: 100%;
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
import { EffectCube, Pagination, Autoplay } from "swiper/modules";
import axios from "axios";
export default {
  name: "MovieDet",
  async mounted() {
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`,
      )
      .then((res) => (this.mov = res.data));
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.id}/videos?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`,
      )
      .then((res) => {
        if (res.data.results != "") {
          this.key = res.data.results[0].key;
        } else {
          this.key = "";
        }
      });
    console.log(this.key);
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.id}/credits?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`,
      )
      .then((res) => {
        this.casts = res.data.cast;
        console.log(res.data);
      });
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.id}/images?api_key=4e44d9029b1270a757cddc766a1bcb63`,
      )
      .then((res) => (this.photos = res.data.backdrops));
    this.prog = false;
  },
  data: function () {
    return {
      mov: {},
      id: this.$route.params.id,
      img: "https://image.tmdb.org/t/p/original/",
      key: "",
      youtube: false,
      casts: [],
      photos: [],
      prog: true,
    };
  },
  setup() {
    return {
      modules: [EffectCube, Pagination, Autoplay],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  watch: {
    $route() {
      location.reload();
    },
  },
  methods: {
    get: async function () {
      await axios
        .get(
          `https://api.themoviedb.org/3/movie/${this.id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`,
        )
        .then((res) => (this.mov = res.data));
      await axios
        .get(
          `https://api.themoviedb.org/3/movie/${this.id}/videos?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`,
        )
        .then((res) => {
          if (res.data.results[0].key != null) {
            this.key = res.data.results[0].key;
          }
        });
      console.log(this.key);
      await axios
        .get(
          `https://api.themoviedb.org/3/movie/${this.id}/credits?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`,
        )
        .then((res) => {
          this.casts = res.data.cast;
          console.log(res.data);
        });
      await axios
        .get(
          `https://api.themoviedb.org/3/movie/${this.id}/images?api_key=4e44d9029b1270a757cddc766a1bcb63`,
        )
        .then((res) => (this.photos = res.data.backdrops));
      this.prog = false;
    },
  },
};
</script>
