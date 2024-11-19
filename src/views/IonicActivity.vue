<template>
    <v-app>
        <v-app-bar :elevation="8" title="Application Bar">
            <template v-slot:prepend>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </template>
        </v-app-bar>
        <a-flex gap="middle" vertical>

            <v-card class="mx-auto" max-width="400">
                <v-img color="surface-variant" height="200"
                    src="https://cdn.vuetifyjs.com/docs/images/cards/purple-flowers.jpg" cover>
                    <v-toolbar color="transparent">
                        <template v-slot:prepend>
                            <v-btn icon="$menu"></v-btn>
                        </template>

                        <v-toolbar-title class="text-h6" text="Messages"></v-toolbar-title>

                        <template v-slot:append>
                            <v-btn icon="mdi-dots-vertical"></v-btn>
                        </template>
                    </v-toolbar>
                </v-img>

                <v-card-text>
                    <div class="font-weight-bold ms-1 mb-2">Today</div>

                    <v-timeline align="start" density="compact">
                        <v-timeline-item v-for="message in messages" :key="message.time" :dot-color="message.color"
                            size="x-small">
                            <div class="mb-4">
                                <div class="font-weight-normal">
                                    <strong>{{ message.from }}</strong> @{{ message.time }}
                                </div>

                                <div>{{ message.message }}</div>
                            </div>
                        </v-timeline-item>
                    </v-timeline>
                </v-card-text>
            </v-card>
        </a-flex>
        <v-layout class="overflow-visible" style="height: 56px;">
            <v-bottom-navigation v-model="value" color="primary" grow>
                <v-btn>
                    <v-icon>mdi-history</v-icon>
                    Recents
                </v-btn>
                <v-btn>
                    <v-icon>mdi-heart</v-icon>
                    Favorites
                </v-btn>
                <v-btn>
                    <v-icon>mdi-map-marker</v-icon>
                    <span>Nearby</span>
                </v-btn>
            </v-bottom-navigation>
        </v-layout>
    </v-app>
</template>

<script>
import { VAppBarNavIcon } from 'vuetify/lib/components/index.mjs';


export default {
    components: { VAppBarNavIcon },
    data() {
        return {
            value: '0',
            messages: [
                {
                    from: 'You',
                    message: `Sure, I'll see you later.`,
                    time: '10:42am',
                    color: 'deep-purple-lighten-1',
                },
                {
                    from: 'John Doe',
                    message: 'Yeah, sure. Does 1:00pm work?',
                    time: '10:37am',
                    color: 'green',
                },
                {
                    from: 'You',
                    message: 'Did you still want to grab lunch today?',
                    time: '9:47am',
                    color: 'deep-purple-lighten-1',
                },
            ],
        }
    },
    created() {

    },

    methods: {

    }

}
</script>

<style></style>