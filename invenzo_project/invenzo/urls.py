from django.urls import path
from . import views

app_name = 'invenzo'

urlpatterns = [

    # ============================
    # USUARIO / AUTENTICACIÓN
    # ============================
    path('', views.inicio, name='home'),
    path('demo/', views.demo_usuario, name='demo_usuario'),
    path('registro/', views.registrar_usuario, name='registrar_usuario'),
    path('login/', views.iniciar_sesion, name='login'), 
    path('logout/', views.cerrar_sesion, name='cerrar_sesion'),
    path('recuperar/', views.recuperar_contraseña, name='recuperar'),

    # ============================
    # DASHBOARD
    # ============================
    path('dashboard/', views.dashboard, name='dashboard'),
    path('tendencia_inventario/', views.tendencia_inventario, name='tendencia_inventario'),
    path('grafico_movimiento_diario/', views.grafico_movimiento_diario, name='grafico_movimiento_diario'),
    path('grafico_distribucion_categorias/', views.grafico_distribucion_categorias, name='grafico_distribucion_categorias'),

    # ============================
    # PRODUCTOS
    # ============================
    path('productos/', views.productos_disponibles, name='productos_disponibles'),
    path('productos/agregar/', views.agregar_producto, name='agregar_producto'),
    path('productos/editar/<int:id>/', views.editar_producto, name='editar_producto'),
    path('productos/eliminar/<int:id>/', views.eliminar_producto, name='eliminar_producto'),
    path('productos/inactivos/', views.productos_inactivos, name='productos_inactivos'),
    path('producto/activar/<int:id>/', views.activar_producto, name='activar_producto'),
    path('productos/exportar/', views.exportar_productos, name='exportar_productos'),
    path('producto/eliminar_definitivo/<int:id>/', views.eliminar_definitivo, name='eliminar_definitivo'),

    


    # ============================
    # INVENTARIO (MOVIMIENTOS)
    # ============================
    path('productos/<int:id>/movimiento/', views.registrar_movimiento, name='registrar_movimiento'),

    # ============================
    # CATEGORÍAS
    # ============================
    path('categorias/', views.categorias, name='categorias'),
    path('categorias/crear/', views.crear_categoria, name='crear_categoria'),
    path('categorias/editar/<int:id>/', views.editar_categoria, name='editar_categoria'),
    path('categorias/eliminar/<int:id>/', views.eliminar_categoria, name='eliminar_categoria'),
    path('categorias/exportar/', views.exportar_categorias, name='exportar_categorias'),


    


    # ============================
# INVENTSARIO
# ============================
    path('inventario/', views.control_inventario, name='control_inventario'),
    path("historial/", views.historial, name="historial"),






    path("alertas/", views.alerta_stock, name="alerta_stock"),
    path("alertas/reponer/<int:id>/", views.reponer_stock, name="reponer_stock"),
    path("alertas/notificaciones/", views.obtener_notificaciones, name="obtener_notificaciones"),




    path('usuarios/', views.usuarios, name='usuarios'),
    path('usuarios/crear/', views.crear_usuario, name='crear_usuario'),
    path('usuarios/editar/<int:id>/', views.editar_usuario, name='editar_usuario'),
    path('usuarios/desactivar/<int:id>/', views.desactivar_usuario, name='desactivar_usuario'),
    path('usuarios/activar/<int:id>/', views.activar_usuario, name='activar_usuario'),
    path('usuarios/reset-password/<int:id>/', views.reset_password, name='reset_password'),




    # --- CONFIGURACIÓN ---
    path("configuracion/", views.configuracion, name="configuracion"),
    path("configuracion/perfil/", views.configuracion_perfil, name="configuracion_perfil"),
    path("configuracion/notificaciones/", views.configuracion_notificaciones, name="configuracion_notificaciones"),
    path("configuracion/eliminar-foto/<int:id>/", views.eliminar_foto, name="eliminar_foto"),
    path("configuracion/sistema/", views.configuracion_sistema, name="configuracion_sistema"),
    path("configuracion/usuarios/", views.gestion_usuarios, name="gestion_usuarios"),
    path("configuracion/alertas/", views.configuracion_alertas, name="configuracion_alertas"),




]
