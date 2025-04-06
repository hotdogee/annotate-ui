<template>
  <div class="min-h-screen bg-background">
    <!-- Hero Section -->
    <section
      class="relative bg-gradient-to-b from-emerald-50 to-background py-16 pt-20 md:py-24 dark:from-emerald-950 dark:to-background"
    >
      <div class="container mx-auto px-4 md:px-6">
        <div class="grid items-center gap-6 max-lg:text-center lg:grid-cols-2 xl:px-24">
          <div class="space-y-4">
            <div
              class="inline-flex items-center rounded-lg bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
            >
              Deep Learning for Protein Analysis
            </div>
            <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              ANNotate Project
            </h1>
            <p class="text-muted-foreground md:text-xl/relaxed lg:max-w-[600px]">
              Design and Implementation of Recurrent Neural Network Models for Function and
              Structure Prediction of Protein Sequences
            </p>
          </div>
          <div class="flex justify-center lg:justify-end">
            <div
              class="relative flex h-[300px] w-[300px] items-center justify-center overflow-hidden rounded-lg bg-emerald-100 md:h-[400px] md:w-[400px] dark:bg-emerald-900"
            >
              <img src="~assets/about-illustration-1.jpg" alt="About Page Illustration" />
              <div
                class="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent dark:from-emerald-400/20"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Introduction -->
    <section class="pb-12">
      <div class="container mx-auto px-4 md:px-6">
        <div class="mx-auto max-w-3xl space-y-4 text-center">
          <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">Project Overview</h2>
          <p class="text-muted-foreground md:text-xl/relaxed">
            ANNotate is a deep learning-based system for protein function prediction, specifically
            designed to identify Pfam domains in protein sequences with high accuracy and
            performance
          </p>
        </div>
        <div class="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
          <div class="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
            <div class="rounded-full bg-emerald-100 p-3 dark:bg-emerald-900">
              <Brain class="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 class="text-xl font-bold">Deep Learning</h3>
            <p class="text-center text-sm text-muted-foreground">
              Employs a hierarchical architecture combining convolutional and recurrent neural
              networks to capture both local amino acid patterns and long-range dependencies in
              protein sequences.
            </p>
          </div>
          <div class="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
            <div class="rounded-full bg-emerald-100 p-3 dark:bg-emerald-900">
              <Cpu class="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 class="text-xl font-bold">High Performance</h3>
            <p class="text-center text-sm text-muted-foreground">
              Processes protein sequences 100 times faster than traditional HMMER-based tools like
              PfamScan, enabling rapid analysis of large-scale proteomic data.
            </p>
          </div>
          <div class="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
            <div class="rounded-full bg-emerald-100 p-3 dark:bg-emerald-900">
              <Microscope class="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 class="text-xl font-bold">Intuitive Visualization</h3>
            <p class="text-center text-sm text-muted-foreground">
              Experience an easy-to-use interface with interactive charts, making in-depth protein
              function prediction accessible to all researchers.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Model Architecture -->
    <section class="bg-muted py-12 md:py-16 lg:py-20">
      <div class="container mx-auto px-4 md:px-6">
        <div class="mx-auto max-w-3xl space-y-4 text-center">
          <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">Model Architecture</h2>
          <p class="text-muted-foreground md:text-xl/relaxed">
            ANNotate employs a sophisticated neural network architecture specifically designed for
            protein sequence analysis
          </p>
        </div>
        <div class="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
          <div class="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
            <div class="flex items-center space-x-3">
              <div class="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900">
                <Layers class="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 class="text-xl font-bold">Multi-Scale Convolutional Features</h3>
            </div>
            <div class="text-sm text-muted-foreground">
              15 parallel convolutional layers with increasing kernel sizes (1-29) capture local
              sequence motifs at different resolutions simultaneously.
            </div>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li class="flex items-start">
                <ChevronRight class="mr-2 h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                <span>32 filters per convolutional layer</span>
              </li>
              <li class="flex items-start">
                <ChevronRight class="mr-2 h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                <span>Batch normalization and ReLU activation</span>
              </li>
              <li class="flex items-start">
                <ChevronRight class="mr-2 h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                <span>Dropout regularization (20%)</span>
              </li>
              <li class="flex items-start">
                <ChevronRight class="mr-2 h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                <span>Residual Connections</span>
              </li>
            </ul>
          </div>
          <div class="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
            <div class="flex items-center space-x-3">
              <div class="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900">
                <Network class="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 class="text-xl font-bold">Bidirectional Recurrent Layers</h3>
            </div>
            <div class="text-sm text-muted-foreground">
              Quad stacked bidirectional GRU layers process sequences in both forward and reverse
              directions to capture long-range dependencies.
            </div>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li class="flex items-start">
                <ChevronRight class="mr-2 h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                <span>512 units per layer in each direction</span>
              </li>
              <li class="flex items-start">
                <ChevronRight class="mr-2 h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                <span>Incorporates context from both preceding and following amino acids</span>
              </li>
              <li class="flex items-start">
                <ChevronRight class="mr-2 h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                <span>Highway network for improved gradient flow</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="mx-auto mt-8 max-w-5xl">
          <div class="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
            <div class="flex items-center space-x-3">
              <div class="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900">
                <BarChart3 class="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 class="text-xl font-bold">Model Statistics</h3>
            </div>
            <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div class="rounded-lg bg-muted p-4 text-center">
                <p class="text-sm font-medium text-muted-foreground">Total Parameters</p>
                <p class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">31.5M</p>
              </div>
              <div class="rounded-lg bg-muted p-4 text-center">
                <p class="text-sm font-medium text-muted-foreground">Model Size</p>
                <p class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">120.4 MB</p>
              </div>
              <div class="rounded-lg bg-muted p-4 text-center">
                <p class="text-sm font-medium text-muted-foreground">Pfam Classes</p>
                <p class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">16,714</p>
              </div>
              <div class="rounded-lg bg-muted p-4 text-center">
                <p class="text-sm font-medium text-muted-foreground">Speed Improvement</p>
                <p class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">100x</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="mx-auto mt-8 max-w-5xl overflow-hidden rounded-lg bg-white p-4 dark:bg-gray-800"
        >
          <q-carousel
            swipeable
            animated
            arrows
            navigation
            class="aspect-[847/1536]"
            height="100%"
            v-model="slide"
            infinite
            :autoplay="autoplay"
            transition-prev="slide-right"
            transition-next="slide-left"
            @mouseenter="autoplay = false"
            @mouseleave="autoplay = true"
          >
            <q-carousel-slide
              name="architecture"
              img-src="~assets/about-model-architecture-1.jpg"
              class="column no-wrap flex-center"
            />
            <q-carousel-slide
              name="summary"
              img-src="~assets/about-model-summary-1.png"
              class="column no-wrap flex-center"
            />

            <template v-slot:control>
              <q-carousel-control position="bottom-right" :offset="[18, 18]"> </q-carousel-control>
            </template>
          </q-carousel>
        </div>
      </div>
    </section>

    <!-- System Architecture -->
    <section class="py-12 md:py-16 lg:py-20">
      <div class="container mx-auto px-4 md:px-6">
        <div class="mx-auto max-w-3xl space-y-4 text-center">
          <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">System Architecture</h2>
          <p class="text-muted-foreground md:text-xl/relaxed">
            ANNotate leverages modern technologies across its entire technology stack
          </p>
        </div>
        <div class="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          <div class="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
            <div class="flex items-center space-x-3">
              <div class="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900">
                <Code class="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 class="text-xl font-bold">Frontend UI</h3>
            </div>
            <div class="text-sm text-muted-foreground">
              A responsive Single Page Application built with Vue 3 and the Quasar Framework,
              providing an intuitive interface for protein analysis.
            </div>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li class="flex items-start">
                <ChevronRight class="mr-2 h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                <span>Interactive protein sequence visualization</span>
              </li>
              <li class="flex items-start">
                <ChevronRight class="mr-2 h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                <span>Real-time WebSocket communication</span>
              </li>
              <li class="flex items-start">
                <ChevronRight class="mr-2 h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                <span>Responsive design for all devices</span>
              </li>
              <li class="flex items-start">
                <ChevronRight class="mr-2 h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                <span>Deployed on GitHub Pages with GitHub Actions CI/CD</span>
              </li>
            </ul>
          </div>
          <div class="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
            <div class="flex items-center space-x-3">
              <div class="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900">
                <Server class="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 class="text-xl font-bold">Backend API</h3>
            </div>
            <div class="text-sm text-muted-foreground">
              A Feathers.js NodeJS RESTful API service that handles requests, caching, and
              communication with the prediction model.
            </div>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li class="flex items-start">
                <ChevronRight class="mr-2 h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                <span>Efficient caching using sequence hashing</span>
              </li>
              <li class="flex items-start">
                <ChevronRight class="mr-2 h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                <span>Domain mapping for human-readable results</span>
              </li>
              <li class="flex items-start">
                <ChevronRight class="mr-2 h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                <span>MongoDB for data storage and caching</span>
              </li>
              <li class="flex items-start">
                <ChevronRight class="mr-2 h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                <span>Deployed on Google Compute Engine</span>
              </li>
            </ul>
          </div>
          <div class="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
            <div class="flex items-center space-x-3">
              <div class="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900">
                <Database class="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 class="text-xl font-bold">Deep Learning Model</h3>
            </div>
            <div class="text-sm text-muted-foreground">
              TensorFlow GPU-accelerated inference for protein function prediction, delivering
              high-performance analysis.
            </div>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li class="flex items-start">
                <ChevronRight class="mr-2 h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                <span>TensorFlow Serving for model deployment</span>
              </li>
              <li class="flex items-start">
                <ChevronRight class="mr-2 h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                <span>GPU acceleration for fast predictions</span>
              </li>
              <li class="flex items-start">
                <ChevronRight class="mr-2 h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                <span>Scalable architecture for high throughput</span>
              </li>
              <li class="flex items-start">
                <ChevronRight class="mr-2 h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                <span>Deployed on Google Cloud Run with Terraform IaC</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Data Flow -->
    <section class="bg-muted py-12 md:py-16 lg:py-20">
      <div class="container mx-auto px-4 md:px-6">
        <div class="mx-auto max-w-3xl space-y-4 text-center">
          <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">Data Flow</h2>
          <p class="text-muted-foreground md:text-xl/relaxed">
            The ANNotate system processes protein sequences through a streamlined workflow for
            efficient prediction and analysis.
          </p>
        </div>
        <div class="mx-auto mt-12 max-w-4xl">
          <div class="rounded-lg border bg-card p-6 shadow-sm">
            <div class="relative">
              <div
                class="absolute top-0 bottom-0 left-9 w-0.5 bg-emerald-200 dark:bg-emerald-800"
              ></div>
              <div class="space-y-8">
                <div class="relative flex items-start">
                  <div
                    class="absolute flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white dark:bg-emerald-500"
                  >
                    1
                  </div>
                  <div class="ml-12 space-y-2">
                    <h3 class="text-lg font-bold">Sequence Submission</h3>
                    <p class="text-sm text-muted-foreground">
                      Client submits a protein sequence via the UI, which is sent to the API server
                      through REST or WebSockets.
                    </p>
                  </div>
                </div>
                <div class="relative flex items-start">
                  <div
                    class="absolute flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white dark:bg-emerald-500"
                  >
                    2
                  </div>
                  <div class="ml-12 space-y-2">
                    <h3 class="text-lg font-bold">Sequence Processing</h3>
                    <p class="text-sm text-muted-foreground">
                      API server validates the sequence format and generates a SHA-256 hash for
                      caching purposes.
                    </p>
                  </div>
                </div>
                <div class="relative flex items-start">
                  <div
                    class="absolute flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white dark:bg-emerald-500"
                  >
                    3
                  </div>
                  <div class="ml-12 space-y-2">
                    <h3 class="text-lg font-bold">Cache Check</h3>
                    <p class="text-sm text-muted-foreground">
                      System checks MongoDB for existing predictions using the hash as a key. If
                      found, returns the stored prediction immediately.
                    </p>
                  </div>
                </div>
                <div class="relative flex items-start">
                  <div
                    class="absolute flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white dark:bg-emerald-500"
                  >
                    4
                  </div>
                  <div class="ml-12 space-y-2">
                    <h3 class="text-lg font-bold">Model Inference</h3>
                    <p class="text-sm text-muted-foreground">
                      If no cached result exists, the sequence is sent to TensorFlow Serving for
                      prediction using the deep learning model.
                    </p>
                  </div>
                </div>
                <div class="relative flex items-start">
                  <div
                    class="absolute flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white dark:bg-emerald-500"
                  >
                    5
                  </div>
                  <div class="ml-12 space-y-2">
                    <h3 class="text-lg font-bold">Result Enrichment</h3>
                    <p class="text-sm text-muted-foreground">
                      Prediction results are enriched with human-readable domain information from
                      the Pfam database.
                    </p>
                  </div>
                </div>
                <div class="relative flex items-start">
                  <div
                    class="absolute flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white dark:bg-emerald-500"
                  >
                    6
                  </div>
                  <div class="ml-12 space-y-2">
                    <h3 class="text-lg font-bold">Visualization</h3>
                    <p class="text-sm text-muted-foreground">
                      Results are returned to the UI for interactive visualization and analysis by
                      the researcher.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Performance -->
    <section class="py-12 md:py-16 lg:py-20">
      <div class="container mx-auto px-4 md:px-6">
        <div class="mx-auto max-w-3xl space-y-4 text-center">
          <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">Performance</h2>
          <p class="text-muted-foreground md:text-xl/relaxed">
            The ANNotate deep learning model achieves significant performance improvements over
            traditional methods.
          </p>
        </div>
        <div class="mx-auto mt-12 max-w-4xl">
          <div class="rounded-lg border bg-card p-6 shadow-sm">
            <div class="space-y-12">
              <div class="space-y-2">
                <h3 class="text-xl font-bold">Speed Comparison</h3>
                <p class="text-sm text-muted-foreground">
                  ANNotate achieves a 100x speed improvement compared to the HMMER-based PfamScan
                  tool that uses Hidden Markov Models.
                </p>
              </div>
              <div class="relative h-16 rounded-lg bg-muted">
                <div
                  class="absolute top-0 left-0 z-10 h-full w-[2%] rounded-lg bg-emerald-600 dark:bg-emerald-500"
                >
                  <div class="absolute -top-8 left-0 text-sm font-medium whitespace-nowrap">
                    ANNotate (GPU)
                  </div>
                  <div
                    class="absolute -bottom-8 left-0 text-sm whitespace-nowrap text-muted-foreground"
                  >
                    ~0.1 seconds
                  </div>
                </div>
                <div
                  class="absolute top-0 left-0 h-full w-full rounded-lg bg-gray-300 dark:bg-gray-700"
                >
                  <div class="absolute -top-8 right-0 text-sm font-medium whitespace-nowrap">
                    HMMER-based PfamScan
                  </div>
                  <div
                    class="absolute right-0 -bottom-8 text-sm whitespace-nowrap text-muted-foreground"
                  >
                    ~10 seconds
                  </div>
                </div>
              </div>
              <div class="grid gap-6 sm:grid-cols-2">
                <div class="space-y-2 rounded-lg bg-muted p-4">
                  <h4 class="font-bold">cuDNN Acceleration</h4>
                  <p class="text-sm text-muted-foreground">
                    ANNotate leverages NVIDIA cuDNN libraries for GPU-accelerated training and
                    prediction, enabling rapid inference even for long protein sequences.
                  </p>
                </div>
                <div class="space-y-2 rounded-lg bg-muted p-4">
                  <h4 class="font-bold">Efficient Architecture</h4>
                  <p class="text-sm text-muted-foreground">
                    The combination of convolutional and recurrent layers provides both accuracy and
                    computational efficiency compared to traditional profile HMMs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  BarChart3,
  Brain,
  ChevronRight,
  Code,
  Cpu,
  Database,
  Layers,
  Microscope,
  Network,
  Server,
} from 'lucide-vue-next'

import { ref } from 'vue'

const slide = ref('architecture')
const autoplay = ref(true)
</script>

<style scoped>
/* TailwindCSS handles most styling. Add custom styles here if needed */
</style>
