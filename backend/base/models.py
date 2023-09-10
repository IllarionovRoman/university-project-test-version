from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    image = models.ImageField(null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)
    date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.name


class Departments(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)
    qty = models.CharField(max_length=255, null=True, blank=True)
    material = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name


class Students(models.Model):
    first_name = models.CharField(max_length=200, null=True, blank=True)
    last_name = models.CharField(max_length=200, null=True, blank=True)
    middle_name = models.CharField(max_length=200, null=True, blank=True)
    age = models.IntegerField(default=0, null=True, blank=True)
    department = models.ForeignKey(Departments, on_delete=models.CASCADE, null=True, blank=True)
    section = models.ForeignKey('Sections', related_name='section', on_delete=models.CASCADE, null=True, blank=True)
    trainer = models.ForeignKey('Trainers', related_name='trainer', on_delete=models.CASCADE, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.first_name or '1'


class PodEvent(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    date = models.DateTimeField()
    location = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class Event(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateTimeField()
    address = models.CharField(max_length=255)
    students = models.ManyToManyField(Students)

    def __str__(self):
        return self.name


class Trainers(models.Model):
    first_name = models.CharField(max_length=200, null=True, blank=True)
    last_name = models.CharField(max_length=200, null=True, blank=True)
    middle_name = models.CharField(max_length=200, null=True, blank=True)
    age = models.IntegerField(default=0, null=True, blank=True)
    department = models.ForeignKey(Departments, on_delete=models.CASCADE, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.first_name


class Sections(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(blank=True, null=True)
    students = models.ManyToManyField(Students, related_name='students', blank=True, null=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name


class Inventory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    quantity = models.PositiveIntegerField()
    date = models.DateTimeField()
    sections = models.ForeignKey(Sections, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Awards(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    count = models.IntegerField(null=True, blank=True, default=0)
    description = models.TextField(null=True, blank=True)
    students = models.ForeignKey(Students, on_delete=models.CASCADE, null=True, blank=True)
    types = [
        ('gold', 'gold'),
        ('silver', 'silver'),
        ('bronze', 'bronze'),
    ]
    type = models.CharField(max_length=255, choices=types)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name












class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)

    def __str__(self):
        return str(self.rating)


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    _id = models.AutoField(primary_key=True, editable=False)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    isDelivered = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    createAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.createAt)


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=255, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)


class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    postalCode = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.address)

