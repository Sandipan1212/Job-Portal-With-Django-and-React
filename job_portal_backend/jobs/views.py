from rest_framework import viewsets
from .models import JobPosting, JobApplication
from .serializers import JobPostingSerializer, JobApplicationSerializer
from rest_framework.parsers import MultiPartParser, FormParser ,JSONParser
from django.core.cache import cache

# class JobPostingViewSet(viewsets.ModelViewSet):
    # queryset = JobPosting.objects.all()
    # serializer_class = JobPostingSerializer
# 
# class JobApplicationViewSet(viewsets.ModelViewSet):
    # queryset = JobApplication.objects.all()
    # serializer_class = JobApplicationSerializer
    # parser_classes = (MultiPartParser, FormParser, JSONParser)  # Allow file uploads
    # def perform_create(self, serializer):
        # application = serializer.save()
        # print(f"New Job Application Created -> ID: {application.id}, Applicant: {application.applicant}, Job: {application.job}")
        # 
        


class JobPostingViewSet(viewsets.ModelViewSet):
    queryset = JobPosting.objects.all()
    serializer_class = JobPostingSerializer

    def get_queryset(self):
        cached_jobs = cache.get("job_postings")
        
        if cached_jobs:
            print("Fetching Job Postings from Redis Cache")
            return cached_jobs  # Return cached data

        jobs = super().get_queryset()
        print("Fetching Job Postings from PostgreSQL")
        cache.set("job_postings", jobs, timeout=60)  # Cache for 60 sec
        return jobs
       
        
        
        
        
        
class JobApplicationViewSet(viewsets.ModelViewSet):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def get_queryset(self):
        applications = super().get_queryset()
        print("Fetching Job Applications from PostgreSQL:")
        for app in applications:
            print(f"ID: {app.id}, Applicant: {app.applicant}, Job: {app.job}")
        return applications
