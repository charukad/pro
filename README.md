# Forty Two AI Horizon - Services Portal

A modern web application showcasing our comprehensive software development services with interactive service details and inquiry forms.

## Features

### Our Services Section
- **Interactive Service Cards**: Click "Learn More" on any service card to view detailed information
- **Service Details Modal**: Shows comprehensive information including:
  - Service highlights and features
  - Technologies used
  - Deliverables and timeline
  - Starting prices
- **Service Inquiry Form**: Direct inquiry form for each service that connects to the backend
- **Email Notifications**: Automatic email confirmations for inquiries

### Services Offered
1. **Web Development** - Custom web applications with modern frameworks
2. **Mobile Development** - Native and cross-platform mobile apps
3. **Backend & APIs** - Robust backend systems and API development
4. **Cloud & DevOps** - Cloud infrastructure and CI/CD pipelines
5. **QA & Testing** - Comprehensive testing strategies
6. **UI/UX Design** - User-centered design solutions

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Radix UI components
- React Router for navigation
- React Query for state management

### Backend
- Node.js with Express
- Nodemailer for email functionality
- CORS for cross-origin requests
- Body-parser for request parsing

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd forty-two-ai-horizon
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the environment template
   cp env.example .env
   
   # Edit .env with your actual values
   nano .env
   ```

4. **Configure Email Settings**
   Update the `.env` file with your email configuration:
   ```env
   PORT=3001
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   INQUIRY_EMAIL=inquiries@yourcompany.com
   CONTACT_EMAIL=contact@yourcompany.com
   NODE_ENV=development
   ```

   **Note**: For Gmail, you'll need to:
   - Enable 2-factor authentication
   - Generate an app-specific password
   - Use the app password in `EMAIL_PASS`

### Running the Application

#### Option 1: Run Frontend and Backend Separately

**Frontend (React app):**
```bash
npm run dev
```
This starts the frontend on `http://localhost:5173`

**Backend (Express server):**
```bash
npm run server
```
This starts the backend server on `http://localhost:3001`

#### Option 2: Run Both Simultaneously
```bash
npm run dev:full
```
This starts both frontend and backend concurrently

### Development Commands

```bash
# Frontend development
npm run dev

# Backend development (with auto-reload)
npm run server:dev

# Run both frontend and backend
npm run dev:full

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## API Endpoints

### Service Inquiry
- **POST** `/api/service-inquiry`
- Handles service inquiry form submissions
- Sends email notifications to both client and company
- Required fields: name, email, serviceType, message

### Contact Form
- **POST** `/api/contact`
- Handles general contact form submissions
- Required fields: name, email, subject, message

### Services Data
- **GET** `/api/services` - Get all services
- **GET** `/api/services/:id` - Get specific service by ID

### Health Check
- **GET** `/api/health` - Server health check

## Usage

1. **Browse Services**: View all available services on the main page
2. **Learn More**: Click "Learn More" on any service card to see detailed information
3. **Get Started**: Click "Get Started Today" in the service detail modal to open the inquiry form
4. **Submit Inquiry**: Fill out the form with your project details and submit
5. **Confirmation**: Receive email confirmation and expect a response within 24 hours

## Customization

### Adding New Services
Edit `src/components/Services.tsx` and add new service objects to the `services` array with the following structure:

```javascript
{
  icon: YourIcon,
  title: 'Service Name',
  description: 'Brief description',
  features: ['Feature 1', 'Feature 2'],
  detailedDescription: 'Detailed description',
  serviceHighlights: ['Highlight 1', 'Highlight 2'],
  technologies: ['Tech 1', 'Tech 2'],
  deliverables: ['Deliverable 1', 'Deliverable 2'],
  timeline: 'X-Y weeks',
  startingPrice: '$X,XXX',
}
```

### Styling
The project uses Tailwind CSS with custom utility classes defined in `src/index.css`. Key classes include:
- `glass` - Glassmorphism effect
- `glass-dark` - Dark glassmorphism variant
- `gradient-text` - Gradient text effect
- `glow-blue`, `glow-purple` - Glow effects

## Email Configuration

For production, configure your email settings:

1. **Gmail**: Use app-specific passwords
2. **SMTP**: Configure custom SMTP settings in `server/index.js`
3. **Email Templates**: Customize email templates in the backend API handlers

## Deployment

### Frontend
The frontend can be deployed to any static hosting service:
- Vercel
- Netlify
- AWS S3 + CloudFront

### Backend
The backend can be deployed to:
- Heroku
- AWS Lambda
- DigitalOcean
- Railway

Make sure to set environment variables in your hosting platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, contact us through the website's contact form or email us directly at your-email@company.com.
#   4 2 . A I 
 
 #   4 2 . A I - c o m p a n y  
 