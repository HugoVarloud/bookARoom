<template>
  <v-app style="margin-right: 50px; margin-left: 50px">
    <div class="d-flex justify-center">
      <h1 id="addTodo">Room Manager</h1>
    </div>

    <v-data-iterator :items="room" hide-default-footer :search="search">
      <template v-slot:default="props">
        <v-text-field v-model="search" label="search"></v-text-field>

        <v-row justify="center">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Ajouter une Salle de réunion</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Titre"
                        v-model="titre"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Description"
                        v-model="description"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="capacite"
                        :items="[5, 10, 11, 26]"
                        label="Capacité"
                        required
                      ></v-select>
                    </v-col>

                    <v-col cols="12" sm="6">

                      <v-autocomplete
                        v-model="equipements"
                        :items="select"
                        dense
                        chips
                        small-chips
                        label="Solo"
                        multiple
                      ></v-autocomplete>

                    </v-col>




                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">
                  Close
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="(dialog = false), addARoom()"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>

        <v-row style="margin-top: 30px;">
          <v-col
            v-for="(item, index) in props.items"
            :key="index"
            cols="12"
            sm="5"
            md="14"
            lg="3"
          >
            <v-card
              v-if="timeCheck(item.updatedAt) == 'Libre'"
              style="max-width: 300px; min-height: 415px"
            >
              <div style="display: flex; float: right;">
                <v-btn icon @click="deleteRoom(item._id)"
                  ><v-icon>mdi-close</v-icon></v-btn
                >
              </div>

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
                <span class="dot" style="background-color: #4caf50"></span>
              </v-card-text>
              <div class="d-flex justify-center">
                <v-btn @click="bookARoom(item._id)" color="primary">
                  Réserver
                </v-btn>
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
                >Disponibilité: {{ timeCheck(item.updatedAt)
                }}<span class="dot" style="background-color: #ff5252"></span
              ></v-card-text>
              <div class="d-flex justify-center">
                <v-btn
                  :disabled="!!bookARoom"
                  @click.prevent="bookARoom(item._id)"
                  color="primary"
                  >Réserver
                </v-btn>
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
    dialog: false,
    titre: "",
    description: "",
    capacite: "",
    select: ['TV', 'Retro Projecteur'],
    equipements: [],
    eqp: [],
  }),
  mounted() {
    axios.get("http://localhost:3000/rooms/").then((response) => {
      this.room = response.data;
      console.log(response);
      return response;
    });
  },
  methods: {
    deleteRoom(roomId) {
      axios.delete(`http://localhost:3000/rooms/${roomId}`);
    },
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
      for(let i=0; i<this.equipements.length;i++){
        this.eqp.push({ "name": this.equipements[i] });
      }
      axios
        .post("http://localhost:3000/rooms", {
          name: this.titre,
          description: this.description,
          capacity: this.capacite,
          equipements: this.eqp,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        })
        .then((response) => {
          console.log(response);
        });
        this.eqp = []
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
