export function generateIsoFormattedDate(normalDate : any){
  const dateObject = new Date(normalDate);
  const isoFormattedDate = dateObject.toISOString();

  return isoFormattedDate;
}