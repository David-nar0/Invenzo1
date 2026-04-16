from django.db import models
from django.utils import timezone


# ============================
# USUARIOS
# ============================

class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    rol = models.CharField(
        max_length=20,
        choices=[
            ('administrador', 'Administrador'),
            ('auxiliar', 'Auxiliar')
        ],
        default='auxiliar'
    )

    foto = models.ImageField(upload_to='usuarios/', null=True, blank=True)

    estado = models.CharField(
        max_length=10,
        choices=[('activo', 'Activo'), ('inactivo', 'Inactivo')],
        default='activo'
    )

    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre



# ============================
# CATEGORÍAS
# ============================
class Categoria(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField(blank=True, null=True)

    estado = models.CharField(
        max_length=10,
        choices=[('activo', 'Activo'), ('inactivo', 'Inactivo')],
        default='activo'
    )

    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre


# ============================
# PRODUCTOS
# ============================
class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    codigo = models.CharField(max_length=50, unique=True)

    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)

    cantidad = models.PositiveIntegerField(default=0)
    stock_minimo = models.PositiveIntegerField(default=5)
    stock_maximo = models.PositiveIntegerField(default=100)

    precio = models.DecimalField(max_digits=10, decimal_places=3)

    descripcion = models.TextField(blank=True, null=True)

    imagen = models.ImageField(upload_to='productos/', null=True, blank=True)

    estado = models.CharField(
        max_length=10,
        choices=[('activo', 'Activo'), ('inactivo', 'Inactivo')],
        default='activo'
    )

    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    notificado_bajo_stock = models.BooleanField(default=False)  # ← AQUI

    def __str__(self):
        return f"{self.nombre} ({self.codigo})"


# ============================
# INVENTARIO (MOVIMIENTOS)
# ============================
class Inventario(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True)

    tipo_movimiento = models.CharField(
        max_length=10,
        choices=[('entrada', 'Entrada'), ('salida', 'Salida')],
        default='entrada'
    )

    cantidad = models.PositiveIntegerField(default=0)
    fecha_movimiento = models.DateTimeField(default=timezone.now)



    observacion = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.producto.nombre} - {self.tipo_movimiento} ({self.cantidad})"


class Historial(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True)
    accion = models.CharField(max_length=255)
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.accion} - {self.fecha}"


class NotificacionConfig(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)

    alertas_stock = models.BooleanField(default=True)
    movimientos = models.BooleanField(default=True)
    productos_nuevos = models.BooleanField(default=True)

    correo_alertas = models.BooleanField(default=True)
    correo_movimientos = models.BooleanField(default=True)

    def __str__(self):
        return f"Notificaciones de {self.usuario.nombre}"


class ConfigSistema(models.Model):
    nombre_sistema = models.CharField(max_length=100, default="Invenzo")
    stock_min_global = models.PositiveIntegerField(default=5)
    stock_max_global = models.PositiveIntegerField(default=100)



class NotificacionEnvio(models.Model):
    producto = models.ForeignKey('Producto', on_delete=models.CASCADE)
    enviado_a = models.ForeignKey('Usuario', on_delete=models.CASCADE)
    nivel = models.CharField(max_length=10, choices=[('critico','Crítico'),('bajo','Bajo')])
    fecha_envio = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.producto.nombre} - {self.nivel} -> {self.enviado_a.nombre_usuario}"
