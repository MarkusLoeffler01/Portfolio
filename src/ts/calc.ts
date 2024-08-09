function marginBottomFromViewHeight(height: number): number {
  // Gegebene Datenpunkte
  const data = [
      { height: 121, marginBottom: 11 },
      { height: 90, marginBottom: -5 },
      { height: 97, marginBottom: -1 },
      { height: 100, marginBottom: 0 }
  ];

  // Datenpunkte sortieren
  data.sort((a, b) => a.height - b.height);

  // Lineare Interpolation oder Extrapolation
  for (let i = 0; i < data.length - 1; i++) {
      const x0 = data[i].height;
      const y0 = data[i].marginBottom;
      const x1 = data[i + 1].height;
      const y1 = data[i + 1].marginBottom;

      if (height >= x0 && height <= x1) {
          const t = (height - x0) / (x1 - x0);
          return y0 + t * (y1 - y0);
      }
  }

  // Wenn height außerhalb der Datenpunkte liegt, verwenden wir die äußersten Punkte für die Extrapolation
  if (height < data[0].height) {
      const x0 = data[0].height;
      const y0 = data[0].marginBottom;
      const x1 = data[1].height;
      const y1 = data[1].marginBottom;
      const t = (height - x0) / (x1 - x0);
      return y0 + t * (y1 - y0);
  } else if (height > data[data.length - 1].height) {
      const x0 = data[data.length - 2].height;
      const y0 = data[data.length - 2].marginBottom;
      const x1 = data[data.length - 1].height;
      const y1 = data[data.length - 1].marginBottom;
      const t = (height - x0) / (x1 - x0);
      return y0 + t * (y1 - y0);
  }

  return 0; // Fallback, sollte nicht erreicht werden
}


function age(birthdate: Date): number {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

export { marginBottomFromViewHeight, age };