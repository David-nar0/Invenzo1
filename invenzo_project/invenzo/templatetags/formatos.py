from django import template

register = template.Library()

@register.filter
def formato_col(valor):
    try:
        valor = float(valor)
        entero, dec = f"{valor:.3f}".split(".")
        entero = "{:,}".format(int(entero)).replace(",", ".")
        return f"{entero}.{dec}"
    except:
        return valor
