<template>
  <section id="portafolio" class="portfolio">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">PERFUMES DESTACADOS</h2>
      </div>

      <div class="portfolio-grid">

        <div class="portfolio-item" v-for="(item, i) in items" :key="i">
          <div class="portfolio-image">
            <img :src="item.img" :alt="item.title">

            <div class="portfolio-overlay">
              <div class="portfolio-content">
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>

                <div class="portfolio-links">
                  <a href="#" class="portfolio-link">
                    <i class="fas fa-external-link-alt"></i>
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
const items = [
  {
    img: '../assets/img/WSd.webp',
    title: 'Perfume Valentino',
    description: 'Born in Roma Uomo Yellow EDT 100 ml'
  },
  {
    img: '../assets/img/wv.webp',
    title: 'Perfume Valentino',
    description: 'Born in Roma Uomo EDT 100 ml'
  },
  {
    img: '../assets/img/SDL.webp',
    title: 'Perfume Valentino',
    description: 'Extradose Donna EDP 100 ml'
  },
  {
    img: '../assets/img/XSL.webp',
    title: 'Perfume Valentino',
    description: 'Born in Roma Intense Donna EDP 100 ml'
  }
]
</script>
