from django.urls import path
from . import views
from .views import ExportStudentsToExcel, EventList, InventoryList, ExportInventoryToExcel, PodEventList

urlpatterns = [
    path('products/', views.getProducts, name='products'),
    path('products/create/', views.createProduct, name='product-create'),
    path('products/upload/', views.uploadImage, name='image-upload'),
    path('products/<str:pk>/', views.getProduct, name='product'),
    path('products/update/<str:pk>/', views.updateProduct, name='product-update'),
    path('products/delete/<str:pk>/', views.deleteProduct, name='product-delete'),

    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/', views.getUsers, name='users'),
    path('users/delete/<str:pk>/', views.deleteUser, name='user-delete'),
    path('users/register/', views.registerUser, name='register'),
    path('users/profile/', views.getUserProfile, name='users-profile'),
    path('users/update/<str:pk>/', views.updateUser, name='user-update'),
    path('users/<str:pk>/', views.getUserById, name='user'),
    path('users/profile/update/', views.updateUserProfile, name='user-profile-update'),

    path('students/', views.getStudents, name='students'),
    path('export-students-to-excel/', ExportStudentsToExcel.as_view(), name='export_students_to_excel'),
    path('students/<str:pk>/', views.getStudent, name='student'),
    path('students/create/', views.createStudent, name='student-create'),
    path('students/<str:pk>/', views.getStudent, name='student'),
    path('students/update/<str:pk>/', views.updateStudent, name='student-update'),
    path('students/delete/<str:pk>/', views.deleteStudent, name='student-delete'),

    path('departments/', views.getDepartments, name='departments'),
    path('departments/create/', views.createDepartment, name='department-create'),
    path('departments/<str:pk>/', views.getDepartment, name='department'),
    path('departments/update/<str:pk>/', views.updateDepartment, name='department-update'),
    path('departments/delete/<str:pk>/', views.deleteDepartment, name='department-delete'),

    path('sections/', views.getSections, name='sections'),
    path('sections/create/', views.createSection, name='section-create'),
    path('sections/<str:pk>/', views.getSection, name='section'),
    path('sections/update/<str:pk>/', views.updateSection, name='section-update'),
    path('sections/delete/<str:pk>/', views.deleteSection, name='section-delete'),

    path('trainers/', views.getTrainers, name='trainers'),
    path('trainers/create/', views.createTrainer, name='trainer-create'),
    path('trainers/<str:pk>/', views.getTrainer, name='trainer'),
    path('trainers/update/<str:pk>/', views.updateTrainer, name='trainer-update'),
    path('trainers/delete/<str:pk>/', views.deleteTrainer, name='trainer-delete'),

    path('awards/', views.getAwards, name='awards'),
    path('awards/create/', views.createAward, name='award-create'),
    path('awards/<str:pk>/', views.getAward, name='award'),
    path('awards/update/<str:pk>/', views.updateAward, name='award-update'),
    path('awards/delete/<str:pk>/', views.deleteAward, name='award-delete'),

    path('events/', EventList.as_view(), name='event-list'),
    path('podevents/', PodEventList.as_view(), name='podevent-list'),
    path('inventory/', InventoryList.as_view(), name='inventory-list'),
    path('export-inventory-to-excel/', ExportInventoryToExcel.as_view(), name='export_inventory_to_excel'),
]