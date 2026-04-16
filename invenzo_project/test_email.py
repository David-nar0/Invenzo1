import os
import django

# 1️⃣ Indicar el módulo de settings
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "invenzo_project.settings")

# 2️⃣ Inicializar Django
django.setup()

# 3️⃣ Importar tu función
from invenzo.utils import enviar_correo

# 4️⃣ Datos del correo
asunto = "Prueba de correo Invenzo"
mensaje = "¡Hola! Este es un correo de prueba desde Invenzo."
destinatario = "narvezaraujo@gmail.com"  # correo real

# 5️⃣ Enviar correo
enviar_correo(asunto, mensaje, destinatario)

print("Correo enviado, revisa tu bandeja de entrada.")
