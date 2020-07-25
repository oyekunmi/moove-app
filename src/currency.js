import numbro from "numbro";

export default function(x) {
  return numbro(x).formatCurrency({ 
    thousandSeparated: true, spaceSeparatedCurrency: true, mantissa: 2, currencySymbol: "₦" 
  });
}
