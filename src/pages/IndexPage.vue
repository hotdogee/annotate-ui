<template>
  <q-page padding>
    <div class="hero-section">
      <div class="content-container">
        <div class="logo-container">
          <img class="logo" alt="ANNotate logo" src="~assets/annotate-logo-large.png" />
        </div>
        <div class="hero-text">
          <h1 class="text-h2 text-weight-medium q-mb-md">ANNoate</h1>
          <p class="text-subtitle1 text-grey-8">
            Discover protein domains using our state-of-the-art neural network model. Simply paste
            your protein sequence below to get started.
          </p>
        </div>
      </div>
    </div>

    <div class="search-container">
      <q-card flat bordered class="search-card">
        <q-card-section>
          <search-input v-model:seq="seq"></search-input>
        </q-card-section>
      </q-card>
    </div>

    <div class="features-section">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-sm-4">
          <q-card flat bordered class="feature-card">
            <q-card-section>
              <div class="text-h6 text-primary q-mb-sm">
                <q-icon name="bolt" size="sm" class="q-mr-sm" />
                Fast Results
              </div>
              <p class="text-body2 text-grey-8">
                Get domain predictions in seconds using our optimized neural network model.
              </p>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-4">
          <q-card flat bordered class="feature-card">
            <q-card-section>
              <div class="text-h6 text-primary q-mb-sm">
                <q-icon name="precision_manufacturing" size="sm" class="q-mr-sm" />
                High Accuracy
              </div>
              <p class="text-body2 text-grey-8">
                Advanced deep learning architecture trained on extensive protein databases.
              </p>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-4">
          <q-card flat bordered class="feature-card">
            <q-card-section>
              <div class="text-h6 text-primary q-mb-sm">
                <q-icon name="insights" size="sm" class="q-mr-sm" />
                Visual Results
              </div>
              <p class="text-body2 text-grey-8">
                Interactive visualization of predicted domains and their confidence scores.
              </p>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchInput from 'components/SearchInput.vue'

const seq = ref('')
</script>

<style lang="scss">
.hero-section {
  padding: 2rem 0;
  background: linear-gradient(135deg, rgba(32, 91, 19, 0.05) 0%, rgba(32, 91, 19, 0.1) 100%);
  border-radius: 8px;
  margin-bottom: 2rem;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
}

.logo-container {
  display: flex;
  justify-content: center;
}

.logo {
  max-width: 100%;
  height: auto;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.hero-text {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.search-container {
  max-width: 1000px;
  margin: 0 auto 3rem;
  padding: 0 1rem;
}

.search-card {
  border-radius: 8px;
  transition: all 0.3s ease;
  background: white;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
}

.features-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.feature-card {
  height: 100%;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: white;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
}
</style>
