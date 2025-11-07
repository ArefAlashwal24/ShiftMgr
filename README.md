ShiftMgr — Rails API + React UI

Shift scheduling demo project developed with:

Backend: Ruby on Rails 7 API with PostgreSQL and JWT authentication

Frontend: React + Vite + TypeScript + TailwindCSS

E2E Testing: Cypress (record-ready for YouTube)

Supervisors: 
nurettin şenyer
ömer durmuş

ShiftMgr Team

YouTube Demo
Paste your video link here → [INSERT YOUTUBE LINK HERE]

Requirements

Ruby 3.x, Bundler

PostgreSQL running locally

Node.js 18+ and npm

Backend Setup

Navigate to the backend folder:

cd shiftmgr_api


Install dependencies:

bundle install


Set your local PostgreSQL credentials in config/database.yml.

Initialize and seed:

bundle exec rails db:create db:migrate
bundle exec rails runner "u=User.find_or_create_by!(email:'admin@example.com'){_1.password='password';_1.role='admin'}; l=Location.find_or_create_by!(name:'Main Store'); Shift.find_or_create_by!(user:u,location:l,starts_at:Time.now+1.day,ends_at:Time.now+1.day+4.hours,notes:'Morning shift')"


Run the server:

bundle exec rails s


Frontend Setup

Navigate to frontend:

cd shiftmgr_web


Create an .env file or copy .env.example:

VITE_API_URL=http://localhost:3000


Install dependencies:

npm install


Start the dev server:

npm run dev


Cypress End-to-End Testing

Make sure the API is running at http://localhost:3000

Run Cypress:

npm run cypress:open


or headless:

npm run test:e2e


Recorded videos are saved in cypress/videos/.

Minimal API Endpoints

POST /auth/register → register new user

POST /auth/login → get token

GET /locations, POST /locations

GET /shifts, POST /shifts, PUT/PATCH /shifts/:id, DELETE /shifts/:id

Notes

Ensure CORS in shiftmgr_api/config/initializers/cors.rb allows http://localhost:5173

JWT tokens are stored in localStorage

Works best with Node 18+ and PostgreSQL 14+

License
MIT License

Credits
Developed by Aref Ahmed , under supervision of nurettin şenyer and ömer durmuş.