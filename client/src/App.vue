<template>
  <v-app style="margin-right: 50px; margin-left: 50px">
    <div class="d-flex justify-center">
      <h1 id="addTodo">Room Manager</h1>
    </div>
    <v-data-iterator :items="room" hide-default-footer :search="search">
      <template v-slot:default="props">
        <v-text-field v-model="search" label="search"></v-text-field>
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="5"
            md="14"
            lg="3"
          >
            <v-card
              v-if="timeCheck(item.updatedAt) == 'Libre'"
              style="max-width: 300px; min-height: 400px"
            >
              <v-card-title>{{ item.name }}</v-card-title>
              <v-card-text>Description: {{ item.description }}</v-card-text>
              <v-card-text>Capacité: {{ item.capacity }}</v-card-text>
              <v-card-text>Equipements: </v-card-text>
              <div>
                <v-card-text
                  v-for="i in item.equipements"
                  :key="i.name"
                  style="padding-top: 5px; padding-bottom: 5px"
                  >{{ i.name }}</v-card-text
                >
              </div>
              <v-card-text
                >Disponibilité: {{ timeCheck(item.updatedAt) }}
                <span class="dot" style="background-color: #4caf50"></span
              ></v-card-text>
              <div class="d-flex justify-center">
                <v-btn @click="bookARoom(item._id)" color="primary"
                  >Réserver</v-btn
                >
              </div>
            </v-card>
            <v-card v-else style="max-width: 300px; min-height: 400px">
              <v-card-title>{{ item.name }}</v-card-title>
              <v-card-text>Description: {{ item.description }}</v-card-text>
              <v-card-text>Capacité: {{ item.capacity }}</v-card-text>
              <v-card-text>Equipements: </v-card-text>
              <div>
                <v-card-text
                  v-for="i in item.equipements"
                  :key="i.name"
                  style="padding-top: 5px; padding-bottom: 5px"
                  >{{ i.name }}</v-card-text
                >
              </div>
              <v-card-text
                >Disponibilité: {{ timeCheck(item.updatedAt) }}
                <span class="dot" style="background-color: #ff5252"></span
              ></v-card-text>
              <div class="d-flex justify-center">
                <v-btn
                  :disabled="!!bookARoom"
                  @click.prevent="bookARoom(item._id)"
                  color="primary"
                  >Réserver</v-btn
                >
              </div>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    room: [],
    search: "",
    roomId: "",
  }),
  mounted() {
    axios.get("http://localhost:3000/rooms/").then((response) => {
      this.room = response.data;
      console.log(response);
      return response;
    });
  },
  methods: {
    timeCheck(updatedAt) {
      const timeElapsed = Date.now();
      const currentTime = new Date(timeElapsed).toISOString();

      if (currentTime > updatedAt) {
        return "Libre";
      } else {
        return "Occupé";
      }
    },

    bookARoom(roomId) {
      axios
        .patch(`http://localhost:3000/rooms/${roomId}`, {
          createdAt: Date.now(),
          updatedAt: Date.now() + 200000,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => console.log(error));
    },
    addARoom() {
      axios
        .post("http://localhost:3000/rooms", {
          todo: this.newTodo,
        })
        .then((response) => {
          this.message = response.data;
        });
    },
  },
};
</script>

<style>
.dot {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: inline-block;
}
</style>
