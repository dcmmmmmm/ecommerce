export const generateCouponCode = (title="", expireDate:any) => {
  // Format the title to uppercase and remove spaces
  const formattedTitle = title.toUpperCase().replace(/\s+/g,"")

  // Fomart the expire Date to "DDMMYYYY
  const formattedExpireDate = expireDate.split("-").reverse().join("")
  
  // Combine 
  const couponCode = `${formattedTitle}-${formattedExpireDate}`;

  return couponCode
}