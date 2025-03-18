Job Portal Backend 🏢💼
This is a Django-based Job Portal where users can search for job postings and apply for jobs. The project uses Django, PostgreSQL, Redis Cluster, and React for the frontend.

📌 Features
✔️ User Authentication (Login, Signup)
✔️ Job Posting Management (CRUD operations)
✔️ Job Applications (Users can apply for jobs)
✔️ Redis Caching for performance optimization
✔️ REST API built with Django Rest Framework (DRF)

🛠 Tech Stack
Backend: Django, Django REST Framework
Database: PostgreSQL
Cache: Redis Cluster
Frontend: React (Separate Repo)
🚀 Installation & Setup
1️⃣ Clone the Repository
sh
Copy
Edit
git clone https://github.com/your-username/job-portal.git
cd job-portal/job_portal_backend
2️⃣ Create a Virtual Environment
sh
Copy
Edit
python -m venv myvenv
source myvenv/bin/activate   # For macOS/Linux
myvenv\Scripts\activate      # For Windows
3️⃣ Install Dependencies
sh
Copy
Edit
pip install -r requirements.txt
4️⃣ Setup PostgreSQL Database
Create a database in PostgreSQL
Update settings.py:
python
Copy
Edit
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'job_portal_db',
        'USER': 'your_db_user',
        'PASSWORD': 'your_db_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
5️⃣ Apply Migrations
sh
Copy
Edit
python manage.py makemigrations
python manage.py migrate
6️⃣ Setup Redis Cluster
Start Redis Cluster with 6 nodes (3 masters, 3 replicas):

sh
Copy
Edit
redis-server --port 7000 --cluster-enabled yes --cluster-config-file nodes-7000.conf --cluster-node-timeout 5000 --appendonly yes
redis-server --port 7001 --cluster-enabled yes --cluster-config-file nodes-7001.conf --cluster-node-timeout 5000 --appendonly yes
redis-server --port 7002 --cluster-enabled yes --cluster-config-file nodes-7002.conf --cluster-node-timeout 5000 --appendonly yes
redis-server --port 7003 --cluster-enabled yes --cluster-config-file nodes-7003.conf --cluster-node-timeout 5000 --appendonly yes
redis-server --port 7004 --cluster-enabled yes --cluster-config-file nodes-7004.conf --cluster-node-timeout 5000 --appendonly yes
redis-server --port 7005 --cluster-enabled yes --cluster-config-file nodes-7005.conf --cluster-node-timeout 5000 --appendonly yes
Now, create the cluster:

sh
Copy
Edit
redis-cli --cluster create 127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002 127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005 --cluster-replicas 1
7️⃣ Configure Redis in Django
Update settings.py:

python
Copy
Edit
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://127.0.0.1:7000,127.0.0.1:7001,127.0.0.1:7002/0",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClusterClient",
        }
    }
}
8️⃣ Create a Superuser
sh
Copy
Edit
python manage.py createsuperuser
9️⃣ Run the Server
sh
Copy
Edit
python manage.py runserver
Django API will be available at: http://127.0.0.1:8000/

📄 API Endpoints
Authentication
POST /api/register/ → Register User
POST /api/login/ → Login User
Job Postings
GET /api/jobs/ → List all jobs
POST /api/jobs/ → Create a job (Admin Only)
GET /api/jobs/{id}/ → Retrieve a job
PUT /api/jobs/{id}/ → Update a job (Admin Only)
DELETE /api/jobs/{id}/ → Delete a job (Admin Only)
Job Applications
POST /api/jobs/{id}/apply/ → Apply for a job
GET /api/my-applications/ → List user’s applications
📦 Folder Structure
bash
Copy
Edit
job_portal_backend/
│── job_portal_backend/    # Django Project Config
│── jobs/                  # Job Posting & Applications App
│── users/                 # User Authentication App
│── static/                # Static Files
│── media/                 # Uploaded Files (Resumes)
│── myvenv/                # Virtual Environment
│── manage.py              # Django CLI Tool
│── requirements.txt       # Project Dependencies
│── README.md              # Documentation
🎯 Future Improvements
Implement RabbitMQ & Celery for background tasks
Add Job Search & Filters
Enhance User Dashboard & Notifications
