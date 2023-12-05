import subprocess
import datetime
import time
from colorama import init, Fore

# Inicializar colorama para Windows
init(autoreset=True)

def ejecutar_script():
    try:
        intervalo_minutos = float(input("Ingrese el intervalo de ejecución en minutos: "))  # Intervalo en minutos
        intervalo_segundos = intervalo_minutos * 60  # Convertir minutos a segundos
        repeticiones = int(input("Ingrese cuántas veces desea ejecutar el script: "))
        fecha_correcta = input("Ingrese la fecha correcta para detener la ejecución (YYYY-MM-DD): ")

        while repeticiones > 0:
            print(Fore.CYAN + "Ejecutando el script...")
            subprocess.run(['python', 'PruebaTransacciones.py'])  
            repeticiones -= 1

            print(Fore.YELLOW + f"Esperando {intervalo_minutos} minutos...")
            for i in range(int(intervalo_segundos)):
                minutos_restantes = (intervalo_segundos - i) // 60
                segundos_restantes = (intervalo_segundos - i) % 60
                print(Fore.YELLOW + f"Tiempo restante: {minutos_restantes} minutos {segundos_restantes} segundos", end="\r")
                time.sleep(1)

            fecha_actual = datetime.datetime.now().strftime('%Y-%m-%d')
            if fecha_actual >= fecha_correcta:
                break

        print(Fore.GREEN + "Ejecución finalizada.")

    except ValueError:
        print(Fore.RED + "Ingrese valores válidos para el intervalo y las repeticiones.")

if __name__ == "__main__":
    ejecutar_script()
