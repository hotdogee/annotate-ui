# ANNotate UI

Protein Function Prediction using Deep Learning

# Live

- Frontend deployed on GitHub Pages: https://ann.hanl.in/
- Backend deployed on Google Compute Engine.
- Deep Learning Model deployed on Google Cloud Run.

![ANNotate UI](https://github.com/user-attachments/assets/81dc7266-e6b7-47d9-b1e9-97a8cb1f7144)

## Prediction Results

![Prediction Results](https://github.com/user-attachments/assets/03f5a5c0-7ced-42af-b42e-ff41d6a56331)

## About Page

![About Page](https://github.com/user-attachments/assets/793a6209-0251-421e-854d-e8d8d65c708e)

## Overall Architecture

The complete system consists of three main components:

- **Frontend UI** (annotate-ui): A Single Page Application (SPA) built with Vue 3
- **Backend API** (annotate-api): A Feathers.js NodeJS RESTful API service
- **Deep Learning Model** (annotate-model): Tensorflow GPU-accelerated inference for protein function prediction models

## Frontend Architecture (annotate-ui)

The frontend is built as a Single Page Application (SPA) using the Quasar Framework (Vue 3), focusing on performance and responsive design. The application is structured following Vue's component architecture with the following key elements:

### Core Technologies

- **Framework**: Quasar Framework v2.18+ (Vue 3.5+)
- **Language**: TypeScript for type safety and improved developer experience
- **State Management**: Pinia v3.0+ for reactive state management
- **Real-time Communication**: Socket.io client for WebSocket connections to the Feathers backend
- **HTTP Requests**: Axios for REST API calls
- **Data Visualization**: Apache ECharts for rendering protein data visualizations
- **CSS Framework**: TailwindCSS v4.0+ for utility-first styling approach
- **Form Validation**: Vuelidate for form input validation

### Application Structure

- **/src/pages/**: Main application views including:
  - `IndexPage.vue`: Landing page with search functionality
  - `PfamDetail.vue`: Detailed protein family information with predictions
  - `DocumentationPage.vue`: Application documentation
  - `AboutPage.vue`: Information about the project
  - `ContactPage.vue`: Contact information
- **/src/components/**: Reusable UI components such as:
  - `SearchInput.vue`: Complex protein search component
  - `EssentialLink.vue`: Navigation link component
- **/src/layouts/**: Page layout containers
  - `MainLayout.vue`: Primary application layout with navigation and content areas
- **/src/stores/**: Pinia state management stores
  - `pfamStore.ts`: Store for protein family data
  - `referencesStore.ts`: Store for scientific reference data
  - `localSettingsStore.js`: User preferences and local settings
  - `systemStore.js`: Application system state
- **/src/router/**: Vue Router configuration
  - `routes.ts`: Route definitions mapping URLs to page components
  - `index.ts`: Router configuration and initialization
- **/src/boot/**: Application initialization files
  - `feathers.ts`: Feathers client setup for backend communication
  - `i18n.ts`: Internationalization configuration
  - `pinia-colada.ts`: Pinia caching integration
  - `logger.js`: Application logging setup

### Data Flow Architecture

1. **User Interface Layer**: Vue components in pages/ and components/ directories
2. **State Management Layer**: Pinia stores in stores/ directory
3. **API Communication Layer**: Feathers client configured in boot/ directory
4. **Service Layer**: pfam service and references service accessible through the Feathers client

### Caching Strategy

- Local API response caching using browser's localStorage
- Pinia-plugin-persistedstate for preserving state between sessions
- @pinia/colada for optimized API request caching

### Build & Development Tools

- Vite-based build system through Quasar CLI
- TypeScript for static type checking
- ESLint for code quality
- Prettier for code formatting
- PostCSS with Autoprefixer for CSS compatibility

This architecture provides a maintainable, scalable frontend that efficiently communicates with the backend services while providing a responsive and intuitive user interface for protein function prediction analysis.

## Backend Architecture

The backend API is built with Feathers.js providing:

- RESTful API endpoints for data access
- Real-time communication using Socket.io
- Authentication and authorization services
- Integration with the TensorFlow Serving API for model inference

## Model Serving Architecture

The machine learning models are served using TensorFlow Serving:

- Multiple GPU-accelerated model instances for high-throughput prediction
- Model versioning and configuration management
- RESTful API for model inference requests
- Containerized using Docker for easy deployment and scaling

## Data Flow

1. Client makes requests to the Quasar UI
2. UI communicates with the Feathers API for data processing
3. For predictions, Feathers API communicates with TensorFlow Serving
4. Prediction results are returned to the UI for visualization and analysis

This architecture provides scalability, performance, and maintainability for the protein function prediction system.
