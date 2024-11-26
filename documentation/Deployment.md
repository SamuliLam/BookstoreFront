# Deployment Guide for Online Bookstore Frontend

## Table of Contents
- [Prerequisites](#prerequisites)
- [Building the Application](#building-the-application)
- [Deploying the Application](#deploying-the-application)
- [Hosting Options](#hosting-options)
- [Environment Configuration](#environment-configuration)

## Prerequisites
Before deploying the frontend, ensure you have the following tools installed:

- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher)
- **Git**

## Building the Application
1. **Clone the repository:**

    ```bash
    git clone https://github.com/SamuliLam/BookstoreFront.git
    cd BookstoreFront
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Build the application for production:**

    ```bash
    npm run build
    ```

    This will create a `build/` folder containing the optimized production files for deployment.

## Deploying the Application
Choose a hosting platform from the following options:

### Using Netlify:
- **Option 1:** Link your GitHub repository to Netlify for automatic deployment on each push:
  - Go to [Netlify](https://www.netlify.com/), sign in, and click "New site from Git."
  - Choose your GitHub repository and select the branch.
  - Netlify will automatically build and deploy your app.
  
- **Option 2:** Upload the contents of the `build/` folder manually:
  - Go to your Netlify dashboard and drag the `build` folder into the "Drag & Drop" section.

### Using Vercel:
1. Install Vercel CLI if you don't have it yet:

    ```bash
    npm install -g vercel
    ```

2. Deploy using the following command:

    ```bash
    vercel
    ```

    Vercel will walk you through the deployment process and deploy the app automatically.

### Using AWS S3:
1. Create an S3 bucket in the AWS Management Console.
2. Upload the contents of the `build/` folder to the S3 bucket.
3. Enable "Static website hosting" in the S3 bucket properties.
4. Set the **Index document** as `index.html` and the **Error document** as `index.html` to ensure proper routing.
5. Optionally, use **AWS CloudFront** to serve the content with lower latency across different regions.

## Hosting Options
- **Vercel:** Seamless integration with GitHub, automatic deployments on each push.
- **Netlify:** Great for static sites with easy deployment steps and CI/CD support.
- **AWS S3:** Static file hosting, can be combined with CloudFront for CDN support to improve performance.

## Environment Configuration
Before deployment, ensure that your environment variables are correctly set:

- **REACT_APP_API_URL:** Set this to the URL of your backend API (e.g., `https://api.yourdomain.com`).
- **REACT_APP_ENV:** Define whether the app is in `development` or `production` mode.

Update these values in the `.env` file in the root of the project:

```env
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_ENV=production
