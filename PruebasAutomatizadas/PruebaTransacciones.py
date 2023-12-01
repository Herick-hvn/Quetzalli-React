import requests
import datetime
import random
import urllib3
import time
from colorama import Fore, Style

# Desactivar las advertencias de SSL (puedes omitir esto si no quieres ver advertencias)
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Función para enviar una solicitud GET a una URL y obtener datos JSON
def obtener_datos(url):
    try:
        print("Cargando datos...")
        for i in range(1, 6):
            time.sleep(0.5)  # Simulación de carga de datos
            print(f"Cargando... {i * 20}% completado", end='\r')
        print(Fore.GREEN + "Carga completa." + Style.RESET_ALL)
        response = requests.get(url, verify=False)  # Ignorar la verificación del certificado
        if response.status_code == 200:
            return response.json()
        else:
            registrar_log(f"Error al obtener datos de {url}. Código de estado: {response.status_code}")
            return None
    except requests.exceptions.RequestException as e:
        registrar_log(f"Error de conexión: {e}")
        return None

# Función para enviar una solicitud POST a una URL con datos JSON
def enviar_datos(url, data):
    try:
        print("Enviando datos...")
        time.sleep(1)  # Simulación de envío de datos
        print(Fore.YELLOW + "Datos enviados." + Style.RESET_ALL)
        response = requests.post(url, json=data, verify=False)  # Ignorar la verificación del certificado
        if response.status_code == 201:
            return response.json()
        else:
            registrar_log(f"Error al enviar datos a {url}. Código de estado: {response.status_code}")
            return None
    except requests.exceptions.RequestException as e:
        registrar_log(f"Error de conexión: {e}")
        return None

# Función para registrar acciones en el log
def registrar_log(titulo, mensaje):
    now = datetime.datetime.now()
    log_message = f"{titulo}: {mensaje}\n"
    with open('registro.txt', 'a') as file:
        file.write(log_message)

    print(f"{Fore.CYAN}{titulo}{Style.RESET_ALL}: {mensaje}")
# Título general para el registro
registro_general = f"\nRegistro realizado el {datetime.datetime.now()}\n"
with open('registro.txt', 'a') as file:
    file.write(registro_general)


# URLs
productos_url = 'https://localhost:7239/api/Productos'
usuarios_url = 'https://localhost:7239/api/Users'
pedido_url = 'https://localhost:7239/api/Pedidos'
pedido_productos_url = 'https://localhost:7239/api/PedidoProductos'

# Resto del código...

# Realizar solicitud para obtener datos de productos
productos = obtener_datos(productos_url)
if productos:
    registrar_log("Obtención de datos de productos", "Datos de productos cargados exitosamente.")
else:
    registrar_log("Obtención de datos de productos", "No se pudieron obtener datos de productos. Deteniendo el proceso.")
    exit()

# Seleccionar un producto aleatorio
if productos:
    producto_seleccionado = random.choice(productos)
    registrar_log("Selección de producto aleatorio", f"Producto seleccionado: {producto_seleccionado['nombreProducto']}")
else:
    registrar_log("Selección de producto aleatorio", "No se pudieron obtener datos de productos. Deteniendo el proceso.")
    exit()

# Realizar solicitud para obtener datos de usuarios
usuarios = obtener_datos(usuarios_url)
if usuarios:
    registrar_log("Obtención de datos de usuarios", "Datos de usuarios cargados exitosamente.")
else:
    registrar_log("Obtención de datos de usuarios", "No se pudieron obtener datos de usuarios. Deteniendo el proceso.")
    exit()

# Seleccionar un usuario aleatorio
if usuarios:
    usuario_seleccionado = random.choice(usuarios)
    id_cliente = usuario_seleccionado.get('id')
    registrar_log("Selección de usuario aleatorio", f"Usuario seleccionado: {usuario_seleccionado['email']}")
else:
    registrar_log("Selección de usuario aleatorio", "No se pudieron obtener datos de usuarios. Deteniendo el proceso.")
    exit()

# Generar datos para el pedido
fecha_actual = datetime.datetime.utcnow().replace(microsecond=0).isoformat() + "Z"

total_pedido = round(random.uniform(10, 100), 2)

# Enviar solicitud POST para crear un pedido
datos_pedido = {
  "idPedidos": 0,
  "idCliente": id_cliente,
  "fechaPedido": fecha_actual,
  "fechaEntrega": fecha_actual,
  "total": 0,
  "estatus": 0
}

pedido_creado = enviar_datos(pedido_url, datos_pedido)

if pedido_creado:
    id_pedido_creado = pedido_creado.get('idPedidos')
    registrar_log("Creación de pedido", f"Pedido creado con ID: {id_pedido_creado}")
else:
    registrar_log("Creación de pedido", "No se pudo crear el pedido. Deteniendo el proceso.")
    exit()

# Enviar solicitud POST para crear un pedido de productos
datos_pedido_productos = {
    "idpedidoProducto": 0,
    "cantidad": random.randint(1, 10),  # Cantidad aleatoria
    "unidad": "string",
    "idProducto": producto_seleccionado['idproductos'],
    "idPedidos": id_pedido_creado
}

pedido_producto_creado = enviar_datos(pedido_productos_url, datos_pedido_productos)

if pedido_producto_creado:
    registrar_log("Creación de pedido de producto", "Pedido de producto creado exitosamente.")
else:
    registrar_log("Creación de pedido de producto", "No se pudo crear el pedido de producto.")

registrar_log("Proceso completado", "Proceso completado exitosamente.")
