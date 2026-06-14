# SmartFarmer

Hello there...

Welcome to Smart Farmer. Smart Farmer is a mobile-first agricultural information platform designed to support smallholder farmers in South Sudan. The application provides crop information, educational farming resources, planting records, and a USSD simulator prototype to improve access to agricultural knowledge.

This project was developed as part of the BSc Software Engineering program at African Leadership University.

Developer: Nyabon Deng Adut

Program: BSc Software Engineering

Supervisor: Tunde Isiaq Gbadamosi

Live Demo
https://smrtfarmer.netlify.app/
Smart Farmer is deployed on Netlify:
Demo: https://youtu.be/MPbeYiFFmAA
# Features
Educational Modules

The platform provides educational content covering:

Planting techniques
Pest management
Post-harvest handling
Crop Information

Farmers can access information on major crops grown in South Sudan, including:

Sorghum
Maize
Millet
Groundnuts
Cassava

Planting Log

Farmers can record and manage planting activities through a simple crop monitoring log.

Multi-Language Support

The application is designed to support Arabic, English and Bari. English voice output is currently implemented; Arabic and Bari are planned for the next phase.

USSD Simulator

A USSD interface has been prototyped in Figma, demonstrating how farmers can access agricultural information through feature phones via 131#.

Voice Assistance

The application uses browser speech synthesis to read crop information aloud for users with limited literacy.

Responsive Design

The application follows a mobile-first design approach and adapts to different screen sizes.

# Technologies Used
Frontend
HTML5
CSS3
JavaScript

# Design Tools
Figma
GitHub

# Deployment
Netlify

Running the Project Locally
Clone the repository:
git clone https://github.com/Nyabondeng/smartfarmer.git
Navigate to the project folder.
Open the project using Visual Studio Code.
Run the project using the Live Server extension or open index.html directly in a browser.

# Design Resources
Figma Prototype

https://www.figma.com/design/mxazJuKrc45lla3wxTjcgf/Smart-Farmer-App?node-id=0-1&p=f&t=Vns30Do8GynahRZA-0

The Figma prototype includes wireframes and mockups for all 9 screens: Welcome screen, About, Crop Info, Education, Crop Log, Contact, Language Switcher overlay, and a 3-screen USSD Simulator (*131# main menu, crop submenu, and information screen)

# Wireframes
Wireframes and design documentation are included 

https://docs.google.com/document/d/1csu_92AEcQ9iLpueJEOzYsfSYh4TSLN3nRx6udDLXoo/edit?tab=t.0

# Planned Backend Architecture

The current version focuses on frontend functionality and user experience validation.

The proposed backend architecture includes:

Backend Technologies
Node.js
Express.js
PostgreSQL
Africa's Talking API (USSD Integration)

# Technical Scope: The platform will include:
USSD dashboard accessible via short code (e.g., *131#) on any phone
An offline web application for farmers with a smartphone or a basic browser
Crop information for 5 staple crops
Educational modules (planting, pest management, post-harvest handling)
Voice output in Bari and Arabic (on web)
Basic crop monitoring log using local storage (on web)

# Out of Scope:
AI-based yield predictions
National deployment
Native mobile apps
Integration with government systems or financial services
Automated sensor-based monitoring

## Current Status

This is an initial software demo. The following pages are 
fully implemented and live: Home, About, and Crop Info 
(with English voice output).

Education, Crop Log, and Contact pages are built and in 
progress. Arabic and Bari voice output, the USSD backend, 
and database connection are planned for the next phase.

# Proposed Deployment
Frontend: Netlify (Already deployed)
Backend: Render
Database: PostgreSQL


Contact
Nyabon Deng Adut

Email: nyabondeng0@gmail.com

GitHub: https://github.com/Nyabondeng
