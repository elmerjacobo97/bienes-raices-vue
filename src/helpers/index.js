export const formatPrice = (price) => {
  return Number(price).toLocaleString('es-PE', {
    style: 'currency',
    currency: 'PEN',
  });
};
