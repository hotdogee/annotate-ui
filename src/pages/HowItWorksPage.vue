<template>
  <div class="min-h-screen bg-background">
    <!-- Hero Section -->
    <section
      class="relative bg-gradient-to-b from-blue-50 to-background py-16 md:py-24 dark:from-blue-950 dark:to-background"
    >
      <div class="container mx-auto px-4 md:px-6">
        <div class="grid items-center gap-6 max-lg:text-center lg:grid-cols-2 xl:px-24">
          <div class="space-y-4">
            <div
              class="inline-flex items-center rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              Protein Annotation Process
            </div>
            <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              How ANNotate Works
            </h1>
            <p class="text-muted-foreground md:text-xl/relaxed lg:max-w-[600px]">
              Understanding the complete workflow from protein sequence input to functional
              annotation output
            </p>
          </div>
          <div class="flex justify-center lg:justify-end">
            <div
              class="relative flex h-[300px] w-[300px] items-center justify-center overflow-hidden rounded-lg bg-blue-100 md:h-[400px] md:w-[400px] dark:bg-blue-900"
            >
              <img
                src="~assets/how-it-works-illustration-1.jpg"
                alt="How It Works Page Illustration"
              />
              <div
                class="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent dark:from-blue-400/20"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Overview -->
    <section class="pb-12">
      <div class="container mx-auto px-4 md:px-6">
        <div class="mx-auto max-w-3xl space-y-4 text-center">
          <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">Detailed Instructions</h2>
          <p class="text-muted-foreground md:text-xl/relaxed">
            ANNotate uses deep learning to predict protein function from amino acid sequences. The
            system identifies Pfam domains—conserved regions of proteins that often correspond to
            functional units—with high accuracy and speed.
          </p>
        </div>

        <div class="mx-auto mt-12 max-w-5xl">
          <div class="relative">
            <!-- Process flow diagram -->
            <div
              class="absolute top-8 left-1/2 hidden h-[calc(100%-4rem)] w-1 -translate-x-1/2 bg-blue-200 md:block!"
            ></div>

            <div class="space-y-12 md:space-y-24">
              <!-- Step 1 -->
              <div class="relative md:grid md:grid-cols-2 md:items-center md:gap-8">
                <div class="space-y-3 md:pr-12 md:text-right">
                  <div class="absolute left-[calc(50%-1.5rem)] hidden md:block!">
                    <span
                      class="flex h-12 w-12 items-center justify-center rounded-full border-4 border-blue-200 bg-white text-2xl font-bold text-blue-400"
                      >1
                    </span>
                  </div>
                  <div class="inline-block">
                    <div class="flex items-center space-x-3">
                      <div
                        class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100"
                      >
                        <FileText class="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 class="text-xl font-bold">Input Sequence</h3>
                    </div>
                  </div>
                  <p class="text-gray-500">
                    Users submit protein sequences in FASTA format through the web interface or API.
                    ANNotate accepts single sequences or batch submissions.
                  </p>
                </div>
                <div class="mt-6 md:mt-0 md:pl-12">
                  <div class="rounded-lg border bg-white p-4 shadow-sm">
                    <div class="space-y-2">
                      <div class="flex items-center space-x-2">
                        <ChevronRight class="h-5 w-5 text-blue-600" />
                        <span class="font-medium">Example FASTA Input</span>
                      </div>
                      <pre
                        class="overflow-x-auto rounded bg-gray-100 p-3 text-xs"
                        v-text="
                          `>sp|P01308|INS_HUMAN Insulin OS=Homo sapiens
MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN`
                        "
                      ></pre>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 2 -->
              <div class="relative md:grid md:grid-cols-2 md:items-center md:gap-8">
                <div class="space-y-3 md:pr-12 md:text-right">
                  <div class="absolute left-[calc(50%-1.5rem)] hidden md:block!">
                    <span
                      class="flex h-12 w-12 items-center justify-center rounded-full border-4 border-blue-200 bg-white text-2xl font-bold text-blue-400"
                      >2
                    </span>
                  </div>
                  <div class="inline-block">
                    <div class="flex items-center space-x-3">
                      <div
                        class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100"
                      >
                        <Hash class="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 class="text-xl font-bold">Preprocessing</h3>
                    </div>
                  </div>
                  <p class="text-gray-500">
                    The system validates the sequence, converts amino acids to numerical
                    representations, and generates a unique hash for caching purposes.
                  </p>
                </div>
                <div class="mt-6 md:mt-0 md:pl-12">
                  <div class="rounded-lg border bg-white p-4 shadow-sm">
                    <div class="space-y-2">
                      <div class="flex items-center space-x-2">
                        <Route class="h-5 w-5 text-blue-600" />
                        <span class="font-medium">Preprocessing Steps</span>
                      </div>
                      <ul class="space-y-1 text-sm text-gray-500">
                        <li>• Validate amino acid sequence</li>
                        <li>• Convert to numerical encoding</li>
                        <li>• Generate SHA-256 hash for caching</li>
                        <li>• Check cache for existing predictions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 3 -->
              <div class="relative md:grid md:grid-cols-2 md:items-center md:gap-8">
                <div class="space-y-3 md:pr-12 md:text-right">
                  <div class="absolute left-[calc(50%-1.5rem)] hidden md:block!">
                    <span
                      class="flex h-12 w-12 items-center justify-center rounded-full border-4 border-blue-200 bg-white text-2xl font-bold text-blue-400"
                      >3
                    </span>
                  </div>
                  <div class="inline-block">
                    <div class="flex items-center space-x-3">
                      <div
                        class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100"
                      >
                        <Layers class="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 class="text-xl font-bold">Feature Extraction</h3>
                    </div>
                  </div>
                  <p class="text-gray-500">
                    The deep learning model extracts features from the protein sequence using a
                    multi-scale convolutional bank to detect patterns at different resolutions.
                  </p>
                </div>
                <div class="mt-6 md:mt-0 md:pl-12">
                  <div class="rounded-lg border bg-white p-4 shadow-sm">
                    <div class="space-y-3">
                      <div class="flex items-center space-x-2">
                        <Scan class="h-5 w-5 text-blue-600" />
                        <span class="font-medium">Convolutional Feature Extraction</span>
                      </div>
                      <div class="space-y-2">
                        <div class="text-sm text-gray-500">
                          15 parallel convolutional layers with increasing kernel sizes (1-29)
                          capture local sequence motifs at different scales:
                        </div>
                        <div
                          class="relative flex h-24 flex-col overflow-hidden rounded-lg bg-gray-100 p-2"
                        >
                          <div class="absolute inset-0 flex items-center justify-center opacity-5">
                            <Layers class="size-24 text-blue-600" />
                          </div>
                          <div class="relative flex h-full items-center justify-between px-4">
                            <div class="h-4 w-4 rounded-full bg-blue-600"></div>
                            <div class="h-6 w-6 rounded-full bg-blue-500"></div>
                            <div class="h-8 w-8 rounded-full bg-blue-400"></div>
                            <div class="h-10 w-10 rounded-full bg-blue-300"></div>
                            <div class="h-12 w-12 rounded-full bg-blue-200"></div>
                            <ArrowRight class="h-5 w-5 text-gray-400" />
                          </div>
                          <div class="relative text-center text-xs text-gray-500">
                            Increasing kernel sizes capture patterns at different scales
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 4 -->
              <div class="relative md:grid md:grid-cols-2 md:items-center md:gap-8">
                <div class="space-y-3 md:pr-12 md:text-right">
                  <div class="absolute left-[calc(50%-1.5rem)] hidden md:block!">
                    <span
                      class="flex h-12 w-12 items-center justify-center rounded-full border-4 border-blue-200 bg-white text-2xl font-bold text-blue-400"
                      >4
                    </span>
                  </div>
                  <div class="inline-block">
                    <div class="flex items-center space-x-3">
                      <div
                        class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100"
                      >
                        <Network class="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 class="text-xl font-bold">Sequence Context Analysis</h3>
                    </div>
                  </div>
                  <p class="text-gray-500">
                    Bidirectional recurrent neural networks analyze the sequence in both directions
                    to capture long-range dependencies between amino acids.
                  </p>
                </div>
                <div class="mt-6 md:mt-0 md:pl-12">
                  <div class="rounded-lg border bg-white p-4 shadow-sm">
                    <div class="space-y-3">
                      <div class="flex items-center space-x-2">
                        <ArrowLeftRight class="h-5 w-5 text-blue-600" />
                        <span class="font-medium">Bidirectional RNN Processing</span>
                      </div>
                      <div class="space-y-2">
                        <div class="text-sm text-gray-500">
                          Quad stacked bidirectional GRU layers process the sequence in both
                          directions:
                        </div>
                        <div
                          class="relative flex flex-col overflow-hidden rounded-lg bg-gray-100 p-2"
                        >
                          <div class="absolute inset-0 flex items-center justify-center opacity-5">
                            <Network class="h-32 w-32 text-blue-600" />
                          </div>
                          <div class="relative flex h-full flex-col justify-between py-2">
                            <!-- Backward processing (top) -->
                            <div class="flex w-full items-center justify-between">
                              <ArrowRight class="h-5 w-5 rotate-180 text-blue-600" />
                              <div
                                class="mx-2 flex h-10 flex-1 items-center justify-center rounded-lg bg-blue-100"
                              >
                                <div class="text-xs font-medium text-blue-600">
                                  Forward Processing
                                </div>
                              </div>
                              <div class="w-5"></div>
                              <!-- Spacer to align with forward row -->
                            </div>

                            <!-- Divider -->
                            <div class="my-1 w-full border-t border-dashed border-gray-300"></div>

                            <!-- Forward processing (bottom) -->
                            <div class="flex w-full items-center justify-between">
                              <div class="w-5"></div>
                              <!-- Spacer to align with backward row -->
                              <div
                                class="mx-2 flex h-10 flex-1 items-center justify-center rounded-lg bg-blue-100"
                              >
                                <div class="text-xs font-medium text-blue-600">
                                  Backward Processing
                                </div>
                              </div>
                              <ArrowLeft class="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div class="relative text-center text-xs text-gray-500">
                            Bidirectional RNN processes sequence in both directions
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 5 -->
              <div class="relative md:grid md:grid-cols-2 md:items-center md:gap-8">
                <div class="space-y-3 md:pr-12 md:text-right">
                  <div class="absolute left-[calc(50%-1.5rem)] hidden md:block!">
                    <span
                      class="flex h-12 w-12 items-center justify-center rounded-full border-4 border-blue-200 bg-white text-2xl font-bold text-blue-400"
                      >5
                    </span>
                  </div>
                  <div class="inline-block">
                    <div class="flex items-center space-x-3">
                      <div
                        class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100"
                      >
                        <Brain class="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 class="text-xl font-bold">Domain Prediction</h3>
                    </div>
                  </div>
                  <p class="text-gray-500">
                    The model predicts Pfam domains for each position in the sequence, identifying
                    regions with specific functions.
                  </p>
                </div>
                <div class="mt-6 md:mt-0 md:pl-12">
                  <div class="rounded-lg border bg-white p-4 shadow-sm">
                    <div class="space-y-3">
                      <div class="flex items-center space-x-2">
                        <Tag class="h-5 w-5 text-blue-600" />
                        <span class="font-medium">Classification Process</span>
                      </div>
                      <div class="space-y-2">
                        <div class="text-sm text-gray-500">
                          The model outputs probabilities for 16,714 Pfam domain classes at each
                          amino acid position:
                        </div>
                        <div
                          class="relative flex h-24 flex-col overflow-hidden rounded-lg bg-gray-100 p-2"
                        >
                          <div class="absolute inset-0 flex items-center justify-center opacity-5">
                            <Brain class="h-32 w-32 text-blue-600" />
                          </div>
                          <div class="relative flex h-full items-center justify-center">
                            <div class="grid grid-cols-10 gap-1">
                              <div
                                v-for="i in 20"
                                :key="i - 1"
                                :class="[
                                  'inline-flex h-4 w-4 items-center justify-center rounded text-xs font-medium',
                                  i - 1 >= 5 && i - 1 < 15
                                    ? 'bg-blue-500 text-blue-200'
                                    : 'bg-gray-300 text-gray-500',
                                ]"
                              >
                                {{ sequence[i - 1] }}
                              </div>
                            </div>
                          </div>
                          <div class="relative text-center text-xs text-gray-500">
                            Single amino acid resolution domain predictions
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 6 -->
              <div class="relative md:grid md:grid-cols-2 md:items-center md:gap-8">
                <div class="space-y-3 md:pr-12 md:text-right">
                  <div class="absolute left-[calc(50%-1.5rem)] hidden md:block!">
                    <span
                      class="flex h-12 w-12 items-center justify-center rounded-full border-4 border-blue-200 bg-white text-2xl font-bold text-blue-400"
                      >6
                    </span>
                  </div>
                  <div class="inline-block">
                    <div class="flex items-center space-x-3">
                      <div
                        class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100"
                      >
                        <Database class="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 class="text-xl font-bold">Result Enrichment</h3>
                    </div>
                  </div>
                  <p class="text-gray-500">
                    Numerical predictions are enriched with human-readable domain information from
                    the Pfam database.
                  </p>
                </div>
                <div class="mt-6 md:mt-0 md:pl-12">
                  <div class="rounded-lg border bg-white p-4 shadow-sm">
                    <div class="space-y-3">
                      <div class="flex items-center space-x-2">
                        <TableProperties class="h-5 w-5 text-blue-600" />
                        <span class="font-medium">Domain Mapping</span>
                      </div>
                      <div class="space-y-2">
                        <div class="text-sm text-gray-500">
                          Numerical class IDs are mapped to Pfam domain information:
                        </div>
                        <div class="overflow-x-auto">
                          <table class="min-w-full text-xs">
                            <thead>
                              <tr class="border-b">
                                <th class="py-2 text-left">Class ID</th>
                                <th class="py-2 text-left">Pfam Acc</th>
                                <th class="py-2 text-left">Pfam ID</th>
                                <th class="py-2 text-left">Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td class="py-1">4877</td>
                                <td class="py-1">PF00049</td>
                                <td class="py-1">Insulin</td>
                                <td class="py-1">Insulin/IGF/Relaxin family</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 7 -->
              <div class="relative md:grid md:grid-cols-2 md:items-center md:gap-8">
                <div class="space-y-3 md:pr-12 md:text-right">
                  <div class="absolute left-[calc(50%-1.5rem)] hidden md:block!">
                    <span
                      class="flex h-12 w-12 items-center justify-center rounded-full border-4 border-blue-200 bg-white text-2xl font-bold text-blue-400"
                      >7
                    </span>
                  </div>
                  <div class="inline-block">
                    <div class="flex items-center space-x-3">
                      <div
                        class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100"
                      >
                        <BarChart3 class="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 class="text-xl font-bold">Visualization</h3>
                    </div>
                  </div>
                  <p class="text-gray-500">
                    Results are presented in an interactive visualization that allows researchers to
                    explore predicted domains.
                  </p>
                </div>
                <div class="mt-6 md:mt-0 md:pl-12">
                  <div class="rounded-lg border bg-white p-4 shadow-sm">
                    <div class="space-y-3">
                      <div class="flex items-center space-x-2">
                        <FlaskConical class="h-5 w-5 text-blue-600" />
                        <span class="font-medium">Interactive Results</span>
                      </div>
                      <div class="relative h-32 overflow-hidden rounded-lg bg-gray-100 p-2">
                        <div class="absolute inset-0 flex items-center justify-center opacity-5">
                          <FlaskConical class="h-32 w-32 text-blue-600" />
                        </div>
                        <div class="relative flex h-full flex-col justify-between">
                          <div class="flex h-6 items-center rounded bg-white px-2 text-xs">
                            Protein sequence visualization
                          </div>
                          <div class="flex h-12 items-center rounded bg-white px-2">
                            <div class="h-4 w-full overflow-hidden rounded-full bg-gray-200">
                              <div class="h-full w-9/10 rounded-full bg-blue-500"></div>
                            </div>
                          </div>
                          <div
                            class="flex h-6 items-center justify-between rounded bg-white px-2 text-xs"
                          >
                            <span>Domain confidence scores</span>
                            <span class="text-blue-600">95.6%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- GPU Acceleration -->
    <section class="bg-gray-50 py-12 md:py-16">
      <div class="container mx-auto px-4 md:px-6">
        <div class="mx-auto max-w-3xl space-y-4 text-center">
          <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">GPU Acceleration</h2>
          <p class="text-muted-foreground md:text-xl/relaxed">
            ANNotate leverages NVIDIA cuDNN libraries for GPU-accelerated deep learning, enabling
            rapid inference even for long protein sequences.
          </p>
        </div>

        <div class="mx-auto mt-12 max-w-5xl">
          <div class="grid gap-6 md:grid-cols-2">
            <div class="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
              <div class="flex items-center space-x-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <Cpu class="h-5 w-5 text-blue-600" />
                </div>
                <h3 class="text-xl font-bold">cuDNN Acceleration</h3>
              </div>
              <div class="text-sm text-gray-500">
                The NVIDIA CUDA Deep Neural Network library (cuDNN) provides highly optimized
                implementations of deep learning primitives. ANNotate uses cuDNN to accelerate:
              </div>
              <ul class="space-y-2 text-sm text-gray-500">
                <li class="flex items-start">
                  <ArrowRight class="mt-0.5 mr-2 h-4 w-4 shrink-0 text-blue-500" />
                  <span>Convolutional operations for feature extraction</span>
                </li>
                <li class="flex items-start">
                  <ArrowRight class="mt-0.5 mr-2 h-4 w-4 shrink-0 text-blue-500" />
                  <span>Recurrent neural network computations for sequence analysis</span>
                </li>
                <li class="flex items-start">
                  <ArrowRight class="mt-0.5 mr-2 h-4 w-4 shrink-0 text-blue-500" />
                  <span>Matrix operations throughout the deep learning model</span>
                </li>
              </ul>
              <p class="text-sm text-gray-500">
                This GPU acceleration enables ANNotate to process protein sequences up to 100x
                faster than traditional CPU-based methods.
              </p>
            </div>

            <div class="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
              <div class="flex items-center space-x-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <Zap class="h-5 w-5 text-blue-600" />
                </div>
                <h3 class="text-xl font-bold">Performance Comparison</h3>
              </div>
              <div class="text-sm text-gray-500">
                ANNotate achieves significant performance improvements over traditional HMMER-based
                PfamScan tools:
              </div>

              <div class="space-y-4">
                <div class="space-y-2">
                  <div class="flex justify-between text-xs text-gray-500">
                    <span>ANNotate (GPU)</span>
                    <span>~0.1 seconds</span>
                  </div>
                  <div class="h-4 w-full rounded-full bg-gray-100">
                    <div class="h-full w-[1%] rounded-full bg-blue-600"></div>
                  </div>
                </div>

                <div class="space-y-2">
                  <div class="flex justify-between text-xs text-gray-500">
                    <span>HMMER-based PfamScan</span>
                    <span>~10 seconds</span>
                  </div>
                  <div class="h-4 w-full rounded-full bg-gray-100">
                    <div class="h-full w-full rounded-full bg-gray-400"></div>
                  </div>
                </div>
              </div>

              <div class="rounded-lg bg-blue-50 p-3">
                <p class="text-xs text-blue-700">
                  <strong>Note:</strong> Performance measurements based on average processing time
                  for a 1000 amino acid protein sequence on an NVIDIA TITAN V GPU compared to a
                  16-core CPU running HMMER 3.3.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Use Cases -->
    <section class="py-12 md:py-16">
      <div class="container mx-auto px-4 md:px-6">
        <div class="mx-auto max-w-3xl space-y-4 text-center">
          <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">Common Use Cases</h2>
          <p class="text-muted-foreground md:text-xl/relaxed">
            How researchers are using ANNotate in their work
          </p>
        </div>

        <div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div class="overflow-hidden rounded-lg bg-blue-50 shadow-md dark:bg-blue-900/20">
            <div class="p-6">
              <div
                class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white dark:bg-blue-600"
              >
                <Search class="h-6 w-6" />
              </div>
              <h3 class="mb-3 text-center text-xl font-semibold text-gray-900 dark:text-white">
                Functional Annotation
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                Researchers use ANNotate to quickly identify functional domains in newly sequenced
                proteins, helping to understand their biological roles without time-consuming
                laboratory experiments.
              </p>
            </div>
          </div>

          <div class="overflow-hidden rounded-lg bg-blue-50 shadow-md dark:bg-blue-900/20">
            <div class="p-6">
              <div
                class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white dark:bg-blue-600"
              >
                <BarChart3 class="h-6 w-6" />
              </div>
              <h3 class="mb-3 text-center text-xl font-semibold text-gray-900 dark:text-white">
                Comparative Genomics
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                By analyzing domain architectures across multiple species, scientists can trace
                evolutionary relationships and identify conserved functional elements in protein
                families.
              </p>
            </div>
          </div>

          <div class="overflow-hidden rounded-lg bg-blue-50 shadow-md dark:bg-blue-900/20">
            <div class="p-6">
              <div
                class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white dark:bg-blue-600"
              >
                <Code class="h-6 w-6" />
              </div>
              <h3 class="mb-3 text-center text-xl font-semibold text-gray-900 dark:text-white">
                High-Throughput Sequencing
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                Bioinformaticians integrate ANNotate into their pipelines to process thousands of
                sequences from genome sequencing projects, providing rapid functional insights at
                scale.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Advantages -->
    <section class="py-12 md:py-16">
      <div class="container mx-auto px-4 md:px-6">
        <div class="mx-auto max-w-3xl space-y-4 text-center">
          <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">
            Advantages Over Traditional Methods
          </h2>
          <p class="text-muted-foreground md:text-xl/relaxed">
            ANNotate offers several key advantages over traditional protein annotation methods.
          </p>
        </div>

        <div class="mx-auto mt-12 max-w-5xl">
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div class="space-y-3 rounded-lg border bg-white p-6 shadow-sm">
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Zap class="h-5 w-5 text-blue-600" />
              </div>
              <h3 class="text-lg font-bold">Speed</h3>
              <p class="text-sm text-gray-500">
                ANNotate processes protein sequences up to 100x faster than traditional HMMER-based
                methods, enabling high-throughput analysis of large protein datasets.
              </p>
            </div>

            <div class="space-y-3 rounded-lg border bg-white p-6 shadow-sm">
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Brain class="h-5 w-5 text-blue-600" />
              </div>
              <h3 class="text-lg font-bold">Accuracy</h3>
              <p class="text-sm text-gray-500">
                The deep learning approach captures complex patterns and relationships in protein
                sequences that traditional profile HMMs may miss, resulting in more accurate domain
                predictions.
              </p>
            </div>

            <div class="space-y-3 rounded-lg border bg-white p-6 shadow-sm">
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Layers class="h-5 w-5 text-blue-600" />
              </div>
              <h3 class="text-lg font-bold">Multi-scale Analysis</h3>
              <p class="text-sm text-gray-500">
                The multi-scale convolutional architecture detects sequence patterns at different
                resolutions simultaneously, providing a more comprehensive analysis of protein
                structure.
              </p>
            </div>

            <div class="space-y-3 rounded-lg border bg-white p-6 shadow-sm">
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Network class="h-5 w-5 text-blue-600" />
              </div>
              <h3 class="text-lg font-bold">Context Awareness</h3>
              <p class="text-sm text-gray-500">
                Bidirectional RNNs analyze the sequence in both directions, capturing long-range
                dependencies and contextual information that traditional methods often miss.
              </p>
            </div>

            <div class="space-y-3 rounded-lg border bg-white p-6 shadow-sm">
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Database class="h-5 w-5 text-blue-600" />
              </div>
              <h3 class="text-lg font-bold">Efficient Caching</h3>
              <p class="text-sm text-gray-500">
                ANNotate's intelligent caching system stores previous predictions, providing instant
                results for previously analyzed sequences without redundant computation.
              </p>
            </div>

            <div class="space-y-3 rounded-lg border bg-white p-6 shadow-sm">
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <BarChart3 class="h-5 w-5 text-blue-600" />
              </div>
              <h3 class="text-lg font-bold">Rich Visualization</h3>
              <p class="text-sm text-gray-500">
                Interactive visualization tools help researchers explore and interpret prediction
                results more effectively than traditional text-based outputs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Input/Output Examples -->
    <section class="bg-gray-50 py-12 md:py-16">
      <div class="container mx-auto px-4 md:px-6">
        <div class="mx-auto max-w-3xl space-y-4 text-center">
          <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">Input and Output Examples</h2>
          <p class="text-muted-foreground md:text-xl/relaxed">
            Understanding the expected input formats and output results of ANNotate.
          </p>
        </div>

        <div class="mx-auto mt-12 max-w-5xl">
          <div class="grid gap-8 md:grid-cols-2">
            <div class="space-y-4">
              <h3 class="text-xl font-bold">Input Examples</h3>

              <div class="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
                <div class="space-y-2">
                  <h4 class="font-medium">Single Sequence (FASTA Format)</h4>
                  <pre
                    class="overflow-x-auto rounded bg-gray-100 p-3 text-xs"
                    v-text="
                      `>sp|P01308|INS_HUMAN Insulin OS=Homo sapiens
MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN`
                    "
                  ></pre>
                </div>

                <div class="space-y-2">
                  <h4 class="font-medium">API Request (JSON Format)</h4>
                  <pre
                    class="overflow-x-auto rounded bg-gray-100 p-3 text-xs"
                    v-text="
                      `{
  &quot;sequence&quot;: &quot;MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN&quot;
}`
                    "
                  ></pre>
                </div>

                <div class="space-y-2">
                  <h4 class="font-medium">Multiple Sequences (FASTA Format)</h4>
                  <pre
                    class="overflow-x-auto rounded bg-gray-100 p-3 text-xs"
                    v-text="
                      `>sp|P01308|INS_HUMAN Insulin OS=Homo sapiens
MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN
>sp|P01315|INS_BOVIN Insulin OS=Bos taurus
MALWTRLLPLLALLALWAPAPAQAFVNQHLCGSHLVEALYLVCGERGFFYTPKARREVEGPQVGALELAGGPGAGGLEGPPQKRGIVEQCCASVCSLYQLENYCN`
                    "
                  ></pre>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <h3 class="text-xl font-bold">Output Examples</h3>

              <div class="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
                <div class="space-y-2">
                  <h4 class="font-medium">API Response (JSON Format)</h4>
                  <pre
                    class="overflow-x-auto rounded bg-gray-100 p-3 text-xs"
                    v-text="
                      `{
  &quot;_id&quot;: &quot;7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069&quot;,
  &quot;sequence&quot;: &quot;MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN&quot;,
  &quot;createdAt&quot;: 1626456531000,
  &quot;predictions&quot;: {
    &quot;classes&quot;: [1, 1, 1, 4877, 4877, ...],
    &quot;top_classes&quot;: [[1, 4085, 14772], [1, 14772, 4085], ...],
    &quot;top_probs&quot;: [[0.999651432, 3.57837489e-5, 3.53951364e-5], ...]
  },
  &quot;domainMap&quot;: {
    &quot;1&quot;: {
      &quot;pfamAcc&quot;: &quot;NO_DOMAIN&quot;,
      &quot;pfamId&quot;: &quot;NO_DOMAIN&quot;,
      &quot;pfamDesc&quot;: &quot;No Domain&quot;,
      &quot;clanAcc&quot;: &quot;&quot;,
      &quot;clanId&quot;: &quot;&quot;
    },
    &quot;4877&quot;: {
      &quot;pfamAcc&quot;: &quot;PF00049&quot;,
      &quot;pfamId&quot;: &quot;Insulin&quot;,
      &quot;pfamDesc&quot;: &quot;Insulin/IGF/Relaxin family&quot;,
      &quot;clanAcc&quot;: &quot;CL0239&quot;,
      &quot;clanId&quot;: &quot;Insulin&quot;
    }
    // Additional domain entries...
  }
}`
                    "
                  ></pre>
                </div>

                <div class="space-y-2">
                  <h4 class="font-medium">Visualization Output</h4>
                  <div class="rounded bg-gray-100 p-3">
                    <div class="space-y-2">
                      <div class="flex items-center space-x-2">
                        <div class="h-4 w-4 rounded-sm bg-blue-600"></div>
                        <span class="text-xs">PF00049 (Insulin)</span>
                      </div>
                      <div class="h-8 w-full rounded-lg bg-white p-1">
                        <div class="flex h-full items-center">
                          <div class="h-full w-1/4 rounded-l-md bg-gray-200"></div>
                          <div class="h-full w-2/4 bg-blue-600"></div>
                          <div class="h-full w-1/4 rounded-r-md bg-gray-200"></div>
                        </div>
                      </div>
                      <div class="flex justify-between text-xs text-gray-500">
                        <span>1</span>
                        <span>Sequence Position</span>
                        <span>110</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Troubleshooting -->
    <section class="py-12 md:py-16">
      <div class="container mx-auto px-4 md:px-6">
        <div class="mx-auto max-w-3xl space-y-4 text-center">
          <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">Troubleshooting</h2>
          <p class="text-muted-foreground md:text-xl/relaxed">
            Common issues and their solutions when using ANNotate.
          </p>
        </div>

        <div class="mx-auto mt-12 max-w-3xl">
          <div class="divide-y rounded-lg border bg-white shadow-sm">
            <details class="group p-6">
              <summary class="flex cursor-pointer items-center justify-between">
                <h3 class="text-lg font-medium">Invalid Sequence Format</h3>
                <ChevronDown class="h-5 w-5 transition-transform group-open:rotate-180" />
              </summary>
              <div class="mt-3 text-sm text-gray-500">
                <div class="mb-2">
                  ANNotate only accepts valid amino acid sequences. If you receive an "Invalid
                  sequence" error:
                </div>
                <ul class="list-disc space-y-1 pl-5">
                  <li>Ensure your sequence contains only valid amino acid characters</li>
                  <li>Remove any whitespace, numbers, or special characters from the sequence</li>
                  <li>
                    For FASTA format, ensure the header line starts with "&gt;" and the sequence
                    begins on the next line
                  </li>
                </ul>
              </div>
            </details>

            <details class="group p-6">
              <summary class="flex cursor-pointer items-center justify-between">
                <h3 class="text-lg font-medium">Slow Prediction Times</h3>
                <ChevronDown class="h-5 w-5 transition-transform group-open:rotate-180" />
              </summary>
              <div class="mt-3 text-sm text-gray-500">
                <div class="mb-2">If predictions are taking longer than expected:</div>
                <ul class="list-disc space-y-1 pl-5">
                  <li>High server load may cause delays during peak usage times</li>
                  <li>Check your network connection if using the web interface</li>
                  <li>
                    Consider running the model locally using batch processing for multiple sequences
                  </li>
                </ul>
              </div>
            </details>

            <details class="group p-6">
              <summary class="flex cursor-pointer items-center justify-between">
                <h3 class="text-lg font-medium">No Domains Detected</h3>
                <ChevronDown class="h-5 w-5 transition-transform group-open:rotate-180" />
              </summary>
              <div class="mt-3 text-sm text-gray-500">
                <div class="mb-2">If ANNotate doesn't detect any domains in your protein:</div>
                <ul class="list-disc space-y-1 pl-5">
                  <li>The protein may genuinely lack known Pfam domains</li>
                  <li>The sequence may be from a poorly characterized protein family</li>
                </ul>
              </div>
            </details>

            <details class="group p-6">
              <summary class="flex cursor-pointer items-center justify-between">
                <h3 class="text-lg font-medium">API Connection Issues</h3>
                <ChevronDown class="h-5 w-5 transition-transform group-open:rotate-180" />
              </summary>
              <div class="mt-3 text-sm text-gray-500">
                <div class="mb-2">If you're having trouble connecting to the ANNotate API:</div>
                <ul class="list-disc space-y-1 pl-5">
                  <li>Verify the API endpoint URL is correct</li>
                  <li>Ensure your request format follows the API documentation</li>
                  <li>Try using the WebSocket connection if the HTTP endpoint is unresponsive</li>
                </ul>
              </div>
            </details>

            <details class="group p-6">
              <summary class="flex cursor-pointer items-center justify-between">
                <h3 class="text-lg font-medium">Visualization Not Loading</h3>
                <ChevronDown class="h-5 w-5 transition-transform group-open:rotate-180" />
              </summary>
              <div class="mt-3 text-sm text-gray-500">
                <div class="mb-2">If the result visualization isn't loading properly:</div>
                <ul class="list-disc space-y-1 pl-5">
                  <li>Ensure you're using a modern browser (Chrome, Firefox, Safari, Edge)</li>
                  <li>Check that JavaScript is enabled in your browser</li>
                  <li>Try clearing your browser cache and reloading the page</li>
                  <li>For large proteins, the visualization may take longer to render</li>
                </ul>
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>

    <!-- Glossary -->
    <section class="bg-gray-50 py-12 md:py-16">
      <div class="container mx-auto px-4 md:px-6">
        <div class="mx-auto max-w-3xl space-y-4 text-center">
          <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">Glossary of Terms</h2>
          <p class="text-muted-foreground md:text-xl/relaxed">
            Key terminology used in protein annotation and the ANNotate system.
          </p>
        </div>

        <div class="mx-auto mt-12 max-w-4xl">
          <div class="grid gap-4 md:grid-cols-2">
            <div class="rounded-lg border bg-white p-4 shadow-sm">
              <h3 class="font-bold">Amino Acid</h3>
              <p class="text-sm text-gray-500">
                The building blocks of proteins, represented by single-letter codes (A, C, D, E,
                etc.). Proteins are chains of amino acids folded into specific structures.
              </p>
            </div>

            <div class="rounded-lg border bg-white p-4 shadow-sm">
              <h3 class="font-bold">Bidirectional RNN</h3>
              <p class="text-sm text-gray-500">
                A type of recurrent neural network that processes sequences in both forward and
                backward directions, capturing context from both past and future elements.
              </p>
            </div>

            <div class="rounded-lg border bg-white p-4 shadow-sm">
              <h3 class="font-bold">Convolutional Neural Network (CNN)</h3>
              <p class="text-sm text-gray-500">
                A deep learning architecture specialized for learning spatial relationships in data,
                ANNotate uses convolutional filters to detect local patterns at multiple scales.
              </p>
            </div>

            <div class="rounded-lg border bg-white p-4 shadow-sm">
              <h3 class="font-bold">cuDNN</h3>
              <p class="text-sm text-gray-500">
                NVIDIA CUDA Deep Neural Network library, a GPU-accelerated library of primitives for
                deep neural networks that provides highly optimized implementations.
              </p>
            </div>

            <div class="rounded-lg border bg-white p-4 shadow-sm">
              <h3 class="font-bold">FASTA Format</h3>
              <p class="text-sm text-gray-500">
                A text-based format for representing protein or nucleotide sequences, consisting of
                a header line starting with "&gt;" followed by lines of sequence data.
              </p>
            </div>

            <div class="rounded-lg border bg-white p-4 shadow-sm">
              <h3 class="font-bold">GRU (Gated Recurrent Unit)</h3>
              <p class="text-sm text-gray-500">
                A type of recurrent neural network unit that uses gating mechanisms to control
                information flow, helping to capture long-range dependencies in sequences.
              </p>
            </div>

            <div class="rounded-lg border bg-white p-4 shadow-sm">
              <h3 class="font-bold">HMMER</h3>
              <p class="text-sm text-gray-500">
                A traditional software suite for protein sequence analysis that uses profile hidden
                Markov models (HMMs) to identify sequence homology.
              </p>
            </div>

            <div class="rounded-lg border bg-white p-4 shadow-sm">
              <h3 class="font-bold">Pfam</h3>
              <p class="text-sm text-gray-500">
                A database of protein families, each represented by multiple sequence alignments and
                hidden Markov models. ANNotate predicts which Pfam domains are present in a protein.
              </p>
            </div>

            <div class="rounded-lg border bg-white p-4 shadow-sm">
              <h3 class="font-bold">Pfam Accession</h3>
              <p class="text-sm text-gray-500">
                A unique identifier for a Pfam family, in the format "PF00000". For example,
                "PF00049" is the accession for the Insulin family.
              </p>
            </div>

            <div class="rounded-lg border bg-white p-4 shadow-sm">
              <h3 class="font-bold">Protein Domain</h3>
              <p class="text-sm text-gray-500">
                A structural or functional unit within a protein that can evolve, function, and
                exist independently. Proteins may contain multiple domains.
              </p>
            </div>

            <div class="rounded-lg border bg-white p-4 shadow-sm">
              <h3 class="font-bold">Protein Family</h3>
              <p class="text-sm text-gray-500">
                A group of evolutionarily-related proteins that share similar structures, functions,
                and sequence patterns.
              </p>
            </div>

            <div class="rounded-lg border bg-white p-4 shadow-sm">
              <h3 class="font-bold">Sequence Homology</h3>
              <p class="text-sm text-gray-500">
                The relationship between protein sequences that share a common evolutionary origin,
                typically identified by sequence similarity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Get Started -->
    <section class="py-12 md:py-16">
      <div class="container mx-auto px-4 md:px-6">
        <div class="mx-auto max-w-3xl space-y-4 text-center">
          <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Get Started?</h2>
          <div class="text-muted-foreground md:text-xl/relaxed">
            Try ANNotate today to accelerate your protein function prediction workflow.
          </div>
          <div class="mx-auto flex max-w-sm flex-col justify-center gap-2 min-[400px]:flex-row">
            <router-link
              :to="{ name: 'index' }"
              class="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:ring-1 focus-visible:ring-blue-700 focus-visible:outline-none"
            >
              Submit a Sequence
            </router-link>
            <router-link
              :to="{ name: 'contact' }"
              class="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
            >
              Contact Us
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  BarChart3,
  Brain,
  ChevronDown,
  ChevronRight,
  Code,
  Cpu,
  Database,
  FileText,
  FlaskConical,
  Hash,
  Layers,
  Network,
  Route,
  Scan,
  Search,
  TableProperties,
  Tag,
  Zap,
} from 'lucide-vue-next'
// import { ref } from 'vue'
const sequence =
  'MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN'

// // Create refs for collapsible sections in the Troubleshooting section
// const troubleshootingSections = ref([
//   {
//     title: 'Invalid Sequence Format',
//     isOpen: false,
//     content: {
//       intro:
//         'ANNotate only accepts valid amino acid sequences. If you receive an "Invalid sequence" error:',
//       items: [
//         'Ensure your sequence contains only valid amino acid characters (A-Z, excluding B, J, O, U, X, Z)',
//         'Remove any whitespace, numbers, or special characters from the sequence',
//         'For FASTA format, ensure the header line starts with ">" and the sequence begins on the next line',
//       ],
//     },
//   },
//   {
//     title: 'Slow Prediction Times',
//     isOpen: false,
//     content: {
//       intro: 'If predictions are taking longer than expected:',
//       items: [
//         'For very long sequences (">"2000 amino acids), processing time increases significantly',
//         'High server load may cause delays during peak usage times',
//         'Check your network connection if using the web interface',
//         'Consider using the batch processing API for multiple sequences',
//       ],
//     },
//   },
//   {
//     title: 'No Domains Detected',
//     isOpen: false,
//     content: {
//       intro: "If ANNotate doesn't detect any domains in your protein:",
//       items: [
//         'The protein may genuinely lack known Pfam domains',
//         'The sequence may be from a novel or poorly characterized protein family',
//         'Try lowering the confidence threshold in the advanced settings',
//         'Consider using complementary tools like InterProScan for additional domain detection',
//       ],
//     },
//   },
//   {
//     title: 'API Connection Issues',
//     isOpen: false,
//     content: {
//       intro: "If you're having trouble connecting to the ANNotate API:",
//       items: [
//         'Verify the API endpoint URL is correct',
//         'Check that your authentication credentials are valid',
//         'Ensure your request format follows the API documentation',
//         'Try using the WebSocket connection if the HTTP endpoint is unresponsive',
//       ],
//     },
//   },
//   {
//     title: 'Visualization Not Loading',
//     isOpen: false,
//     content: {
//       intro: "If the result visualization isn't loading properly:",
//       items: [
//         "Ensure you're using a modern browser (Chrome, Firefox, Safari, Edge)",
//         'Check that JavaScript is enabled in your browser',
//         'Try clearing your browser cache and reloading the page',
//         'For large proteins, the visualization may take longer to render',
//       ],
//     },
//   },
// ])

// // Method to toggle troubleshooting sections
// const toggleSection = (index: number) => {
//   if (troubleshootingSections.value[index]) {
//     troubleshootingSections.value[index].isOpen = !troubleshootingSections.value[index].isOpen
//   }
// }
</script>

<style scoped>
/* Any component-specific styles would go here */
</style>
