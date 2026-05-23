export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getProgressPercent(
  raised: number,
  goal: number
) {
  return Math.min(
    Math.round((raised / goal) * 100),
    100
  );
}