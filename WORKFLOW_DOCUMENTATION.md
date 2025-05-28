# 🎨 Textile Design Generator - Complete Workflow Documentation

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Architecture Overview](#️-architecture-overview)
- [Project Structure](#-project-structure)
- [Complete Workflow](#-complete-workflow)
- [Technology Stack](#-technology-stack)
- [API Documentation](#-api-documentation)
- [Data Flow](#-data-flow)
- [Key Features](#-key-features)
- [Deployment](#-deployment)

## 🎯 Project Overview

The Textile Design Generator is a sophisticated AI-powered system that creates, edits, and processes textile designs using multiple AI models. It provides a complete end-to-end solution from concept to production-ready patterns.

### Core Capabilities:

- **AI-Powered Design Generation** using Google Gemini, OpenAI DALL-E, and Claude
- **Advanced Color Analysis & Editing** with K-means clustering
- **Pattern Tiling** for textile production
- **Reference Image Support** for guided generation
- **Cloud Storage Integration** with Cloudinary
- **Production-Ready API** with FastAPI and Node.js gateway

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Node.js        │    │   Python        │
│   (Vercel)      │◄──►│   Gateway        │◄──►│   FastAPI       │
│   Port: 443     │    │   Port: 3000     │    │   Port: 8000    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                        │
                                │                        ▼
                                │               ┌─────────────────┐
                                │               │   AI Models     │
                                │               │   - Gemini      │
                                │               │   - DALL-E      │
                                │               │   - Claude      │
                                │               └─────────────────┘
                                │                        │
                                ▼                        ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │   Cloudinary    │    │   Image         │
                       │   (Storage)     │    │   Processing    │
                       └─────────────────┘    └─────────────────┘
```

## 📁 Project Structure

```
Textile_Design_Generator/
├── 📄 textile_api_server.py      # FastAPI web server (API layer)
├── 📄 Textile_Design_Generator.py # Core business logic & AI integration
├── 📄 requirements.txt           # Python dependencies
├── 🔐 key.pem & cert.pem        # SSL certificates for HTTPS
├── 📁 created_images/           # Generated images storage
├── 📁 uploads/                  # Temporary file uploads
├── 📁 tmp_refs/                # Temporary reference images
├── 📁 nodejs/                  # Node.js API Gateway
│   ├── 📄 server.js            # Express server
│   ├── 📄 package.json         # Node.js dependencies
│   ├── 📄 .env                 # Environment configuration
│   └── 📄 README.md            # Gateway documentation
├── 📄 T_D_G_script.sh          # Linux startup script
├── 📄 start_gateway.bat        # Windows startup script
└── 📄 WORKFLOW_DOCUMENTATION.md # This file
```

## 🔄 Complete Workflow

### 1. 🎨 Image Generation Workflow

#### Step 1: Prompt Creation & Optimization

```python
def create_prompt(description: str, style: str, color_info: str, simplicity: int):
    # Creates optimized prompt for AI models
    # Uses Claude AI to refine and enhance prompts
```

**Process Flow:**

1. **User Input** → Description, style, colors, simplicity level
2. **Claude AI Processing** → Refines and optimizes the prompt
3. **Enhanced Prompt** → Ready for image generation

#### Step 2: AI Model Selection & Generation

**🤖 Primary: Google Gemini**

- Model: `gemini-2.0-flash-preview-image-generation`
- Supports both text-to-image and image-to-image
- Handles reference images for guided generation

**🎨 Alternative: OpenAI DALL-E**

- Used for high complexity designs (simplicity > 5)
- Fallback option for reliability

**Generation Types:**

- **Without Reference**: Pure text-to-image generation
- **With Reference**: Uses reference images to guide style and composition

#### Step 3: Cloud Storage & Delivery

```python
# Image processing pipeline
1. AI generates image → Base64 encoded data
2. Save locally → Temporary file creation
3. Upload to Cloudinary → Cloud storage with CDN
4. Return URL → Accessible image URL
5. Cleanup → Delete temporary local files
```

### 2. 🖼️ Image Editing Workflow

#### Advanced Image Modification

```python
def edit_image_gemini(description, image_url):
    # Downloads existing image
    # Encodes for AI processing
    # Applies modifications using Gemini
    # Returns new edited image URL
```

**Process:**

1. **Input** → Original image URL + edit description
2. **Download & Encode** → Fetch image and prepare for AI
3. **AI Processing** → Gemini applies modifications
4. **Upload Result** → New edited image to Cloudinary
5. **Return URL** → New image URL for frontend

### 3. 🌈 Advanced Color Analysis & Editing

This is the most sophisticated feature of the system:

#### Step 1: Color Indexing with K-Means Clustering

```python
class ColorIndex:
    def __init__(self, image_path, k=10):
        # Converts image to RGB array
        # Applies K-means clustering to find dominant colors
        # Creates color index mapping for each pixel
        # Generates color palette with percentages
```

**Scientific Color Analysis:**

- **K-means Clustering** → Identifies dominant colors
- **Pixel Mapping** → Each pixel assigned to color index
- **Statistical Analysis** → Color distribution percentages
- **Color Naming** → Approximate color names using webcolors

#### Step 2: Precise Color Replacement

```python
def replace_colors_on_indexed_image(indexed_image_url, palette_url, index_list, target_colors):
    # Downloads indexed image and color palette
    # Replaces specified color indices with new colors
    # Maintains image structure while changing colors
    # Generates new image with updated palette
```

**Advanced Color Workflow:**

**Create Index (`/create_index`):**

1. Download image from Cloudinary
2. Apply K-means clustering (default: 10 colors)
3. Create indexed image (pixels mapped to color indices)
4. Generate color palette JSON with hex codes, names, percentages
5. Upload indexed image and palette to Cloudinary
6. Return URLs for both files

**Edit Colors (`/edit_colors`):**

1. Download indexed image and palette JSON
2. Parse color replacement instructions
3. Apply color changes to indexed image
4. Generate new image with updated colors
5. Upload result to Cloudinary
6. Return new image URL

### 4. 🔲 Pattern Tiling for Textile Production

#### Seamless Pattern Generation

```python
def tile_image_grid(image_url, grid_rows=5, grid_cols=5):
    # Downloads source image
    # Calculates grid dimensions
    # Creates seamless repeating pattern
    # Optimizes for textile production
```

**Tiling Process:**

1. **Input** → Single design + grid dimensions (rows × columns)
2. **Pattern Calculation** → Determines optimal tile size
3. **Grid Creation** → Repeats image in specified grid
4. **Seamless Joining** → Ensures pattern continuity
5. **Production Output** → Textile-ready pattern file

## 🔧 Technology Stack

### AI & Machine Learning

- **🤖 Google Gemini 2.0** - Primary image generation and editing
- **🎨 OpenAI DALL-E** - Alternative image generation
- **🧠 Claude (Anthropic)** - Prompt optimization and refinement
- **🔬 scikit-learn** - K-means clustering for color analysis
- **📊 NumPy** - Numerical operations and array processing

### Backend Technologies

- **🐍 Python 3.11+** - Core application logic
- **⚡ FastAPI** - High-performance web API framework
- **🟢 Node.js** - API Gateway and proxy layer
- **🚀 Express.js** - Node.js web framework
- **📡 Axios** - HTTP client for API communication

### Image Processing & Storage

- **🖼️ Pillow (PIL)** - Image manipulation and processing
- **☁️ Cloudinary** - Cloud storage, CDN, and image optimization
- **🎨 webcolors** - Color name approximation
- **📊 matplotlib** - Color palette visualization

### Infrastructure & Security

- **🔒 HTTPS/SSL** - Secure communication with certificates
- **🌐 CORS** - Cross-origin resource sharing
- **🛡️ Helmet.js** - Security headers and protection
- **⏱️ Rate Limiting** - API usage control
- **📝 Morgan** - HTTP request logging

### Development & Deployment

- **🔄 uvicorn** - ASGI server for FastAPI
- **📦 npm** - Node.js package management
- **🐳 Docker** - Containerization (optional)
- **⚙️ systemd** - Linux service management
- **☁️ Azure** - Cloud deployment platform

## 🌐 API Documentation

### FastAPI Endpoints (Python - Port 8000)

#### 1. Create Image

```http
POST /create_image
Content-Type: application/x-www-form-urlencoded

Parameters:
- description: string - Design description
- style: string - "standalone" or "repetitive pattern"
- color_info: string - Color requirements (e.g., "3 colors", "red and blue")
- simplicity: integer - Complexity level (1-10)
- n_options: integer - Number of variations to generate
- reference_urls: string - Comma-separated reference image URLs (optional)

Response:
{
  "message": "2 image(s) generated",
  "cloudinary_urls": ["https://res.cloudinary.com/...", "https://res.cloudinary.com/..."]
}
```

#### 2. Edit Image

```http
POST /edit_image
Content-Type: application/x-www-form-urlencoded

Parameters:
- description: string - Edit instructions
- image: string - Image URL to edit

Response:
{
  "message": "Image edited successfully",
  "filename": "https://res.cloudinary.com/..."
}
```

#### 3. Create Color Index

```http
POST /create_index
Content-Type: application/x-www-form-urlencoded

Parameters:
- image: string - Image URL to analyze

Response:
{
  "indexed_image_path": "https://res.cloudinary.com/...",
  "palette": "https://res.cloudinary.com/palette.json"
}
```

#### 4. Edit Colors

```http
POST /edit_colors
Content-Type: application/x-www-form-urlencoded

Parameters:
- image: string - Indexed image URL
- palette_json_url: string - Palette JSON URL
- indices: string - Color indices to change (e.g., "0,2,5")
- hex_colors: string - New hex colors (e.g., "#FF0000,#00FF00,#0000FF")

Response:
{
  "message": "Colors edited successfully",
  "new_image_url": "https://res.cloudinary.com/...",
  "updated_palette": "https://res.cloudinary.com/new_palette.json"
}
```

#### 5. Tile Image Grid

```http
POST /tile_image_grid
Content-Type: application/x-www-form-urlencoded

Parameters:
- image: string - Image URL to tile
- rows: integer - Number of rows (default: 5)
- cols: integer - Number of columns (default: 5)

Response:
{
  "message": "Image tiled",
  "filename": "https://res.cloudinary.com/..."
}
```

### Node.js Gateway Endpoints (Port 3000)

All Python endpoints are available through the gateway with `/api/` prefix:

- `POST /api/create_image` - Proxies to Python `/create_image`
- `POST /api/edit_image` - Proxies to Python `/edit_image`
- `POST /api/create_index` - Proxies to Python `/create_index`
- `POST /api/edit_colors` - Proxies to Python `/edit_colors`
- `POST /api/tile_image_grid` - Proxies to Python `/tile_image_grid`

Additional gateway endpoints:

- `GET /` - Gateway information
- `GET /health` - Health check with system info
- `GET /docs` - API documentation

## 📊 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND LAYER                          │
│  ┌─────────────────┐    ┌─────────────────┐                   │
│  │   React/Vue     │    │   Vercel        │                   │
│  │   Frontend      │◄──►│   Hosting       │                   │
│  │   (HTTPS)       │    │   (CDN)         │                   │
│  └─────────────────┘    └─────────────────┘                   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼ HTTPS Request
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY LAYER                         │
│  ┌─────────────────┐    ┌─────────────────┐                   │
│  │   Node.js       │    │   Express.js    │                   │
│  │   Gateway       │◄──►│   Middleware    │                   │
│  │   (Port 3000)   │    │   (CORS/Auth)   │                   │
│  └─────────────────┘    └─────────────────┘                   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼ Axios Proxy
┌─────────────────────────────────────────────────────────────────┐
│                     PYTHON API LAYER                           │
│  ┌─────────────────┐    ┌─────────────────┐                   │
│  │   FastAPI       │    │   Core Logic    │                   │
│  │   Server        │◄──►│   Functions     │                   │
│  │   (Port 8000)   │    │   (Business)    │                   │
│  └─────────────────┘    └─────────────────┘                   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼ API Calls
┌─────────────────────────────────────────────────────────────────┐
│                        AI MODELS LAYER                         │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐  │
│  │   Google        │ │   OpenAI        │ │   Anthropic     │  │
│  │   Gemini        │ │   DALL-E        │ │   Claude        │  │
│  │   (Primary)     │ │   (Alternative) │ │   (Prompts)     │  │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼ Image Processing
┌─────────────────────────────────────────────────────────────────┐
│                    PROCESSING & STORAGE LAYER                  │
│  ┌─────────────────┐    ┌─────────────────┐                   │
│  │   Image         │    │   Cloudinary    │                   │
│  │   Processing    │◄──►│   Storage       │                   │
│  │   (PIL/NumPy)   │    │   (CDN)         │                   │
│  └─────────────────┘    └─────────────────┘                   │
└─────────────────────────────────────────────────────────────────┘
```

## 🎯 Key Features

### 1. Multi-Model AI Integration

- **Intelligent Model Selection**: Automatically chooses the best AI model based on complexity and requirements
- **Fallback Mechanisms**: Ensures reliability with multiple AI providers
- **Reference Image Support**: Guided generation using reference images for style consistency

### 2. Advanced Color Management

- **Scientific Color Analysis**: K-means clustering for precise color extraction
- **Color Index Mapping**: Each pixel mapped to specific color indices
- **Precise Color Replacement**: Change specific colors while maintaining image structure
- **Color Palette Export**: JSON format with hex codes, names, and percentages

### 3. Textile-Specific Features

- **Pattern Tiling**: Creates seamless repeating patterns for textile production
- **Grid Generation**: Customizable rows and columns for different textile applications
- **Production-Ready Output**: High-resolution images suitable for manufacturing

### 4. Production-Ready Architecture

- **Cloud Storage Integration**: Cloudinary for reliable image storage and CDN
- **API Gateway**: Node.js proxy for enhanced security and performance
- **SSL/HTTPS Support**: Secure communication with automatic certificate detection
- **Comprehensive Error Handling**: Robust error management and logging

### 5. Developer-Friendly Design

- **RESTful API**: Standard HTTP methods and status codes
- **Comprehensive Documentation**: Detailed API docs and examples
- **Easy Integration**: Simple endpoints for frontend integration
- **Flexible Configuration**: Environment-based configuration management

## 🚀 Deployment

### Local Development Setup

#### 1. Python API Server

```bash
# Install dependencies
pip install -r requirements.txt

# Start HTTPS server
python textile_api_server.py

# Server runs on: https://localhost:8000
```

#### 2. Node.js Gateway

```bash
# Navigate to nodejs directory
cd nodejs

# Install dependencies
npm install

# Start gateway
npm start

# Gateway runs on: http://localhost:3000 or https://localhost:3000
```

### Production Deployment

#### 1. Azure Cloud Deployment

- **Automated CI/CD**: GitHub Actions workflow
- **VM Deployment**: Azure Virtual Machine
- **SSL Certificates**: Automatic generation with OpenSSL
- **Service Management**: systemd services for auto-restart

#### 2. Environment Configuration

```bash
# Python API
export GEMINI_API_KEY="your_gemini_key"
export OPENAI_API_KEY="your_openai_key"
export CLAUDE_API_KEY="your_claude_key"

# Node.js Gateway
export NODE_ENV="production"
export PORT="3000"
export PYTHON_API_URL="https://your-python-api.com"
```

#### 3. Service Management

```bash
# Python API Service
sudo systemctl enable Textile_Design_Generator.service
sudo systemctl start Textile_Design_Generator.service

# Node.js Gateway Service
sudo systemctl enable gateway_service.service
sudo systemctl start gateway_service.service
```

### Monitoring & Maintenance

#### Health Checks

- **Python API**: `GET https://localhost:8000/`
- **Node.js Gateway**: `GET https://localhost:3000/health`

#### Log Monitoring

- **Python Logs**: Console output and uvicorn logs
- **Node.js Logs**: Morgan HTTP logging and console output
- **System Logs**: systemd journal logs

#### Performance Optimization

- **Image Compression**: Cloudinary automatic optimization
- **CDN Delivery**: Global content delivery network
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Request Caching**: Browser and CDN caching headers

---

## 📞 Support & Documentation

- **API Documentation**: Visit `/docs` endpoint when server is running
- **Health Monitoring**: Use `/health` endpoint for system status
- **Error Handling**: Comprehensive error responses with debugging info
- **Logging**: Detailed request/response logging for troubleshooting

This documentation provides a complete overview of the Textile Design Generator workflow, from initial setup to production deployment. The system represents a sophisticated, production-ready solution for AI-powered textile design generation and editing.
