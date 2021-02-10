<template>
  <q-layout view="lHh lpr lff" >
    <Particles
      id="tsparticles"
      class="fixed-full"
      :options='particleOption' />
    <q-page-container>
      <router-view />
    </q-page-container>


  </q-layout>
</template>

<script>

export default {
  name: 'AuthLayout',
  data () {
    return {
      // С партиклами работал в 1 раз. Все что есть описано в документации
      particleOption:{
        background: {
          image:
            "url('https://c4.wallpaperflare.com/wallpaper/277/354/502/feelsbadman-pepe-meme-memes-wallpaper-preview.jpg')",
          position: "center",
          size: "100% 100%"
        },
        fpsLimit: 120,
        particles: {
          number: {
            value: 75,
          },
          color: {
            value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"]
          },
          shape: {
            image: {
              src:
                "https://emoji.gg/assets/emoji/9716_Pepega.png",
            },

            type: "image"
          },
          opacity: {
            value: 1
          },
          size: {
            value: 32
          },
          line_linked: {
            enable: false,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
          },
          collisions: {
            enable: true
          },
          move: {
            enable: true,
            speed: 8,
            direction: "none",
            random: false,
            straight: false,
            outMode: "bounce",
            bounce: false,
            warp: false,
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onHover: {
              enable: true,
              mode: "repulse"
            },
            resize: true
          }
        },
        detectRetina: true,
        pauseOnBlur: true
      }
      // Тут конец
    }
  },
  created() {
    this.updatePepega()
  },
  methods:{
    // Адаптация пепег под разные экраны
    updatePepega(){
      if (this.$q.screen.xs || this.$q.screen.sm){
        this.particleOption.particles.number.value = 10;
      }
    },
  },
}
</script>
