export interface Moto {
  id: number;
  lat: number;
  lng: number;
  nombre: string;
}

export function conectarSimulado(callback: (motos: Moto[]) => void): void {
  let posiciones: Moto[] = [
    { id: 1, lat: 5.0703, lng: -75.5138, nombre: 'Moto 1' },
    { id: 2, lat: 5.0735, lng: -75.5210, nombre: 'Moto 2' },
  ];

  setInterval(() => {
    // Generar movimiento aleatorio
    posiciones = posiciones.map((moto) => ({
      ...moto,
      lat: moto.lat + (Math.random() - 0.5) * 0.001,
      lng: moto.lng + (Math.random() - 0.5) * 0.001,
    }));

    callback(posiciones);
  }, 3000);
}
