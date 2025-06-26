project:

  name: "🍱 CraftDot"
  
  tagline:
  
  "Your Food. Your Way. Customizable Ordering App 🍔✨"
  
  short_description: >
  
    CraftDot lets users log in, customize meals, and place food orders from restaurants they choose.
    
    Built with React Native and powered by Supabase, it's designed to fight food waste by giving control to the user.

  project_status: "✅ User-Side Complete "
  
  summary:
  
    - "✅ Login, Signup, and Authentication with Supabase"
    
    - "✅ Users can browse, customize, and place orders"
    
    - "✅ Admin/backend is connected using Supabase (PostgreSQL)"
    
    - "🚧 Final tweaks needed for production deployment"
    
    - "❌ Restaurant-side module not created"

  features:
  
    - "🔐 User Auth (Sign up & Login)"
    
    - "📋 View & Customize Recipes"
    
    - "🛒 Place Food Orders"
    
    - "🔗 Supabase-Connected Realtime Backend"
    
    - "🌱 Minimal Waste: No subscriptions, just user-chosen meals"

  tech_stack:
  
    frontend:
      - "⚛️ React Native (Expo)"
      
      - "📲 React Navigation"
      
    backend:
      - "🗃️ Supabase (PostgreSQL)"

      - "🔐 firebase (Authentication)"
      
      - "📡 Supabase JS SDK for API calls"

  project_structure:
  
    base: "📁 CraftDot/"
    folders:
      - "📁 src/"
      - " ├── components/"
      - " ├── screens/"
      - " ├── navigation/"
      - " ├── services/"
      - " └── assets/"
      - "📁 supabase/"
      - " ├── supabaseClient.js"
      - " └── auth.js"
    files:
      - "📄 App.js"

  setup_instructions:
  
    - "🔻 Clone: git clone https://github.com/BGanesh03/CraftDot.git"
    
    - "📂 Navigate: cd CraftDot"
    
    - "📦 Install: npm install"
    
    - "🔑 Add Supabase keys in supabaseClient.js" Get the keys from supabase cloud

    - "🔑 Add firebase config in firebaseauth.js" Get the config from firebase cloud
    
    - "🚀 Run: expo start"

  author:
  
    name: "👨‍💻 Ganesh B"
    
    role: "Final Year MCA Student"
    
    expertise: "MERN Stack, Java Spring Boot, React Native, Supabase"
    
    status_note: "💡 This is a learning-focused project and is not being developed further."

  development_scope:
  
    user_side:
      status: "✅ Complete"
      notes: "Users can log in, view items, and place orders."
    restaurant_side:
      status: "❌ Not Developed"
      notes: "No admin or restaurant portal created or connected."
    deployment:
      status: "🛠️ Partially Done"
      notes: "Minor polishing and testing pending — app not deployed."

  license: "🆓 Open-source | Use for learning and demo purposes"
