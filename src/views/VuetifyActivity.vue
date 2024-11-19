<template>
    <a-flex gap="middle">
        <v-card max-width="344" title="Word of the Day" subtitle="el·ee·mos·y·nar·y" text="relating to or dependent on charity; charitable; charitable donations. Pertaining to alms.<br>
                    an eleemosynary educational institution.">
            <v-card-actions>
                <v-btn color="teal-accent-4" text="Learn More" variant="text" @click="reveal = true"></v-btn>
            </v-card-actions>
            <v-expand-transition>
                <v-card v-if="reveal" class="position-absolute w-100" height="100%" style="bottom: 0;">
                    <v-card-text class="pb-0">
                        <p class="text-h4">Origin</p>

                        <p class="text-medium-emphasis">
                            late 16th century (as a noun denoting a place where alms were distributed): from medieval
                            Latin
                            eleemosynarius, from late Latin eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’
                        </p>
                    </v-card-text>

                    <v-card-actions class="pt-0">
                        <v-btn color="teal-accent-4" text="Close" variant="text" @click="reveal = false"></v-btn>
                    </v-card-actions>
                </v-card>
            </v-expand-transition>
        </v-card>
        <v-card max-width="500">
            <v-container fluid>
                <v-row dense>
                    <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
                        <v-card>
                            <v-img :src="card.src" height="200px" cover>
                                <v-card-title class="text-white" v-text="card.title"></v-card-title>
                            </v-img>

                            <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn color="medium-emphasis" icon="mdi-heart" size="small"></v-btn>

                                <v-btn color="medium-emphasis" icon="mdi-bookmark" size="small"></v-btn>

                                <v-btn color="medium-emphasis" icon="mdi-share-variant" size="small"></v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </a-flex>
</template>

<script>
import { ref } from 'vue';



export default {
    name: 'UserActivity',
    data() {
        return {
            reveal: ref(false),
            cards: [
                { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
                { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
                { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
            ]
        }
    },
    created() {

    },

    methods: {

    }

}
</script>

<style></style>