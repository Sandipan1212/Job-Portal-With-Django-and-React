from django.contrib import admin
from .models import JobPosting, JobApplication

@admin.register(JobPosting)
class JobPostingAdmin(admin.ModelAdmin):
    list_display = ['title', 'company_name', 'location', 'created_at']
    search_fields = ['title', 'company_name', 'location']
    list_filter = ['created_at']

@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ['job_posting', 'user', 'resume', 'cover_letter']
    search_fields = ['user__username', 'job_posting__title']
