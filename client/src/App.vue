<template>
  <v-app style="margin-right: 50px; margin-left: 50px">
    <div class="d-flex justify-center">
      <h1 id="addTodo">Room Manager</h1>
    </div>
    <!-- <div class="d-flex justify-center">
      <v-col cols="6" style="margin: 0px auto">
        <v-text-field v-model="newTodo" label="Room's Name" solo></v-text-field>
      </v-col>
    </div> -->

    <v-data-iterator :items="room" hide-default-footer :search="search">
      <template v-slot:default="props">
        <v-text-field v-model="search" label="search"> </v-text-field>
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="5"
            md="14"
            lg="3"
          >
            <v-card style="max-width: 300px; min-height: 400px">
              <v-card-title>{{ item.name }}</v-card-title>
              <v-card-text>Description: {{ item.description }}</v-card-text>
              <v-card-text>Capacité: {{ item.capacity }}</v-card-text>
              <v-card-text>Equipements: </v-card-text>
              <div style="margin-bottom: 10px">
                <v-card-text
                  v-for="i in item.equipements"
                  :key="i.name"
                  style="padding-top: 5px"
                >
                  {{ i.name }}
                </v-card-text>
              </div>
              <div class="d-flex justify-center">
                <v-btn @click="bookARoom(item._id)" color="primary"
                  >Add A Room</v-btn
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
      // console.log(response)
      return response;
    });
  },
  methods: {
    bookARoom(roomId) {
      axios
        .patch(`http://localhost:3000/rooms/${roomId}`,{
          "name": "Salle #1"
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
