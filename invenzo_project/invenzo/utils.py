from django.core.mail import send_mail
from django.conf import settings
from .models import Usuario

def enviar_correo(asunto, mensaje, destinatarios):
    if isinstance(destinatarios, str):
        destinatarios = [destinatarios]
    send_mail(
        asunto,
        mensaje,
        settings.DEFAULT_FROM_EMAIL,
        destinatarios,
        fail_silently=False
    )


def enviar_notificaciones_usuario(usuario, asunto, mensaje):
    """
    Envía un correo de notificación a un usuario.
    usuario: objeto Usuario
    asunto: string
    mensaje: string
    """
    if usuario.email:
        enviar_correo(asunto, mensaje, usuario.email)


# views.py (o utils.py)
def obtener_email_admines():
    admins = Usuario.objects.filter(rol='administrador', estado='activo')
    return [a.email for a in admins if a.email]
