export const parseResponse = (data) => {
  if (data?.error) {
    throw new Error(data?.error?.error??data?.error?.message)
  }
  return data
}


export function parseFormData(data){
  const form = new FormData()
  Object.keys(data).forEach(element => {
    form.append(element,data[element])
  });
  return form 
}

export function parseFWResponse(response,wallet,currency) {
  const obj = {
    txRef: response.tx_ref,
    flwRef: response.flw_ref,
    txId: response.transaction_id,
    amount: response.amount,
    wallet: wallet,
    currency: currency
  }
  return obj
}