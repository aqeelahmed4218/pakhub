# PakHub 🏠

> **Multan's trusted real estate platform** — Browse, list, and connect for properties to rent or buy across Pakistan.

Built with **Next.js 15**, **MongoDB Atlas**, **Clerk Auth**, and **Firebase Storage**.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **Search & Filter** | Filter by type (rent/sale), amenities, price, offers |
| 🗺️ **Interactive Map** | Browse properties on a Leaflet map with location markers |
| 🏡 **Listing Management** | Create, edit, and delete your own property listings |
| 📸 **Image Uploads** | Upload up to 6 images per listing via Firebase Storage |
| 💬 **In-App Messaging** | Contact sellers and schedule property visits |
| 📥 **Inbox** | Receive and manage messages and visit requests |
| 🔐 **Authentication** | Secure sign-in/sign-up powered by Clerk |
| 📱 **Responsive UI** | Works seamlessly on desktop and mobile |
| 💰 **PKR Currency** | All prices displayed in Pakistani Rupees (₨) |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/atlas) + [Mongoose](https://mongoosejs.com/) |
| **Auth** | [Clerk](https://clerk.com/) |
| **Storage** | [Firebase Storage](https://firebase.google.com/) |
| **Maps** | [React Leaflet](https://react-leaflet.js.org/) |
| **Email** | [Resend](https://resend.com/) |
| **Webhooks** | [Svix](https://www.svix.com/) |

---

## 💬 How Contacting the Seller Works

You can contact any property listing owner directly on PakHub. Here is the operational flow:

### 1. Send an In-App Message
1. **Sign In**: Ensure you are signed in.
2. **Find a Listing**: Open a listing page. (Note: You cannot contact yourself on your own listings; the contact form will only show on listings owned by *other* users).
3. **Write Message**: Scroll down, write your message in the text area, and click **"Send Message"**.
4. **Access Message**: This saves a record in the `Message` database. The seller gets an alert under their **Inbox** navigation tab showing your name, email, the property link, and your message content.

### 2. Schedule a Property Visit (Visit Request)
1. On any listing details page, you will see a **"Schedule a Visit"** calendar.
2. Select your preferred **Date**, **Time**, and add a message.
3. Click **"Request Visit"**.
4. This adds a request in the database under `VisitRequest` and makes it accessible in the seller's dashboard under `/inbox` so they can confirm dates.

---

## 🚀 Guide to Running the Project on Another PC

Follow this complete step-by-step checklist to transfer and run this project on any other computer successfully.

### 1. Install Node.js
Ensure the destination PC has Node.js installed:
* Download and install **Node.js v18 or newer** (v20+ recommended) from [nodejs.org](https://nodejs.org/).

### 2. Copy the Project Files
Copy the main project folder (`PakHub-main`) onto the destination PC.

### 3. Install Dependencies
Open a terminal (Command Prompt, PowerShell, or Bash) in the project directory and run:
```sh
npm install --legacy-peer-deps
```
> ⚠️ **Note:** Always use `--legacy-peer-deps` to prevent peer dependency conflicts between React 18/19 and Next.js libraries.

### 4. Create the Environment Variables (`.env`)
Create a file named `.env` in the root of the project folder (at the same level as `package.json`). Populate it with the keys:

```env
# Clerk Authentication (Get these from your Clerk dashboard)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
SIGNING_SECRET=whsec_...

# MongoDB Atlas (Connection String)
MONGODB_URI=mongodb://raosufi15_db_user:x8vbftw6LoNxsdBf@ac-ipxofki-shard-00-00.m8wgkmp.mongodb.net:27017,ac-ipxofki-shard-00-01.m8wgkmp.mongodb.net:27017,ac-ipxofki-shard-00-02.m8wgkmp.mongodb.net:27017/next-estate?ssl=true&replicaSet=atlas-1zm3jy-shard-0&authSource=admin&retryWrites=true&w=majority

# App Base URL
URL=http://localhost:3000
```

### 5. Whitelist the New PC's IP in MongoDB Atlas
To prevent the `querySrv ECONNREFUSED` connection failure, MongoDB Atlas requires whitelisting the new PC's IP address:
1. Log in to [cloud.mongodb.com](https://cloud.mongodb.com).
2. Go to **Security** -> **Network Access** in the left sidebar.
3. Click **Add IP Address**.
4. Choose **"Allow Access from Anywhere"** (IP `0.0.0.0/0`) or click **"Add Current IP Address"** to whitelist the new PC's IP.
5. Click **Confirm** and wait ~30 seconds for it to become *Active*.

### 6. Run the Database Seeder
If you want to populate your database with 15 beautiful starter real estate listings (covers rents, sales, and discount offers):
```sh
node seed-listings.js
```

### 7. Launch the Local Development Server
Start the development environment:
```sh
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your web browser.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.js                  # Homepage with listing carousels
│   ├── layout.js                # Root layout with Header & ClerkProvider
│   ├── globals.css              # Global styles & CSS variables
│   ├── about/                   # About page
│   ├── search/                  # Search & filter page
│   ├── listing/[id]/            # Individual listing detail page
│   ├── create-listing/          # Create new listing form
│   ├── update-listing/[id]/     # Edit existing listing form
│   ├── my-listings/             # User's own listings dashboard
│   ├── inbox/                   # Messages & visit requests
│   ├── map/                     # Full map view
│   ├── sign-in/ & sign-up/      # Clerk auth pages
│   └── api/
│       ├── listing/get/         # POST — fetch/filter listings
│       ├── listing/create/      # POST — create a listing
│       ├── listing/update/      # POST — update a listing
│       ├── listing/delete/      # POST — delete a listing
│       ├── message/             # POST/GET — send/receive messages
│       ├── visit-request/       # POST/GET — schedule/list visits
│       └── webhooks/            # Clerk webhook handler
├── components/
│   ├── Header.jsx               # Navigation bar
│   ├── ListingItem.jsx          # Property card component
│   ├── ListingDetailsClient.jsx # Full listing detail view
│   ├── ListingMap.jsx           # Embedded Leaflet map
│   └── TeamMember.jsx           # About page team card
└── lib/
    ├── models/                  # Mongoose models (Listing, User, Message)
    ├── mongodb/mongoose.js      # MongoDB connection handler
    └── actions/                 # Server actions
```

---

## 🐛 Known Issues & Fixes Applied

The following bugs were identified and fixed during development:

- **Clerk Metadata Spelling:** Added double fallback (`userMongoId` / `userMogoId`) in client fetches to prevent auth and listing mismatches.
- **Next.js 15 Async Params:** Awaited `params` promise inside `listing/[id]/page.jsx` to prevent the null-prototype client error.
- **Show More API:** Changed "Show more" search paginator from invalid `GET` to correct `POST` fetch payload structure.
- **Tailwind Class typo:** Replaced invalid `transition-scale` class with `transition-transform` for proper card zoom hover effects.
- **Text Visibility:** Improved contrast of loading messages/empty lists from white text to readable `text-gray-500`.
- **Currency Symbols:** Swapped generic `$` symbol for local `₨` currency symbol on creation and detail pages.
- **Mongoose Connection Pooling:** Replaced the stale boolean connection flag with a robust check against `mongoose.connection.readyState` to prevent query buffering timeouts.

---

## 🚢 Deployment

### Deploy to Vercel (recommended)

1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo.
3. Add all environment variables from your `.env` file in the Vercel dashboard.
4. Deploy — Vercel handles the Next.js build automatically.

---

## 📄 License

[MIT](LICENSE)
