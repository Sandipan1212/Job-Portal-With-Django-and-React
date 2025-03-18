from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobPostingViewSet, JobApplicationViewSet

router = DefaultRouter()
router.register(r'job-postings', JobPostingViewSet)
router.register(r'job-applications', JobApplicationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
